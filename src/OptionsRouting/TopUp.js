import React from 'react';

const TopUp = (props) => {
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
    <div>
      <form onSubmit={handleTopUp}>
        <h1>TopUp Account with Ecocash</h1>
        
        <label htmlFor="ecocashNumber">Ecocash Number: </label>
        <input
          type="text"
          name="number"
          value={topUp.number}
          onChange={handleChange}
          placeholder="Enter phone number"
        />
        <br />

        <label htmlFor="amount">Amount: </label>
        <input
          type="number"
          name="amount"
          value={topUp.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
        />
        <br />

        <button type="submit">Top Up</button>
      </form>
    </div>
  );
}

export default TopUp;

