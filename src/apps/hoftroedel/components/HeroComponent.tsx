// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Heading, Text, chakra } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";

export function HeroComponent() {
    const intl = useIntl();

    return (
        <section aria-labelledby="hoftroedel-title">
            <Text
                as="span"
                display="inline-flex"
                alignItems="center"
                gap="9px"
                m="0"
                mb={{ base: "23px", md: "28px" }}
                fontSize="12px"
                fontWeight="700"
                letterSpacing="2px"
                textTransform="uppercase"
            >
                <Box w="7px" h="7px" borderRadius="full" bg="hoftroedel.accent" />
                {intl.formatMessage({ id: "eyebrow" })}
            </Text>
            <Heading
                as="h1"
                id="hoftroedel-title"
                m="0"
                mb="30px"
                fontFamily="heading"
                fontSize={{
                    base: "clamp(54px, 12vw, 82px)",
                    md: "clamp(60px, 6.7vw, 98px)"
                }}
                fontWeight="400"
                lineHeight="1.01"
                letterSpacing={{ base: "-2.5px", md: "-4px" }}
            >
                {intl.formatMessage({ id: "title.line1" })}
                <br />

                {intl.formatMessage({ id: "title.line2" })}
                <br />
                <chakra.em color="hoftroedel.accent" fontStyle="italic" fontWeight="400">
                    {intl.formatMessage({ id: "title.line3" })}
                </chakra.em>
            </Heading>
            <Text
                m="0"
                maxW="420px"
                fontSize={{ base: "16px", md: "17px" }}
                lineHeight="1.8"
                color="hoftroedel.muted"
            >
                {intl.formatMessage({ id: "intro" })}
            </Text>
        </section>
    );
}
