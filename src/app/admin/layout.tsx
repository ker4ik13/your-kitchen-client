import "../styles";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <head>
        <title>Админ панель | Твоя Кухня</title>
      </head>
      <body>
        <>{children}</>
      </body>
    </>
  );
};

export default RootLayout;
