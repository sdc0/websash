import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

import { Badge } from "../../lib/models";
import { getBadgeFromID } from "../../lib/api";

import "./Badge.css";

function BadgePage() {
    const { badgeId } = useParams();
    const [badge, setBadge] = useState<Badge>();

    useEffect(() => {
        getBadgeFromID(parseInt(badgeId!)).then((b) => {
            if (b !== null) setBadge(b);
        });
    }, [badgeId]);
    
    if (badge != null) { 
        let img = badge.image;
        if (badge?.image.slice(0, 4) !== "data") {
            const mimeInfo = fileTypeFromBuffer(Buffer.from(badge?.image, 'base64'));
            img = `data:${mimeInfo["mime"]};base64,${badge?.image}`;
        }
    
        return (
            <div className="badge-page">
                <div className="badge-page-header">
                    <h1>{badge?.name}</h1>
                </div>
                <div className="badge-page-image">
                    <img src={img} alt={`${badge?.name} Icon`}/>
                </div>
                <div className="badge-page-details">
                    <h3>{badge?.desc}</h3>
                    <h3>{badge?.req}</h3>
                    <h3>{badge?.type}</h3>
                </div>
            </div>
        );
    }else {
        return (<></>);
    }
}

export default BadgePage;
