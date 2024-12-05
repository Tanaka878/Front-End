/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import feesPayment from './Images/Money.png';
import { Link, useNavigate } from 'react-router-dom';

const InterBankTransfer = (props) => {
  const nav = useNavigate();

  const [InterBankData, changeInterBankData] = React.useState({
    AccountNumber: "",
    amount: "",
    bankType: "CBZ"
  });

  const [conditionalRender, changeConditionalRender] = React.useState(false);

  function sendTransactionDetails() {
    const objectToSend = {
      senderAccount: props.AccountHolder,
      receiverAccount: InterBankData.AccountNumber,
      amount: InterBankData.amount,
      bankName: InterBankData.bankType
    };

    fetch("https://distinguished-happiness-production.up.railway.app/banking/interbankTransfer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(objectToSend)
    })
    .then(response => response.text())
    .then(data => {
      const jsonData = JSON.parse(data);
      alert(jsonData.message || jsonData.error);
      nav('/optionPage');
    })
    .catch(error => {
      console.error('Error:', error.message);
      alert('An error occurred during the transaction.');
    });
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    changeInterBankData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const balance = props.bal;

    if (InterBankData.amount > balance) {
      changeConditionalRender(true);
    } else if (InterBankData.AccountNumber.length > 9 && InterBankData.amount <= balance) {
      sendTransactionDetails();
    } else {
      console.error('Invalid receiver details');
    }
  }

  return (
    <div style={styles.container}>
      <nav style={styles.header}>
        <img src={feesPayment} style={styles.image} />
        <h2>ZIP IT Transfer</h2>
      </nav>

      <nav style={styles.feesHeader}>
        <small>Account Holder: {props.name}</small>
        <hr />
        <small>Remaining Balance: {props.bal}</small>
      </nav>

      <form onSubmit={handleSubmit} style={styles.feesSubmitForm}>
        <div style={styles.feesNav}>
          <label htmlFor='AccountNumber'>Receiver Account:</label>
          <input placeholder='0780001324' name='AccountNumber' onChange={handleFormChange} style={styles.input} minLength={10} maxLength={20} />
        </div>

        <div style={styles.feesNav}>
          <label htmlFor='bankType'>Bank Type:</label>
          <select name="bankType" value={InterBankData.bankType} onChange={handleFormChange} style={styles.input}>
            <option value="CBZ">CBZ</option>
            <option value="FBC">FBC</option>
            <option value="STANBIC">STANBIC</option>
          </select>
        </div>

        <div style={styles.feesNav}>
          <label htmlFor='amount'>Amount:</label>
          <input placeholder='Enter Amount' name='amount' onChange={handleFormChange} style={styles.input} minLength={1}/>
        </div>

        <div>
          <button type="submit" style={styles.button}>Transact</button>
        </div>
      </form>

      {conditionalRender && (
        <nav style={styles.error}>Insufficient funds</nav>
      )}

      <Link to={'/optionPage'} style={styles.homeLink}>Home Page</Link>
      <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
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
  buttonHover: {
    backgroundColor: '#45a049'
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

export default InterBankTransfer;
