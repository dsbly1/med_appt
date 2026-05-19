import React from 'react';
import './ProfileCard.css';

const ProfileCard = ({ onClose }) => {
    const email = sessionStorage.getItem('email') || 'guest@example.com';
    const name = sessionStorage.getItem('name') || email.split('@')[0];
    const phone = sessionStorage.getItem('phone') || 'Not provided';
    const username = email.split('@')[0];

    return (
        <div className="profile-card">
            <div className="profile-card__header">
                <div className="profile-avatar">
                    {username.charAt(0).toUpperCase()}
                </div>
                <button className="profile-close" onClick={onClose}>✕</button>
            </div>
            <div className="profile-card__body">
                <h3 className="profile-name">{name}</h3>
                <p className="profile-username">@{username}</p>
                <div className="profile-divider"></div>
                <div className="profile-info">
                    <div className="profile-info-item">
                        <span className="profile-info-icon">📧</span>
                        <span className="profile-info-text">{email}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-icon">📱</span>
                        <span className="profile-info-text">{phone}</span>
                    </div>
                    <div className="profile-info-item">
                        <span className="profile-info-icon">🏥</span>
                        <span className="profile-info-text">StayHealthy Member</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileCard;
