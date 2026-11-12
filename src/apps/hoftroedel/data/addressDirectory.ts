// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import addressData from "./unterbachAddresses.json?raw";

export const unterbachStreets = JSON.parse(addressData) as Record<string, string[]>;
export const unterbachAddresses = Object.entries(unterbachStreets)
    .flatMap(([street, numbers]) => numbers.map((number) => street + " " + number))
    .sort((a, b) => a.localeCompare(b, "de", { numeric: true }));

export function normalizeAddress(value: string) {
    return value
        .toLocaleLowerCase("de")
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "")
        .replace(/\u00df/g, "ss")
        .replace(/ae/g, "a")
        .replace(/oe/g, "o")
        .replace(/ue/g, "u");
}
const searchableAddresses = unterbachAddresses.map((address) => ({
    address,
    search: normalizeAddress(address)
}));

export function findAddresses(query: string, limit = 30) {
    const terms = normalizeAddress(query).trim().split(/\s+/).filter(Boolean);
    if (!terms.length) return [];
    return searchableAddresses
        .filter(({ search }) => terms.every((term) => search.includes(term)))
        .slice(0, limit)
        .map(({ address }) => address);
}
