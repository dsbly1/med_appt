import React, { useState } from 'react';
import FindDoctorSearch from './FindDoctorSearch/FindDoctorSearch';
import DoctorList from './DoctorCard/DoctorCard';
import './BookingConsultation.css';

const BookingConsultation = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="booking-consultation-container">
            {/* Search Section */}
            <div className="booking-search-section">
                <h2 className="booking-title">Book a Consultation</h2>
                <p className="booking-subtitle">
                    Find the right doctor and book your appointment instantly
                </p>
                <FindDoctorSearch onSearch={setSearchQuery} />
            </div>

            {/* Doctor List Section */}
            <div className="booking-doctors-section">
                <DoctorList searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default BookingConsultation;
