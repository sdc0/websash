import { useState, useEffect, useContext } from "react";

import { Badge } from "../../lib/models";
import { getBadges } from "../../lib/api";

import BadgeNode from "../../components/BadgeNode/BadgeNode";

import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

import "./Home.css";

function Home() {
    const {
        badges, setBadges, refreshBadges,
        issuers, setIssuers, refreshIssuers,
        students, setStudents, refreshStudents,
        issuances, setIssuances, refreshIssuances,
        searchText, setSearchText
    } = useContext(GlobalContext);
    
    const [filtered, setFiltered] = useState<Badge[]>(badges);

    useEffect(() => {
        setFiltered(badges.filter((b) => {
            if (searchText === "") return b;
            else return b.name.toLowerCase().includes(searchText);
        }));
    }, [badges, searchText]);

    return (
        <div className="badge-grid">
            {
                filtered.map((badge_obj: Badge) => {
                    return (
                        <div className="badge-holder">
                            <BadgeNode badge={badge_obj} />
                        </div>
                    );
                })
            }
        </div>
    );
}

export default Home;
