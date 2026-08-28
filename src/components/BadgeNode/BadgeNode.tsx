import { useNavigate } from "react-router-dom";
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

import { Badge } from '../../lib/models';
import "./BadgeNode.css";

interface BadgeNodeProps {
    badge: Badge;
    full: boolean;
    clickable: boolean;
}

function BadgeNode({badge, full=false, clickable=true}: BadgeNodeProps) {
    const nav = useNavigate();

    let img = badge.image;
    if (badge.image != null && badge.image.slice(0, 4) !== "data") {
        const mimeInfo = fileTypeFromBuffer(Buffer.from(badge.image, 'base64'));
        img = `data:${mimeInfo["mime"]};base64,${badge.image}`;
    }

    return (
        <div className="badge-tile" onClick={() => {if (clickable) nav(`/badge/${badge.id}`)}}>
            <div className="badge-image">
                <img src={img} alt={`${badge.name} Icon`}/>
            </div>
            <div className="badge-details">
                <h3>{badge.name}</h3>
                {
                    (full) ? (
                        <>
                            <p>{badge.id}</p>
                            <p>{badge.abbr}</p>
                            <p>{badge.type}</p>
                            <p>{badge.short}</p>
                            <p>{badge.desc}</p>
                            <p>{badge.req}</p>
                        </>
                    ) : (<p>{badge.short}</p>)
                }
            </div>
        </div>
    );
}

export default BadgeNode;
