// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { defineConfig, devices } from "playwright/test";

export default defineConfig({
    testDir: "./e2e",
    forbidOnly: !!process.env.CI,
    workers: 1,
    retries: process.env.CI ? 1 : 0,
    reporter: [["list"], ["html", { open: "never" }]],
    use: {
        baseURL: "http://127.0.0.1:4173",
        trace: "retain-on-failure",
        screenshot: "only-on-failure"
    },
    projects: [
        { name: "desktop", use: { ...devices["Desktop Chrome"] } },
        { name: "mobile", use: { ...devices["Pixel 7"] } }
    ],
    webServer: {
        command: "pnpm preview --host 127.0.0.1 --port 4173 --strictPort",
        url: "http://127.0.0.1:4173",
        reuseExistingServer: false,
        timeout: 30_000
    }
});
