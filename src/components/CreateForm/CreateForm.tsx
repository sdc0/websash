import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import "./CreateForm.css";

interface CreateFormProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
    creator: (obj) => Promise<boolean>;
}

function CreateForm({obj, setter, creator}: CreateFormProps) {
    let types: Record<string, string> = obj.constructor.input_types;

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                
                if (obj.constructor.name === "Issuer" || obj.constructor.name === "Student") {
                    obj.salt = generateSalt();
                    await generateHash(obj.password, obj.salt).then((password) => {
                        obj.password = password;
                    });
                }

                creator(obj);
            }}>
                {
                    Object.entries(types).map(([field, type]) => {
                        return (
                            <div>
                                <label>
                                    {field}:
                                    <input id={`${field}-input`} name={field} type={type} onChange={async (e) => {
                                        e.preventDefault();
                                        let temp = obj.clone();

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
                                    
                                        setter(temp);
                                    }}/>
                                </label>
                            </div>
                        );
                    })
                }
                <input type="submit" value={`Create ${obj.constructor.name}`} />
            </form>
        </div>
    );
}

export default CreateForm;
