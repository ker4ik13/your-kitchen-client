import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/portfolio", "/articles", "/articles/*"],
      disallow: ["/admin/", "/*?*", "/portfolio/*?*"],
    },
    sitemap: "https://youkuhnya.ru/sitemap.xml",
  };
}
