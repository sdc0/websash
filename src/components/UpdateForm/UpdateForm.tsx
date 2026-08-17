import { useState, useEffect } from "react";

import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import "./UpdateForm.css";

interface UpdateFormProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    updater: (obj) => Promise<boolean>;
    passwordChanged: boolean;
    setPasswordChanged: React.Dispatch<React.SetStateAction<boolean>>;
}

function UpdateForm({obj, setter, updater, passwordChanged, setPasswordChanged}: UpdateFormProps) {
    let types: Record<string, string> = obj.constructor.input_types;

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                
                if (passwordChanged && (obj.constructor.name === "Issuer" || obj.constructor.name === "Student")) {
                    obj.salt = generateSalt();
                    await generateHash(obj.password, obj.salt).then((password) => {
                        obj.password = password;
                    });
                }

                updater(obj);
            }}>
                {
                    Object.entries(types).map(([field, type]) => {
                        return (
                            <div>
                                <label>
                                    {field}: 
                                    <input id={`${field}-input`} type={type} name={field} defaultValue={eval(`obj.${field}`)} onChange={async (e) => {
                                        e.preventDefault();
                                        let temp = obj.clone();

                                        if (obj.constructor.name === "Issuer") {
                                            console.log(field, eval(`obj.${field}`));
                                        }

                                        if (type === "file") {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                await fileToBase64(file).then((base64) => {
                                                    eval(`temp.${field} = "${base64}"`);
                                                });
                                            }
                                        }else if (type === "number") {
                                            eval(`temp.${field} = ${e.target.value}`);
                                        }else {
                                            eval(`temp.${field} = "${e.target.value}"`);
                                        }

                                        if (field === "password") setPasswordChanged(true);
                                    
                                        setter(temp);
                                    }}/>
                                </label>
                            </div>
                        );
                    })
                }
                <input type="submit" value={`Update ${obj.constructor.name}`} />
            </form>
        </div>
    );
}

export default UpdateForm;
