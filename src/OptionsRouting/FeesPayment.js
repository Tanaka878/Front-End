import React, { useState } from 'react';
import feesPayment from './Images/PayFees.png';
import { Link, useNavigate } from 'react-router-dom';

const FeesPayment = (props) => {
  const navigate = useNavigate();

  const [feesData, setFeesData] = useState({
    schoolAccount: "",
    amount: "",
    bankName: "FBC" // Set a default value if desired
  });

  const [conditionalRender, setConditionalRender] = useState(false);

  function sendTransactionDetails() {
    const objectToSend = {
      accountHolder: props.AccountHolder,
      receiver: feesData.schoolAccount,
      amount: feesData.amount,
      bankName: feesData.bankName,
    };

    fetch(`http://localhost:8082/receiveHistory`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(response => response.text())
    .then(data => alert(data))
    .catch(error => console.error("Error sending transaction:", error));
  }

  function updateUserDetails() {
    fetch(`http://localhost:8082/${props.AccountHolder}?balance=${feesData.amount}`, {
      method: "PUT",
      body: JSON.stringify(feesData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .catch(error => console.error("Error updating user details:", error));
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    setFeesData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (feesData.amount > props.bal) {
      setConditionalRender(true);
    } else if (feesData.schoolAccount.length > 4 && feesData.amount <= props.bal) {
      navigate('/optionPage');
      sendTransactionDetails();
      updateUserDetails();
    }
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
        <small>Remaining Balance: {props.bal}</small>
      </nav>

      <form onSubmit={handleSubmit} style={styles.feesSubmitForm}>
        <div style={styles.feesNav}>
          <label htmlFor="schoolAccount">School Account Number:</label>
          <input
            placeholder="Enter School Account Number"
            name="schoolAccount"
            onChange={handleFormChange}
            style={styles.input}
          />
        </div>

        <div style={styles.feesNav}>
          <label htmlFor="amount">Amount:</label>
          <input
            placeholder="Enter Amount"
            name="amount"
            onChange={handleFormChange}
            style={styles.input}
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

      {conditionalRender && (
        <nav style={styles.error}>Insufficient funds</nav>
      )}

      <Link to="/optionPage" style={styles.homeLink}>Home Page</Link>
    </div>
  );
}

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
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)'
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    maxWidth: '200px'
  },
  feesHeader: {
    width: '100%',
    marginTop: '10px',
    fontSize: '1.2em',
    color: '#555'
  },
  feesSubmitForm: {
    width: '100%',
    marginTop: '20px'
  },
  feesNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '15px'
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '1em',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginTop: '5px'
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
    marginTop: '15px'
  },
  error: {
    color: 'red',
    marginTop: '15px',
    fontWeight: 'bold'
  },
  homeLink: {
    marginTop: '20px',
    color: '#007BFF',
    textDecoration: 'none'
  }
}

export default FeesPayment;
