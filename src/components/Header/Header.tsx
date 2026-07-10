import { useNavigate } from "react-router-dom";

import home from "../../home.svg";
import profile from "../../profile.svg";
import search from "../../search.svg";
import "./Header.css";

function Header() {
    const nav = useNavigate();

    return (
        <div className="header-bar">
            <div className="header-sector" id="home-sector">
                <div onClick={() => nav("/")} className="header-item" id="home">
                    <img src={home} alt='' />
                    <p>Home</p>
                </div>
            </div>
            <div className="header-sector" id="search-sector">
                <div className="header-item" id="search">
                    <img src={search} alt=''/>
                    <input type="text" placeholder="Search for badges..." />
                </div>
            </div>
            <div className="header-sector" id="login-sector">
                <div onClick={() => nav("/login")} className="header-item" id="login">
                    <img src={profile} alt='' />
                    <p>Login</p>
                </div>
            </div>
        </div>
    );
}

export default Header;