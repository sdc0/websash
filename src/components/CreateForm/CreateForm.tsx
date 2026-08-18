import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import "./CreateForm.css";

interface CreateFormProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    creator: (obj) => Promise<boolean>;
    type: string;
    input_types: Record<string, string>;
}

function CreateForm({obj, setter, creator, type, input_types}: CreateFormProps) {
    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                
                if (type === "Issuer" || type === "Student") {
                    obj.salt = generateSalt();
                    await generateHash(obj.password, obj.salt).then((password) => {
                        obj.password = password;
                    });
                }

                creator(obj);
            }}>
                {
                    Object.entries(input_types).map(([field, t]) => {
                        return (
                            <div>
                                <label>
                                    {field}:
                                    <input id={`${field}-input`} name={field} type={t} onChange={async (e) => {
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
                                    
                                        setter(temp);
                                    }}/>
                                </label>
                            </div>
                        );
                    })
                }
                <input type="submit" value={`Create ${type}`} />
            </form>
        </div>
    );
}

export default CreateForm;
