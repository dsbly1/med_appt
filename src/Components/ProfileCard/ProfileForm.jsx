import React, { useEffect, useState } from "react";
import { API_URL } from "../../config";
import { useNavigate } from "react-router-dom";
import "./ProfileCard.css";

const ProfileForm = () => {
    const [userDetails, setUserDetails] = useState({
        name: '',
        phone: '',
        email: ''
    });
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [editMode, setEditMode] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const authtoken = sessionStorage.getItem("auth-token");
        if (!authtoken) {
            navigate("/login");
        } else {
            fetchUserProfile();
        }
    }, [navigate]);

    const fetchUserProfile = async () => {
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            if (!authtoken) {
                navigate("/login");
            } else {
                const response = await fetch(`${API_URL}/api/auth/user`, {
                    headers: {
                        "Authorization": `Bearer ${authtoken}`,
                        "Email": email,
                    },
                });
                if (response.ok) {
                    const user = await response.json();
                    setUserDetails(user);
                    setUpdatedDetails(user);
                } else {
                    throw new Error("Failed to fetch user profile");
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleEdit = () => setEditMode(true);

    const handleInputChange = (e) => {
        setUpdatedDetails({
            ...updatedDetails,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authtoken = sessionStorage.getItem("auth-token");
            const email = sessionStorage.getItem("email");
            if (!authtoken || !email) {
                navigate("/login");
                return;
            }
            const response = await fetch(`${API_URL}/api/auth/user`, {
                method: "PUT",
                headers: {
                    "Authorization": `Bearer ${authtoken}`,
                    "Content-Type": "application/json",
                    "Email": email,
                },
                body: JSON.stringify(updatedDetails),
            });
            if (response.ok) {
                sessionStorage.setItem("name", updatedDetails.name);
                sessionStorage.setItem("phone", updatedDetails.phone);
                setUserDetails(updatedDetails);
                setEditMode(false);
                alert("Profile Updated Successfully!");
                navigate("/");
            } else {
                throw new Error("Failed to update profile");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="profile-form-page">
            <div className="profile-container">
                <div className="profile-container__header">
                    <div className="profile-avatar large">
                        {userDetails.name ? userDetails.name.charAt(0).toUpperCase() : '?'}
                    </div>
                    <h2>My Profile</h2>
                </div>

                {editMode ? (
                    <form onSubmit={handleSubmit} className="profile-edit-form">
                        <h3 className="profile-section-title">Edit Profile</h3>

                        {/* Email - disabled */}
                        <div className="profile-field">
                            <label>Email</label>
                            <input
                                type="email"
                                name="email"
                                value={userDetails.email || ''}
                                disabled
                                className="profile-input disabled"
                            />
                        </div>

                        {/* Name - editable */}
                        <div className="profile-field">
                            <label>Name</label>
                            <input
                                type="text"
                                name="name"
                                value={updatedDetails.name || ''}
                                onChange={handleInputChange}
                                className="profile-input"
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Phone - editable */}
                        <div className="profile-field">
                            <label>Phone</label>
                            <input
                                type="tel"
                                name="phone"
                                value={updatedDetails.phone || ''}
                                onChange={handleInputChange}
                                className="profile-input"
                                placeholder="Enter your phone"
                            />
                        </div>

                        <div className="profile-btn-group">
                            <button type="submit" className="profile-save-btn">Save Changes</button>
                            <button type="button" className="profile-cancel-btn"
                                onClick={() => setEditMode(false)}>Cancel</button>
                        </div>
                    </form>
                ) : (
                    <div className="profile-details">
                        <h3 className="profile-section-title">
                            Welcome, {userDetails.name || 'User'}!
                        </h3>

                        <div className="profile-info-grid">
                            <div className="profile-info-row">
                                <span className="profile-label">📧 Email</span>
                                <span className="profile-value">{userDetails.email || 'N/A'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-label">📱 Phone</span>
                                <span className="profile-value">{userDetails.phone || 'Not provided'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-label">👤 Name</span>
                                <span className="profile-value">{userDetails.name || 'N/A'}</span>
                            </div>
                            <div className="profile-info-row">
                                <span className="profile-label">🏥 Member</span>
                                <span className="profile-value">StayHealthy Member</span>
                            </div>
                        </div>

                        <button className="profile-edit-btn" onClick={handleEdit}>
                            ✏️ Edit Profile
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileForm;
