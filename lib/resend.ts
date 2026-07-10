import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;
export const fromEmail = process.env.RESEND_FROM || "onboarding@resend.dev";

export const TRIAGE_TO_EMAIL = "blinconl@gmail.com";

export const resend = apiKey ? new Resend(apiKey) : null;

export function getResend() {
  return { resend, fromEmail, apiKey: !!apiKey };
}
