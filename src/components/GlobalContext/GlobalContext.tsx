import { createContext, useState } from "react";

import { getBadges, getIssuers, getStudents, getIssuances } from "../../lib/api";

export const GlobalContext = createContext();

export function GlobalProvider({children}) {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [issuers, setIssuers] = useState<Issuer[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [issuances, setIssuances] = useState<Issuance[]>([]);

    const refreshBadges = () => { getBadges().then((b) => setBadges(b)); };
    const refreshIssuers = () => { getIssuers().then((i) => setIssuers(i)); };
    const refreshStudents = () => { getStudents().then((s) => setStudents(s)); };
    const refreshIssuances = () => { getIssuances().then((i) => setIssuances(i)); };

    const [searchText, setSearchText] = useState("");

    return (
        <GlobalContext.Provider value={{
            badges, setBadges, refreshBadges,
            issuers, setIssuers, refreshIssuers,
            students, setStudents, refreshStudents,
            issuances, setIssuances, refreshIssuances,
            searchText, setSearchText
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
