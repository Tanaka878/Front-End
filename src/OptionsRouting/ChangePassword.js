/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopUp = (props) => {
  const navigate = useNavigate();
  const [topUp, changeData] = React.useState({
    number: '',
    amount: ''
  });

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    changeData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  function handleTopUp(event) {
    event.preventDefault(); // Prevent page reload

    fetch(`http://localhost:8082/accountNumber${props.AccountHolder}?balance=${topUp.amount}&phoneNumber=${topUp.number}`, {
      method: "PUT",
      body: JSON.stringify(topUp),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(response => response.json())
    .then(data => {
      // handle response
      console.log("TopUp successful:", data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  }

  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      fontFamily: 'Roboto, sans-serif',
      backgroundColor: '#f9f9f9',
    },
    form: {
      width: '300px',
      padding: '20px',
      borderRadius: '10px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      backgroundColor: '#fff',
      textAlign: 'center',
    },
    heading: {
      fontSize: '24px',
      marginBottom: '20px',
      color: '#333',
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
    },
    message: {
      marginTop: '10px',
      fontSize: '14px',
      color: 'green',
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
      <h1 style={styles.heading}>Top Up Account with Ecocash</h1>
      <form onSubmit={handleTopUp} style={styles.form}>
        <div>
          <label htmlFor="ecocashNumber" style={styles.label}>Ecocash Number:</label>
          <input
            type="text"
            name="number"
            value={topUp.number}
            onChange={handleChange}
            placeholder="Enter phone number"
            style={styles.input}
          />
        </div>

        <div>
          <label htmlFor="amount" style={styles.label}>Amount:</label>
          <input
            type="number"
            name="amount"
            value={topUp.amount}
            onChange={handleChange}
            placeholder="Enter Amount"
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Top Up</button>
      </form>

      <button style={styles.navButton} onClick={() => navigate('/')}>
        Back to Home
      </button>
    </div>
  );
}

export default TopUp;
