import { useEffect, useRef } from "react";

interface ObjectSelectorProps {
    obj: Badge | Student | Issuer | Issuance;
    field: string;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    type: string;
    list: Badge[] | Issuer[] | Student[] | Issuance[];
}

function ObjectSelector({obj, field, setter, type, list}: ObjectSelectorProps) {

    useEffect(() => {
        if (list != null && list.length > 0) setter(list[0]); 
    }, [list]);

    return (
        <div>
            <select value={obj[field] ?? ""} onChange={async (e) => {
                e.preventDefault();
                await setter(list[e.target.value]);
            }}>
                {
                    (list != null) ? list.map((o: Badge | Issuer | Student | Issuance, i: number) => {
                        return (
                            <option value={i}>{(type === "Issuance") ? o.badge : o.name}</option>
                        );
                    }) : <></>
                }
            </select>
        </div>
    );
}

export default ObjectSelector;
