import { useEffect, useRef } from "react";

interface ObjectSelectorProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    type: string;
    list: Badge[] | Issuer[] | Student[] | Issuance[];
}

function ObjectSelector({obj, setter, type, list}: ObjectSelectorProps) {
    const setterRef = useRef(setter);

    useEffect(() => {
        setterRef.current = setter;
    }, [setter]);

    useEffect(() => {
        if (list != null && list.length > 0) setterRef.current(list[0]);
    }, [list]);

    return (
        <div>
            <select onChange={async (e) => {
                e.preventDefault();
                await setterRef.current(list[e.target.value]);
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
