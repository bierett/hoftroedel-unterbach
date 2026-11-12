// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Flex, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";

export function FooterComponent() {
    const intl = useIntl();

    return (
        <Flex
            as="footer"
            minH="80px"
            pt={{ base: "20px", md: "24px" }}
            pb={{ base: "max(12px, env(safe-area-inset-bottom))", md: "24px" }}
            justify="space-between"
            align="center"
            textAlign={{ base: "center", md: "left" }}
            gap={{ base: "12px", md: "24px" }}
            direction={{ base: "column", md: "row" }}
            wrap="wrap"
            borderTop="1px solid"
            borderColor="hoftroedel.line"
            fontSize="12px"
            lineHeight="1.6"
            color="hoftroedel.muted"
        >
            <Flex direction="column" gap="4px">
                <Text color="hoftroedel.ink" fontWeight="700" fontSize="13px">
                    {intl.formatMessage({ id: "footer.name" })}
                </Text>
                <Text>{intl.formatMessage({ id: "footer.note" })}</Text>
            </Flex>
        </Flex>
    );
}
