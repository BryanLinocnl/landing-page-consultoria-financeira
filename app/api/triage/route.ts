import { NextResponse } from "next/server";
import { resend, fromEmail, TRIAGE_TO_EMAIL } from "@/lib/resend";

export const dynamic = "force-dynamic";

type TriagePayload = {
  name: string;
  email: string;
  phone: string;
  message?: string;
  objetivo?: string;
  perfil?: string;
  patrimonio?: string;
  classes?: string[];
  urgencia?: string;
};

const LABELS: Record<keyof TriagePayload, string> = {
  name: "Nome",
  email: "E-mail",
  phone: "Telefone",
  message: "Mensagem",
  objetivo: "Objetivo financeiro",
  perfil: "Perfil de risco",
  patrimonio: "Faixa de patrimônio",
  classes: "Classes investidas",
  urgencia: "Urgência de início",
};

function escape(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function buildEmailHtml(p: TriagePayload): string {
  const rows = (Object.keys(LABELS) as (keyof TriagePayload)[])
    .filter((k) => {
      const v = p[k];
      if (v === undefined || v === null) return false;
      if (Array.isArray(v)) return v.length > 0;
      return String(v).trim() !== "";
    })
    .map((k, i) => {
      const v = p[k];
      const val = Array.isArray(v) ? v.join(", ") : String(v);
      const bg = i % 2 === 0 ? "#0a0a0a" : "#0f0f12";
      return `
        <tr>
          <td style="padding:12px 16px;background:${bg};color:#a0a0a8;font-size:13px;width:40%;vertical-align:top;border-left:2px solid #ff7a1a;">
            ${escape(LABELS[k])}
          </td>
          <td style="padding:12px 16px;background:${bg};color:#f5f5f5;font-size:14px;vertical-align:top;">
            ${escape(val)}
          </td>
        </tr>`;
    })
    .join("");

  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
</head>
<body style="margin:0;padding:0;background:#050505;font-family:Inter,Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#050505;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#0a0a0a;border:1px solid #1a1a1a;border-radius:16px;overflow:hidden;">
          <!-- header -->
          <tr>
            <td style="padding:28px 32px;background:linear-gradient(135deg,#0b1e3f,#050505);border-bottom:1px solid #ff7a1a;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="font-size:20px;font-weight:700;color:#ff7a1a;letter-spacing:-0.5px;">LION GOLD</td>
                </tr>
                <tr>
                  <td style="padding-top:6px;font-size:13px;color:#a0a0a8;">Nova triagem de consultoria</td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- intro -->
          <tr>
            <td style="padding:24px 32px 8px;color:#f5f5f5;font-size:16px;font-weight:600;">
              Novo lead qualificado
            </td>
          </tr>
          <tr>
            <td style="padding:0 32px 20px;color:#a0a0a8;font-size:13px;">
              Um visitante concluiu o formulário de triagem na landing page.
            </td>
          </tr>
          <!-- dados -->
          <tr>
            <td style="padding:0 24px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border-radius:10px;overflow:hidden;">
                ${rows}
              </table>
            </td>
          </tr>
          <!-- footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid #1a1a1a;">
              <p style="margin:0;color:#5a5a60;font-size:11px;line-height:1.6;">
                Este e-mail foi gerado automaticamente pela landing page da Lion Gold Consultoria.
                Responda diretamente ao contato do lead acima.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

function buildEmailText(p: TriagePayload): string {
  const lines = (Object.keys(LABELS) as (keyof TriagePayload)[])
    .filter((k) => {
      const v = p[k];
      if (v === undefined || v === null) return false;
      if (Array.isArray(v)) return v.length > 0;
      return String(v).trim() !== "";
    })
    .map((k) => {
      const v = p[k];
      const val = Array.isArray(v) ? v.join(", ") : String(v);
      return `${LABELS[k]}: ${val}`;
    })
    .join("\n");

  return `LION GOLD — Nova triagem de consultoria\n\nNovo lead qualificado:\n\n${lines}\n\nResponda diretamente ao contato do lead.`;
}

export async function POST(request: Request) {
  let payload: TriagePayload;

  try {
    payload = (await request.json()) as TriagePayload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido" },
      { status: 400 },
    );
  }

  // validação mínima
  const required: (keyof TriagePayload)[] = ["name", "email", "phone"];
  for (const k of required) {
    const v = payload[k];
    if (!v || String(v).trim() === "") {
      return NextResponse.json(
        { ok: false, error: `Campo obrigatório ausente: ${LABELS[k]}` },
        { status: 422 },
      );
    }
  }

  // Sem chave do Resend → registra no log e retorna sucesso (não bloqueia o usuário)
  if (!resend) {
    console.warn(
      "[triage] RESEND_API_KEY ausente. Payload recebido mas e-mail não enviado:",
      JSON.stringify(payload, null, 2),
    );
    return NextResponse.json({
      ok: true,
      warning: "E-mail não enviado (chave Resend ausente).",
    });
  }

  try {
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: TRIAGE_TO_EMAIL,
      subject: `Nova triagem — ${payload.name}`,
      html: buildEmailHtml(payload),
      text: buildEmailText(payload),
    });

    if (error) {
      console.error("[triage] Erro Resend:", error);
      // Mesmo com erro, não bloqueia o usuário — retorna sucesso amigável
      return NextResponse.json({
        ok: true,
        warning: "E-mail pode não ter sido entregue.",
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[triage] Exceção ao enviar e-mail:", err);
    // Fallback amigável: cliente é redirecionado mesmo assim
    return NextResponse.json({
      ok: true,
      warning: "Falha interna no envio.",
    });
  }
}
