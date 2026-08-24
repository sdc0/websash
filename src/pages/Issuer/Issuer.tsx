import { useState, useEffect, useContext } from "react"

import { Badge, Issuance, Issuer, Student } from "../../lib/models";
import { getBadges, getStudents, getIssuers, getIssuances, createBadge, createStudent, createIssuer, createIssuance, updateBadge, updateStudent, updateIssuer, updateIssuance, deleteBadge, deleteStudent, deleteIssuer, deleteIssuance } from "../../lib/api";

import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import BadgeNode from "../../components/BadgeNode/BadgeNode";
import CreateForm from "../../components/CreateForm/CreateForm";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import DeleteForm from "../../components/DeleteForm/DeleteForm";

import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

import "./Issuer.css";

function IssuerPage() {
    /*const [badges, setBadges] = useState<Badge[]>([]);
    const [issuers, setIssuers] = useState<Issuer[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [issuances, setIssuances] = useState<Issuance[]>([]);


    const [addBadge, setAddBadge] = useState<Badge>(new Badge());
    const [addIssuer, setAddIssuer] = useState<Issuer>(new Issuer());
    const [addStudent, setAddStudent] = useState<Student>(new Student());
    const [addIssuance, setAddIssuance] = useState<Issuance>(new Issuance());


    const [editBadge, setEditBadge] = useState<Badge>(new Badge());
    const [editIssuer, setEditIssuer] = useState<Issuer>(new Issuer());
    const [editStudent, setEditStudent] = useState<Student>(new Student());
    const [editIssuance, setEditIssuance] = useState<Issuance>(new Issuance());

    const [issuerPasswordChanged, setIssuerPasswordChanged] = useState<boolean>(false);
    const [studentPasswordChanged, setStudentPasswordChanged] = useState<boolean>(false);
    

    const [delBadge, setDelBadge] = useState<Badge>(new Badge());
    const [delIssuer, setDelIssuer] = useState<Issuer>(new Issuer());
    const [delStudent, setDelStudent] = useState<Student>(new Student());
    const [delIssuance, setDelIssuance] = useState<Issuance>(new Issuance());


    const refreshBadges = () => { getBadges().then((b) => setBadges(b)); };
    const refreshIssuers = () => { getIssuers().then((i) => setIssuers(i)); };
    const refreshStudents = () => { getStudents().then((s) => setStudents(s)); };
    const refreshIssuances = () => { getIssuances().then((i) => setIssuances(i)); };*/

    const {
        badges, setBadges, refreshBadges,
        issuers, setIssuers, refreshIssuers,
        students, setStudents, refreshStudents,
        issuances, setIssuances, refreshIssuances
    } = useContext(GlobalContext);

    useEffect(() => {
        refreshBadges();
        refreshIssuers();
        refreshStudents();
        refreshIssuances();
    }, []);

    return (
        <div className="admin-page">
            <div className="admin-container">
                <h3 className="heading full-heading">Add New</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Create Badge</h4>
                        <CreateForm 
                            creator={(obj) => createBadge(obj)} 
                            type={"Badge"} 
                            input_types={Badge.input_types} 
                            refresher={() => {
                                console.log("refreshing create badge");
                                refreshBadges();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Issuer</h4>
                        <CreateForm 
                            creator={(obj) => createIssuer(obj)} 
                            type={"Issuer"} 
                            input_types={Issuer.input_types} 
                            refresher={() => {
                                console.log("refreshing create issuer");
                                refreshIssuers();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Student</h4>
                        <CreateForm 
                            creator={(obj) => createStudent(obj)} 
                            type={"Student"} 
                            input_types={Student.input_types} 
                            refresher={() => {
                                console.log("refreshing create student");
                                refreshStudents();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Create Issuance</h4>
                        <CreateForm 
                            creator={(obj) => createIssuance(obj)} 
                            type={"Issuance"} 
                            input_types={Issuance.input_types} 
                            lists={{
                                "Badge": badges,
                                "Issuer": issuers,
                                "Student": students
                            }} 
                            refresher={() => {
                                console.log("refreshing create issuance");
                                
                                refreshBadges();
                                refreshIssuers();
                                refreshStudents();
                                refreshIssuances();
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="admin-container">
                <h3 className="heading full-heading">Edit Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Edit Badge</h4>
                        <UpdateForm 
                            updater={(obj) => updateBadge(obj)} 
                            type={"Badge"} 
                            input_types={Badge.input_types} 
                            refresher={() => {
                                console.log("refreshing edit badge");
                                refreshBadges();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Issuer</h4>
                        <UpdateForm 
                            updater={(obj) => updateIssuer(obj)} 
                            type={"Issuer"} 
                            input_types={Issuer.input_types} 
                            refresher={() => {
                                console.log("refreshing edit issuer");
                                refreshIssuers();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Student</h4>
                        <UpdateForm 
                            updater={(obj) => updateStudent(obj)} 
                            type={"Student"} 
                            input_types={Student.input_types} 
                            refresher={() => {
                                console.log("refreshing edit student");
                                refreshStudents();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Edit Issuance</h4>
                        <UpdateForm 
                            updater={(obj) => updateIssuance(obj)} 
                            type={"Issuance"} 
                            input_types={Issuance.input_types} 
                            refresher={() => {
                                console.log("refreshing edit issuance");
                                refreshIssuances();
                            }} 
                        />
                    </div>
                </div>
            </div>
            <div className="admin-container">
                <h3 className="heading full-heading">Delete Existing</h3>
                <div className="form-container">
                    <div className="sub-container">
                        <h4 className="heading">Delete Badge</h4>
                        <DeleteForm 
                            deleter={(obj) => deleteBadge(obj)} 
                            type={"Badge"} 
                            refresher={() => {
                                console.log("refreshing delete badge");
                                refreshBadges();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Issuer</h4>
                        <DeleteForm 
                            deleter={(obj) => deleteIssuer(obj)} 
                            type={"Issuer"} 
                            refresher={() => {
                                console.log("refreshing delete issuer");
                                refreshIssuers();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Student</h4>
                        <DeleteForm 
                            deleter={(obj) => deleteStudent(obj)} 
                            type={"Student"} 
                            refresher={() => {
                                console.log("refreshing delete student");
                                refreshStudents();
                            }} 
                        />
                    </div>
                    <div className="sub-container">
                        <h4 className="heading">Delete Issuance</h4>
                        <DeleteForm 
                            deleter={(obj) => deleteIssuance(obj)} 
                            type={"Issuance"} 
                            refresher={() => {
                                console.log("refreshing delete issuance");
                                refreshIssuances();
                            }} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default IssuerPage;
