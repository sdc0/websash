import { createContext, useState, useRef } from "react";

import { getBadges, getIssuers, getStudents, getIssuances } from "../../lib/api";

export const GlobalContext = createContext();

export function GlobalProvider({children}) {
    const [badges, setBadges] = useState<Badge[]>([]);
    const [issuers, setIssuers] = useState<Issuer[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [issuances, setIssuances] = useState<Issuance[]>([]);

    const [searchText, setSearchText] = useState("");

    return (
        <GlobalContext.Provider value={{
            badges, setBadges, 
            issuers, setIssuers, 
            students, setStudents,
            issuances, setIssuances, 
            searchText, setSearchText
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
