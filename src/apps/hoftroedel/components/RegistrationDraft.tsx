// SPDX-FileCopyrightText: 2026 D. Bierett – Hoftrödel Unterbach
// SPDX-License-Identifier: Apache-2.0

import {
    createContext,
    type Dispatch,
    type ReactNode,
    type SetStateAction,
    useContext,
    useMemo,
    useState
} from "react";

interface RegistrationDraft {
    address: string;
    email: string;
    mapOnly: boolean;
}
const DraftContext = createContext<{
    draft: RegistrationDraft;
    setDraft: Dispatch<SetStateAction<RegistrationDraft>>;
} | null>(null);

export function RegistrationDraftProvider({ children }: { children: ReactNode }) {
    const [draft, setDraft] = useState<RegistrationDraft>({
        address: "",
        email: "",
        mapOnly: false
    });
    const value = useMemo(() => ({ draft, setDraft }), [draft]);
    return <DraftContext.Provider value={value}>{children}</DraftContext.Provider>;
}

export function useRegistrationDraft() {
    const context = useContext(DraftContext);
    if (!context) throw new Error("RegistrationDraftProvider is missing");
    return context;
}
