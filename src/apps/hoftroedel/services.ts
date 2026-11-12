// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { type MapConfig, type MapConfigProvider, SimpleLayer } from "@open-pioneer/map";
import { apply } from "ol-mapbox-style";
import LayerGroup from "ol/layer/Group";
import Layer from "ol/layer/Layer";
import { fromLonLat, transformExtent } from "ol/proj";
import type Source from "ol/source/Source";
import { createBoundaryLayer } from "./createBoundaryLayer";
import { createDemoMarkerLayer } from "./createDemoMarkerLayer";

export const MAP_ID = "unterbach";

export class UnterbachMapProvider implements MapConfigProvider {
    mapId = MAP_ID;

    async getMapConfig(): Promise<MapConfig> {
        const basemap = new LayerGroup();

        await apply(
            basemap,
            "https://sgx.geodatenzentrum.de/gdz_basemapde_vektor/styles/bm_web_gry.json"
        );

        const attribution =
            '&copy; GeoBasis-DE / <a href="https://www.bkg.bund.de">BKG</a> ' +
            `(${new Date().getFullYear()}) ` +
            '<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>';

        for (const layer of basemap.getLayers().getArray()) {
            if (!(layer instanceof Layer)) continue;
            const source = layer.getSource() as Source | null;

            if (!source) continue;
            const originalAttributions = source.getAttributions();

            source.setAttributions((frameState) => {
                const original = originalAttributions?.(frameState);
                const entries = Array.isArray(original) ? original : original ? [original] : [];
                // TileJSON only supplies "GeoBasis-DE", without the required links and year.

                return [...entries.filter((entry) => !entry.includes("GeoBasis-DE")), attribution];
            });
        }

        const [x = 0, y = 0] = fromLonLat([6.895, 51.205]);

        return {
            projection: "EPSG:3857",
            initialView: {
                kind: "position",
                center: { x, y },
                zoom: 15
            },
            advanced: {
                view: {
                    // Rectangular bounds around Unterbach with room for an overview.
                    extent: transformExtent([6.86, 51.185, 6.93, 51.23], "EPSG:4326", "EPSG:3857"),
                    minZoom: 10,
                    maxZoom: 19,
                    constrainResolution: false,
                    smoothExtentConstraint: false,
                    smoothResolutionConstraint: false
                }
            },
            topmostLayers: [
                new SimpleLayer({
                    id: "unterbach-boundary",
                    title: "Unterbach",
                    olLayer: createBoundaryLayer()
                }),
                new SimpleLayer({
                    id: "demo-markers",
                    title: "Demo-Standorte",
                    olLayer: createDemoMarkerLayer()
                })
            ],
            baseLayers: [
                new SimpleLayer({
                    id: "basemap-de-vector",
                    title: "basemap.de Web Vektor Grau",
                    olLayer: basemap
                })
            ]
        };
    }
}
