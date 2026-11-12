// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { mergeConfigs } from "@chakra-ui/react";
import { config as defaultTrailsConfig } from "@open-pioneer/base-theme";

/**
 * Design-Tokens der Seite. Verwendung in Komponenten z. B. als
 * `bg="hoftroedel.paper"` oder `fontFamily="heading"`.
 */
export const config = mergeConfigs(defaultTrailsConfig, {
    theme: {
        tokens: {
            colors: {
                hoftroedel: {
                    paper: { value: "#f5f2e9" },
                    ink: { value: "#233e34" },
                    muted: { value: "#59675c" },
                    line: { value: "#cdd0c1" },
                    accent: { value: "#a34b31" }
                }
            },
            fonts: {
                body: { value: "Arial, Helvetica, sans-serif" },
                heading: { value: 'Georgia, "Times New Roman", serif' }
            }
        }
    }
});
