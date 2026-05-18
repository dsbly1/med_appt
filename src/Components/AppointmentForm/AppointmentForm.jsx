import React, { useState } from 'react';
import './AppointmentForm.css';

const AppointmentForm = ({ doctorName, onClose, onBookingSuccess }) => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [errors, setErrors] = useState({});

    const validate = () => {
        const newErrors = {};
        if (!name.trim()) newErrors.name = "Name is required.";
        if (!phone.trim()) {
            newErrors.phone = "Phone number is required.";
        } else if (!/^\d{10}$/.test(phone.trim())) {
            newErrors.phone = "Phone number must be exactly 10 digits.";
        }
        if (!date) newErrors.date = "Date is required.";
        if (!time) newErrors.time = "Time slot is required.";
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            onBookingSuccess({ name, phone, date, time });
            onClose();
        }
    };

    return (
        <div className="appointment-form-container">
            <div className="appointment-form-header">
                <h3>Book Appointment</h3>
                {doctorName && (
                    <p className="doctor-name-label">with <strong>{doctorName}</strong></p>
                )}
                <button className="close-btn-x" onClick={onClose}>X</button>
            </div>
            <form onSubmit={handleSubmit} className="appointment-form">
                <div className="form-group">
                    <label htmlFor="apt-name">Patient Name</label>
                    <input type="text" id="apt-name" className="form-control"
                        placeholder="Enter your full name" value={name}
                        onChange={(e) => setName(e.target.value)} />
                    {errors.name && <span className="error">{errors.name}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="apt-phone">Phone Number</label>
                    <input type="tel" id="apt-phone" className="form-control"
                        placeholder="Enter 10-digit phone number" value={phone}
                        onChange={(e) => setPhone(e.target.value)} />
                    {errors.phone && <span className="error">{errors.phone}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="apt-date">Appointment Date</label>
                    <input type="date" id="apt-date" className="form-control"
                        value={date} min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setDate(e.target.value)} />
                    {errors.date && <span className="error">{errors.date}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="apt-time">Time Slot</label>
                    <select id="apt-time" className="form-control" value={time}
                        onChange={(e) => setTime(e.target.value)}>
                        <option value="" disabled>Select a time slot</option>
                        <option value="09:00 AM">09:00 AM</option>
                        <option value="10:00 AM">10:00 AM</option>
                        <option value="11:00 AM">11:00 AM</option>
                        <option value="12:00 PM">12:00 PM</option>
                        <option value="02:00 PM">02:00 PM</option>
                        <option value="03:00 PM">03:00 PM</option>
                        <option value="04:00 PM">04:00 PM</option>
                        <option value="05:00 PM">05:00 PM</option>
                    </select>
                    {errors.time && <span className="error">{errors.time}</span>}
                </div>
                <div className="form-btn-group">
                    <button type="submit" className="btn-book">Confirm Appointment</button>
                    <button type="button" className="btn-cancel" onClick={onClose}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default AppointmentForm;
