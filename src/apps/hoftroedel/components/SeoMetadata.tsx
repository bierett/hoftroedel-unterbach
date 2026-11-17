// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { useEffect } from "react";
import { useLocation } from "react-router";
import { getEventSchema, getSeoPage } from "../../../seo";

/** Keep document metadata aligned with client-side navigation as well as direct visits. */
export function SeoMetadata() {
    const { pathname } = useLocation();
    useEffect(() => {
        const page = getSeoPage(pathname);
        document.title = page.title;
        const meta = (key: "name" | "property", name: string, content: string) => {
            let element = document.head.querySelector<HTMLMetaElement>(`meta[${key}="${name}"]`);
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(key, name);
                document.head.append(element);
            }
            element.content = content;
        };
        meta("name", "description", page.description);
        meta("name", "robots", page.index ? "index,follow" : "noindex,follow");
        meta("property", "og:title", page.title);
        meta("property", "og:description", page.description);
        meta("property", "og:url", page.canonical);
        meta("name", "twitter:title", page.title);
        meta("name", "twitter:description", page.description);
        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement("link");
            canonical.rel = "canonical";
            document.head.append(canonical);
        }
        canonical.href = page.canonical;
        document.getElementById("event-schema")?.remove();
        if (page.path === "/") {
            const schema = document.createElement("script");
            schema.id = "event-schema";
            schema.type = "application/ld+json";
            schema.textContent = JSON.stringify(getEventSchema());
            document.head.append(schema);
        }
    }, [pathname]);
    return null;
}
