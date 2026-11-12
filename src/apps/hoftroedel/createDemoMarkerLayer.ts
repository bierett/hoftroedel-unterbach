// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { createEmpty, extend } from "ol/extent";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import VectorLayer from "ol/layer/Vector";
import type Map from "ol/Map";
import { unByKey } from "ol/Observable";
import { fromLonLat } from "ol/proj";
import Cluster from "ol/source/Cluster";
import VectorSource from "ol/source/Vector";
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from "ol/style";
import { demoAddresses } from "./data/demoAddresses";

function createMarkerIcon(color: string) {
    return new Icon({
        src:
            "data:image/svg+xml;charset=utf-8," +
            encodeURIComponent(
                '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">' +
                    '<path d="M16 40S2 24 2 16a14 14 0 0 1 28 0c0 8-14 24-14 24Z" fill="' +
                    color +
                    '" stroke="#f5f2e9" stroke-width="2"/>' +
                    '<circle cx="16" cy="16" r="5" fill="#f5f2e9"/></svg>'
            ),
        anchor: [0.5, 1]
    });
}

const markerIcon = createMarkerIcon("#a34b31");

export function createDemoMarkerLayer() {
    const features = demoAddresses.map((location) => {
        const address =
            location.street +
            " " +
            location.houseNumber +
            "\n" +
            location.postcode +
            " " +
            location.city;

        const feature = new Feature({
            geometry: new Point(fromLonLat(location.coordinates)),
            name: location.street + " " + location.houseNumber,
            address,
            demo: true
        });

        feature.setId(location.id);

        return feature;
    });

    const singleStyle = new Style({ image: markerIcon });
    const selectedStyle = new Style({ image: createMarkerIcon("#233e34"), zIndex: 101 });
    const clusterStyles = new globalThis.Map<number, Style>();
    const layer = new VectorLayer({
        source: new Cluster({
            distance: 75,
            source: new VectorSource({
                features,
                wrapX: false,
                attributions:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors (Demo-Adressen)'
            })
        }),
        style: (feature): Style => {
            const members = getMembers(feature.get("features"));
            const count = members.length;
            if (count === 1 && members[0]?.getId() === layer.get("selectedMarkerId")) {
                return selectedStyle;
            }
            if (count <= 1) return singleStyle;
            let style = clusterStyles.get(count);
            if (!style) {
                style = new Style({
                    image: new CircleStyle({
                        radius: 19,
                        fill: new Fill({ color: "#a34b31" }),
                        stroke: new Stroke({ color: "#f5f2e9", width: 3 })
                    }),
                    text: new Text({
                        text: String(count),
                        font: "700 14px Arial, Helvetica, sans-serif",
                        fill: new Fill({ color: "#f5f2e9" })
                    })
                });
                clusterStyles.set(count, style);
            }
            return style;
        }
    });

    layer.set("demoMarkers", true);

    return layer;
}

function getMembers(value: unknown): Feature<Point>[] {
    if (!Array.isArray(value)) return [];

    return value.filter(
        (feature): feature is Feature<Point> =>
            feature instanceof Feature && feature.getGeometry() instanceof Point
    );
}

export interface SelectedDemoMarker {
    id: string;
    address: string;
    coordinate: number[];
}

export function bindDemoMarkerInteractions(
    map: Map,
    onSelect: (marker: SelectedDemoMarker | null) => void
) {
    const layer = map.getAllLayers().find((candidate) => candidate.get("demoMarkers"));

    if (!layer) return;

    let active = true;

    const click = map.on("singleclick", (event) => {
        const feature = map.forEachFeatureAtPixel(event.pixel, (hit) => hit, {
            layerFilter: (candidate) => candidate === layer,
            hitTolerance: 8
        });
        if (!feature) {
            onSelect(null);
            return;
        }

        const members = getMembers(feature.get("features"));

        if (!members.length) return;

        if (members.length === 1) {
            const address: unknown = members[0]?.get("address");
            const geometry = members[0]?.getGeometry();

            onSelect(null);

            if (typeof address !== "string" || !geometry) return;

            const coordinate = geometry.getCoordinates();
            const view = map.getView();

            view.cancelAnimations();
            view.animate({ center: coordinate, duration: 350 }, (completed) => {
                if (completed && active)
                    onSelect({ id: String(members[0]?.getId()), address, coordinate });
            });

            return;
        }

        onSelect(null);

        const extent = createEmpty();

        members.forEach((member) => {
            const geometry = member.getGeometry();
            if (geometry) extend(extent, geometry.getExtent());
        });

        map.getView().fit(extent, {
            padding: [55, 55, 55, 55],
            duration: 450,
            maxZoom: 19
        });
    });

    const pointer = map.on("pointermove", (event) => {
        if (event.dragging) return;

        const target = map.getTargetElement();

        if (!target) return;
        target.style.cursor = map.hasFeatureAtPixel(event.pixel, {
            layerFilter: (candidate) => candidate === layer,
            hitTolerance: 8
        })
            ? "pointer"
            : "";
    });

    return () => {
        active = false;
        unByKey([click, pointer]);
        const target = map.getTargetElement();

        if (target) target.style.cursor = "";
    };
}
