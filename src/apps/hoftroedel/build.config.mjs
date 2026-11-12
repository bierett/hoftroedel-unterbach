// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { defineBuildConfig } from "@open-pioneer/build-support";

export default defineBuildConfig({
    i18n: ["de"],
    services: {
        UnterbachMapProvider: { provides: ["map.MapConfigProvider"] }
    },
    ui: { references: ["map.MapRegistry"] }
});
