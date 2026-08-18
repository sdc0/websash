import { useState, useEffect } from "react";

import { Badge } from "../../lib/models";
import { getBadges } from "../../lib/api";
import { generateHash } from "../../lib/helper";

import BadgeNode from "../../components/BadgeNode/BadgeNode";
import CustomInput from "../../components/CustomInput/CustomInput";

import "./Home.css";


import { Issuer, Student, Issuance } from "../../lib/models";

function Home() {
    const [testBadge, setTestBadge] = useState<Badge>(new Badge());
    const [testIssuer, setTestIssuer] = useState<Issuer>(new Issuer());
    const [testStudent, setTestStudent] = useState<Student>(new Student());

    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        getBadges().then((b) => {
            if (b !== null) setBadges(b);
        });
    }, []);

    return (
        <div className="badge-grid">
            {
                badges.map((badge_obj: Badge) => {
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
