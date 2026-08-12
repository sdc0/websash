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
    }, []);
    
    if (badge != null) { 
        const mimeInfo = fileTypeFromBuffer(Buffer.from(badge!.image, 'base64'));
    
        return (
            <div className="badge-page">
                <div className="badge-page-header">
                    <h1>{badge?.name}</h1>
                </div>
                <div className="badge-page-image">
                    <img src={`data:${mimeInfo["mime"]};base64,${badge?.image}`} alt={`${badge?.name} Icon`}/>
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