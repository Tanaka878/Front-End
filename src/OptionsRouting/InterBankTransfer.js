/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import api from './api'; // Import the configured Axios instance
import feesPayment from './Images/Money.png';
import { Link, useNavigate } from 'react-router-dom';

const InterBankTransfer = (props) => {
  const nav = useNavigate();

  const [InterBankData, changeInterBankData] = React.useState({
    AccountNumber: "",
    amount: "",
    bankType: "CBZ" // Default bank selection
  });

  const [conditionalRender, changeConditionalRender] = React.useState(false);

  // Function to send transaction details using Axios instance
  function sendTransactionDetails() {
    const objectToSend = {
      senderAccount: props.AccountHolder,
      receiverAccount: InterBankData.AccountNumber,
      amount: InterBankData.amount,
      bankName: InterBankData.bankType
    };

    api.post("/api/interbankTransfer", objectToSend, {
      headers: { "Content-Type": "application/json" }
    })
      .then(response => {
        alert(response.data);
        nav('/optionPage');  // Navigate on successful transfer
      })
      .catch(error => {
        console.error('Error:', error.message, error.response, error.request);
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
    } else if (InterBankData.AccountNumber.length > 3 && InterBankData.amount <= balance) {
      sendTransactionDetails();
      console.log("Data sent", InterBankData.bankType, InterBankData.AccountNumber, InterBankData.amount);
    } else {
      console.error('Invalid receiver details');
    }
  }

  return (
    <div>
      <nav>
        <img src={feesPayment} height={200} width={250} className='feesPayment' />
        <h2>ZIP IT Transfer</h2>
      </nav>

      <nav className='feesHeader'>
        <small>Account Holder: {props.name}</small>
        <hr />
        <small>Remaining Balance: {props.bal}</small>
      </nav>

      <form onSubmit={handleSubmit} className='feesSubmitForm'>
        <nav className='feesNav'>
          <label htmlFor='AccountNumber'>Receiver Account:</label>
          <input placeholder='0780001324' name='AccountNumber' size={30} onChange={handleFormChange} />
        </nav>

        <nav>
          <label htmlFor='bankType'>Bank Type:</label>
          <select name="bankType" value={InterBankData.bankType} onChange={handleFormChange} style={{ marginLeft: '10px' }}>
            <option value="CBZ">CBZ</option>
            <option value="FBC">FBC</option>
            <option value="STANBIC">STANBIC</option>
          </select>
        </nav>

        <nav>
          <label htmlFor='amount'>Amount:</label>
          <input placeholder='Enter Amount' name='amount' size={35} onChange={handleFormChange} />
        </nav>

        <nav>
          <button type="submit" className='AirTimeSubmitButton'>Transact</button>
        </nav>
      </form>

      {conditionalRender && (
        <nav style={{ color: 'red' }}>Insufficient funds</nav>
      )}

      <Link to={'/optionPage'}>Home Page</Link>
    </div>
  );
}

export default InterBankTransfer;
