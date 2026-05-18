import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './DoctorCard.css';
import AppointmentForm from '../AppointmentForm/AppointmentForm';

const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", experience: "8 Years", rating: "4.8", reviews: 320, image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Dermatologist", experience: "12 Years", rating: "4.9", reviews: 512, image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Gynecologist", experience: "10 Years", rating: "4.7", reviews: 280, image: "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827757.jpg" },
    { id: 4, name: "Dr. James Wilson", specialty: "Dentist", experience: "6 Years", rating: "4.6", reviews: 195, image: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg" },
    { id: 5, name: "Dr. Priya Patel", specialty: "ENT Specialist", experience: "9 Years", rating: "4.8", reviews: 410, image: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg" },
];

const DoctorCard = ({ name, specialty, experience, rating, reviews, image }) => {
    const [showForm, setShowForm] = useState(false);
    const [isBooked, setIsBooked] = useState(false);
    const [appointmentDetails, setAppointmentDetails] = useState(null);

    const handleBookingSuccess = (details) => {
        setIsBooked(true);
        setAppointmentDetails(details);
        setShowForm(false);
    };

    const handleCancel = () => {
        setIsBooked(false);
        setAppointmentDetails(null);
    };

    return (
        <>
            <div className="doctor-card-container">
                <div className="doctor-card-img-container">
                    <img src={image} alt={name} className="doctor-card-img" />
                </div>
                <div className="doctor-card-details-container">
                    <div className="doctor-card-name">{name}</div>
                    <div className="doctor-card-specialty">{specialty}</div>
                    <div className="doctor-card-stats">
                        <span className="doctor-card-experience">
                            <i className="fa fa-briefcase"></i> {experience}
                        </span>
                        <span className="doctor-card-rating">
                            <i className="fa fa-star"></i> {rating} ({reviews} reviews)
                        </span>
                    </div>
                    {isBooked && appointmentDetails && (
                        <div className="appointment-confirmed">
                            <div className="confirmed-text">Appointment Booked!</div>
                            <div className="confirmed-details">
                                {appointmentDetails.date} at {appointmentDetails.time}
                            </div>
                            <div className="confirmed-details">
                                {appointmentDetails.name}
                            </div>
                        </div>
                    )}
                    <div className="doctor-card-options-container">
                        {!isBooked ? (
                            <button className="book-appointment-btn" onClick={() => setShowForm(true)}>
                                <div>Book Appointment</div>
                                <div>No Booking Fee</div>
                            </button>
                        ) : (
                            <button className="cancel-appointment-btn" onClick={handleCancel}>
                                <div>Cancel Appointment</div>
                                <div>Free Cancellation</div>
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {showForm && ReactDOM.createPortal(
                <div className="modal-overlay" onClick={() => setShowForm(false)}>
                    <div onClick={(e) => e.stopPropagation()}>
                        <AppointmentForm
                            doctorName={name}
                            onClose={() => setShowForm(false)}
                            onBookingSuccess={handleBookingSuccess}
                        />
                    </div>
                </div>,
                document.body
            )}
        </>
    );
};

const DoctorList = ({ searchQuery }) => {
    const filteredDoctors = searchQuery
        ? doctors.filter((doc) =>
            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
            doc.name.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : doctors;

    return (
        <div className="doctor-list-container">
            <h2 className="doctor-list-title">Available Doctors</h2>
            {filteredDoctors.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#666' }}>
                    No doctors found for "{searchQuery}"
                </p>
            ) : (
                <div className="doctor-cards-grid">
                    {filteredDoctors.map((doc) => (
                        <DoctorCard key={doc.id} {...doc} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default DoctorList;
