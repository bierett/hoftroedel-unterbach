// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { eventConfig, eventDates } from "./event.ts";

const brand = "Hoftrödel Unterbach";
const description = `Unterbacher Hoftrödel am ${eventDates.eventDate} ab ${eventDates.eventTime} Uhr. Informationen zur kostenlosen Teilnahme, Anmeldung und Karte.`;
export const seoPages = [
    { path: "/", title: `${brand} · ${eventDates.eventDate}`, description, index: true },
    {
        path: "/karte/",
        title: `Karte · ${brand}`,
        description:
            "Karte von Düsseldorf-Unterbach. Aktuell werden ausschließlich Demo-Standorte angezeigt.",
        index: false
    },
    {
        path: "/kontakt/",
        title: `Kontakt · ${brand}`,
        description: `Kontaktinformationen zum ${brand}.`,
        index: false
    },
    {
        path: "/impressum/",
        title: `Impressum · ${brand}`,
        description: `Angaben zum Betreiber des ${brand}.`,
        index: false
    },
    {
        path: "/datenschutz/",
        title: `Datenschutz · ${brand}`,
        description: `Datenschutzhinweise zum ${brand}.`,
        index: false
    }
];

export function getSeoPage(path: string) {
    const normalized = path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
    const page = seoPages.find((entry) => entry.path === normalized);
    const data = page ?? { path: normalized, title: brand, description, index: false };
    return {
        ...data,
        canonical: new URL(data.path.slice(1), eventConfig.siteUrl).href,
        image: new URL(
            `downloads/${encodeURIComponent("hoftrödel-unterbach-flyer.png")}`,
            eventConfig.siteUrl
        ).href
    };
}

export function getEventSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "Event",
        name: "Unterbacher Hoftrödel",
        description,
        startDate: eventDates.startDate,
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        url: eventConfig.siteUrl,
        image: [getSeoPage("/").image],
        isAccessibleForFree: true,
        location: {
            "@type": "Place",
            name: "Private Höfe und Garagen in Düsseldorf-Unterbach",
            address: {
                "@type": "PostalAddress",
                addressLocality: "Düsseldorf-Unterbach",
                addressCountry: "DE"
            }
        }
    };
}
