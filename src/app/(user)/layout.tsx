import Footer from '@/widgets/Footer/Footer';
import Nav from '@/widgets/Nav/Nav';
import { Metadata } from 'next';
import Script from 'next/script';
import '../styles';

export const metadata: Metadata = {
	manifest: '/site.webmanifest',
	verification: {
		google: 'Nf5juItdjnxMIYOb4kOe_8QgiyDbS4fqFVU1tZsjo38',
		yandex: '8cb11033a13960f6',
		other: {
			'zen-verification':
				'dBZrk3siMlnkNbciHK3sTxTjpaHeP4EzbLxVfgqCTkJzy105Kug9rXQJUPfQHqG1',
		},
	},
	icons: {
		shortcut: '/favicon.ico',
		apple: '/apple-touch-icon.png',
		icon: {
			rel: 'icon',
			url: '/favicon-32x32.png',
			sizes: '32x32',
			type: 'image/png',
		},
		other: {
			rel: 'icon',
			url: '/favicon-16x16.png',
			sizes: '16x16',
			type: 'image/png',
		},
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<head>
				<link rel='mask-icon' href='/safari-pinned-tab.svg' color='#ff0000' />
				<meta name='msapplication-TileColor' content='#da532c' />
				<meta name='theme-color' content='#433A31' />
				{process.env.NODE_ENV === 'production' && (
					<>
						<script defer src='https://af.click.ru/af.js?id=12257'></script>
						<Script
							async
							src='https://www.googletagmanager.com/gtag/js?id=G-9PXGLTWQJK'
						></Script>
						<Script
							id='google-analytics'
							dangerouslySetInnerHTML={{
								__html: ` window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-9PXGLTWQJK');`,
							}}
						/>
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
					</>
				)}
			</head>
			<body className='grid grid-rows-[auto_1fr_auto] grid-cols-1 min-h-screen font-gilroy'>
				<Nav />
				{children}
				<Footer />
			</body>
		</>
	);
}
