import React from 'react';

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

      fetch(`http://localhost:8082/customer/createAccount`, {
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

  console.log(User);

  return (
    <div>
      <nav className='NewUserHeader'>
        <h1>Accute Banking Services</h1>
      </nav>

      <form className='newUser' onSubmit={handleSubmit}>
        <div className='formElement'>
          <label htmlFor='name'>First Name :</label>
          <input name='firstName' required onChange={handleChange} />
        </div>

        <div className='formElement'>
          <label htmlFor='lastName'>Last Name :</label>
          <input name='lastName' required onChange={handleChange} />
        </div>

        <br></br>

        <div className='formElement'>
          <label className='form-group' htmlFor='email'>Email :</label>
          <input type='email' required onChange={handleChange} name='email' />
        </div>

        <br></br>

        <div className='formElement'>
          <h2>Enter New Pin</h2>
          <label>New Pin</label>
          <input type='password' required onChange={handleChange} name='password' />
        </div>

        <br></br>

        <div className='formElement'>
          <label>Confirm Pin :</label>
          <input type='password' required onChange={handleChange} name='confirmPassword' />
        </div>

        <div className='formElement'>
          <button className='form-button'>Create Account</button>
        </div>
      </form>

      <footer className='NewUserHeader'>
        <small> Accute Banking Services 2024 All rights reserved </small>
      </footer>
    </div>
  );
};

export default NewUser;
