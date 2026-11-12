// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import {
    Box,
    Button,
    type ButtonProps,
    Flex,
    Heading,
    Text,
    useMediaQuery
} from "@chakra-ui/react";
import { Geolocation } from "@open-pioneer/geolocation";
import { DefaultMapProvider, MapAnchor, MapContainer, useMapModel } from "@open-pioneer/map";
import { InitialExtent, ZoomIn, ZoomOut } from "@open-pioneer/map-navigation";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router";
import { bindDemoMarkerInteractions, type SelectedDemoMarker } from "../createDemoMarkerLayer";
import { MAP_ID } from "../services";
import { MarkerPopover } from "./MarkerPopover";

const mapButtonProps = {
    bg: "hoftroedel.paper",
    color: "hoftroedel.ink",
    border: "1px solid",
    borderColor: "hoftroedel.line",
    _hover: {
        bg: "hoftroedel.ink",
        color: "hoftroedel.paper",
        borderColor: "hoftroedel.ink"
    },
    _active: {
        bg: "hoftroedel.accent",
        color: "hoftroedel.paper",
        borderColor: "hoftroedel.accent"
    },
    _focusVisible: {
        outline: "2px solid",
        outlineColor: "hoftroedel.accent",
        outlineOffset: "2px"
    }
} satisfies ButtonProps;

const locationTrackingOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 10000
};
const locationPositionStyle = new Style({
    image: new CircleStyle({
        radius: 7,
        fill: new Fill({ color: "#a34b31" }),
        stroke: new Stroke({ color: "#f5f2e9", width: 3 })
    })
});
const locationAccuracyStyle = new Style({
    fill: new Fill({ color: "rgba(163, 75, 49, 0.12)" }),
    stroke: new Stroke({ color: "#a34b31", width: 1 })
});

export function MapSection({ fullPage = false }: { fullPage?: boolean }) {
    const intl = useIntl();
    const mapState = useMapModel(MAP_ID);
    const map = mapState.map;
    const [desktopPopover] = useMediaQuery(["(min-width: 48rem)"], { ssr: false });
    const [selectedMarker, setSelectedMarker] = useState<SelectedDemoMarker | null>(null);
    useEffect(() => {
        if (map) return bindDemoMarkerInteractions(map.olMap, setSelectedMarker);
    }, [map]);
    useEffect(() => {
        const layer = map?.olMap.getAllLayers().find((candidate) => candidate.get("demoMarkers"));
        if (!layer) return;
        layer.set("selectedMarkerId", selectedMarker?.id);
        layer.changed();
        return () => {
            layer.set("selectedMarkerId", undefined);
            layer.changed();
        };
    }, [map, selectedMarker]);
    useEffect(() => {
        if (!map || !selectedMarker || !desktopPopover) return;
        const overlay = map.overlays.add({
            tag: "demo-marker-address",
            position: selectedMarker.coordinate,
            positioning: "bottom-center",
            offset: [0, -46],
            stopEvent: true,
            advanced: { autoPan: { margin: 16, animation: { duration: 250 } } },
            content: (
                <MarkerPopover
                    address={selectedMarker.address}
                    onClose={() => setSelectedMarker(null)}
                />
            )
        });
        return () => overlay.destroy();
    }, [map, selectedMarker, desktopPopover]);
    return (
        <Box
            as="section"
            w="100%"
            display={fullPage ? "flex" : "block"}
            flexDirection="column"
            minH="0"
            py={fullPage ? "0" : { base: "32px", md: "40px" }}
        >
            <Flex
                srOnly={fullPage}
                justify="space-between"
                align="baseline"
                gap="16px"
                wrap="wrap"
                mb="16px"
            >
                <Heading
                    as={fullPage ? "h1" : "h2"}
                    fontFamily="heading"
                    fontSize={{ base: "32px", md: fullPage ? "48px" : "36px" }}
                    lineHeight="1.15"
                >
                    {intl.formatMessage({ id: "map.title" })}
                </Heading>
            </Flex>
            <Text
                display={fullPage ? "none" : "block"}
                maxW="520px"
                lineHeight="1.8"
                color="hoftroedel.muted"
                mb="24px"
            >
                {intl.formatMessage({ id: "map.intro" })}
            </Text>
            <Box
                position="relative"
                overflow="hidden"
                bg="hoftroedel.paper"
                h={fullPage ? "100%" : { base: "320px", md: "420px" }}
                flex={fullPage ? "1" : undefined}
                minH={fullPage ? "0" : "280px"}
            >
                {mapState.kind === "resolved" ? (
                    <DefaultMapProvider map={mapState.map}>
                        <MapContainer
                            aria-label={intl.formatMessage({ id: "map.frameTitle" })}
                            rootProps={{
                                css: {
                                    "& .ol-overlaycontainer-stopevent": {
                                        zIndex: "2 !important"
                                    }
                                }
                            }}
                        >
                            <MapAnchor position="top-left" horizontalGap={12} verticalGap={12}>
                                <Flex direction="column" gap="4px">
                                    <ZoomIn buttonProps={mapButtonProps} />
                                    <ZoomOut buttonProps={mapButtonProps} />
                                    <InitialExtent buttonProps={mapButtonProps} />
                                    <Geolocation
                                        buttonProps={mapButtonProps}
                                        maxZoom={18}
                                        trackingOptions={locationTrackingOptions}
                                        positionFeatureStyle={locationPositionStyle}
                                        accuracyFeatureStyle={locationAccuracyStyle}
                                    />
                                </Flex>
                            </MapAnchor>
                            <MapAnchor position="top-right" horizontalGap={12} verticalGap={12}>
                                <Button asChild {...mapButtonProps} minH="44px" w="44px" p="0">
                                    <RouterLink
                                        to={fullPage ? "/" : "/karte"}
                                        aria-label={intl.formatMessage({
                                            id: fullPage ? "map.close" : "map.open"
                                        })}
                                        title={intl.formatMessage({
                                            id: fullPage ? "map.close" : "map.open"
                                        })}
                                    >
                                        <svg
                                            width="20"
                                            height="20"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                        >
                                            <path
                                                d={
                                                    fullPage
                                                        ? "M3 8h5V3m8 0v5h5M8 21v-5H3m18 0h-5v5"
                                                        : "M8 3H3v5m13-5h5v5M3 16v5h5m13-5v5h-5"
                                                }
                                            />
                                            <path d="m3 3 6 6m12-6-6 6M3 21l6-6m12 6-6-6" />
                                        </svg>
                                    </RouterLink>
                                </Button>
                            </MapAnchor>
                        </MapContainer>
                    </DefaultMapProvider>
                ) : (
                    <Flex h="100%" align="center" justify="center" p="24px" role="status">
                        {intl.formatMessage({
                            id: mapState.kind === "rejected" ? "map.error" : "map.loading"
                        })}
                    </Flex>
                )}
                {!desktopPopover && selectedMarker && (
                    <Box
                        position="absolute"
                        bottom="0"
                        left="0"
                        right="0"
                        zIndex="3"
                        maxH="100%"
                        overflowY="auto"
                        css={{
                            "@keyframes markerSheetIn": {
                                from: { transform: "translateY(100%)" },
                                to: { transform: "translateY(0)" }
                            },
                            animation: "markerSheetIn 200ms ease-out",
                            "@media (prefers-reduced-motion: reduce)": { animation: "none" }
                        }}
                    >
                        <MarkerPopover
                            sheet
                            address={selectedMarker.address}
                            onClose={() => setSelectedMarker(null)}
                        />
                    </Box>
                )}
            </Box>
        </Box>
    );
}
