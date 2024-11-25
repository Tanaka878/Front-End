/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react/jsx-no-comment-text */
import React, { useState } from 'react';
import BillImage from './Images/paying.webp';
import { Link } from 'react-router-dom';

const PayBills = ({ AccountHolder, bal }) => {
  const [transactionData, setTransactionData] = useState({
    receiverOption: "",
    amountTobePayed: ""
  });

  // Function to call the payBills endpoint
  async function payBillsTransaction() {
    try {
      const response = await fetch(
        `https://distinguished-happiness-production.up.railway.app/banking/payBills/${AccountHolder}/${transactionData.receiverOption}/${transactionData.amountTobePayed}`, 
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          }
        }
      );
      if (!response.ok) throw new Error('Failed to process payment');
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.error(error);
      alert('Transaction failed. Please try again.');
    }
  }

  // Handle transaction submission
  async function handleTransaction() {
    if (bal >= parseFloat(transactionData.amountTobePayed)) {
      await payBillsTransaction();
      setTransactionData({ receiverOption: "", amountTobePayed: "" });
    } else {
      alert("Insufficient funds.");
    }
  }

  // Handle form submission
  function handleSubmit(event) {
    event.preventDefault();
    const amount = parseFloat(transactionData.amountTobePayed);

    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    handleTransaction();
  }

  // Handle input changes
  function handleInputChange(event) {
    const { name, value } = event.target;
    setTransactionData((prev) => ({
      ...prev,
      [name]: value
    }));
  }

  return (
    <div className="pay-bills-container">
      <img src={BillImage} height={200} width={250} className="bill-image" />

      <div className="balance-display">
        <h2>Your Current Balance: ${bal}</h2>
      </div>

      <form onSubmit={handleSubmit} className="pay-bills-form">
        <label htmlFor="receiverOption">Select Receiver</label>
        <select
          id="receiverOption"
          name="receiverOption"
          value={transactionData.receiverOption}
          onChange={handleInputChange}
        >
          <option value="" disabled>Select an option</option>
          <option value="ZINARA">ZINARA</option>
          <option value="ZIMRA">ZIMRA</option>
          <option value="ZINWA">ZINWA</option>
          <option value="ZESA">ZESA</option>
          <option value="LIQUID TELCOM">LIQUID TELCOM</option>
          <option value="TEL-ONE">TEL-ONE</option>
        </select>

        <label htmlFor="amountTobePayed">Amount $:</label>
        <input
          type="text"
          id="amountTobePayed"
          name="amountTobePayed"
          placeholder="Amount $"
          value={transactionData.amountTobePayed}
          onChange={handleInputChange}
        />

        <button type="submit" className="pay-bills">Transact</button>
      </form>

      <Link to="/OptionPage">Home Page</Link>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

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
          }

          .bill-image {
            margin-bottom: 20px;
          }

          .balance-display {
            margin: 20px 0;
            font-size: 24px;
            font-weight: bold;
            color: #4CAF50;
          }

          .pay-bills-form {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            margin-top: 20px;
          }

          label {
            display: block;
            margin: 15px 0 5px;
            font-weight: 700;
            color: #555;
          }

          select, input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            margin-bottom: 20px;
          }

          select:focus, input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          .pay-bills {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
            transition: background-color 0.3s ease;
          }

          .pay-bills:hover {
            background-color: #45a049;
          }

          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 700;
            margin-top: 20px;
          }

          a:hover {
            text-decoration: underline;
          }

          @media (max-width: 768px) {
            .pay-bills-container {
              padding: 10px;
            }

            .pay-bills-form {
              padding: 15px;
              width: 90%;
            }

            label, select, input, .pay-bills, a {
              font-size: 16px;
            }
          }
          
          @media (min-width: 769px) {
            .pay-bills-container {
              height: 100vh; /* Ensure the container takes the full viewport height */
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              margin-left:400px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default PayBills;
