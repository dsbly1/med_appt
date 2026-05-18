import React, { useState } from 'react';
import './ReviewForm.css';

const ReviewForm = ({ doctorName, specialty }) => {
    const [showForm, setShowForm] = useState(false);
    const [rating, setRating] = useState(0);
    const [hoveredRating, setHoveredRating] = useState(0);
    const [review, setReview] = useState('');
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!name.trim()) {
            setError("Please enter your name.");
            return;
        }
        if (rating === 0) {
            setError("Please select a rating.");
            return;
        }
        if (!review.trim()) {
            setError("Please enter your review.");
            return;
        }
        setError('');
        setSubmitted(true);
    };

    const handleReset = () => {
        setRating(0);
        setReview('');
        setName('');
        setError('');
        setSubmitted(false);
        setShowForm(false);
    };

    return (
        <div className="review-form-container">
            {/* Consultation Info */}
            <div className="consultation-info">
                <div className="consultation-icon">🩺</div>
                <div className="consultation-details">
                    <h3 className="consultation-doctor">
                        {doctorName || "Dr. Sarah Johnson"}
                    </h3>
                    <p className="consultation-specialty">
                        {specialty || "General Physician"}
                    </p>
                    <p className="consultation-date">
                        Consultation Date: {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Feedback Button */}
            {!showForm && !submitted && (
                <button
                    className="give-feedback-btn"
                    onClick={() => setShowForm(true)}
                >
                    Give Feedback
                </button>
            )}

            {/* Review Form */}
            {showForm && !submitted && (
                <form className="review-form" onSubmit={handleSubmit}>
                    <h3 className="review-form-title">Share Your Experience</h3>

                    {/* Name */}
                    <div className="form-group">
                        <label>Your Name</label>
                        <input
                            type="text"
                            className="review-input"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    {/* Star Rating */}
                    <div className="form-group">
                        <label>Rating</label>
                        <div className="star-rating">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <span
                                    key={star}
                                    className={`star ${star <= (hoveredRating || rating) ? 'filled' : ''}`}
                                    onClick={() => setRating(star)}
                                    onMouseEnter={() => setHoveredRating(star)}
                                    onMouseLeave={() => setHoveredRating(0)}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Review Text */}
                    <div className="form-group">
                        <label>Your Review</label>
                        <textarea
                            className="review-textarea"
                            placeholder="Share your experience with the doctor..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                        />
                    </div>

                    {/* Error */}
                    {error && <div className="review-error">{error}</div>}

                    {/* Buttons */}
                    <div className="review-btn-group">
                        <button type="submit" className="submit-review-btn">
                            Submit Review
                        </button>
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

            {/* Success Message */}
            {submitted && (
                <div className="review-success">
                    <div className="success-icon">⭐</div>
                    <h3>Thank you, {name}!</h3>
                    <p>Your {rating}-star review has been submitted.</p>
                    <p className="review-preview">"{review}"</p>
                    <button className="reset-btn" onClick={handleReset}>
                        Write Another Review
                    </button>
                </div>
            )}
        </div>
    );
};

export default ReviewForm;
