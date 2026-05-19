import React, { useEffect, useState } from 'react';
import './Notification.css';

const Notification = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [doctorData, setDoctorData] = useState(null);
    const [appointmentData, setAppointmentData] = useState(null);
    const [showNotification, setShowNotification] = useState(true);

    const loadData = () => {
        const storedUsername = sessionStorage.getItem('email');
        const storedDoctorData = JSON.parse(localStorage.getItem('doctorData'));
        const storedAppointmentData = JSON.parse(localStorage.getItem('appointmentData'));

        if (storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
        if (storedDoctorData) setDoctorData(storedDoctorData);
        if (storedAppointmentData) {
            setAppointmentData(storedAppointmentData);
            setShowNotification(true);
        }
    };

    useEffect(() => {
        loadData();

        // Listen for storage changes across pages
        window.addEventListener('storage', loadData);
        window.addEventListener('appointmentBooked', loadData);

        return () => {
            window.removeEventListener('storage', loadData);
            window.removeEventListener('appointmentBooked', loadData);
        };
    }, []);

    const handleCancel = () => {
        setShowNotification(false);
        setAppointmentData(null);
        setDoctorData(null);
        localStorage.removeItem('appointmentData');
        localStorage.removeItem('doctorData');
    };

    return (
        <div>
            {children}
            {appointmentData && showNotification && (
                <div className="notification-wrapper">
                    <div className="appointment-card">
                        <div className="appointment-card__header">
                            <span className="notification-icon">🔔</span>
                            <h3 className="appointment-card__title">
                                Appointment Confirmed!
                            </h3>
                            <button className="notification-close"
                                onClick={() => setShowNotification(false)}>✕</button>
                        </div>
                        <div className="appointment-card__content">
                            <p className="appointment-card__message">
                                <strong>👤 Patient:</strong> {appointmentData?.name}
                            </p>
                            <p className="appointment-card__message">
                                <strong>🩺 Doctor:</strong> {doctorData?.name}
                            </p>
                            <p className="appointment-card__message">
                                <strong>🏥 Specialty:</strong> {doctorData?.specialty}
                            </p>
                            <p className="appointment-card__message">
                                <strong>📅 Date:</strong> {appointmentData?.date}
                            </p>
                            <p className="appointment-card__message">
                                <strong>⏰ Time:</strong> {appointmentData?.time}
                            </p>
                        </div>
                        <div className="appointment-card__actions">
                            <button className="cancel-notification-btn"
                                onClick={handleCancel}>
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
