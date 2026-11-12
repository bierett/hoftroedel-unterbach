// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import { Combobox, createListCollection, Text } from "@chakra-ui/react";
import { useIntl } from "open-pioneer:react-hooks";
import { useMemo } from "react";
import { findAddresses } from "../data/addressDirectory";

export function AddressAutocomplete({
    value,
    onChange
}: {
    value: string;
    onChange: (value: string) => void;
}) {
    const intl = useIntl();
    const suggestions = useMemo(() => findAddresses(value), [value]);
    const collection = useMemo(() => createListCollection({ items: suggestions }), [suggestions]);
    return (
        <Combobox.Root
            collection={collection}
            inputValue={value}
            allowCustomValue
            required
            value={suggestions.includes(value) ? [value] : []}
            onInputValueChange={(details) => onChange(details.inputValue)}
            onValueChange={(details) => {
                const selected = details.value[0];
                if (selected) onChange(selected);
            }}
            openOnChange={(details) => details.inputValue.trim().length >= 2}
            positioning={{ strategy: "fixed", hideWhenDetached: true }}
        >
            <Combobox.Label color="hoftroedel.ink">
                {intl.formatMessage({ id: "registration.address" })}{" "}
                <span aria-hidden="true">*</span>
            </Combobox.Label>
            <Combobox.Control>
                <Combobox.Input
                    name="address"
                    autoComplete="off"
                    required
                    minLength={5}
                    placeholder={intl.formatMessage({ id: "registration.addressPlaceholder" })}
                    bg="hoftroedel.paper"
                    color="hoftroedel.ink"
                    borderColor="hoftroedel.line"
                    minH="44px"
                    _focusVisible={{
                        borderColor: "hoftroedel.accent",
                        outlineColor: "hoftroedel.accent"
                    }}
                />
            </Combobox.Control>
            <Combobox.Positioner>
                <Combobox.Content
                    bg="hoftroedel.paper"
                    color="hoftroedel.ink"
                    border="1px solid"
                    borderColor="hoftroedel.line"
                    maxH="240px"
                    overflowY="auto"
                    boxShadow="md"
                >
                    <Combobox.Empty p="12px" fontSize="13px">
                        {intl.formatMessage({ id: "registration.addressEmpty" })}
                    </Combobox.Empty>
                    {suggestions.map((address) => (
                        <Combobox.Item
                            key={address}
                            item={address}
                            minH="44px"
                            px="12px"
                            fontSize="14px"
                            _highlighted={{ bg: "hoftroedel.accent", color: "hoftroedel.paper" }}
                        >
                            <Combobox.ItemText>{address}</Combobox.ItemText>
                            <Combobox.ItemIndicator />
                        </Combobox.Item>
                    ))}
                </Combobox.Content>
            </Combobox.Positioner>
            <Text fontSize="12px" lineHeight="1.5" color="hoftroedel.muted">
                {intl.formatMessage({ id: "registration.addressHelp" })}
            </Text>
        </Combobox.Root>
    );
}
