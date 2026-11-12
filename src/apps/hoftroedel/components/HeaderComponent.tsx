// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, chakra, Flex, Grid, Link } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { Link as RouterLink, NavLink } from "react-router";
import { RegistrationDialog } from "./RegistrationDialog";

export function HeaderComponent({ showDivider = true }: { showDivider?: boolean }) {
    const intl = useIntl();

    return (
        <Grid
            as="header"
            alignItems="center"
            gridTemplateColumns={{ base: "minmax(0, 1fr) auto", md: "auto minmax(0, 1fr) auto" }}
            columnGap={{ base: "12px", md: "28px" }}
            rowGap="8px"
            py={{ base: "16px", md: "20px" }}
            borderBottom={showDivider ? "1px solid" : "none"}
            borderColor="hoftroedel.line"
        >
            <chakra.a
                asChild
                display="flex"
                alignItems="center"
                color="inherit"
                textDecoration="none"
                gap={{ base: "8px", md: "12px" }}
                fontSize={{ base: "12px", sm: "14px", md: "15px" }}
                minW="0"
                lineHeight="1.3"
                fontWeight="700"
                letterSpacing="-0.3px"
            >
                <RouterLink to="/">
                    <svg
                        width="33"
                        height="33"
                        viewBox="0 0 40 40"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        aria-hidden="true"
                    >
                        <path d="M4 19 20 5l16 14M9 16v19h22V16M17 35V23h7v12M4 35h32" />
                        <path d="M25 5v7M28 5v9" />
                    </svg>
                    <span>{intl.formatMessage({ id: "brand" })}</span>
                </RouterLink>
            </chakra.a>
            <Flex
                as="nav"
                gridColumn={{ base: "1 / -1", md: "2" }}
                gridRow={{ base: "2", md: "1" }}
                justify={{ base: "center", md: "flex-end" }}
                align="center"
                aria-label={intl.formatMessage({ id: "header.navigation" })}
                gap={{ base: "20px", md: "28px" }}
                wrap="wrap"
                fontSize="13px"
                w={{ base: "100%", md: "auto" }}
            >
                <Link
                    asChild
                    minH={{ base: "44px", md: "auto" }}
                    color="hoftroedel.muted"
                    textDecoration="none"
                    transition="color 160ms ease"
                    textUnderlineOffset="6px"
                    css={{
                        "&[aria-current=page]": {
                            color: "hoftroedel.accent",
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            "&:hover": { textDecoration: "underline" }
                        }
                    }}
                    _hover={{ color: "hoftroedel.accent", textDecoration: "none" }}
                    _focusVisible={{
                        outline: "2px solid",
                        outlineColor: "hoftroedel.ink",
                        outlineOffset: "4px",
                        borderRadius: "2px"
                    }}
                >
                    <NavLink to="/karte" end>
                        {intl.formatMessage({ id: "map.title" })}
                    </NavLink>
                </Link>
                <Link
                    asChild
                    minH={{ base: "44px", md: "auto" }}
                    color="hoftroedel.muted"
                    textDecoration="none"
                    transition="color 160ms ease"
                    textUnderlineOffset="6px"
                    css={{
                        "&[aria-current=page]": {
                            color: "hoftroedel.accent",
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            "&:hover": { textDecoration: "underline" }
                        }
                    }}
                    _hover={{ color: "hoftroedel.accent", textDecoration: "none" }}
                    _focusVisible={{
                        outline: "2px solid",
                        outlineColor: "hoftroedel.ink",
                        outlineOffset: "4px",
                        borderRadius: "2px"
                    }}
                >
                    <NavLink to="/kontakt" end>
                        {intl.formatMessage({ id: "contact.title" })}
                    </NavLink>
                </Link>
                <Link
                    asChild
                    minH={{ base: "44px", md: "auto" }}
                    color="hoftroedel.muted"
                    textDecoration="none"
                    transition="color 160ms ease"
                    textUnderlineOffset="6px"
                    css={{
                        "&[aria-current=page]": {
                            color: "hoftroedel.accent",
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            "&:hover": { textDecoration: "underline" }
                        }
                    }}
                    _hover={{ color: "hoftroedel.accent", textDecoration: "none" }}
                    _focusVisible={{
                        outline: "2px solid",
                        outlineColor: "hoftroedel.ink",
                        outlineOffset: "4px",
                        borderRadius: "2px"
                    }}
                >
                    <NavLink to="/datenschutz" end>
                        {intl.formatMessage({ id: "legal.privacy.title" })}
                    </NavLink>
                </Link>
                <Link
                    asChild
                    minH={{ base: "44px", md: "auto" }}
                    color="hoftroedel.muted"
                    textDecoration="none"
                    transition="color 160ms ease"
                    textUnderlineOffset="6px"
                    css={{
                        "&[aria-current=page]": {
                            color: "hoftroedel.accent",
                            textDecoration: "underline",
                            textDecorationThickness: "2px",
                            "&:hover": { textDecoration: "underline" }
                        }
                    }}
                    _hover={{ color: "hoftroedel.accent", textDecoration: "none" }}
                    _focusVisible={{
                        outline: "2px solid",
                        outlineColor: "hoftroedel.ink",
                        outlineOffset: "4px",
                        borderRadius: "2px"
                    }}
                >
                    <NavLink to="/impressum" end>
                        {intl.formatMessage({ id: "legal.imprint.title" })}
                    </NavLink>
                </Link>
            </Flex>
            <Box gridColumn={{ base: "2", md: "3" }} gridRow="1">
                <RegistrationDialog />
            </Box>
        </Grid>
    );
}
