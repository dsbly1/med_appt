import React from 'react';
import './DoctorCard.css';

const doctors = [
    {
        id: 1,
        name: "Dr. Sarah Johnson",
        specialty: "General Physician",
        experience: "8 Years",
        rating: "4.8",
        reviews: 320,
        image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
    },
    {
        id: 2,
        name: "Dr. Michael Chen",
        specialty: "Dermatologist",
        experience: "12 Years",
        rating: "4.9",
        reviews: 512,
        image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
    },
    {
        id: 3,
        name: "Dr. Emily Davis",
        specialty: "Gynecologist",
        experience: "10 Years",
        rating: "4.7",
        reviews: 280,
        image: "https://img.freepik.com/free-photo/female-doctor-hospital_23-2148827757.jpg",
    },
    {
        id: 4,
        name: "Dr. James Wilson",
        specialty: "Dentist",
        experience: "6 Years",
        rating: "4.6",
        reviews: 195,
        image: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
    },
    {
        id: 5,
        name: "Dr. Priya Patel",
        specialty: "ENT Specialist",
        experience: "9 Years",
        rating: "4.8",
        reviews: 410,
        image: "https://img.freepik.com/free-photo/beautiful-young-female-doctor-looking-camera-office_1301-7807.jpg",
    },
];

const DoctorCard = ({ name, specialty, experience, rating, reviews, image }) => {
    return (
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
                <div>
                    <button className="book-appointment-btn">
                        <div>Book Appointment</div>
                        <div>No Booking Fee</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

const DoctorList = () => {
    return (
        <div className="doctor-list-container">
            <h2 className="doctor-list-title">Available Doctors</h2>
            <div className="doctor-cards-grid">
                {doctors.map((doc) => (
                    <DoctorCard
                        key={doc.id}
                        name={doc.name}
                        specialty={doc.specialty}
                        experience={doc.experience}
                        rating={doc.rating}
                        reviews={doc.reviews}
                        image={doc.image}
                    />
                ))}
            </div>
        </div>
    );
};

export default DoctorList;
