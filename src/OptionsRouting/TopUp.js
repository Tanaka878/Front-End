/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const TopUp = (props) => {
  const navigate = useNavigate(); // Initialize useNavigate
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

  return (
    <div className="topup-container">
      <form onSubmit={handleTopUp} className="topup-form">
        <h1>Top Up Account with Ecocash</h1>
        
        <label htmlFor="ecocashNumber">Ecocash Number:</label>
        <input
          type="text"
          name="number"
          value={topUp.number}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="topup-input"
        />
        <br />

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          name="amount"
          value={topUp.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="topup-input"
        />
        <br />

        <button type="submit" className="topup-button">Top Up</button>
      </form>

      <button onClick={() => navigate('/optionPage')} className="back-button">Back to Home</button> {/* Back button */}
      
      <style>
        {`
          /* Importing a Google font for a modern look */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* General styling */
          .topup-container {
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
            margin-left: 400px;
          }

          /* Form styling */
          .topup-form {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }

          label {
            display: block;
            margin: 15px 0 5px;
            font-weight: 700;
            color: #555;
            font-size: 18px;
          }

          .topup-input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 18px;
            margin-bottom: 20px;
          }

          .topup-input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          .topup-button {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 12px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
            transition: background-color 0.3s ease;
            display: block;
            margin: 20px auto;
          }

          .topup-button:hover {
            background-color: #45a049;
          }

          .back-button {
            background-color: #f44336; /* Red background for the back button */
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
            transition: background-color 0.3s ease;
            margin-top: 20px;
          }

          .back-button:hover {
            background-color: #d32f2f; /* Darker red on hover */
          }

          /* Responsive styling */
          @media (max-width: 768px) {
            .topup-container {
              padding: 10px;
            }

            .topup-form {
              padding: 15px;
              width: 90%;
            }

            label,
            .topup-input,
            .topup-button,
            .back-button {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default TopUp;
