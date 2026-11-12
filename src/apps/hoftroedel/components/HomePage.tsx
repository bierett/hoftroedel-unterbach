// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { EventDetails } from "./EventDetails";
import { HeroComponent } from "./HeroComponent";
import { ImageComponent } from "./ImageComponent";
import { MapSection } from "./MapSection";

export function HomePage() {
    const intl = useIntl();
    return (
        <>
            <Box
                as="section"
                flex="1"
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "1.06fr 1fr" }}
                alignItems="center"
                gap={{ base: "25px", md: "30px" }}
                pt={{ base: "52px", md: "75px" }}
                pb={{ base: "35px", md: "55px" }}
            >
                <HeroComponent />
                <Box
                    as="figure"
                    m="0"
                    pt="8px"
                    w="100%"
                    maxW={{ base: "460px", md: "none" }}
                    justifySelf={{ base: "center", md: "stretch" }}
                >
                    <ImageComponent />
                    <Text
                        as="figcaption"
                        mt="14px"
                        textAlign="center"
                        fontSize="12px"
                        letterSpacing="1.3px"
                        textTransform="uppercase"
                        color="hoftroedel.muted"
                    >
                        {intl.formatMessage({ id: "art.caption" })}
                    </Text>
                </Box>
            </Box>
            <EventDetails />
            <MapSection />
        </>
    );
}
