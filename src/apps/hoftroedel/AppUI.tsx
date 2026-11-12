// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Flex } from "@chakra-ui/react";
import { Notifier } from "@open-pioneer/notifier";
import { HashRouter, Navigate, Route, Routes, useLocation } from "react-router";
import { ContactPage } from "./components/ContactPage";
import { FooterComponent } from "./components/FooterComponent";
import { HeaderComponent } from "./components/HeaderComponent";
import { HomePage } from "./components/HomePage";
import { LegalPage } from "./components/LegalPage";
import { MapSection } from "./components/MapSection";
import { RegistrationDraftProvider } from "./components/RegistrationDraft";

export function AppUI() {
    return (
        <HashRouter>
            <Notifier />
            <RegistrationDraftProvider>
                <AppLayout />
            </RegistrationDraftProvider>
        </HashRouter>
    );
}

function AppLayout() {
    const isMapPage = useLocation().pathname === "/karte";

    return (
        <Box minH="100svh" w="100%" bg="hoftroedel.paper" color="hoftroedel.ink" fontFamily="body">
            <Flex
                direction="column"
                maxW={isMapPage ? "none" : "1440px"}
                h={isMapPage ? "100dvh" : undefined}
                minH="100svh"
                mx="auto"
                px={isMapPage ? "0" : { base: "24px", sm: "32px", md: "6%" }}
            >
                <Box
                    px={isMapPage ? { base: "24px", sm: "32px", md: "6%" } : "0"}
                    borderBottom={isMapPage ? "1px solid" : undefined}
                    borderColor="hoftroedel.line"
                >
                    <HeaderComponent showDivider={!isMapPage} />
                </Box>

                <Box as="main" flex="1" minH="0" display={isMapPage ? "flex" : "block"}>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/karte" element={<MapSection fullPage />} />
                        <Route path="/kontakt" element={<ContactPage />} />
                        <Route path="/impressum" element={<LegalPage page="imprint" />} />
                        <Route path="/datenschutz" element={<LegalPage page="privacy" />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </Box>

                {!isMapPage && <FooterComponent />}
            </Flex>
        </Box>
    );
}
