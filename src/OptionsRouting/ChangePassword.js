import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ChangePassword = ({ Email }) => {
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
      const response = await axios.post(
        `https://distinguished-happiness-production.up.railway.app/customer/changePassword/${Email}/${formData.newPassword}`,
        {}, 
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Password changed successfully!");
        navigate('/'); 
      }
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError("No account found with the specified email.");
      } else {
        setError("Failed to change password. Please try again later.");
      }
      console.error('Error:', err);
    }
  };

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100%',
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#f9f9f9',
      padding: '20px',
    },
    formContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      width: '100%',
      maxWidth: '400px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
      margin: '0 auto',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
      textAlign: 'center',
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '16px',
      color: '#555',
    },
    input: {
      width: '100%',
      padding: '10px',
      marginBottom: '15px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      fontSize: '16px',
    },
    button: {
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#007bff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      transition: 'background-color 0.3s ease',
    },
    message: {
      marginTop: '10px',
      fontSize: '14px',
      color: 'red',
    },
    navButton: {
      marginTop: '15px',
      padding: '10px 15px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#6c757d',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    }
  };
  

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h2 style={styles.heading}>Change Password</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div>
            <label htmlFor="newPassword" style={styles.label}>New Password:</label>
            <input
              type="password"
              name="newPassword"
              required
              onChange={handleChange}
              value={formData.newPassword}
              style={styles.input}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" style={styles.label}>Confirm New Password:</label>
            <input
              type="password"
              name="confirmPassword"
              required
              onChange={handleChange}
              value={formData.confirmPassword}
              style={styles.input}
            />
          </div>

          {error && <div style={{ ...styles.message, color: 'red' }}>{error}</div>}
          {successMessage && <div style={{ ...styles.message, color: 'green' }}>{successMessage}</div>}

          <button type="submit" style={styles.button}>Change Password</button>
        </form>
        <button style={styles.navButton} onClick={() => navigate('/')}>
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
