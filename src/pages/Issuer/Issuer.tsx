import { useState } from "react"

import { Badge, Issuance, Issuer, Student } from "../../lib/models";
import { createBadge, createStudent, createIssuer, updateBadge, updateStudent, updateIssuer, deleteBadge, deleteStudent, deleteIssuer } from "../../lib/api";

import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import BadgeNode from "../../components/BadgeNode/BadgeNode";
import CreateForm from "../../components/CreateForm/CreateForm";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import DeleteForm from "../../components/DeleteForm/DeleteForm";

import "./Issuer.css";

function IssuerPage() {
    const [addBadge, setAddBadge] = useState<Badge>(new Badge());
    const [addIssuer, setAddIssuer] = useState<Issuer>(new Issuer());
    const [addStudent, setAddStudent] = useState<Student>(new Student());
    

    const [editBadge, setEditBadge] = useState<Badge>(new Badge());
    const [editIssuer, setEditIssuer] = useState<Issuer>(new Issuer());
    const [editStudent, setEditStudent] = useState<Student>(new Student());

    const [issuerPasswordChanged, setIssuerPasswordChanged] = useState<boolean>(false);
    const [studentPasswordChanged, setStudentPasswordChanged] = useState<boolean>(false);
    

    const [delBadge, setDelBadge] = useState<Badge>(new Badge());
    const [delIssuer, setDelIssuer] = useState<Issuer>(new Issuer());
    const [delStudent, setDelStudent] = useState<Student>(new Student());

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h3 className="heading full-heading">Add New</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Create Badge</h4>
                        <CreateForm obj={addBadge} setter={setAddBadge} creator={(obj) => createBadge(obj)} type={"Badge"} input_types={Badge.input_types}  />
                        <BadgeNode badge={addBadge} full={true} clickable={false} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Issuer</h4>
                        <CreateForm obj={addIssuer} setter={setAddIssuer} creator={(obj) => createIssuer(obj)} type={"Issuer"} input_types={Issuer.input_types}  />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Student</h4>
                        <CreateForm obj={addStudent} setter={setAddStudent} creator={(obj) => createStudent(obj)} type={"Student"} input_types={Student.input_types}  />
                    </div>
                </div>
            </div>
            <div className="admin-container">
                <h3 className="heading full-heading">Edit Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Edit Badge</h4>
                        <ObjectSelector obj={editBadge} setter={setEditBadge} type={"Badge"} />
                        <UpdateForm obj={editBadge} setter={setEditBadge} updater={(obj) => updateBadge(obj)} type={"Badge"} input_types={Badge.input_types} />
                        <BadgeNode badge={editBadge} full={true} clickable={false} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Issuer</h4>
                        <ObjectSelector obj={editIssuer} setter={(obj) => {
                            setIssuerPasswordChanged(false);
                            return setEditIssuer(obj);
                        }} type="Issuer" />
                        <UpdateForm obj={editIssuer} setter={setEditIssuer} updater={(obj) => updateIssuer(obj)} passwordChanged={issuerPasswordChanged} setPasswordChanged={setIssuerPasswordChanged} type={"Issuer"} input_types={Issuer.input_types} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Student</h4>
                        <ObjectSelector obj={editStudent} setter={(obj) => {
                            setStudentPasswordChanged(false);
                            return setEditStudent(obj);
                        }} type={"Student"} />
                        <UpdateForm obj={editStudent} setter={setEditStudent} updater={(obj) => updateStudent(obj)} passwordChanged={studentPasswordChanged} setPasswordChanged={setStudentPasswordChanged} type={"Student"} input_types={Student.input_types} />
                    </div>
                </div>
            </div>
            <div className="admin-container">
                <h3 className="heading full-heading">Delete Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Delete Badge</h4>
                        <ObjectSelector obj={delBadge} setter={setDelBadge} type={"Badge"} />
                        <DeleteForm obj={delBadge} deleter={(obj) => deleteBadge(delBadge)} type={"Badge"} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Issuer</h4>
                        <ObjectSelector obj={delIssuer} setter={setDelIssuer} type={"Issuer"} />
                        <DeleteForm obj={delIssuer} deleter={(obj) => deleteIssuer(delIssuer)} type={"Issuer"} />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Student</h4>
                        <ObjectSelector obj={delStudent} setter={setDelStudent} type={"Student"} />
                        <DeleteForm obj={delStudent} deleter={(obj) => deleteStudent(delStudent)} type={"Student"} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssuerPage;
