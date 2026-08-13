import { useState } from "react"
import { Badge, Issuance, Issuer, Student } from "../../lib/models";
import { createBadge, createStudent, createIssuer } from "../../lib/api"
import Create_Form from "../../components/Create_Form/Create_Form";

function IssuerPage() {
    const [selectedAdd, setSelectedAdd] = useState<Badge | Student | Issuer | Issuance>(new Badge(0, "", "", "", "", "", ""));
    const [creator, setCreator] = useState((obj) => (obj) => createBadge(obj));

    return (
        <div>
            <div>
                <h3>Add New</h3>
                <select onChange={(e) => {
                    e.preventDefault();
                    if (e.target.value === "badge") {
                        setSelectedAdd(new Badge(0, "", "", "", "", "", ""));
                        setCreator((obj) => (obj) => createBadge(obj));
                    } else if (e.target.value === "student") {
                        setSelectedAdd(new Student(0, "", "", ""));
                        setCreator((obj) => (obj) => createStudent(obj));
                    } else {
                        setSelectedAdd(new Issuer(0, "", "", "", ""));
                        setCreator((obj) => (obj) => createIssuer(obj));
                    }
                    
                    console.log(e.target.value);
                }}>
                    <option value="badge">Badge</option>
                    <option value="issuer">Issuer</option>
                    <option value="student">Student</option>
                </select>
                <Create_Form obj={selectedAdd} setter={setSelectedAdd} creator={creator} /> 
            </div>
            <div>
                <h3>Edit Existing</h3>
                <select>
                    <option>Badge</option>
                </select>
            </div>
            <div>
                <h3>Delete Existing</h3>
            </div>
        </div>
    );
}

export default IssuerPage;
