import Nav from "@/widgets/Nav/Nav";
import Footer from "@/widgets/Footer/Footer";
import "../styles";
import Script from "next/script";

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
        <meta name='yandex-verification' content='8cb11033a13960f6' />
        <script defer src='https://af.click.ru/af.js?id=12257'></script>
        {/* TODO: не забывать про метрику */}
        <Script
          id='metrikaScript'
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T7HCN6P');`,
          }}
        />
      </head>
      <body className='grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen font-gilroy'>
        <Nav />
        {children}
        <Footer />
      </body>
    </>
  );
}
