import React, { useState } from 'react';
import './FindDoctorSearch.css';

// List of doctor specialties
const specialties = [
    "Dentist",
    "Gynecologist/obstetrician",
    "General physician",
    "Dermatologist",
    "Ear-nose-throat (ENT) specialist",
    "Homeopath",
    "Ayurveda",
];

const FindDoctorSearch = () => {
    const [searchText, setSearchText] = useState('');
    const [showList, setShowList] = useState(false);

    // Filter specialties based on search input
    const filteredSpecialties = specialties.filter((s) =>
        s.toLowerCase().includes(searchText.toLowerCase())
    );

    // Show list on focus
    const handleFocus = () => {
        setShowList(true);
    };

    // Hide list on blur (small delay so click registers)
    const handleBlur = () => {
        setTimeout(() => setShowList(false), 150);
    };

    // Set selected specialty
    const handleSelect = (specialty) => {
        setSearchText(specialty);
        setShowList(false);
    };

    return (
        <div className="finddoctor-search-container">
            <h2 className="finddoctor-title">Find a Doctor</h2>
            <p className="finddoctor-subtitle">
                Book appointments with minimum wait-time & verified doctor details
            </p>
            <div className="finddoctor-search-box">
                <i className="fa fa-search search-icon"></i>
                <input
                    type="text"
                    className="finddoctor-input"
                    placeholder="Search doctors, specialties..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                />
                {showList && (
                    <div className="finddoctor-dropdown">
                        {filteredSpecialties.length > 0 ? (
                            filteredSpecialties.map((specialty, index) => (
                                <div
                                    key={index}
                                    className="finddoctor-dropdown-item"
                                    onMouseDown={() => handleSelect(specialty)}
                                >
                                    <i className="fa fa-user-md" style={{ marginRight: '8px', color: '#3685fb' }}></i>
                                    {specialty}
                                </div>
                            ))
                        ) : (
                            <div className="finddoctor-dropdown-item">No specialties found</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FindDoctorSearch;
