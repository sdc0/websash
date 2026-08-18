import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

import { Badge, Student, Issuer, Issuance } from '../../lib/models';

import BadgeNode from "../../components/BadgeNode/BadgeNode";

import "./DeleteForm.css";

interface DeleteFormProps {
    obj: Badge | Student | Issuer | Issuance;
    deleter: (obj) => Promise<boolean>;
    type: string;
}

function DeleteForm({obj, deleter, type}: DeleteFormProps) {
    return (
        <div className="delete-container">
            {
                (type === "Badge") ? (
                    <BadgeNode badge={obj} full={true} clickable={false} />
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
                                        <p>{(name === "date") ? obj[name].toLocaleDateString() : eval(`obj.${name}`)}</p>
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
                Delete {type}
            </button>
        </div>
    );
}

export default DeleteForm;
