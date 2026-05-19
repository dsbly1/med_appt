import React, { useState } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../ProfileCard/ProfileCard";

const Navbar = () => {
    const navigate = useNavigate();
    const authtoken = sessionStorage.getItem("auth-token");
    const email = sessionStorage.getItem("email");
    const username = email ? email.split("@")[0] : "";
    const [showProfile, setShowProfile] = useState(false);

    const handleClick = () => {
        const navLinks = document.querySelector(".nav__links");
        const navIcon = document.querySelector(".nav__icon i");
        navLinks.classList.toggle("active");
        if (navLinks.classList.contains("active")) {
            navIcon.classList.remove("fa-bars");
            navIcon.classList.add("fa-times");
        } else {
            navIcon.classList.remove("fa-times");
            navIcon.classList.add("fa-bars");
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        navigate("/login");
        window.location.reload();
    };

    return (
        <nav>
            <div className="nav__logo">
                <Link to="/">
                    StayHealthy
                    <svg xmlns="http://www.w3.org/2000/svg" height="26" width="26"
                        viewBox="0 0 1000 1000" style={{fill:"#3685fb"}}>
                        <title>Doctor With Stethoscope SVG icon</title>
                        <g><g>
                            <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z"></path>
                            <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z"></path>
                            <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44,77.2-88.8V583.9C377.3,568.7,307.5,490,306.8,395H693.2z"></path>
                            <path d="M781.7,581c-39.8,0-72.2,32.4-72.2,72.2c0,34.2,23.9,62.9,56,70.4V775c0,75.6-61.5,137.1-137.1,137.1S491.3,850.6,491.3,775v-10c0-11-9-20-20-20s-20,9-20,20v10c0,97.8,79.5,177.1,177.1,177.1S805.5,872.8,805.5,775v-51.4c32.1-7.5,56-36.2,56-70.4C861.5,613.4,829.1,581,781.7,581z M781.7,685.4c-17.8,0-32.2-14.4-32.2-32.2s14.4-32.2,32.2-32.2s32.2,14.4,32.2,32.2S799.5,685.4,781.7,685.4z"></path>
                        </g></g>
                    </svg>
                </Link>
                <span>.</span>
            </div>
            <div className="nav__icon" onClick={handleClick}>
                <i className="fa fa-bars"></i>
            </div>
            <ul className="nav__links active">
                <li className="link"><Link to="/">Home</Link></li>
                <li className="link"><Link to="/booking">Appointments</Link></li>
                {authtoken ? (
                    <>
                        {/* Profile dropdown */}
                        <li className="link welcome-user" style={{ position: 'relative' }}>
                            <span
                                style={{ color: '#0d213f', fontWeight: 500, cursor: 'pointer' }}
                                onClick={() => setShowProfile(!showProfile)}
                            >
                                👤 Welcome, {username} ▾
                            </span>
                            {showProfile && (
                                <ProfileCard onClose={() => setShowProfile(false)} />
                            )}
                        </li>
                        <li className="link">
                            <button className="btn1" onClick={handleLogout}>Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className="link">
                            <Link to="/sign-up"><button className="btn1">Sign Up</button></Link>
                        </li>
                        <li className="link">
                            <Link to="/login"><button className="btn1">Login</button></Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
