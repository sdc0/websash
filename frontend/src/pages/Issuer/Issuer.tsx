import { useState, useEffect, useContext } from "react"

import { Badge, Issuance, Issuer, Student } from "../../lib/models";
import { 
    getBadges, getStudents, getIssuers, getIssuances, getBadgesForIssuer,
    createBadge, createStudent, createIssuer, createIssuance, 
    updateBadge, updateStudent, updateIssuer, updateIssuance, 
    deleteBadge, deleteStudent, deleteIssuer, deleteIssuance 
} from "../../lib/api";

import ObjectSelector from "../../components/ObjectSelector/ObjectSelector";
import BadgeNode from "../../components/BadgeNode/BadgeNode";
import CreateForm from "../../components/CreateForm/CreateForm";
import UpdateForm from "../../components/UpdateForm/UpdateForm";
import DeleteForm from "../../components/DeleteForm/DeleteForm";

import { GlobalContext } from "../../components/GlobalContext/GlobalContext";

import "./Issuer.css";

function IssuerPage() {
    const {
        badges, setBadges, 
        issuers, setIssuers, 
        students, setStudents, 
        issuances, setIssuances, 
        searchText, setSearchText
    } = useContext(GlobalContext);

    const refreshBadges = () => {
        getBadgesForIssuer().then((b) => {
            setBadges(b);
        });
    };

    const refreshIssuers = () => {
        getIssuers().then((i) => setIssuers(i));
    };

    const refreshStudents = () => {
        getStudents().then((s) => setStudents(s));
    };

    const refreshIssuances = () => {
        getIssuances().then((i) => setIssuances(i));
    };

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
