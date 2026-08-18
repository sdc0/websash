import { fileTypeFromBuffer } from 'file-type';

import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import Badge_Node from "../../components/BadgeNode/BadgeNode";

import "./DeleteForm.css";

interface DeleteFormProps {
    obj: Badge | Student | Issuer | Issuance;
    deleter: (obj) => Promise<boolean>;
}

function DeleteForm({obj, deleter}: DeleteFormProps) {
    return (
        <div>
            {
                (obj.constructor.name == "Badge") ? (
                    <Badge_Node badge={obj} full={true} clickable={false} />
                ) : (
                    <div>
                        {
                            Object.getOwnPropertyNames(obj).map((name) => {
                                if (name === "image") {
                                    let img = obj.image;
                                    
                                    if (img.slice(0, 4) !== "data") {
                                        const mimeInfo = fileTypeFromBuffer(Buffer.from(img, 'base64'));
                                        img = `data:${mimeInfo["mime"]};base64,${obj.image}`;
                                    }
                                    
                                    return (
                                        <img src={img} alt={`${obj.name} Icon`}/>
                                    );
                                }
                                
                                return (
                                    <label>
                                        {name}: 
                                        <p>{eval(`obj.${name}`)}</p>
                                    </label>
                                );
                            })
                        }
                    </div>
                )
            }
            <button onClick={(e) => {
                e.preventDefault();

                deleter(obj);
            }}>
                Delete {obj.constructor.name}
            </button>
        </div>
    );
}

export default DeleteForm;
