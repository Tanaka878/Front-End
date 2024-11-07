import React from 'react';
import feesPayment from './Images/phone.png';
import { Link, useNavigate } from 'react-router-dom';

const BuyAirTime = (props) => {
  const nav = useNavigate();

  const [AirTimeData, changeAirTimeData] = React.useState({
    phoneNumber: "",
    amount: ""
  });

  const [conditionalRender, changeConditionalRender] = React.useState(false);

  function UpdateUserDetails() {
    fetch(`https://distinguished-happiness-production.up.railway.app/${props.AccountHolder}?balance=${AirTimeData.amount}`, {
      method: "PUT",
      body: JSON.stringify(AirTimeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  function sendTransactionDetails() {
    let objectToSend = {
      accountHolder: props.AccountHolder,
      receiver: AirTimeData.phoneNumber,
      amount: AirTimeData.amount,
    };

    fetch(`https://distinguished-happiness-production.up.railway.app/receiveHistory`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response => response.text())
      .then(data => alert(data));
  }

  function handleFormChange(event) {
    changeAirTimeData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const balance = props.bal;
    const { phoneNumber, amount } = AirTimeData;

    if (amount > balance) {
      changeConditionalRender(true);
    } else if (phoneNumber.length === 9) {
      buyAirtimeTransaction();
    }
  }

  function buyAirtimeTransaction() {
    fetch(`https://distinguished-happiness-production.up.railway.app/banking/buyAirtime/${props.AccountHolder}/${AirTimeData.phoneNumber}/${AirTimeData.amount}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.text())
      .then(data => {
        alert(data);
        if (data.includes("successful")) {
          nav('/optionPage');
        }
      })
      .catch(error => {
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
        <small>Account Holder: {props.name}</small>
        <br></br>
        <small>Account Number: {props.AccountHolder}</small>
        <br></br>
        <small>Remaining Balance: ${props.bal}</small>
      </div>

      <form onSubmit={handleSubmit} className="buy-airtime-form">
        <div className="form-group">
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            placeholder='0780001324'
            name='phoneNumber'
            value={AirTimeData.phoneNumber}
            onChange={handleFormChange}
            className="input"
          />
        </div>

        <div className="form-group">
          <label htmlFor='amount'>Amount:</label>
          <input
            placeholder='Enter Amount'
            name='amount'
            value={AirTimeData.amount}
           
            onChange={handleFormChange}
            className="input"
          />
        </div>

        <button type="submit" className="button">Transact</button>
      </form>

      {conditionalRender && (
        <div className="error">Insufficient funds</div>
      )}

      <Link to="/optionPage" className="home-link">Home Page</Link>

      <style>
        {`
          /* Importing Google font */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* General styling */
          .buy-airtime-container {
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

          .airtime-image {
            margin-bottom: 20px;
          }

          /* Account info styling */
          .account-info {
            margin: 20px 0;
            font-size: 16px;
            color: #555;
          }

          /* Form styling */
          .buy-airtime-form {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }

          .form-group {
            margin-bottom: 15px;
          }

          label {
            display: block;
            margin: 15px 0 5px;
            font-weight: 700;
            color: #555;
            font-size: 18px;
          }

          .input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 18px;
          }

          .input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          .button {
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

          .button:hover {
            background-color: #45a049;
          }

          /* Error message styling */
          .error {
            color: red;
            font-weight: 700;
            margin-top: 15px;
            font-size: 16px;
          }

          /* Link styling */
          .home-link {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 700;
            margin-top: 20px;
            display: block;
            font-size: 18px;
          }

          .home-link:hover {
            text-decoration: underline;
          }

          /* Responsive styling */
          @media (max-width: 768px) {
            .buy-airtime-container {
              padding: 10px;
            }

            .buy-airtime-form {
              padding: 15px;
              width: 90%;
            }

            label,
            .input,
            .button,
            .home-link {
              font-size: 16px;
            }
          }
        `}
      </style>
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

export default BuyAirTime;
