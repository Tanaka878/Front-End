import React, { useState } from 'react';
import feesPayment from './Images/PayFees.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from './api';

const FeesPayment = (props) => {
  const navigate = useNavigate();

  const [feesData, setFeesData] = useState({
    schoolAccount: "",
    amount: "",
    bankName: "FBC", // Default bank name
  });

  const [errorMessage, setErrorMessage] = useState(null);

  // Handle input changes
  function handleFormChange(event) {
    const { name, value } = event.target;
    setFeesData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();

    if (parseFloat(feesData.amount) > props.bal) {
      setErrorMessage("Insufficient funds.");
      return;
    }

    if (feesData.schoolAccount.length < 8) {
      setErrorMessage("Invalid school account number.");
      return;
    }

    setErrorMessage(null); // Clear any previous error messages

    // Construct the URL with path variables
    const url = `${baseURL}/banking/payFees/${props.Email}/${feesData.schoolAccount}/${feesData.amount}/${feesData.bankName}`;

    // Make the POST request
    fetch(url, {
      method: "POST",
    })
      .then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Transaction failed.");
        }
      })
      .then((data) => {
        alert(data); // Success message
        navigate("/optionPage");
      })
      .catch((error) => {
        console.error("Error processing payment:", error);
        setErrorMessage("Transaction failed. Please try again.");
      });
  }

  return (
    <div style={styles.container}>
      <nav style={styles.header}>
        <img src={feesPayment} style={styles.image} alt="Fees Payment" />
        <h2>Fees Payment</h2>
      </nav>

      <nav style={styles.feesHeader}>
        <small>Account Holder: {props.name}</small>
        <hr />
        <small>Remaining Balance: ${props.bal.toFixed(2)}</small>
      </nav>

      <form onSubmit={handleSubmit} style={styles.feesSubmitForm}>
        <div style={styles.feesNav}>
          <label htmlFor="schoolAccount">School Account Number:</label>
          <input
            placeholder="Enter School Account Number"
            name="schoolAccount"
            onChange={handleFormChange}
            style={styles.input}
            minLength={9}
            maxLength={20}
          />
        </div>

        <div style={styles.feesNav}>
          <label htmlFor="amount">Amount:</label>
          <input
            placeholder="Enter Amount"
            name="amount"
            type="number"
            onChange={handleFormChange}
            style={styles.input}
            minLength={1}
          />
        </div>

        <div style={styles.feesNav}>
          <label htmlFor="bankName">Bank Name:</label>
          <select
            name="bankName"
            value={feesData.bankName}
            onChange={handleFormChange}
            style={styles.input}
          >
            <option value="FBC">FBC</option>
            <option value="CBZ">CBZ</option>
            <option value="Stanbic">Stanbic</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>Transact</button>
      </form>

      {errorMessage && (
        <nav style={styles.error}>{errorMessage}</nav>
      )}

      <Link to="/optionPage" style={styles.homeLink}>Home Page</Link>
      <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    fontSize: '1.1em',
    margin: '0 auto',
    maxWidth: '500px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '200px',
  },
  feesHeader: {
    width: '100%',
    marginTop: '10px',
    fontSize: '1.2em',
    color: '#555',
  },
  feesSubmitForm: {
    width: '100%',
    marginTop: '20px',
  },
  feesNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '15px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px',
  },
  button: {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    fontSize: '1.1em',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '15px',
  },
  error: {
    color: 'red',
    marginTop: '15px',
    fontWeight: 'bold',
  },
  homeLink: {
    marginTop: '20px',
    color: '#007BFF',
    textDecoration: 'none',
  },
};

export default FeesPayment;
