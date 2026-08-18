import { useEffect, useState, useRef } from "react";
import { getBadges, getStudents, getIssuers, getIssuances } from "../../lib/api";

interface ObjectSelectorProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    type: string;
}

function ObjectSelector({obj, setter, type}: ObjectSelectorProps) {
    const [objList, setObjList] = useState<Badge[] | Issuer[] | Student[] | Issuance[]>([]);

    const setterRef = useRef(setter);

    useEffect(() => {
        setterRef.current = setter;
    }, [setter]);

    useEffect(() => {
        if (type === "Badge") {
            getBadges().then((badges) => {
                setObjList(badges);
                if (badges.length > 0) setterRef.current(badges[0]);
            });
        } else if (type === "Student") {
            getStudents().then((students) => {
                setObjList(students);
                if (students.length > 0) setterRef.current(students[0]);
            });
        } else if (type === "Issuer") {
            getIssuers().then((issuers) => {
                setObjList(issuers);
                if (issuers.length > 0) setterRef.current(issuers[0]);
            });
        } else if (type === "Issuance") {
            getIssuances().then((issuances) => {
                setObjList(issuances);
                console.log(issuances);
                if (issuances.length > 0) setterRef.current(issuances[0]);
            });
        }
    }, [type]);

    return (
        <div>
            <select onChange={async (e) => {
                e.preventDefault();
                await setterRef.current(objList[e.target.value]);
            }}>
                {
                    objList.map((o: Badge | Issuer | Student | Issuance, i: number) => {
                        return (
                            <option value={i}>{(type === "Issuance") ? o.badge : o.name}</option>
                        );
                    })
                }
            </select>
        </div>
    );
}

export default ObjectSelector;
