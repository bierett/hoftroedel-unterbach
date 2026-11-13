// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import notoItalic from "@fontsource-variable/noto-sans/files/noto-sans-latin-standard-italic.woff2?url";
import notoNormal from "@fontsource-variable/noto-sans/files/noto-sans-latin-standard-normal.woff2?url";
import robotoItalic from "@fontsource-variable/roboto/files/roboto-latin-wght-italic.woff2?url";
import robotoNormal from "@fontsource-variable/roboto/files/roboto-latin-wght-normal.woff2?url";

let fontsReady: Promise<void> | undefined;

/** Canvas labels use document fonts, rather than styles scoped to the app's shadow root. */
export function loadMapFonts(): Promise<void> {
    fontsReady ??= loadFonts();
    return fontsReady;
}

async function loadFonts(): Promise<void> {
    const variable: FontFaceDescriptors = { weight: "100 900", display: "swap" };
    const faces = [
        new FontFace("Roboto", `url("${robotoNormal}")`, variable),
        new FontFace("Roboto", `url("${robotoItalic}")`, { ...variable, style: "italic" }),
        new FontFace("Noto Sans", `url("${notoNormal}")`, variable),
        new FontFace("Noto Sans", `url("${notoItalic}")`, { ...variable, style: "italic" }),
        new FontFace("Noto Sans ExtraCondensed", `url("${notoNormal}")`, {
            ...variable,
            variationSettings: '"wdth" 62.5'
        })
    ];
    await Promise.all(
        faces.map(async (face) => {
            await face.load();
            document.fonts.add(face);
        })
    );
}
