import { useEffect, useContext } from "react";

import { getStudentBadges } from "../../lib/api";
import { Badge } from "../../lib/models";

import BadgeNode from "../../components/BadgeNode/BadgeNode";
import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

function Student() {
    const {
        badges, setBadges, 
        issuers, setIssuers, 
        students, setStudents, 
        issuances, setIssuances, 
        searchText, setSearchText
    } = useContext(GlobalContext);
    
    const [filtered, setFiltered] = useState<Badge[]>(badges);

    const refreshBadges = () => {
        getStudentBadges(Number.parseInt(localStorage.getItem("ID")!)).then((b) => {
            setBadges(b);
        });
    };

    useEffect(() => {
        const id: string | null = localStorage.getItem("ID");
        if (id == null) {
            setBadges([]);
            return;
        }

        refreshBadges();
    }, []);
    
    useEffect(() => {
        setFiltered(badges.filter((b) => {
            if (searchText === "") return b;
            else return b.name.toLowerCase().includes(searchText);
        }));
    }, [badges, searchText]);

    return (
        <div className="badge-grid">
            {
                filtered.map((b: Badge) => (() => {
                    return (<BadgeNode badge={b} />)
                })())
            }
        </div>
    );
}

export default Student;
