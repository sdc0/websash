import { useState, useEffect } from "react";

import { Badge } from "../../lib/models";
import { getBadges } from "../../lib/api";
import { generateHash } from "../../lib/helper";
import Badge_Node from "../../components/Badge_Node/Badge_Node";

import "./Home.css";

function Home() {
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        getBadges().then((b) => {
            if (b !== null) setBadges(b);
        });
        generateHash();
    }, []);

    return (
        <div className="badge-grid">
            {
                badges.map((badge_obj: Badge) => {
                    return (
                        <div className="badge-holder">
                            <Badge_Node badge={badge_obj} />
                        </div>
                    );
                })
            } 
        </div>
    );
}

export default Home;
