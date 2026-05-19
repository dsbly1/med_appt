import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(true);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(
            localStorage.getItem(storedDoctorData?.name)
        );

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }

        if (storedDoctorData) {
            setDoctorData(storedDoctorData);
        }

        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
        }
    }, []);

    // Hide notification when appointment is cancelled
    const handleCancel = () => {
        setShowNotification(false);
        setAppointmentData(null);
        localStorage.removeItem(doctorData?.name);
        localStorage.removeItem('doctorData');
    };

    return (
        <div>
            {children}

            {/* Notification card */}
            {isLoggedIn && appointmentData && showNotification && (
                <div className="notification-wrapper">
                    <div className="appointment-card">
                        <div className="appointment-card__header">
                            <span className="notification-icon">🔔</span>
                            <h3 className="appointment-card__title">
                                Appointment Confirmed!
                            </h3>
                            <button
                                className="notification-close"
                                onClick={() => setShowNotification(false)}
                            >
                                ✕
                            </button>
                        </div>

                        <div className="appointment-card__content">
                            <p className="appointment-card__message">
                                <strong>👤 Patient:</strong>{' '}
                                {username.split('@')[0]}
                            </p>
                            <p className="appointment-card__message">
                                <strong>🩺 Doctor:</strong> {doctorData?.name}
                            </p>
                            <p className="appointment-card__message">
                                <strong>🏥 Specialty:</strong>{' '}
                                {doctorData?.specialty}
                            </p>
                            <p className="appointment-card__message">
                                <strong>📅 Date:</strong>{' '}
                                {appointmentData?.date}
                            </p>
                            <p className="appointment-card__message">
                                <strong>⏰ Time:</strong>{' '}
                                {appointmentData?.time}
                            </p>
                        </div>

                        <div className="appointment-card__actions">
                            <button
                                className="cancel-notification-btn"
                                onClick={handleCancel}
                            >
                                Cancel Appointment
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notification;
