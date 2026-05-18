import React, { useState } from 'react';
import './ReviewForm.css';

function GiveReviews() {
    const [showForm, setShowForm] = useState(false);
    const [submittedMessage, setSubmittedMessage] = useState('');
    const [showWarning, setShowWarning] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        review: '',
        rating: 0
    });
    const [hoveredRating, setHoveredRating] = useState(0);

    const handleButtonClick = () => {
        setShowForm(true);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRating = (star) => {
        setFormData({ ...formData, rating: star });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.review && formData.rating > 0) {
            setShowWarning(false);
            setSubmittedMessage(formData);
            setIsDisabled(true);
            setShowForm(false);
            setFormData({ name: '', review: '', rating: 0 });
        } else {
            setShowWarning(true);
        }
    };

    return (
        <div className="review-form-container">
            <h2 className="review-form-title">Patient Feedback</h2>

            {/* Consultation Info */}
            <div className="consultation-info">
                <div className="consultation-icon">🩺</div>
                <div className="consultation-details">
                    <h3 className="consultation-doctor">Dr. Sarah Johnson</h3>
                    <p className="consultation-specialty">General Physician</p>
                    <p className="consultation-date">
                        Consultation Date: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Feedback Button — disabled after submission */}
            {!showForm && (
                <button
                    className="give-feedback-btn"
                    onClick={handleButtonClick}
                    disabled={isDisabled}
                    style={{ opacity: isDisabled ? 0.5 : 1, cursor: isDisabled ? 'not-allowed' : 'pointer' }}
                >
                    {isDisabled ? 'Feedback Submitted' : 'Click Here to Give Feedback'}
                </button>
            )}

            {/* Review Form */}
            {showForm && (
                <form onSubmit={handleSubmit} className="review-form">
                    <h2 className="review-form-title">Give Your Feedback</h2>

                    {showWarning && (
                        <p className="warning">Please fill out all fields and select a rating.</p>
                    )}

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            className="review-input"
                            placeholder="Enter your name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Star Rating */}
                    <div className="form-group">
                        <label>Rating (1-5):</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hoveredRating || formData.rating) ? 'filled' : ''}`}
                                    onClick={() => handleRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                >
                                    ★
                                </span>
                            ))}
                            <span style={{ marginLeft: '10px', color: '#666', fontSize: '0.9rem' }}>
                                {formData.rating > 0 ? `${formData.rating}/5` : 'Select rating'}
                            </span>
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="form-group">
                        <label htmlFor="review">Review:</label>
                        <textarea
                            id="review"
                            name="review"
                            className="review-textarea"
                            placeholder="Share your experience..."
                            value={formData.review}
                            onChange={handleChange}
                            rows={4}
                        />
                    </div>

                    <div className="review-btn-group">
                        <button type="submit" className="submit-review-btn">Submit</button>
                        <button
                            type="button"
                            className="cancel-review-btn"
                            onClick={() => setShowForm(false)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}

            {/* Submitted Message Display */}
            {submittedMessage && (
                <div className="review-success">
                    <div className="success-icon">⭐</div>
                    <h3>Thank you, {submittedMessage.name}!</h3>
                    <div className="star-rating" style={{ justifyContent: 'center' }}>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                className={`star ${star <= submittedMessage.rating ? 'filled' : ''}`}
                            >★</span>
                        ))}
                    </div>
                    <p className="review-preview">"{submittedMessage.review}"</p>
                </div>
            )}
        </div>
    );
}

export default GiveReviews;
