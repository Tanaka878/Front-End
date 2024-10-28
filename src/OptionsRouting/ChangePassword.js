import React from 'react';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = React.useState({
    currentPassword: '',
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

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');
    setSuccessMessage('');

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New password and confirmation do not match.");
      return;
    }

    // Here, you would typically send the formData to your backend.
    const objectToSend = {
      currentPassword: formData.currentPassword,
      newPassword: formData.newPassword
    };

    fetch(`https://your-api-url.com/changePassword`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          setSuccessMessage("Password changed successfully!");
          // Optionally, navigate away or reset the form
          navigate('/login'); // Redirect to login or another page
        } else {
          setError(data.message || "Failed to change password.");
        }
      })
      .catch(err => {
        console.error('Error:', err);
        setError("An error occurred. Please try again later.");
      });
  };

  return (
    <div className="change-password-container">
      <h2>Change Password</h2>
      <form onSubmit={handleSubmit} className="change-password-form">
        <div className="formElement">
          <label htmlFor="currentPassword">Current Password:</label>
          <input
            type="password"
            name="currentPassword"
            required
            onChange={handleChange}
          />
        </div>

        <div className="formElement">
          <label htmlFor="newPassword">New Password:</label>
          <input
            type="password"
            name="newPassword"
            required
            onChange={handleChange}
          />
        </div>

        <div className="formElement">
          <label htmlFor="confirmPassword">Confirm New Password:</label>
          <input
            type="password"
            name="confirmPassword"
            required
            onChange={handleChange}
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
