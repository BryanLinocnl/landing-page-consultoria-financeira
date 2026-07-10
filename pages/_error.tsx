function ErrorPage({ statusCode }: { statusCode: number }) {
  return (
    <div style={{ textAlign: "center", padding: "4rem 1rem", color: "#f5f5f5" }}>
      {statusCode ? `Erro ${statusCode}` : "Erro no servidor"}
    </div>
  );
}

ErrorPage.getInitialProps = ({
  res,
  err,
}: {
  res?: { statusCode?: number };
  err?: Error & { statusCode?: number };
}) => {
  const statusCode = res?.statusCode || err?.statusCode || 500;
  return { statusCode };
};

export default ErrorPage;
