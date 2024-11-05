/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import BillImage from './Images/paying.webp';
import { Link } from 'react-router-dom';

const PayBills = (props) => {
  // Amount in the account before transaction
  let value = props.bal;

  const [transactionData, changeTransactionData] = React.useState({
    receiverOption: "",
    amountTobePayed: ""
  });

  // Function to update the account details
  function updateDetails() {
    fetch(`http://localhost:8082/${props.AccountHolder}?balance=${value - transactionData.amountTobePayed}`, {
      method: "PUT",
      body: JSON.stringify(transactionData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  // Function to send transaction history
  function sendTransactionHistory() {
    let objectToSend = {
      accountHolder: props.AccountHolder,
      receiver: transactionData.receiverOption,
      amount: transactionData.amountTobePayed,
    };

    fetch(`http://localhost:8082/receiveHistory`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response => response.text())
      .then(data => alert(data));
  }

  function transaction() {
    updateDetails();
    sendTransactionHistory();
  }

  function handleSubmit(event) {
    event.preventDefault();

    // Making decisions on whether to process the transaction
    if (props.bal > transactionData.amountTobePayed) {
      transaction();
    } else {
      console.log("Insufficient Funds");
      console.log(props.bal);
    }
    console.log("submitted");
  }

  function handleFormChange(event) {
    const { name, value } = event.target;
    changeTransactionData((prev) => ({
      ...prev,
      [name]: value // Directly assign value
    }));
  }

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      color: '#333',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#f5f5f5'
    }}>
      <img
        src={BillImage}
        alt="Paying Bills"
        style={{
          borderRadius: '12px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          marginBottom: '20px',
          height: '200px',
          width: '250px'
        }}
      />

      <div style={{ margin: '20px 0', fontSize: '24px', fontWeight: 'bold', color: '#4CAF50' }}>
        Your Current Balance: ${value}
      </div>

      <form onSubmit={handleSubmit} style={{
        backgroundColor: 'white',
        padding: '25px',
        borderRadius: '12px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
        width: '100%',
        maxWidth: '350px',
        textAlign: 'center'
      }}>
        <label htmlFor='receiverOption' style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '10px' }}>
          Select Receiver
        </label>
        <select
          id='receiverOption'
          onChange={handleFormChange}
          name='receiverOption'
          value={transactionData.receiverOption}
          style={{
            width: '100%',
            padding: '10px',
            margin: '10px 0 15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        >
          <option value='ZINARA'>ZINARA</option>
          <option value='ZIMRA'>ZIMRA</option>
          <option value='ZINWA'>ZINWA</option>
          <option value='ZESA'>ZESA</option>
          <option value='LIQUID TELCOM'>LIQUID TELCOM</option>
          <option value='TEL-ONE'>TEL-ONE</option>
        </select>

        <label htmlFor='amountTobePayed' style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px' }}>
          Amount $:
        </label>
        <input
          type='text'
          placeholder='Amount $'
          name='amountTobePayed'
          onChange={handleFormChange}
          style={{
            width: '100%',
            padding: '10px',
            marginBottom: '15px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            boxSizing: 'border-box'
          }}
        />

        <button type="submit" style={{
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          padding: '12px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '17px',
          fontWeight: 'bold',
          transition: 'background-color 0.3s ease',
          display: 'block',
          width: '100%',
          marginTop: '15px'
        }}>
          Transact
        </button>
      </form>

      <Link to={'/OptionPage'} style={{
        color: '#4CAF50',
        textDecoration: 'none',
        fontWeight: 'bold',
        fontSize: '16px',
        marginTop: '20px'
      }}>
        Home Page
      </Link>
    </div>
  );
}

export default PayBills;
