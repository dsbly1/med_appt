import React, { useState } from 'react';
import GiveReviews from './GiveReviews';
import './ReviewForm.css';

const doctors = [
    { id: 1, name: "Dr. Sarah Johnson", specialty: "General Physician", date: "2026-05-18" },
    { id: 2, name: "Dr. Michael Chen", specialty: "Dermatologist", date: "2026-05-17" },
    { id: 3, name: "Dr. Emily Davis", specialty: "Gynecologist", date: "2026-05-16" },
    { id: 4, name: "Dr. James Wilson", specialty: "Dentist", date: "2026-05-15" },
    { id: 5, name: "Dr. Priya Patel", specialty: "ENT Specialist", date: "2026-05-14" },
];

const ReviewFormApp = () => {
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    return (
        <div style={{ marginTop: '80px', padding: '20px', backgroundColor: '#f0f4ff', minHeight: '100vh' }}>
            <h2 style={{ textAlign: 'center', color: '#0d213f', marginBottom: '30px' }}>
                Your Appointments
            </h2>

            {/* Appointments Table */}
            <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <table className="appointments-table">
                    <thead>
                        <tr>
                            <th>Doctor</th>
                            <th>Specialty</th>
                            <th>Date</th>
                            <th>Provide Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {doctors.map((doc) => (
                            <tr key={doc.id}>
                                <td>{doc.name}</td>
                                <td>{doc.specialty}</td>
                                <td>{doc.date}</td>
                                <td>
                                    <button
                                        className="give-feedback-btn"
                                        style={{ width: 'auto', padding: '8px 16px', fontSize: '0.85rem' }}
                                        onClick={() => setSelectedDoctor(doc)}
                                    >
                                        Click Here
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ReviewForm Modal */}
            {selectedDoctor && (
                <div className="modal-overlay" onClick={() => setSelectedDoctor(null)}>
                    <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: '620px' }}>
                        <GiveReviews
                            doctorName={selectedDoctor.name}
                            specialty={selectedDoctor.specialty}
                            date={selectedDoctor.date}
                            onClose={() => setSelectedDoctor(null)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewFormApp;
