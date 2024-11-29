/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const TopUp = (props) => {
  const navigate = useNavigate();
  const [topUp, setTopUp] = React.useState({
    number: '',
    amount: ''
  });

  // Handle form input changes
  function handleChange(event) {
    const { name, value } = event.target;
    setTopUp((prevData) => ({
      ...prevData,
      [name]: value
    }));
  }

  // Handle the top-up form submission
  function handleTopUp(event) {
    event.preventDefault();

    fetch(`https://distinguished-happiness-production.up.railway.app/banking/topUp/${props.Email}/${topUp.amount}/${topUp.number}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Top-up failed.");
      }
      return response.text();
    })
    .then(data => {
      console.log("Top-up successful:", data);
      alert("Top-up successful.");
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("Top-up failed. Please try again.");
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

      <button onClick={() => navigate('/optionPage')} className="back-button">Back to Home</button>

      <style>
        {`
          /* Google font import */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* Main container styling */
          .topup-container {
            font-family: 'Roboto', sans-serif;
            color: #333;
            padding: 20px;
            background-color: #f9f9f9;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            min-height: 100vh;
            width: 100vw;
            box-sizing: border-box;
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

          /* Input styling */
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

          /* Submit button styling */
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

          /* Back button styling */
          .back-button {
            background-color: #f44336;
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
            background-color: #d32f2f;
          }

          /* Responsive styling for mobile devices */
          @media (max-width: 768px) {
            .topup-container {
              padding: 10px;
              min-height: 100vh;
              width: 100%;
            }

            .topup-form {
              padding: 15px;
              width: 100%;
              max-width: 100%;
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
