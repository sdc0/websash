import { useState, useEffect } from "react";

import { Badge } from "../../lib/models";
import { getBadges } from "../../lib/api";

import BadgeNode from "../../components/BadgeNode/BadgeNode";

import "./Home.css";

function Home() {
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
