// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Heading, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";

export function LegalPage({ page }: { page: "imprint" | "privacy" }) {
    const intl = useIntl();
    return (
        <Box maxW="520px" py={{ base: "32px", md: "75px" }} fontSize={{ base: "15px", md: "16px" }}>
            <Heading
                as="h1"
                fontFamily="heading"
                fontSize={{ base: "32px", md: "48px" }}
                lineHeight="1.15"
                mb={{ base: "20px", md: "24px" }}
            >
                {intl.formatMessage({ id: "legal." + page + ".title" })}
            </Heading>
            <Text lineHeight="1.8" color="hoftroedel.muted">
                {intl.formatMessage({ id: "legal." + page + ".placeholder" })}
            </Text>
        </Box>
    );
}
