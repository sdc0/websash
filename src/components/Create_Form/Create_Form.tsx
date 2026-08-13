import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash } from "../../lib/helper";
import { fileToBase64 } from "../../lib/helper";
import "./Create_Form.css";

interface CreateFormProps {
    obj: Badge | Student | Issuer | Issuance;
    setter: React.Dispatch<React.SetStateAction<Badge | Student | Issuer | Issuance>>;
}

function Create_Form({obj, setter, creator}: CreateFormProps) {
    let types: Record<string, string> = obj.constructor.input_types;

    return (
        <div>
            <form onSubmit={async (e) => {
                e.preventDefault();
                console.log(obj.constructor.name);
                if (obj.constructor.name === "Issuer" || obj.constructor.name === "Student") {
                    obj.salt = generateSalt();
                    await generateHash(obj.password, obj.salt).then((password) => {
                        obj.password = password;
                    });
                }

                console.log(obj);
                console.log(creator);
                console.log(creator(obj));
            }}>
                {
                    Object.entries(types).map(([field, type]) => {
                        return (
                            <div>
                                <label>
                                    {field}:
                                    <input id={`${field}-input`} type={type} onChange={(e) => {
                                        e.preventDefault();
                                        
                                        let temp = obj;

                                        if (type === "file") {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                fileToBase64(file).then((base64) => {
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
                <input type="submit" />
            </form>
        </div>
    );
}

export default Create_Form;
