// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Box, Button, chakra, Field, Input, Stack, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { type FormEvent, useId, useState } from "react";
import { getRegistrationEmail } from "../registrationEmail";
import { AddressAutocomplete } from "./AddressAutocomplete";
import { useRegistrationDraft } from "./RegistrationDraft";

export function RegistrationForm() {
    const intl = useIntl();
    const { draft, setDraft } = useRegistrationDraft();
    const noteId = useId();
    const [prepared, setPrepared] = useState(false);
    const message = (id: string) => intl.formatMessage({ id: "registration." + id });
    const prepareEmail = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const address = String(data.get("address") ?? "").trim();
        const email = String(data.get("email") ?? "").trim();
        if (!address || !email) return;
        const body = [
            message("mailIntro"),
            "",
            message("address") + ": " + address,
            message("email") + ": " + email,
            message("publication") +
                ": " +
                (data.has("mapOnly") ? message("mapOnlyValue") : message("listValue"))
        ].join("\n");
        const recipient = getRegistrationEmail();
        window.location.href =
            "mailto:" +
            recipient +
            "?subject=" +
            encodeURIComponent(message("subject")) +
            "&body=" +
            encodeURIComponent(body);
        setPrepared(true);
    };
    return (
        <Box asChild>
            <form onSubmit={prepareEmail} aria-describedby={noteId}>
                <Stack gap="20px">
                    <AddressAutocomplete
                        value={draft.address}
                        onChange={(address) => setDraft({ ...draft, address })}
                    />
                    <Field.Root required>
                        <Field.Label color="hoftroedel.ink">
                            {message("email")}
                            <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            name="email"
                            value={draft.email}
                            onChange={(event) => setDraft({ ...draft, email: event.target.value })}
                            type="email"
                            autoComplete="email"
                            required
                            placeholder={message("emailPlaceholder")}
                            bg="hoftroedel.paper"
                            borderColor="hoftroedel.line"
                            color="hoftroedel.ink"
                            minH="44px"
                            _focusVisible={{
                                borderColor: "hoftroedel.accent",
                                outlineColor: "hoftroedel.accent"
                            }}
                        />
                    </Field.Root>
                    <chakra.label
                        display="flex"
                        alignItems="flex-start"
                        gap="12px"
                        cursor="pointer"
                        color="hoftroedel.ink"
                        fontSize="14px"
                        lineHeight="1.6"
                    >
                        <chakra.input
                            type="checkbox"
                            name="mapOnly"
                            checked={draft.mapOnly}
                            onChange={(event) =>
                                setDraft({ ...draft, mapOnly: event.target.checked })
                            }
                            mt="4px"
                            w="18px"
                            h="18px"
                            flexShrink="0"
                            accentColor="hoftroedel.accent"
                        />
                        <span>{message("mapOnlyLabel")}</span>
                    </chakra.label>
                    <Text id={noteId} fontSize="13px" lineHeight="1.6">
                        {message("note")}
                    </Text>
                    <Button
                        type="submit"
                        alignSelf="flex-start"
                        bg="hoftroedel.accent"
                        color="hoftroedel.paper"
                        minH="44px"
                        _hover={{ bg: "hoftroedel.ink" }}
                    >
                        {message("submit")}
                    </Button>
                    {prepared && (
                        <Text role="status" fontSize="14px" color="hoftroedel.ink">
                            {message("prepared")}
                        </Text>
                    )}
                </Stack>
            </form>
        </Box>
    );
}
