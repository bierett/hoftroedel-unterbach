// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { useEffect, useState } from "react";

const formats = ["pdf", "png"] as const;
const flyerUrls = {
    pdf: `${import.meta.env.BASE_URL}downloads/${encodeURIComponent("hoftrödel-unterbach-flyer.pdf")}`,
    png: `${import.meta.env.BASE_URL}downloads/${encodeURIComponent("hoftrödel-unterbach-flyer.png")}`,
    webp: `${import.meta.env.BASE_URL}downloads/${encodeURIComponent("hoftrödel-unterbach-flyer.webp")}`
};

export function FlyerSection() {
    const intl = useIntl();
    const message = (id: string) => intl.formatMessage({ id: `flyer.${id}` });
    const [available, setAvailable] = useState({ pdf: false, png: false, webp: false });
    useEffect(() => {
        const controller = new AbortController();
        for (const format of [...formats, "webp"] as const) {
            // A missing public file can return the SPA's HTML with status 200.
            // Check the MIME type as well so it never becomes a broken download.
            fetch(flyerUrls[format], { method: "HEAD", signal: controller.signal })
                .then((response) => {
                    const mime = response.headers.get("content-type")?.split(";")[0]?.trim();
                    const exists =
                        response.ok &&
                        mime === (format === "pdf" ? "application/pdf" : `image/${format}`);
                    if (!controller.signal.aborted) {
                        setAvailable((previous) => ({ ...previous, [format]: exists }));
                    }
                })
                .catch(() => {
                    /* Missing files and aborted requests leave the button disabled. */
                });
        }
        return () => controller.abort();
    }, []);
    const previewFormat = available.webp ? "webp" : "png";
    const png = available[previewFormat] ? flyerUrls[previewFormat] : undefined;

    return (
        <Box
            as="section"
            aria-labelledby="flyer-title"
            maxW="760px"
            py={{ base: "24px", md: "40px" }}
            fontSize={{ base: "15px", md: "16px" }}
            lineHeight="1.8"
        >
            <Heading
                as="h2"
                id="flyer-title"
                fontFamily="heading"
                fontSize={{ base: "28px", md: "32px" }}
                lineHeight="1.2"
                mb="16px"
            >
                {message("title")}
            </Heading>
            <Text color="hoftroedel.muted" mb="24px">
                {message("intro")}
            </Text>
            <Box
                display="grid"
                gridTemplateColumns={{ base: "1fr", md: "240px 1fr" }}
                gap={{ base: "24px", md: "32px" }}
                alignItems="center"
            >
                <Box
                    as="figure"
                    m="0"
                    w="100%"
                    maxW="240px"
                    justifySelf={{ base: "start", md: "stretch" }}
                >
                    <Box bg="white" border="1px solid" borderColor="hoftroedel.line">
                        {png ? (
                            <Box asChild w="100%" h="auto" display="block">
                                <img
                                    src={png}
                                    alt={message("previewAlt")}
                                    loading="lazy"
                                    onError={() =>
                                        setAvailable((previous) => ({
                                            ...previous,
                                            [previewFormat]: false
                                        }))
                                    }
                                />
                            </Box>
                        ) : (
                            <Box
                                aspectRatio="210 / 297"
                                p="10%"
                                display="flex"
                                flexDirection="column"
                                alignItems="center"
                                justifyContent="center"
                                textAlign="center"
                                gap="12px"
                            >
                                <Box aria-hidden="true" display="flex" gap="8px" mb="8px">
                                    {["#a34b31", "#e6bd75", "#899c83", "#233e34", "#c2cbb9"].map(
                                        (color) => (
                                            <Box
                                                key={color}
                                                w="18px"
                                                h="24px"
                                                bg={color}
                                                clipPath="polygon(0 0, 100% 0, 50% 100%)"
                                            />
                                        )
                                    )}
                                </Box>
                                <Text fontSize="9px" letterSpacing="1px" textTransform="uppercase">
                                    {message("previewLocation")}
                                </Text>
                                <Text fontFamily="heading" fontSize="28px" lineHeight="1.1">
                                    {message("previewTitle")}
                                </Text>
                                <Box w="40px" h="2px" bg="hoftroedel.accent" />
                                <Text fontSize="12px" fontWeight="700">
                                    {intl.formatMessage({ id: "eyebrow" })}
                                </Text>
                                <Text fontSize="11px" color="hoftroedel.muted" lineHeight="1.7">
                                    {message("previewTagline")}
                                </Text>
                            </Box>
                        )}
                    </Box>
                    {!png && (
                        <Text
                            as="figcaption"
                            mt="10px"
                            fontSize="12px"
                            textAlign="center"
                            color="hoftroedel.muted"
                        >
                            {message("placeholder")}
                        </Text>
                    )}
                </Box>
                <Stack gap="16px" minW="0">
                    <Heading as="h3" fontFamily="heading" fontSize="22px">
                        {message("subtitle")}
                    </Heading>
                    <Text color="hoftroedel.muted" lineHeight="1.8">
                        {message("description")}
                    </Text>
                    <Stack
                        gap="12px"
                        direction={{ base: "column", sm: "row" }}
                        align="start"
                        flexWrap="wrap"
                    >
                        {formats.map((format) => {
                            const url = available[format] ? flyerUrls[format] : undefined;
                            const primary = format === "pdf";
                            const label = message(`${format}Download`);
                            return (
                                <Button
                                    key={format}
                                    asChild={!!url}
                                    disabled={!url}
                                    minH="44px"
                                    px="16px"
                                    fontSize="14px"
                                    fontWeight="400"
                                    fontFamily="body"
                                    bg={primary ? "hoftroedel.accent" : "transparent"}
                                    color={primary ? "hoftroedel.paper" : "hoftroedel.ink"}
                                    border="1px solid"
                                    borderColor={primary ? "hoftroedel.accent" : "hoftroedel.line"}
                                    _hover={{ bg: "hoftroedel.ink", color: "hoftroedel.paper" }}
                                    _disabled={{ opacity: 0.55, cursor: "not-allowed" }}
                                >
                                    {url ? (
                                        <a href={url} download={`hoftroedel-unterbach.${format}`}>
                                            {label}
                                        </a>
                                    ) : (
                                        label
                                    )}
                                </Button>
                            );
                        })}
                    </Stack>
                    <Text fontSize="12px" color="hoftroedel.muted">
                        {message("note")}
                    </Text>
                    {(!available.pdf || !available.png) && (
                        <Text fontSize="13px" color="hoftroedel.muted" role="status">
                            {message("pending")}
                        </Text>
                    )}
                </Stack>
            </Box>
        </Box>
    );
}
