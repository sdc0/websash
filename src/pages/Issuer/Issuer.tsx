import { useState } from "react"
import { fileTypeFromBuffer } from 'file-type';
import { Buffer } from 'buffer';

import { Badge, Issuance, Issuer, Student } from "../../lib/models";
import { createBadge, createStudent, createIssuer, updateBadge, updateStudent, updateIssuer, deleteBadge, deleteStudent, deleteIssuer } from "../../lib/api";
import { generateSalt, generateHash, fileToBase64 } from "../../lib/helper";

import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import BadgeNode from "../../components/BadgeNode/BadgeNode";
import CreateForm from "../../components/CreateForm/CreateForm";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import DeleteForm from "../../components/DeleteForm/DeleteForm";

import "./Issuer.css";

function IssuerPage() {
    /*const [selectedAdd, setSelectedAdd] = useState<Badge | Student | Issuer | Issuance>(new Badge());
    const [creator, setCreator] = useState((obj) => (obj) => createBadge(obj));*/

    const [addBadge, setAddBadge] = useState<Badge>(new Badge());
    const [addIssuer, setAddIssuer] = useState<Issuer>(new Issuer());
    const [addStudent, setAddStudent] = useState<Student>(new Student());

    /*const [selectedEdit, setSelectedEdit] = useState<Badge | Student | Issuer | Issuance>(new Badge());
    const [passwordChanged, setPasswordChanged] = useState<boolean>(false);*/

    const [editBadge, setEditBadge] = useState<Badge>(new Badge());
    const [editIssuer, setEditIssuer] = useState<Issuer>(new Issuer());
    const [editStudent, setEditStudent] = useState<Student>(new Student());

    const [issuerPasswordChanged, setIssuerPasswordChanged] = useState<boolean>(false);
    const [studentPasswordChanged, setStudentPasswordChanged] = useState<boolean>(false);

    //const [selectedDelete, setSelectedDelete] = useState<Badge | Student | Issuer | Issuance>(new Badge());

    const [deleteBadge, setDeleteBadge] = useState<Badge>(new Badge());
    const [deleteIssuer, setDeleteIssuer] = useState<Issuer>(new Issuer());
    const [deleteStudent, setDeleteStudent] = useState<Student>(new Student());

    return (
        <div className="admin-page" style={{"grid-column": "1"}}>
            <div className="admin-container">
                {/*<div className="sub-container form">
                    <h3>Add New</h3>
                    <select onChange={(e) => {
                        e.preventDefault();
                        if (e.target.value === "badge") {
                            setSelectedAdd(new Badge());
                            setCreator((obj) => (obj) => createBadge(obj));
                        } else if (e.target.value === "student") {
                            setSelectedAdd(new Student());
                            setCreator((obj) => (obj) => createStudent(obj));
                        } else {
                            setSelectedAdd(new Issuer());
                            setCreator((obj) => (obj) => createIssuer(obj));
                        }
                    }}>
                        <option value="badge">Badge</option>
                        <option value="issuer">Issuer</option>
                        <option value="student">Student</option>
                    </select>
                    <CreateForm obj={selectedAdd} setter={setSelectedAdd} creator={creator} />
                </div>
                <div className="sub-container badge-container">
                    {
                        (selectedAdd.constructor.name === "Badge") ?
                        <BadgeNode badge={selectedAdd} full={true} clickable={false} /> : <></>
                    }
                </div>*/}
                <h3 className="heading full-heading">Add New</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Create Badge</h4>
                        <CreateForm obj={addBadge} setter={setAddBadge} creator={(obj) => createBadge(obj)} />
                        <BadgeNode badge={addBadge} full={true} clickable={false} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Issuer</h4>
                        <CreateForm obj={addIssuer} setter={setAddIssuer} creator={(obj) => createIssuer(obj)} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Student</h4>
                        <CreateForm obj={addStudent} setter={setAddStudent} creator={(obj) => createStudent(obj)} />
                    </div>
                </div>
            </div>
            <div className="admin-container" style={{"grid-column": "2"}}>
                {/*<div className="sub-container form">
                    <h3>Edit Existing</h3>
                    <select onChange={(e) => {
                        e.preventDefault();
                        if (e.target.value === "badge") {
                            setSelectedEdit(new Badge());
                        } else if (e.target.value === "student") {
                            setSelectedEdit(new Student());
                            setPasswordChanged(false);
                        } else {
                            setSelectedEdit(new Issuer());
                            setPasswordChanged(false);
                        }
                    }}>
                        <option value="badge">Badge</option>
                        <option value="student">Student</option>
                        <option value="issuer">Issuer</option>
                    </select>
                    <ObjectSelector obj={selectedEdit} setter={setSelectedEdit} type={selectedEdit.constructor.name} />
                    <div>
                        {
                            Object.entries(selectedEdit.constructor.input_types).map(([field, type]) => {
                                return (
                                    <label>
                                        {field}: 
                                        <input type={type} defaultValue={eval(`selectedEdit.${field}`)} onChange={(e) => {
                                            e.preventDefault();

                                            let temp = selectedEdit.clone();

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
                                        
                                            setSelectedEdit(temp);

                                            if (field === "password") {
                                                setPasswordChanged(true);
                                            }
                                        }} />
                                    </label>
                                );
                            })
                        }
                    </div>
                    <button onClick={async (e) => {
                        e.preventDefault();

                        if (passwordChanged && (selectedEdit.constructor.name === "Issuer" || selectedEdit.constructor.name === "Student")) {
                            let obj = selectedEdit.clone();
                            let salt = generateSalt();
                            
                            obj.salt = salt;
                            await generateHash(obj.password, obj.salt).then((password) => {
                                obj.password = password;
                            });
                            await setSelectedEdit(obj);
                        }

                        if (selectedEdit.constructor.name === "Badge") updateBadge(selectedEdit);
                        else if (selectedEdit.constructor.name === "Student") updateStudent(selectedEdit);
                        else if (selectedEdit.constructor.name === "Issuer") updateIssuer(selectedEdit);
                    }}>
                        Update {selectedEdit.constructor.name}
                    </button>
                </div>
                <div className="sub-container badge-container">
                    {
                        (selectedEdit.constructor.name === "Badge") ?
                        <BadgeNode badge={selectedEdit} full={true} clickable={false} /> : <></>
                    }
                </div>*/}
                <h3 className="heading full-heading">Edit Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Edit Badge</h4>
                        <ObjectSelector obj={editBadge} setter={setEditBadge} type={editBadge.constructor.name} />
                        <UpdateForm obj={editBadge} setter={setEditBadge} updater={(obj) => updateBadge(obj)} />
                        <BadgeNode badge={editBadge} full={true} clickable={false} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Issuer</h4>
                        <ObjectSelector obj={editIssuer} setter={(obj) => {
                            setIssuerPasswordChanged(false);
                            return setEditIssuer(obj);
                        }} type={editIssuer.constructor.name} />
                        <UpdateForm obj={editIssuer} setter={setEditIssuer} updater={(obj)  => updateIssuer(obj)} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Student</h4>
                        <ObjectSelector obj={editStudent} setter={(obj) => {
                            setStudentPasswordChanged(false);
                            return setEditStudent(obj);
                        }} type={editStudent.constructor.name} />
                        <UpdateForm obj={editStudent} setter={setEditStudent} updater={(obj) => updateStudent(obj)} />
                    </div>
                </div>
            </div>
            <div className="admin-container">
                {/*<div className="sub-container form">
                    <h3>Delete Existing</h3>
                    <select onChange={(e) => {
                        e.preventDefault();
                        if (e.target.value === "badge") {
                            setSelectedDelete(new Badge());
                        } else if (e.target.value === "student") {
                            setSelectedDelete(new Student());
                        } else {
                            setSelectedDelete(new Issuer());
                        }
                    }}>
                        <option value="badge">Badge</option>
                        <option value="student">Student</option>
                        <option value="issuer">Issuer</option>
                    </select>
                    <Object_Selector obj={selectedDelete} setter={setSelectedDelete} type={selectedDelete.constructor.name} />
                    <div>
                        {
                            Object.getOwnPropertyNames(selectedDelete).map((name) => {
                                if (name === "image") {
                                    const mimeInfo = fileTypeFromBuffer(Buffer.from(selectedDelete.image, 'base64'));
                                    return (
                                        <img src={`data:${mimeInfo["mime"]};base64,${selectedDelete.image}`} alt={`${selectedDelete.name} Icon`}/>
                                    );
                                }
                                
                                return (
                                    <label>
                                        {name}: 
                                        <p>{eval(`selectedDelete.${name}`)}</p>
                                    </label>
                                );

                                
                            })
                        }
                    </div>
                    <button onClick={(e) => {
                        e.preventDefault();
                        if (selectedDelete.constructor.name === "Badge") deleteBadge(selectedDelete);
                        else if (selectedDelete.constructor.name === "Student") deleteStudent(selectedDelete);
                        else if (selectedDelete.constructor.name === "Issuer") deleteIssuer(selectedDelete);
                    }}>
                        Delete {selectedDelete.constructor.name}
                    </button>
                </div>*/}
                <h3 className="heading full-heading">Delete Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Delete Badge</h4>
                        <ObjectSelector obj={deleteBadge} setter={setDeleteBadge} type={deleteBadge.constructor.name} />
                        <DeleteForm obj={deleteBadge} deleter={(obj) => deleteBadge(deleteBadge)} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Issuer</h4>
                        <ObjectSelector obj={deleteIssuer} setter={setDeleteIssuer} type={deleteIssuer.constructor.name} />
                        <DeleteForm obj={deleteIssuer} deleter={(obj) => deleteIssuer(deleteIssuer)} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Student</h4>
                        <ObjectSelector obj={deleteStudent} setter={setDeleteStudent} type={deleteStudent.constructor.name} />
                        <DeleteForm obj={deleteStudent} deleter={(obj) => deleteStudent(deleteStudent)} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssuerPage;
