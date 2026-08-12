import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken, getStudentBadges } from "../../lib/api";
import { Badge } from "../../lib/models";
import Badge_Node from "../../components/Badge_Node/Badge_Node";

function Student() {
    const nav = useNavigate();
    const [badges, setBadges] = useState<Badge[]>([]);

    useEffect(() => {
        const id: string | null = localStorage.getItem("ID");
        if (id == null) {
            setBadges([]);
            return;
        }

        getStudentBadges(Number.parseInt(id)).then((b) => {
            if (b !== null) setBadges(b);
        });
    }, []);

    return (
        <div className="badge-grid">
            {
                badges.map((b) => (
                    <Badge_Node badge={b} />
                ))
            }
        </div>
    );
}

export default Student;