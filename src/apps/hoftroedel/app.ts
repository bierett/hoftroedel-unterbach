// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { createCustomElement } from "@open-pioneer/runtime";
import * as appMetadata from "open-pioneer:app";
import { AppUI } from "./AppUI";
import { config } from "./theme/config";

const element = createCustomElement({
    component: AppUI,
    chakraSystemConfig: config,
    appMetadata
});

customElements.define("hoftroedel-app", element);
