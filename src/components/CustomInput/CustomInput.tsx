import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";

interface CustomInputProps {
    type: string;
    obj: Badge | Issuer | Student | Issuance;
    setter: (obj) => void;
    defaultValue: string;
    editable: boolean;
    field: string;
}

function CustomInput({type, obj, setter, defaultValue, editable=true, field}: CustomInputProps) {
    return (
        <div>
            {
                (type === "Badge" || type === "Student" || type === "Issuer" || type === "Issuance") ? (
                    (editable) ? <ObjectSelector obj={obj} setter={setter} type={type} /> : (
                        <p>{obj[field]}</p>
                    )
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
