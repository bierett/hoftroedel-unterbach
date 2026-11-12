// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Heading, Stack, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { RegistrationDialog } from "./RegistrationDialog";

export function EventDetails() {
    const intl = useIntl();
    return (
        <Stack
            gap={{ base: "32px", md: "40px" }}
            maxW="760px"
            py={{ base: "24px", md: "40px" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.8"
            color="hoftroedel.muted"
        >
            <Box as="section" aria-labelledby="participation-title">
                <Heading
                    as="h2"
                    id="participation-title"
                    fontFamily="heading"
                    color="hoftroedel.ink"
                    fontSize={{ base: "28px", md: "32px" }}
                    lineHeight="1.2"
                    mb="16px"
                >
                    {intl.formatMessage({ id: "event.participationTitle" })}
                </Heading>
                <Text mb="16px">{intl.formatMessage({ id: "event.participation" })}</Text>
                <RegistrationDialog />
            </Box>
            <Box as="section" aria-labelledby="event-map-title">
                <Heading
                    as="h2"
                    id="event-map-title"
                    fontFamily="heading"
                    color="hoftroedel.ink"
                    fontSize={{ base: "28px", md: "32px" }}
                    lineHeight="1.2"
                    mb="16px"
                >
                    {intl.formatMessage({ id: "event.mapTitle" })}
                </Heading>
                <Text>{intl.formatMessage({ id: "event.mapDescription" })}</Text>
            </Box>
            <Box
                as="section"
                aria-labelledby="deadline-title"
                borderLeft="2px solid"
                borderColor="hoftroedel.accent"
                pl="20px"
            >
                <Heading
                    as="h2"
                    id="deadline-title"
                    fontFamily="heading"
                    color="hoftroedel.ink"
                    fontSize={{ base: "28px", md: "32px" }}
                    lineHeight="1.2"
                    mb="16px"
                >
                    {intl.formatMessage({ id: "event.deadlineTitle" })}
                </Heading>
                <Text>{intl.formatMessage({ id: "event.deadline" })}</Text>
            </Box>
        </Stack>
    );
}
