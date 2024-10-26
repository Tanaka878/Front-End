import React from 'react';
import { useNavigate } from 'react-router-dom';


const NewUser = () => {
  const [User, changeUser] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  function handleChange(event) {
    const { name, value, checked, type } = event.target;

    changeUser((prev) => {
      return {
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      };
    });
  }

  function Cancel_CreateAccount(){
    const navigate = useNavigate()
    navigate("/")
    //back to home page
    

  }

  function handleSubmit(event) {
    event.preventDefault();

    if (User.password !== User.confirmPassword) {
      console.log("The passwords do not match");
    } else {
      console.log("Submitted Information");

      const objectToSend = {
        name: User.firstName,
        surname: User.lastName,
        email: User.email,
        password: User.password
      };

      fetch(`https://distinguished-happiness-production.up.railway.app/customer/createAccount`, {
        method: "POST",
        body: JSON.stringify(objectToSend),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(err => console.error('Error:', err));
    }
  }

  return (
    <div className="newUser-container">
      <nav className='NewUserHeader'>
        <h1>Accute Banking Services</h1>
      </nav>

      {/* New Header for Signing Up */}
      <h2 className='signup-header'>User is Signing Up for Accute Banking Services</h2>

      <form className='newUser' onSubmit={handleSubmit}>
        <div className='formElement'>
          <label htmlFor='name'>First Name :</label>
          <input name='firstName' required onChange={handleChange} />
        </div>

        <div className='formElement'>
          <label htmlFor='lastName'>Last Name :</label>
          <input name='lastName' required onChange={handleChange} />
        </div>

        <div className='formElement'>
          <label htmlFor='email'>Email :</label>
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
          <h2>Enter New Pin</h2>
          <label>New Pin</label>
          <input type='password' required onChange={handleChange} name='password' />
        </div>

        <div className='formElement'>
          <label>Confirm Pin :</label>
          <input type='password' required onChange={handleChange} name='confirmPassword' />
        </div>

        <div className='formElement'>
          <button className='form-button'>Create Account</button>
        </div>

        <div className='formElement'>
          <button className='form-button-cancel' onClick={Cancel_CreateAccount}>Cancel</button>
        </div>
      </form>

      <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
    </div>
  );
};

export default NewUser;
