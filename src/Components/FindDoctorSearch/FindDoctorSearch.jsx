import React, { useState } from 'react';
import './FindDoctorSearch.css';

const specialties = [
    "Dentist",
    "Gynecologist/obstetrician",
    "General physician",
    "Dermatologist",
    "Ear-nose-throat (ENT) specialist",
    "Homeopath",
    "Ayurveda",
];

const FindDoctorSearch = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');
    const [showList, setShowList] = useState(false);

    const filteredSpecialties = specialties.filter((s) =>
        s.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleFocus = () => setShowList(true);
    const handleBlur = () => setTimeout(() => setShowList(false), 150);

    const handleSelect = (specialty) => {
        setSearchText(specialty);
        setShowList(false);
        if (onSearch) onSearch(specialty);
    };

    const handleChange = (e) => {
        setSearchText(e.target.value);
        if (onSearch) onSearch(e.target.value);
    };

    return (
        <div className="finddoctor-search-container">
            <h2 className="finddoctor-title">Find a Doctor</h2>
            <p className="finddoctor-subtitle">
                Book appointments with minimum wait-time and verified doctor details
            </p>
            <div className="finddoctor-search-box">
                <i className="fa fa-search search-icon"></i>
                <input
                    type="text"
                    className="finddoctor-input"
                    placeholder="Search doctors, specialties..."
                    value={searchText}
                    onChange={handleChange}
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
