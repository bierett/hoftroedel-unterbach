// SPDX-FileCopyrightText: 2023-2025 Open Pioneer project (https://github.com/open-pioneer)
// SPDX-License-Identifier: Apache-2.0

import type { Plugin } from "vite";
import { eventConfig } from "../../src/event.ts";
import { getEventSchema, getSeoPage, seoPages } from "../../src/seo.ts";

const escape = (value: string) =>
    value
        .replace(/&/g, "&amp;")
        .replace(/"/g, "&quot;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

function renderHead(html: string, path: string) {
    const page = getSeoPage(path);
    const tags = [
        `<title>${escape(page.title)}</title>`,
        `<meta name="description" content="${escape(page.description)}">`,
        `<meta name="robots" content="${page.index ? "index,follow" : "noindex,follow"}">`,
        `<link rel="canonical" href="${escape(page.canonical)}">`,
        ...Object.entries({
            "og:type": "website",
            "og:locale": "de_DE",
            "og:site_name": "Hoftrödel Unterbach",
            "og:title": page.title,
            "og:description": page.description,
            "og:url": page.canonical,
            "og:image": page.image,
            "og:image:alt": "Flyer zum Hoftrödel Unterbach"
        }).map(([property, value]) => `<meta property="${property}" content="${escape(value)}">`),
        ...Object.entries({
            "twitter:card": "summary_large_image",
            "twitter:title": page.title,
            "twitter:description": page.description,
            "twitter:image": page.image
        }).map(([name, value]) => `<meta name="${name}" content="${escape(value)}">`),
        ...(page.path === "/"
            ? [
                  `<script id="event-schema" type="application/ld+json">${JSON.stringify(getEventSchema()).replace(/</g, "\\u003c")}</script>`
              ]
            : [])
    ].join("\n        ");
    return html.replace(
        /<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,
        `<!-- seo:start -->\n        ${tags}\n        <!-- seo:end -->`
    );
}

export function eventSeo(): Plugin {
    return {
        name: "hoftroedel-event-seo",
        enforce: "post",
        transformIndexHtml: {
            order: "post",
            handler(html, context) {
                const pathname = context.originalUrl?.split("?")[0] ?? "/";
                return renderHead(html, pathname === "/index.html" ? "/" : pathname);
            }
        },
        generateBundle(_options, bundle) {
            const entry = bundle["index.html"];
            if (!entry || entry.type !== "asset")
                throw new Error("Missing index.html for SEO output");
            const html = String(entry.source);
            for (const page of seoPages.filter((page) => page.path !== "/")) {
                this.emitFile({
                    type: "asset",
                    fileName: `${page.path.slice(1)}index.html`,
                    source: renderHead(html, page.path)
                });
            }
            this.emitFile({
                type: "asset",
                fileName: "robots.txt",
                source: `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", eventConfig.siteUrl).href}\n`
            });
            this.emitFile({
                type: "asset",
                fileName: "sitemap.xml",
                source: `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${seoPages
                    .filter((page) => page.index)
                    .map(
                        (page) =>
                            `  <url><loc>${escape(getSeoPage(page.path).canonical)}</loc></url>`
                    )
                    .join("\n")}\n</urlset>\n`
            });
        }
    };
}
