import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';
import { useState, useContext, useEffect, useRef } from "react";

import { Badge, Student, Issuer, Issuance } from '../../lib/models';

import BadgeNode from "../../components/BadgeNode/BadgeNode";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";

import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

import "./DeleteForm.css";

interface DeleteFormProps {
    deleter: (obj) => Promise<boolean>;
    type: string;
    refresher: () => void;
}

function DeleteForm({deleter, type, refresher}: DeleteFormProps) {
    const [obj, setObj] = useState<Badge | Issuer | Student | Issuance>(
        (type === "Badge") ? new Badge({}) : (
        (type === "Issuer") ? new Issuer() : (
        (type === "Student") ? new Student() : 
        new Issuance()
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

    const {
        badges, setBadges, refreshBadges,
        issuers, setIssuers, refreshIssuers,
        students, setStudents, refreshStudents,
        issuances, setIssuances, refreshIssuances
    } = useContext(GlobalContext);

    return (
        <div>
            <ObjectSelector 
                obj={obj} 
                setter={setterRef.current} 
                type={type} 
                list={
                    (type === "Badge") ? badges : (
                    (type === "Issuer") ? issuers : (
                    (type === "Student") ? students : 
                    issuances
                ))} 
            />
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
                                            <p>{(name === "date") ? obj[name].toLocaleDateString() : obj[name]}</p>
                                        </label>
                                    );
                                })
                            }
                        </div>
                    )
                }
                <button onClick={async (e) => {
                    e.preventDefault();

                    let success = await deleter(obj);
                    setDialogSuccess(success);
                    setShowDialog(true);

                    setTimeout(() => {
                        setShowDialog(false);
                    }, 3000);

                    if (success && refresher != null) refresher();
                }}>
                    Delete {type}
                </button>
            </div>
            {
                showDialog ? (
                    dialogSuccess ? (
                        <p className="success-msg">{type} deleted successfully</p>
                    ) : (
                        <p className="failure-msg">Failed to delete {type}</p>
                    )
                ) : <></>
            }
        </div>
    );
}

export default DeleteForm;
