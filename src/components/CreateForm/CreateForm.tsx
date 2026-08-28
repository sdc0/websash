import { useState, useEffect, useRef } from "react";

import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import CustomInput from "../../components/CustomInput/CustomInput";
import BadgeNode from "../../components/BadgeNode/BadgeNode";

import "./CreateForm.css";

interface CreateFormProps {
    creator: (obj) => Promise<boolean>;
    type: string;
    input_types: Record<string, string>;
    lists: {
        "Badge": Badge[],  
        "Issuer": Issuer[],  
        "Student": Student[]
    };
    refresher: () => void;
}

function CreateForm({creator, type, input_types, lists, refresher}: CreateFormProps) {
    const [obj, setObj] = useState<Badge | Issuer | Student | Issuance>(
        (type === "Badge") ? new Badge({creator: parseInt(localStorage.getItem("ID"), 10)}) : (
        (type === "Issuer") ? new Issuer({}) : (
        (type === "Student") ? new Student({}) : 
        new Issuance({})
    )));

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [dialogSuccess, setDialogSuccess] = useState<boolean>();

    const setterRef = useRef(setObj);

    useEffect(() => {
        setterRef.current = setObj;
    }, [setObj]);

    useEffect(() => {
        return () => {
            setShowDialog(false);
        };
    }, []);

    return (
        <div>
            <div>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    
                    if (type === "Issuer" || type === "Student") {
                        obj.salt = generateSalt();
                        await generateHash(obj.password, obj.salt).then((password) => {
                            obj.password = password;
                        });
                    }

                    let success = await creator(obj);
                    setDialogSuccess(success);
                    setShowDialog(true);

                    setTimeout(() => {
                        setShowDialog(false);
                    }, 3000);
                    
                    if (success) {
                        if (refresher != null) refresher();

                        // clear form
                        if (type === "Badge") setterRef.current(new Badge({}));
                        else if (type === "Issuer") setterRef.current(new Issuer({}));
                        else if (type === "Student") setterRef.current(new Student({}));
                        else if (type === "Issuance") setterRef.current(new Issuance({}));

                        e.target.reset();
                    }
                }}>
                    {
                        Object.entries(input_types).map(([field, t]) => {
                            return (
                                <div>
                                    <label>
                                        {field}:
                                        <CustomInput type={t} obj={obj} setter={(t === "Badge" || t === "Issuer" || t === "Student" || t === "Issuance") ? (o) => {
                                            let temp = obj.clone();
                                            
                                            temp[field] = o.id;

                                            setterRef.current(temp);
                                        } : async (target) => {
                                            let temp = obj.clone();
                                            
                                            if (t === "file") {
                                                const file = target.files?.[0];
                                                if (file) {
                                                    await fileToBase64(file).then((base64) => {
                                                        //eval(`temp.${field} = "${base64}"`);
                                                        temp[field] = base64;
                                                    });
                                                }
                                            }else if (t === "number") {
                                                //eval(`temp.${field} = ${target.value}`);
                                                temp[field] = target.value;
                                            }else {
                                                //eval(`temp.${field} = "${target.value}"`);
                                                temp[field] = target.value;
                                            }
                                            
                                            setterRef.current(temp);
                                        }} list={(t === "Badge" || t === "Issuer" || t === "Student") ? lists[t] : []} />
                                    </label>
                                </div>
                            );
                        })
                    }
                    <input type="submit" value={`Create ${type}`} />
                </form>
                {
                    showDialog ? (
                        dialogSuccess ? (
                            <p className="success-msg">{type} created successfully</p>
                        ) : (
                            <p className="failure-msg">Failed to create {type}</p>
                        )
                    ) : <></>
                }
            </div>
            {
                (type === "Badge") ? <BadgeNode badge={obj} full={true} clickable={false} /> : <></>
            }
        </div>
    );
}

export default CreateForm;
