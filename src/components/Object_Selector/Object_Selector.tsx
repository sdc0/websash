import { useEffect, useState } from "react";
import { getBadges, getStudents, getIssuers } from "../../lib/api";

interface ObjectSelectorProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    type: string;
}

function Object_Selector({obj, setter, type}: ObjectSelectorProps) {
    const [objList, setObjList] = useState<Badge[] | Issuer[] | Student[] | Issuance[]>([]);

    useEffect(() => {
        if (type === "Badge") {
            getBadges().then((badges) => {
                setObjList(badges);
                if (badges.length > 0) setter(badges[0]);
            });
        } else if (type === "Student") {
            getStudents().then((students) => {
                setObjList(students);
                if (students.length > 0) setter(students[0]);
            });
        } else {
            getIssuers().then((issuers) => {
                setObjList(issuers);
                if (issuers.length > 0) setter(issuers[0]);
            });
        }
    }, [type]);

    return (
        <div>
            <select onChange={(e) => {
                e.preventDefault();
                setter(objList[e.target.value]);
            }}>
                {
                    objList.map((o: Badge | Issuer | Student | Issuance, i: number) => {
                        return (
                            <option value={i}>{o.name}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default Object_Selector;
