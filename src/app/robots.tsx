import { CLIENT_URL, pagesLinks } from '@/shared/constants';
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: [
				pagesLinks.main,
				pagesLinks.portfolio,
				`${pagesLinks.portfolio}/`,
				pagesLinks.articles,
				`${pagesLinks.articles}/`,
				`${pagesLinks.articles}/*`,
				pagesLinks.advantages,
				`${pagesLinks.advantages}/`,
			],
			disallow: [
				`${pagesLinks.admin}/`,
				'/*?*',
				`${pagesLinks.portfolio}/*?*`,
				`${pagesLinks.advantages}/*?*`,
			],
		},
		sitemap: `${CLIENT_URL}/sitemap.xml`,
	};
}
