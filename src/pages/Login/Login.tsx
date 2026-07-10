import React from "react";
import { getToken } from "../../lib/api";
import { useNavigate } from "react-router-dom";

function Login() {
    const nav = useNavigate();

    function submitIssuer(e: React.SubmitEvent) {
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;
        const password = (e.target.querySelector('input[name="password"]') as HTMLInputElement).value;

        getToken(email, password).then((res) => {
            if (res == null) return;

            localStorage.setItem("issuerToken", JSON.stringify(res["token"]));
            localStorage.setItem("issuerID", JSON.stringify(res["id"]));
            nav("/");
        });
    }

    function submitStudent(e: React.SubmitEvent) {
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;
        const password = (e.target.querySelector('input[name="password"]') as HTMLInputElement).value;

        getToken(email, password, false).then((res) => {
            if (res == null) return;

            console.log(res);
            localStorage.setItem("studentToken", JSON.stringify(res["token"]));
            localStorage.setItem("studentID", JSON.stringify(res["id"]));
            nav("/student");
        });
    }

    return (
        <div>
            <div>
                <h3>Issuer</h3>
                <form onSubmit={(e) => { e.preventDefault(); submitIssuer(e); }}>
                    <label>
                        Email:
                        <input name="email" type="email" placeholder="Enter email here..." />
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" placeholder="Enter Password here..." />
                    </label>
                    <input type="submit" />
                </form>
            </div>
            <div>
                <h3>Student</h3>
                <form onSubmit={(e) => { e.preventDefault(); submitStudent(e); }}>
                    <label>
                        Email:
                        <input name="email" type="email" placeholder="Enter email here..." />
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" placeholder="Enter Password here..." />
                    </label>
                    <input type="submit" />
                </form>
            </div>
        </div>
    );
}

export default Login;