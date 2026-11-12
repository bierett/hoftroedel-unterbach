// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import Feature from "ol/Feature";
import GeoJSON from "ol/format/GeoJSON";
import MultiPolygon from "ol/geom/MultiPolygon";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Fill, Stroke, Style } from "ol/style";
import boundaryData from "./data/unterbach.json?raw";

export function createBoundaryLayer() {
    const boundary = new GeoJSON()
        .readFeatures(boundaryData, {
            dataProjection: "EPSG:4326",
            featureProjection: "EPSG:3857"
        })[0]
        ?.getGeometry();

    if (!(boundary instanceof MultiPolygon)) {
        throw new Error("Expected a MultiPolygon for the Unterbach boundary");
    }

    const polygons = boundary.getCoordinates();
    const world = 20037508.342789244;
    const outerRing = [
        [-world, -world],
        [world, -world],
        [world, world],
        [-world, world],
        [-world, -world]
    ];

    const mask = new Feature(
        new MultiPolygon([
            [outerRing, ...polygons.map((polygon) => polygon[0] ?? [])],
            ...polygons.flatMap((polygon) => polygon.slice(1).map((ring) => [ring]))
        ])
    );

    mask.setStyle(new Style({ fill: new Fill({ color: "rgba(245, 242, 233, 0.45)" }) }));

    const outline = new Feature(boundary);
    outline.setStyle(new Style({ stroke: new Stroke({ color: "#cdd0c1", width: 1 }) }));

    return new VectorLayer({
        source: new VectorSource({ features: [mask, outline], wrapX: false })
    });
}
