// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { expect, test } from "playwright/test";

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
        await expect(page).toHaveURL(new RegExp(`#/${path}$`));
        await expect(page.getByRole("heading", { level: 1, name: title })).toBeVisible();
        await expect(link).toHaveAttribute("aria-current", "page");
    }
    await page.getByRole("banner").getByRole("link", { name: "Hoftrödel Unterbach" }).click();
    await expect(page.getByRole("heading", { level: 1 })).toContainText("Unterbacher");
});

test("map renders and can be expanded and collapsed", async ({ page }) => {
    await expect(page.locator(".ol-viewport canvas").first()).toBeVisible();
    await page.getByRole("link", { name: "Zur großen Karte", exact: true }).click();
    await expect(page).toHaveURL(/#\/karte$/);
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
        "#/datenschutz"
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
