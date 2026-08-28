import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { getToken, getSalt, createStudent, createIssuer } from "../../lib/api";
import { generateSalt, generateHash } from "../../lib/helper";
import { Student, Issuer } from "../../lib/models";

import "./Login.css";

function Login() {
    const [issuerPage, setIssuerPage] = useState<boolean>(false);
    const [signUp, setSignUp] = useState<boolean>(false);
    
    const nav = useNavigate();

    function submitIssuer(e: React.SubmitEvent) {
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;

        getSalt(email, true).then((salt) => {
            generateHash((e.target.querySelector('input[name="password"]') as HTMLInputElement).value, salt).then((password) => {
                getToken(email, password).then((res) => {
                    if (res == null) return;

                    localStorage.setItem("token", JSON.stringify(res["token"]));
                    localStorage.setItem("ID", res["id"]["id"]);
                    localStorage.setItem("token_type", "issuer");
                    nav("/issuer");
                });
            });
        });
    }

    /*function signUpIssuer(e: React.SubmitEvent) {
        const name = (e.target.querySelector('input[name="name"]') as HTMLInputElement).value;
        const department = (e.target.querySelector('input[name="department"]') as HTMLInputElement).value;
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;
        const salt = generateSalt();
        
        generateHash((e.target.querySelector('input[name="password"]') as HTMLInputElement).value, salt).then((password) => {
            let temp = new Issuer(0, name, department, email, password, salt);

            createIssuer(temp).then((ok) => {
                if (ok) {
                    getToken(email, password).then((res) => {
                        if (res == null) return;

                        localStorage.setItem("token", JSON.stringify(res['token']));
                        localStorage.setItem("ID", JSON.stringify(res['id']));
                        localStorage.setItem("token_type", "issuer");
                        nav("/issuer");
                    });
                }
            });
        });
    }*/

    function submitStudent(e: React.SubmitEvent) {
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;

        getSalt(email, false).then((salt) => {
            generateHash((e.target.querySelector('input[name="password"]') as HTMLInputElement).value, salt).then((password) => {
                getToken(email, password, false).then((res) => {
                    if (res == null) return;

                    localStorage.setItem("token", JSON.stringify(res["token"]));
                    localStorage.setItem("ID", JSON.stringify(res["id"]));
                    localStorage.setItem("token_type", "student");
                    nav("/student");
                });
            });
        });
    }

    function signUpStudent(e: React.SubmitEvent) {
        const name = (e.target.querySelector('input[name="name"]') as HTMLInputElement).value;
        const email = (e.target.querySelector('input[name="email"]') as HTMLInputElement).value;
        const salt = generateSalt();
        
        generateHash((e.target.querySelector('input[name="password"]') as HTMLInputElement).value, salt).then((password) => {
            let temp = new Student({
                id: 0, 
                name: name, 
                email: email, 
                password: password, 
                salt: salt
            });

            createStudent(temp).then((ok) => {
                if (ok) {
                    getToken(email, password, false).then((res) => {
                        if (res == null) return;

                        localStorage.setItem("token", JSON.stringify(res['token']));
                        localStorage.setItem("ID", JSON.stringify(res['id']));
                        localStorage.setItem("token_type", "student");
                        nav("/student");
                    });
                }
            });
        });
    }

    return (
        <div className="loginPage">
            <div className="loginBubble">
                <div className="switch">
                    <div className={"option userOption" + (!issuerPage ? " selected" : "")} onClick={(e) => {
                        e.preventDefault();

                        setIssuerPage(false);
                        setSignUp(false);
                    }}>
                        <p>Student</p>
                    </div>
                    <div className={"option userOption" + (issuerPage ? " selected" : "")} onClick={(e) => {
                        e.preventDefault();

                        setIssuerPage(true);
                    }}>
                        <p>Issuer</p>
                    </div>
                </div>
                {
                    (issuerPage) ? (
                        <div>
                            <h3>Issuer</h3>
                            <form onSubmit={(e) => { e.preventDefault(); submitIssuer(e); }} className="userForm">
                                <label>
                                    Email:
                                    <input name="email" type="email" placeholder="Enter email here..." />
                                </label>
                                <label>
                                    Password:
                                    <input name="password" type="password" placeholder="Enter Password here..." />
                                </label>
                                <input type="submit" value="Log In" className="submit" />
                            </form>
                        </div>
                    ) : ((signUp) ? (
                        <div>
                            <h3>Create Student</h3>
                            <form onSubmit={(e) => { e.preventDefault(); signUpStudent(e); }} className="userForm">
                                <label>
                                    Name: 
                                    <input name="name" type="text" placeholder="Enter name here..." />
                                </label>
                                <label>
                                    Email: 
                                    <input name="email" type="email" placeholder="Enter email here..." />
                                </label>
                                <label>
                                    Password: 
                                    <input name="password" type="password" placeholder="Enter password here..." />
                                </label>
                                <input type="submit" value="Sign Up" className="submit" />
                            </form>
                        </div>
                    ) : (
                        <div>
                            <h3>Student</h3>
                            <form onSubmit={(e) => { e.preventDefault(); submitStudent(e); }} className="userForm">
                                <label>
                                    Email:
                                    <input name="email" type="email" placeholder="Enter email here..." />
                                </label>
                                <label>
                                    Password:
                                    <input name="password" type="password" placeholder="Enter password here..." />
                                </label>
                                <input type="submit" value="Log In" className="submit" />
                            </form>
                        </div>
                    ))
                }
                {
                    (issuerPage) ? (
                        <></>
                    ) : (
                        <div className="switch">
                            <div className={"option signUpOption" + (!signUp ? " selected" : "")} onClick={(e) => {
                                e.preventDefault();

                                setSignUp(false);
                            }}>
                                <p>Login</p>
                            </div>
                            <div className={"option signUpOption" + (signUp ? " selected" : "")} onClick={(e) => {
                                e.preventDefault();

                                setSignUp(true);
                            }}>
                                <p>Sign Up</p>
                            </div>
                        </div>
                    )
                }
                {/*<div>
                    
                </div>
                <div>
                    <h3>Create Issuer</h3>
                    <form onSubmit={(e) => { e.preventDefault(); signUpIssuer(e); }}>
                        <label>
                            Name: 
                            <input name="name" type="text" placeholder="Enter name here..." />
                        </label>
                        <label>
                            Department: 
                            <input name="department" type="text" placeholder="Enter department here..." />
                        </label>
                        <label>
                            Email: 
                            <input name="email" type="email" placeholder="Enter email here..." />
                        </label>
                        <label>
                            Password: 
                            <input name="password" type="password" placeholder="Enter password here..." />
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
                            <input name="password" type="password" placeholder="Enter password here..." />
                        </label>
                        <input type="submit" />
                    </form>
                </div>
                <div>
                    <h3>Create Student</h3>
                    <form onSubmit={(e) => { e.preventDefault(); signUpStudent(e); }}>
                        <label>
                            Name: 
                            <input name="name" type="text" placeholder="Enter name here..." />
                        </label>
                        <label>
                            Email: 
                            <input name="email" type="email" placeholder="Enter email here..." />
                        </label>
                        <label>
                            Password: 
                            <input name="password" type="password" placeholder="Enter password here..." />
                        </label>
                        <input type="submit" />
                    </form>
                </div>*/}
            </div>
        </div>
    );
}

export default Login;
