import { useContext } from "react";

import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import { GlobalContext } from "../GlobalContext/GlobalContext";

interface CustomInputProps {
    type: string;
    obj: Badge | Issuer | Student | Issuance;
    setter: (obj) => void;
    defaultValue: string;
    editable: boolean;
    field: string;
    list: Badge[] | Issuer[] | Student[] | Issuance[];
}

function CustomInput({type, obj, setter, defaultValue, editable=true, field, list}: CustomInputProps) {
    const {
        badges, setBadges, 
        issuers, setIssuers, 
        students, setStudents, 
        issuances, setIssuances, 
        searchText, setSearchText
    } = useContext(GlobalContext);

    return (
        <div>
            {
                (type === "Badge" || type === "Student" || type === "Issuer" || type === "Issuance") ? (
                    (editable) ? <ObjectSelector obj={obj} field={field} setter={setter} type={type} list={list} /> : (() => {
                        let temp = ((field === "badge") ? badges : ((field === "student") ? students : ((field === "issuer") ? issuers : []))).filter((o) => {
                            if (o != null) return o.id === obj[field];
                        });

                        return (
                            (temp.length > 0) ? <p>{temp[0]["name"]}</p> : <p>{obj[field]}</p>
                        )
                    })()
                ) : (
                    <input type={type} defaultValue={(defaultValue == null) ? "" : defaultValue} onChange={(e) => {
                        e.preventDefault();
                        setter(e.target);
                    }} />
                )
            }
        </div>
    );
}

export default CustomInput;
