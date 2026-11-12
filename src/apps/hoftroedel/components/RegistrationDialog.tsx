// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Button, Dialog, Link, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { Link as RouterLink } from "react-router";
import { RegistrationForm } from "./RegistrationForm";

export function RegistrationDialog() {
    const intl = useIntl();
    return (
        <Dialog.Root placement="center" scrollBehavior="inside" lazyMount unmountOnExit>
            <Dialog.Trigger asChild>
                <Button
                    size="md"
                    minH="44px"
                    bg="hoftroedel.accent"
                    color="hoftroedel.paper"
                    px="16px"
                    fontSize="14px"
                    fontWeight="400"
                    fontFamily="body"
                    _hover={{ bg: "hoftroedel.ink" }}
                >
                    {intl.formatMessage({ id: "registration.open" })}
                </Button>
            </Dialog.Trigger>
            <Dialog.Backdrop />
            <Dialog.Positioner padding="16px">
                <Dialog.Content
                    bg="hoftroedel.paper"
                    color="hoftroedel.ink"
                    maxW="520px"
                    w="100%"
                    borderRadius="8px"
                >
                    <Dialog.Header pr="56px">
                        <Dialog.Title fontFamily="heading" fontSize="28px" lineHeight="1.2">
                            {intl.formatMessage({ id: "registration.open" })}
                        </Dialog.Title>
                    </Dialog.Header>
                    <Dialog.Body pb="24px">
                        <Dialog.Description
                            mb="20px"
                            color="hoftroedel.muted"
                            fontSize="14px"
                            lineHeight="1.7"
                        >
                            {intl.formatMessage({ id: "registration.description" })}
                        </Dialog.Description>
                        <RegistrationForm />
                        <Text mt="20px" fontSize="13px" lineHeight="1.6" color="hoftroedel.muted">
                            {intl.formatMessage({ id: "registration.privacyNote" })}{" "}
                            <Link asChild color="hoftroedel.accent" textDecoration="underline">
                                <RouterLink
                                    to="/datenschutz"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {intl.formatMessage({ id: "registration.privacyLink" })}
                                </RouterLink>
                            </Link>
                        </Text>
                    </Dialog.Body>
                    <Dialog.CloseTrigger asChild>
                        <Button
                            position="absolute"
                            top="12px"
                            right="12px"
                            variant="ghost"
                            size="sm"
                            p="0"
                            minW="40px"
                            minH="40px"
                            color="hoftroedel.ink"
                            aria-label={intl.formatMessage({ id: "registration.close" })}
                        >
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                aria-hidden="true"
                            >
                                <path d="m6 6 12 12M6 18 18 6" />
                            </svg>
                        </Button>
                    </Dialog.CloseTrigger>
                </Dialog.Content>
            </Dialog.Positioner>
        </Dialog.Root>
    );
}
