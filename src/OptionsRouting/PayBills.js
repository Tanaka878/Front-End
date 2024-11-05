/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import BillImage from './Images/paying.webp';
import { Link } from 'react-router-dom';

const PayBills = (props) => {
  // amount in the account before transaction
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
    <div className="pay-bills-container">
      <img src={BillImage} height={200} width={250} className="bill-image" />

      {/* Balance Display */}
      <div className="balance-display">
        <h2>Your Current Balance: ${value}</h2>
      </div>

      <form onSubmit={handleSubmit} className="pay-bills-form">
        <label htmlFor='receiverOption'>Select Receiver</label>
        <select
          id='receiverOption'
          onChange={handleFormChange}
          name='receiverOption'
          value={transactionData.receiverOption}
        >
          <option value='ZINARA'>ZINARA</option>
          <option value='ZIMRA'>ZIMRA</option>
          <option value='ZINWA'>ZINWA</option>
          <option value='ZESA'>ZESA</option>
          <option value='LIQUID TELCOM'>LIQUID TELCOM</option>
          <option value='TEL-ONE'>TEL-ONE</option>
        </select>

        <label htmlFor='amountTobePayed'>Amount $ :</label>
        <input
          type='text'
          placeholder='Amount $'
          name='amountTobePayed'
          onChange={handleFormChange}
        />

        <button className='pay-bills'>Transact</button>
      </form>

      <Link to={'/OptionPage'}>Home Page</Link>

      <style>
        {`
          /* Importing a Google font for a modern look */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* General styling */
          .pay-bills-container {
            font-family: 'Roboto', sans-serif;
            color: #333;
            padding: 20px;
            background-color: #f9f9f9;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            margin-left: 400px
          }

          .bill-image {
            margin-bottom: 20px;
          }

          /* Balance display styling */
          .balance-display {
            margin: 20px 0;
            font-size: 24px; /* Increased font size */
            font-weight: bold;
            color: #4CAF50; /* Green color for emphasis */
          }

          /* Form styling */
          .pay-bills-form {
            background-color: white;
            padding: 20px; /* Increased padding for larger area */
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }

          label {
            display: block;
            margin: 15px 0 5px; /* Increased margins for spacing */
            font-weight: 700;
            color: #555;
            font-size: 18px; /* Increased font size */
          }

          select, input {
            width: 100%;
            padding: 12px; /* Increased padding for inputs */
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 18px; /* Increased font size */
            margin-bottom: 20px; /* Increased spacing */
          }

          select:focus, input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          .pay-bills {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px; /* Increased padding for button */
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px; /* Increased font size */
            font-weight: 700;
            transition: background-color 0.3s ease;
            display: block;
            margin: 20px auto; /* Increased margins */
          }

          .pay-bills:hover {
            background-color: #45a049;
          }

          /* Link styling */
          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 700;
            margin-top: 20px; /* Increased margin */
            display: block;
            font-size: 18px; /* Increased font size */
          }

          a:hover {
            text-decoration: underline;
          }

          /* Responsive styling */
          @media (max-width: 768px) {
            .pay-bills-container {
              padding: 10px;
            }

            .pay-bills-form {
              padding: 15px; /* Adjusted padding */
              width: 90%; /* Responsive width */
            }

            label,
            select,
            input,
            .pay-bills,
            a {
              font-size: 16px; /* Adjusted font size for smaller screens */
            }
          }
        `}
      </style>
    </div>
  );
}

export default PayBills;
