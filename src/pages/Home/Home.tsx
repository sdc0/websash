import { useState } from "react";

import { Badge } from "../../lib/models";
import Badge_Node from "../../components/Badge_Node/Badge_Node";

import home from "../../home.svg";
import search from "../../search.svg";
import profile from "../../profile.svg";
import "./Home.css";

function Home() {
    const [badges, setBadges] = useState([
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": home,
            "name": "badge 1",
            "desc": "badge 1's desc",
            "req": "badge 1's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": search,
            "name": "badge 2",
            "desc": "badge 2's desc",
            "req": "badge 2's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": profile,
            "name": "badge 3",
            "desc": "badge 3's desc",
            "req": "badge 3's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": search,
            "name": "badge 4",
            "desc": "badge 4's desc",
            "req": "badge 4's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": profile,
            "name": "badge 5",
            "desc": "badge 5's desc",
            "req": "badge 5's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": home,
            "name": "badge 6",
            "desc": "badge 6's desc",
            "req": "badge 6's reqs"
        }),
        Badge.from_json({
            "id": "1",
            "type": "extracurricular",
            "image": profile,
            "name": "badge 7",
            "desc": "badge 7's desc",
            "req": "badge 7's reqs"
        }),
    ]);

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