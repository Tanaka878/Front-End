import React from 'react';
import feesPayment from './Images/phone.png';
import { Link, useNavigate } from 'react-router-dom';

const BuyAirTime = (props) => {
  const nav = useNavigate();

  const [AirTimeData, changeAirTimeData] = React.useState({
    phoneNumber: "",
    amount: {}
  });

  // To determine when to display the error message
  const [conditionalRender, changeConditionalRender] = React.useState(false);

  // Handling changes in user data
  function UpdateUserDetails() {
    fetch(`http://localhost:8082/${props.AccountHolder}?balance=${AirTimeData.amount}`, {
      method: "PUT",
      body: JSON.stringify(AirTimeData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }

  function sendTransationDetails() {
    let objectToSend = {
      accountHolder: props.AccountHolder,
      receiver: AirTimeData.phoneNumber,
      amount: AirTimeData.amount,
    };

    // Sending the data
    fetch(`http://localhost:8082/receiveHistory`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(response => response.text())
      .then(data => alert(data));
  }

  function handleFormChange(event) {
    changeAirTimeData((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value
      };
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let value = props.bal;

    if (AirTimeData.amount > value) {
      changeConditionalRender(true);
    } else if (AirTimeData.phoneNumber.length === 9 && AirTimeData.amount < value) {
      UpdateUserDetails();
      sendTransationDetails();
      nav('/optionPage');
    } else {
      console.log('The receiver details are empty');
    }
  }

  return (
    <div className="container">
      <style>
        {`
          /* Importing a Google font for a modern look */
          @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

          /* General styling for the page */
          .container {
            font-family: 'Roboto', sans-serif;
            color: #333;
            padding: 10px;
            background-color: #f9f9f9;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          /* Header styling */
          nav > h2 {
            font-size: 24px;
            font-weight: 700;
            color: #333;
            margin: 5px 0;
            text-align: center;
          }

          /* Image styling */
          .feesPayment {
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            margin-bottom: 10px;
          }

          /* Styling for the fees header */
          .feesHeader {
            background-color: #4CAF50;
            color: white;
            padding: 10px;
            border-radius: 12px;
            text-align: center;
            margin-bottom: 10px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          /* Styling for the form */
          .feesSubmitForm {
            background-color: white;
            padding: 15px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 350px;
            margin: 0 auto;
            margin-left:400px
          }

          /* Form navigation and input styling */
          .feesNav, .feesNav2 {
            margin-bottom: 10px;
          }

          .feesNav label, .feesNav2 label {
            display: block;
            margin-bottom: 5px;
            font-weight: 700;
            color: #555;
          }

          .feesNav input, .feesNav2 input {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 14px;
          }

          .feesNav input:focus, .feesNav2 input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          /* Submit button styling */
          .AirTimeSubmitButton {
            background-color: #4CAF50;
            color: white;
            border: none;
            padding: 10px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            font-weight: 700;
            transition: background-color 0.3s ease;
            display: block;
            margin: 15px auto;
          }

          .AirTimeSubmitButton:hover {
            background-color: #45a049;
          }

          /* Error and success message styling */
          .conditionalMessage {
            margin-top: 10px;
            font-weight: 700;
            text-align: center;
          }

          .conditionalMessage.error {
            color: red;
          }

          .conditionalMessage.success {
            color: green;
          }

          /* Link styling */
          a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: 700;
            margin-top: 15px;
            display: block;
          }

          a:hover {
            text-decoration: underline;
          }
        `}
      </style>

    

      <form onSubmit={handleSubmit} className='feesSubmitForm'>
      <nav>
        <img src={feesPayment} height={150} width={200} className='feesPayment' />
        <h2>Buy AirTime</h2>
      </nav>

      <nav className='feesHeader'>
        <small>ACCOUNT HOLDER : {props.name}</small>
        <small>ACCOUNT NUMBER : {props.AccountHolder}</small>
        <small>REMAINING BALANCE : {props.bal}</small>
      </nav>
        <div className='feesNav'>
          <label htmlFor='phoneNumber'>Phone Number :</label>
          <input placeholder='0780001324' name='phoneNumber' onChange={handleFormChange} />
        </div>

        <div className='feesNav2'>
          <label htmlFor='amount'>Amount :</label>
          <input placeholder='Enter Amount' name='amount' onChange={handleFormChange} />
        </div>

        <button className='AirTimeSubmitButton'>Transact</button>
        <Link to={'/optionPage'}>Home Page</Link>
      </form>

      <div className={`conditionalMessage ${conditionalRender ? 'error' : 'success'}`}>
        {conditionalRender ? 'Insufficient funds' : ''}
      </div>

      
    </div>
  );
}

export default BuyAirTime;
