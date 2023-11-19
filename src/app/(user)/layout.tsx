import Nav from "@/widgets/Nav/Nav";
import Footer from "@/widgets/Footer/Footer";
import "../styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <link
          rel='apple-touch-icon'
          sizes='180x180'
          href='/apple-touch-icon.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='32x32'
          href='/favicon-32x32.png'
        />
        <link
          rel='icon'
          type='image/png'
          sizes='16x16'
          href='/favicon-16x16.png'
        />
        <link rel='manifest' href='/site.webmanifest' />
        <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ff0000' />
        <meta name='msapplication-TileColor' content='#da532c' />
        <meta name='theme-color' content='#433A31' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      </head>
      <body className='grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen font-gilroy'>
        <Nav />
        {children}
        <Footer />
      </body>
    </>
  );
}
