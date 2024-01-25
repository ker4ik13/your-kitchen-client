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
				pagesLinks.furniture,
				`${pagesLinks.advantages}/`,
			],
			disallow: [
				`${pagesLinks.admin}/`,
				'/*?*',
				`${pagesLinks.portfolio}/*?*`,
				`${pagesLinks.advantages}/*?*`,
				`${pagesLinks.furniture}/*?*`,
			],
		},
		sitemap: `${CLIENT_URL}/sitemap.xml`,
	};
}
