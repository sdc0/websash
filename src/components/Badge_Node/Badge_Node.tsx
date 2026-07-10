import { useNavigate } from "react-router-dom";

import { Badge } from '../../lib/models';
import "./Badge_Node.css";

interface BadgeNodeProps {
    badge: Badge;
}

function Badge_Node({badge}: BadgeNodeProps) {
    const nav = useNavigate();

    return (
        <div className="badge-tile" onClick={() => nav(`/badge/${badge.name}`)}>
            <div className="badge-image">
                <img src={badge.image} alt={`${badge.name} Icon`}/>
            </div>
            <div className="badge-details">
                <h3>{badge.name}</h3>
                <p>{badge.desc}</p>
                <p>{badge.req}</p>
            </div>
        </div>
    );
}

export default Badge_Node;