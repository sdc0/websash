import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import CustomInput from "../../components/CustomInput/CustomInput";

import "./UpdateForm.css";

interface UpdateFormProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    updater: (obj) => Promise<boolean>;
    passwordChanged: boolean;
    setPasswordChanged: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    input_types: Record<string, string>;
}

function UpdateForm({obj, setter, updater, passwordChanged, setPasswordChanged, type, input_types}: UpdateFormProps) {
    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                
                if (passwordChanged && (type === "Issuer" || type === "Student")) {
                    obj.salt = generateSalt();
                    await generateHash(obj.password, obj.salt).then((password) => {
                        obj.password = password;
                    });
                }

                updater(obj);
            }}>
                {
                    Object.entries(input_types).map(([field, t]) => {
                        return (
                            <div>
                                <label>
                                    {field}: 
                                    {/*<input id={`${field}-input`} type={t} name={field} defaultValue={eval(`obj.${field}`)} onChange={async (e) => {
                                        e.preventDefault();
                                        let temp = obj.clone();

                                        if (t === "file") {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                await fileToBase64(file).then((base64) => {
                                                    eval(`temp.${field} = "${base64}"`);
                                                });
                                            }
                                        }else if (t === "number") {
                                            eval(`temp.${field} = ${e.target.value}`);
                                        }else {
                                            eval(`temp.${field} = "${e.target.value}"`);
                                        }

                                        if (field === "password") setPasswordChanged(true);
                                    
                                        setter(temp);
                                    }}/>*/}
                                    <CustomInput type={t} obj={obj} defaultValue={eval(`obj.${field}`)} setter={(t === "Badge" || t === "Issuer" || t === "Student" || t === "Issuance") ? (obj) => {
                                        console.log(obj);
                                    } : async (target) => {
                                        let temp = obj.clone();

                                        if (t === "file") {
                                            const file = target.files?.[0];
                                            if (file) {
                                                await fileToBase64(file).then((base64) => {
                                                    eval(`temp.${field} = "${base64}"`);
                                                });
                                            }
                                        }else if (t === "number") {
                                            eval(`temp.${field} = ${target.value}`);
                                        }else {
                                            eval(`temp.${field} = "${target.value}"`);
                                        }

                                        if (field === "password") setPasswordChanged(true);

                                        setter(temp);
                                    }} editable={t === "Issuance" && field != "date"} field={field} />
                                </label>
                            </div>
                        );
                    })
                }
                <input type="submit" value={`Update ${type}`} />
            </form>
        </div>
    );
}

export default UpdateForm;
