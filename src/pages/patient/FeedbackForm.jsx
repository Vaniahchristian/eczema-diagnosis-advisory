import React, { useState } from 'react';

const FeedbackForm = ({ consultationId, onFeedbackSubmit }) => {
  const [rating, setRating] = useState(5);
  const [feedbackText, setFeedbackText] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch(`http://localhost:5000/api/consultations/${consultationId}/feedback`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback: feedbackText, rating }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage('Thank you for your feedback!');
        onFeedbackSubmit(); // Callback to handle post-feedback submission
      } else {
        throw new Error(data.message || 'Failed to submit feedback');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Consultation Feedback</h2>
      {error && <p className="text-red-500">{error}</p>}
      {successMessage && <p className="text-green-500">{successMessage}</p>}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Rating</label>
          <select
            className="w-full p-2 border rounded-md"
            onChange={(e) => setRating(Number(e.target.value))}
            value={rating}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} Star{num > 1 ? 's' : ''}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Feedback</label>
          <textarea
            className="w-full p-2 border rounded-md"
            rows="4"
            placeholder="Write your feedback here..."
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  );
};

export default FeedbackForm;
