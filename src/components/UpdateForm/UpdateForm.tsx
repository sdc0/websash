import { useState, useContext } from "react";

import { Badge, Student, Issuer, Issuance } from '../../lib/models';
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import CustomInput from "../../components/CustomInput/CustomInput";
import BadgeNode from "../../components/BadgeNode/BadgeNode";
import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";

import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

import "./UpdateForm.css";

interface UpdateFormProps {
    updater: (obj) => Promise<boolean>;
    type: string;
    input_types: Record<string, string>;
    list: Badge[] | Issuer[] | Student[] | Issuance[];
    refresher: () => void;
}

function UpdateForm({updater, type, input_types, list, refresher}: UpdateFormProps) {
    const [obj, setObj] = useState<Badge | Issuer | Student | Issuance>(
        (type === "Badge") ? new Badge() : (
        (type === "Issuer") ? new Issuer() : (
        (type === "Student") ? new Student() : 
        new Issuance()
    )));
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);

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
                setter={setObj} 
                type={type} 
                list={
                    (type === "Badge") ? badges : (
                    (type === "Issuer") ? issuers : (
                    (type === "Student") ? students : 
                    issuances
                ))} 
            />
            <div>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    
                    if (passwordChanged && (type === "Issuer" || type === "Student")) {
                        obj.salt = generateSalt();
                        await generateHash(obj.password, obj.salt).then((password) => {
                            obj.password = password;
                        });
                    }

                    await updater(obj);
                    if (refresher != null) refresher();
                }}>
                    {
                        Object.entries(input_types).map(([field, t]) => {
                            return (
                                <div>
                                    <label>
                                        {field}: 
                                        <CustomInput type={t} obj={obj} defaultValue={obj[field]} setter={(t === "Badge" || t === "Issuer" || t === "Student" || t === "Issuance") ? (o) => {
                                            let temp = obj.clone();

                                            temp[field] = o.id;

                                            setObj(temp);
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

                                            if (field === "password") setPasswordChanged(true);

                                            setObj(temp);
                                        }} editable={t === "Issuance" && field !== "date"} field={field} list={list} />
                                    </label>
                                </div>
                            );
                        })
                    }
                    <input type="submit" value={`Update ${type}`} />
                </form>
            </div>
            {
                (type === "Badge") ? <BadgeNode badge={obj} full={true} clickable={false} /> : <></>
            }
        </div>
    );
}

export default UpdateForm;
