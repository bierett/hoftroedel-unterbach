// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useRef } from "react";

export function MarkerPopover({
    address,
    onClose,
    sheet = false
}: {
    address: string;
    onClose: () => void;
    sheet?: boolean;
}) {
    const intl = useIntl();
    const closeButton = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        closeButton.current?.focus({ preventScroll: true });
    }, []);
    return (
        <Box
            position="relative"
            w={sheet ? "100%" : undefined}
            filter="drop-shadow(0 4px 12px rgba(0,0,0,0.2))"
            role="dialog"
            aria-label={intl.formatMessage({ id: "map.demoLocation" })}
            onKeyDown={(event) => {
                if (event.key === "Escape") {
                    event.stopPropagation();
                    onClose();
                }
            }}
        >
            <Box
                bg="hoftroedel.paper"
                color="hoftroedel.ink"
                w={sheet ? "100%" : "max-content"}
                minW={sheet ? "0" : "min(360px, calc(100vw - 48px))"}
                maxW={sheet ? "none" : "calc(100vw - 48px)"}
                overflow="hidden"
                borderRadius={sheet ? "0" : "lg"}
                border="none"
            >
                <Flex
                    bg="hoftroedel.accent"
                    color="hoftroedel.paper"
                    px="14px"
                    py="8px"
                    align="center"
                    justify="space-between"
                    gap="8px"
                >
                    <Text fontSize="12px" fontWeight="700" lineHeight="1.5" whiteSpace="nowrap">
                        {intl.formatMessage({ id: "map.demoTitle" })}
                    </Text>
                    <Button
                        ref={closeButton}
                        size="xs"
                        variant="ghost"
                        color="inherit"
                        flexShrink="0"
                        onClick={onClose}
                        aria-label={intl.formatMessage({ id: "map.closeAddress" })}
                        _hover={{ bg: "whiteAlpha.200" }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            aria-hidden="true"
                        >
                            <path d="m6 6 12 12M6 18 18 6" />
                        </svg>
                    </Button>
                </Flex>
                <Box p="16px">
                    <Text
                        fontSize="14px"
                        lineHeight="1.7"
                        whiteSpace="pre-line"
                        overflowWrap="anywhere"
                    >
                        {address}
                    </Text>
                    <Text mt="8px" fontSize="12px" color="hoftroedel.muted">
                        {intl.formatMessage({ id: "map.demoNotice" })}
                    </Text>
                </Box>
            </Box>
            {!sheet && (
                <Box
                    position="absolute"
                    bottom="-11px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="0"
                    h="0"
                    css={{
                        borderLeft: "12px solid transparent",
                        borderRight: "12px solid transparent",
                        borderTop: "12px solid {colors.hoftroedel.paper}"
                    }}
                />
            )}
        </Box>
    );
}
