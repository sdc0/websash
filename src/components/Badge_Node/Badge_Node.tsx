import { useNavigate } from "react-router-dom";
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

import { Badge } from '../../lib/models';
import "./Badge_Node.css";

interface BadgeNodeProps {
    badge: Badge;
}

function Badge_Node({badge}: BadgeNodeProps) {
    const nav = useNavigate();

    const mimeInfo = fileTypeFromBuffer(Buffer.from(badge.image, 'base64'));

    return (
        <div className="badge-tile" onClick={() => nav(`/badge/${badge.id}`)}>
            <div className="badge-image">
                <img src={`data:${mimeInfo["mime"]};base64,${badge.image}`} alt={`${badge.name} Icon`}/>
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