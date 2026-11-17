// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from "playwright/test";
import { eventConfig, eventDates } from "../src/event";

// Navigation steps must run sequentially in the same page.
/* eslint-disable no-await-in-loop */

test.beforeEach(async ({ page }) => {
    // Exercise the real map UI without depending on the external basemap service.
    await page.route("**/gdz_basemapde_vektor/styles/bm_web_gry.json", (route) =>
        route.fulfill({
            json: {
                version: 8,
                sources: {},
                layers: [
                    {
                        id: "smoke-background",
                        type: "background",
                        paint: { "background-color": "#f4f1e8" }
                    }
                ]
            }
        })
    );
    await page.goto("/");
});

test("homepage and navigation work", async ({ page }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Unterbacher");
    const navigation = page.getByRole("navigation", { name: "Hauptnavigation" });
    for (const [title, path] of [
        ["Kontakt", "kontakt"],
        ["Datenschutz", "datenschutz"],
        ["Impressum", "impressum"]
    ]) {
        const link = navigation.getByRole("link", { name: title, exact: true });
        await link.click();
        await expect(page).toHaveURL(new RegExp(`/${path}$`));
        await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
        await expect(link).toHaveAttribute("aria-current", "page");
    }
    await page.getByRole("banner").getByRole("link", { name: "Hoftrödel Unterbach" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Unterbacher");
});

test("event dates and SEO metadata follow the shared configuration", async ({ page, request }) => {
    await expect(page.getByRole("heading", { level: 1 })).toContainText(eventDates.eventShortDate);
    await expect(page.locator('section[aria-labelledby="deadline-title"]')).toContainText(
        eventDates.deadline
    );
    await expect(page).toHaveTitle(`Hoftrödel Unterbach · ${eventDates.eventDate}`);
    await expect(page.locator('head link[rel="canonical"]')).toHaveAttribute(
        "href",
        eventConfig.siteUrl
    );
    const root = await request.get("/");
    const html = await root.text();
    expect(html).toContain(eventDates.eventDate);
    const schemaText = html.match(
        /<script id="event-schema" type="application\/ld\+json">([\s\S]*?)<\/script>/
    )?.[1];
    if (!schemaText) throw new Error("Missing event schema in server HTML");
    const schema = JSON.parse(schemaText);
    expect(schema.startDate).toBe(eventDates.startDate);
    for (const path of ["kontakt", "impressum", "datenschutz", "karte"]) {
        const response = await request.get(`/${path}/`);
        expect(response.ok()).toBe(true);
        const source = await response.text();
        expect(source).toContain(`${eventConfig.siteUrl}${path}/`);
        expect(source).toContain('content="noindex,follow"');
        expect(source).not.toContain('id="event-schema"');
    }
    await page
        .getByRole("navigation", { name: "Hauptnavigation" })
        .getByRole("link", { name: "Kontakt", exact: true })
        .click();
    await expect(page).toHaveTitle("Kontakt · Hoftrödel Unterbach");
    await expect(page.locator('head meta[name="robots"]')).toHaveAttribute(
        "content",
        "noindex,follow"
    );
    await expect(page.locator("#event-schema")).toHaveCount(0);
    expect(await (await request.get("/robots.txt")).text()).toContain(
        `${eventConfig.siteUrl}sitemap.xml`
    );
    const sitemap = await (await request.get("/sitemap.xml")).text();
    expect(sitemap).toContain(`<loc>${eventConfig.siteUrl}</loc>`);
    expect(sitemap).not.toContain("/karte/");
});

test("map renders and can be expanded and collapsed", async ({ page }) => {
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
    await page.getByRole("link", { name: "Zur großen Karte", exact: true }).click();
    await expect(page).toHaveURL(/\/karte$/);
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
    await expect(
        page
            .getByRole("navigation", { name: "Hauptnavigation" })
            .getByRole("link", { name: "Karte", exact: true })
    ).toHaveAttribute("aria-current", "page");
    await page
        .getByRole("link", { name: "Karte verkleinern und zur Startseite zurückkehren" })
        .click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Unterbacher");
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
});

test("registration retains the draft across both entry points", async ({ page }) => {
    await page.getByRole("banner").getByRole("button", { name: "Stand anmelden" }).click();
    const dialog = page.getByRole("dialog", { name: "Stand anmelden" });
    await expect(dialog).toBeVisible();
    await dialog
        .getByRole("combobox", { name: "Standadresse" })
        .fill("Gerresheimer Landstraße 117");
    await dialog.getByRole("textbox", { name: "Deine E-Mail-Adresse" }).fill("smoke@example.com");
    await dialog.getByRole("checkbox").check();
    await expect(dialog.getByRole("link", { name: "Datenschutzhinweisen." })).toHaveAttribute(
        "href",
        "/datenschutz"
    );
    await dialog.getByRole("button", { name: "Anmeldung schließen" }).click();
    await expect(dialog).not.toBeVisible();
    await page.getByRole("main").getByRole("button", { name: "Stand anmelden" }).click();
    await expect(dialog.getByRole("combobox", { name: "Standadresse" })).toHaveValue(
        "Gerresheimer Landstraße 117"
    );
    await expect(dialog.getByRole("textbox", { name: "Deine E-Mail-Adresse" })).toHaveValue(
        "smoke@example.com"
    );
    await expect(dialog.getByRole("checkbox")).toBeChecked();
    await expect(dialog.getByRole("button", { name: "E-Mail vorbereiten" })).toBeInViewport();
    await dialog.getByRole("button", { name: "Anmeldung schließen" }).click();
    await expect(dialog).not.toBeVisible();
});

test("browser routes support direct visits, reloads and history navigation", async ({ page }) => {
    for (const [path, title] of [
        ["kontakt", "Kontakt"],
        ["datenschutz", "Datenschutz"],
        ["impressum", "Impressum"]
    ]) {
        await page.goto(`/${path}/`);
        await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
        await page.reload();
        await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
    }
    await page.getByRole("banner").getByRole("link", { name: "Hoftrödel Unterbach" }).click();
    await expect(page).toHaveURL(/\/$/);
    await page.goBack();
    await expect(page.getByRole("heading", { level: 1, name: "Impressum" })).toBeVisible();
    await page.goForward();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Unterbacher");
    await page.goto("/karte/");
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
    await page.reload();
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
});
