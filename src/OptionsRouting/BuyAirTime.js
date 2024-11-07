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

    let value = props.bal;

    if (AirTimeData.amount > value) {
      changeConditionalRender(true);
    } else if (AirTimeData.phoneNumber.length === 9 && AirTimeData.amount < value) {
      UpdateUserDetails();
      sendTransactionDetails();
      nav('/optionPage');
    }
  }

  return (
    <div style={styles.container}>
      <nav style={styles.header}>
        <img src={feesPayment} style={styles.image} alt="Buy AirTime" />
        <h2>Buy AirTime</h2>
      </nav>

      <nav style={styles.feesHeader}>
        <small>Account Holder: {props.name}</small>
        <small>Account Number: {props.AccountHolder}</small>
        <small>Remaining Balance: {props.bal}</small>
      </nav>

      <form onSubmit={handleSubmit} style={styles.feesSubmitForm}>
        <div style={styles.feesNav}>
          <label htmlFor='phoneNumber'>Phone Number:</label>
          <input
            placeholder='0780001324'
            name='phoneNumber'
            onChange={handleFormChange}
            style={styles.input}
          />
        </div>

        <div style={styles.feesNav}>
          <label htmlFor='amount'>Amount:</label>
          <input
            placeholder='Enter Amount'
            name='amount' 
            onChange={handleFormChange}
            style={styles.input}
          />
        </div>

        <button type="submit" style={styles.button}>Transact</button>
      </form>

      {conditionalRender && (
        <div style={styles.error}>Insufficient funds</div>
      )}

      <Link to="/optionPage" style={styles.homeLink}>Home Page</Link>
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
