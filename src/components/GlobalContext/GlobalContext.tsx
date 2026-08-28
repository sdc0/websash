import { createContext, useState, useRef } from "react";

import { getBadges, getIssuers, getStudents, getIssuances } from "../../lib/api";

export const GlobalContext = createContext();

export function GlobalProvider({children}) {
    const [badges, setBadgesPriv] = useState<Badge[]>([]);
    const setBadgesRef = useRef(setBadgesPriv);
    const setBadges = (list) => {
        setBadgesRef.current(list);
    };
    
    const [issuers, setIssuersPriv] = useState<Issuer[]>([]);
    const setIssuersRef = useRef(setIssuersPriv);
    const setIssuers = (list) => {
        setIssuersRef.current(list);
    };
    
    const [students, setStudentsPriv] = useState<Student[]>([]);
    const setStudentsRef = useRef(setStudentsPriv);
    const setStudents = (list) => {
        setStudentsRef.current(list);
    };
    
    const [issuances, setIssuancesPriv] = useState<Issuance[]>([]);
    const setIssuancesRef = useRef(setIssuancesPriv);
    const setIssuances = (list) => {
        setIssuancesRef.current(list);
    };

    /*const [refreshBadges, setRefreshBadges] = useState(() => () => { getBadges().then((b) => setBadges(b)); });
    const [refreshIssuers, setRefreshIssuers] = useState(() => () => { getIssuers().then((i) => setIssuers(i)); });
    const [refreshStudents, setRefreshStudents] = useState(() => () => { getStudents().then((s) => setStudents(s)); });
    const [refreshIssuances, setRefreshIssuances] = useState(() => () => { getIssuances().then((i) => setIssuances(i)); });*/

    /*const [refreshBadges, setRefreshBadges] = useState({
        fn: () => {
            getBadges().then((b) => setBadges(b));
        }
    });
    
    const [refreshIssuers, setRefreshIssuersPriv] = useState({
        fn: () => { 
            getIssuers().then((i) => setIssuers(i)); 
        }
    });
    const setRefreshIssuersRef = useRef(setRefreshIssuersPriv);
    const setRefreshIssuers = (options: {fn: () => void}) => {
        console.log("in setRefreshIssuers");
        console.log(options.fn);
        setRefreshIssuersRef.current({
            fn: options.fn
        });
    };
    
    const [refreshStudents, setRefreshStudents] = useState({
        fn: () => { 
            getStudents().then((s) => setStudents(s));
        }
    });
    const [refreshIssuances, setRefreshIssuances] = useState({
        fn: () => { 
            getIssuances().then((i) => setIssuances(i));
        }
    });*/

    /*const refreshBadgesRef = useRef<() => void>(() => { getBadges().then((b) => setBadges(b)); });
    const refreshBadges = () => {
        refreshBadgesRef.current();
    };
    const setRefreshBadges = (fn: () => void) => {
        refreshBadgesRef.current = fn;
    };
    
    const refreshIssuersRef = useRef<() => void>(() => { getIssuers().then((i) => setIssuers(i)); });
    const refreshIssuers = () => {
        refreshIssuersRef.current();
    };
    const setRefreshIssuers = (fn: () => void) => {
        refreshIssuersRef.current = fn;
    };
    
    const refreshStudentsRef = useRef<() => void>(() => { getStudents().then((s) => setStudents(s)); });
    const refreshStudents = () => {
        refreshStudentsRef.current();
    };
    const setRefreshStudents = (fn: () => void) => {
        refreshStudentsRef.current = fn;
    };
    
    const refreshIssuancesRef = useRef<() => void>(() => { getIssuances().then((i) => setIssuances(i)); });
    const refreshIssuances = () => {
        refreshIssuancesRef.current();
    };
    const setRefreshIssuances = (fn: () => void) => {
        refreshIssuancesRef.current = fn;
    };*/

    const [searchText, setSearchText] = useState("");

    return (
        <GlobalContext.Provider value={{
            badges, setBadges, /*refreshBadges, setRefreshBadges,*/
            issuers, setIssuers, /*refreshIssuers, setRefreshIssuers,*/
            students, setStudents, /*refreshStudents, setRefreshStudents,*/
            issuances, setIssuances, /*refreshIssuances, setRefreshIssuances,*/
            searchText, setSearchText
        }}>
            {children}
        </GlobalContext.Provider>
    );
}
