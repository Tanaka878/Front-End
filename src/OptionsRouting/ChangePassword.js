import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({ userEmail }) => {  // Pass userEmail as a prop if available
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    newPassword: '',
    confirmPassword: ''
  });

  const [error, setError] = React.useState('');
  const [successMessage, setSuccessMessage] = React.useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    try {
      const response = await fetch(`https://your-backend-url.com/changePassword/${userEmail}/${formData.newPassword}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 404) {
        setError("No account found with the specified email.");
      } else if (response.ok) {
        setSuccessMessage("Password changed successfully!");
        navigate('/'); // Redirect to login or another page
      } else {
        const data = await response.json();
        setError(data.message || "Failed to change password.");
      }
    } catch (err) {
      console.error('Error:', err);
      setError("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="formElement">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            name="newPassword"
            required
            onChange={handleChange}
            value={formData.newPassword}
          />
        </div>

        <div className="formElement">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
            value={formData.confirmPassword}
          />
        </div>

        {error && <div className="error-message">{error}</div>}
        {successMessage && <div className="success-message">{successMessage}</div>}

        <button type="submit" className="form-button">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;
