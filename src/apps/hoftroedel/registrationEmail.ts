// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

// Basic obfuscation against simple address scrapers, not a security boundary.
// Keep the domain labels in reverse order; assemble only when preparing the email.
export function getRegistrationEmail(): string {
    const mailbox = ["an", "meldung"].join("");
    const domain = ["de", "hoftroedel-unterbach"].reverse().join(".");
    return [mailbox, domain].join("@");
}
