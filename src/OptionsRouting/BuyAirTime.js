import React, { useEffect, useState } from 'react';
import feesPayment from './Images/phone.png';
import { Link, useNavigate } from 'react-router-dom';
import { baseURL } from './api';

const BuyAirTime = (props) => {
  const nav = useNavigate();

  const [AirTimeData, changeAirTimeData] = useState({
    phoneNumber: "",
    amount: ""
  });
  const [balance, setBalance] = useState(props.bal);
  const [conditionalRender, changeConditionalRender] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  
  const fetchBalance = async () => {
    try {
      const response = await fetch(`${baseURL}/banking/getBalance/${props.Email}`);
      const updatedBalance = await response.text();
      setBalance(updatedBalance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  useEffect(() => {
    
    fetchBalance();
  }, [props.AccountHolder]);

  function handleFormChange(event) {
    changeAirTimeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const { phoneNumber, amount } = AirTimeData;

    if (amount > balance) {
      changeConditionalRender(true);
    } else if (phoneNumber.length >9) {
      buyAirtimeTransaction();
    }
  }

  function buyAirtimeTransaction() {
    setIsSubmitting(true);
    fetch(`${baseURL}/banking/buyAirtime/${props.AccountHolder}/${AirTimeData.phoneNumber}/${AirTimeData.amount}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.text())
      .then(data => {
        setIsSubmitting(false);
        alert(data);
        if (data.includes("successful")) {
          nav('/optionPage');
          fetchBalance();  
        }
      })
      .catch(error => {
        setIsSubmitting(false);
        console.error("Error:", error);
        alert("Transaction failed. Please try again.");
      });
  }

  return (
    <div className="buy-airtime-container">
      <div className="header">
        <img src={feesPayment} height={200} width={250} className="airtime-image" alt="Buy AirTime" />
        <h2>Buy AirTime</h2>
      </div>

      <div className="account-info">
        <h1>Account Holder: {props.name}</h1>
        <br />
        <h2>Account Number: {props.AccountHolder}</h2>
        <br />
        <h2> ${balance}</h2>
      </div>

      <form onSubmit={handleSubmit} className="buy-airtime-form">
        <div className="form-group">
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            placeholder='0780001324'
            name='phoneNumber'
            type="text"
            pattern="\d{9}"
            value={AirTimeData.phoneNumber}
            onChange={handleFormChange}
            minLength={7}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor='amount'>Amount:</label>
          <input
            placeholder='Enter Amount'
            name='amount'
            type='number'
            min="0"
            value={AirTimeData.amount}
            onChange={handleFormChange}
            minLength={1}
            className="input"
          />
        </div>

        <button type="submit" className="button" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : "Transact"}
        </button>
      </form>

      {conditionalRender && (
        <div className="error">Insufficient funds</div>
      )}

      <Link to="/optionPage" className="home-link">Home Page</Link>
      <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>

      <style>
        {`
          .buy-airtime-container {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .header {
            text-align: center;
            margin-bottom: 20px;
          }

          .airtime-image {
            border: 5px solid #2f86a6;
            border-radius: 50%;
            animation: rotate-border 10s infinite linear;
          }

          .header h2 {
            color: #333;
            font-size: 24px;
            margin-top: 15px;
          }

          .account-info {
            font-size: 14px;
            color: #666;
            margin-bottom: 20px;
          }

          .buy-airtime-form .form-group {
            margin-bottom: 15px;
          }

          .buy-airtime-form label {
            display: block;
            font-size: 14px;
            margin-bottom: 5px;
            color: #333;
          }

          .buy-airtime-form .input {
            width: 100%;
            padding: 10px;
            font-size: 14px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          .button {
            width: 100%;
            padding: 10px;
            font-size: 16px;
            color: #fff;
            background-color: #2f86a6;
            border: none;
            border-radius: 4px;
            cursor: pointer;
          }

          .button:disabled {
            background-color: #aaa;
          }

          .error {
            color: red;
            font-size: 14px;
            margin-top: 15px;
            text-align: center;
          }

          .home-link {
            display: block;
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
            color: #2f86a6;
            text-decoration: none;
          }

          .home-link:hover {
            text-decoration: underline;
          }

          @keyframes rotate-border {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}

export default BuyAirTime;
