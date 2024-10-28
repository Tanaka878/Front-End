import React from 'react';
import { useNavigate } from 'react-router-dom';

const NewUser = () => {
  const navigate = useNavigate(); // Move useNavigate to the top for better visibility

  const [user, changeUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    accountType: "" // Include account type in the state
  });

  function handleChange(event) {
    const { name, value, type } = event.target;

    changeUser((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? event.target.checked : value
    }));
  }

  function cancelCreateAccount() {
    navigate("/"); // Back to home page
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (user.password !== user.confirmPassword) {
      console.log("The passwords do not match");
      return; // Prevent further processing
    } 

    console.log("Submitted Information");

    const objectToSend = {
      name: user.firstName,
      surname: user.lastName,
      email: user.email,
      password: user.password,
      accountType: user.accountType // Include account type in the data sent
    };

    fetch(`https://distinguished-happiness-production.up.railway.app/customer/createAccount`, {
      method: "POST",
      body: JSON.stringify(objectToSend),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then(response => response.text())
      .then(data => alert(data))
      .catch(err => console.error('Error:', err));
  }

  return (
    <div className="newUser-container">
      <nav className='NewUserHeader'>
        <h1>Accute Banking Services</h1>
      </nav>

      <h2 className='signup-header'>User is Signing Up for Accute Banking Services</h2>

      <form className='newUser' onSubmit={handleSubmit}>
        <div className='formElement'>
          <label htmlFor='firstName'>First Name:</label>
          <input name='firstName' required onChange={handleChange} />
        </div>

        <div className='formElement'>
          <label htmlFor='lastName'>Last Name:</label>
          <input name='lastName' required onChange={handleChange} />
        </div>

        <div className='formElement'>
          <label htmlFor='email'>Email:</label>
          <input type='email' required onChange={handleChange} name='email' />
        </div>

        <div className='formElement'>
          <label htmlFor='accountType'>Type of Account:</label>
          <select name='accountType' required onChange={handleChange}>
            <option value=''>Select Account Type</option>
            <option value='USD'>USD</option>
          </select>
        </div>

        <div className='formElement'>
          <h2>Enter New Password</h2>
          <label>New Password</label>
          <input type='password' required onChange={handleChange} name='password' />
        </div>

        <div className='formElement'>
          <label>Confirm Password:</label>
          <input type='password' required onChange={handleChange} name='confirmPassword' />
        </div>

        <div className='formElement'>
          <button type='submit' className='form-button'>Create Account</button>
        </div>

        <div className='formElement'>
          <button type='button' className='form-button-cancel' onClick={cancelCreateAccount}>Cancel</button>
        </div>
      </form>

      <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
    </div>
  );
};

export default NewUser;
