import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [enteredValues, setEnteredValues] = React.useState({
        accountNumber: "",
        Pin: ""
    });

    // State for user data
    const [userData, setUserData] = React.useState(null);

    // Conditional render for wrong credentials
    const [conditionalRender, changeConditionalRender] = React.useState(false);

    // Form submission: fetch user data and validate
    async function submitButton(event) {
        event.preventDefault();

        try {
            const response = await fetch(`https://distinguished-happiness-production.up.railway.app/customer/${enteredValues.accountNumber}`);
            const data = await response.json();

            if (data) {
                setUserData(data); // Store data in state

                // Validate credentials
                if (data.password === enteredValues.Pin) {
                    props.getDetails(data.name, data.balance, data.accountNumber);
                    navigate('/optionPage');
                    console.log('Authenticated');
                } else {
                    console.log("Failed to authenticate");
                    changeConditionalRender(true);
                }
            } else {
                console.log("No data found for this account number");
                changeConditionalRender(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            changeConditionalRender(true);
        }
    }

    // Handle input changes
    function handleChange(event) {
        setEnteredValues(prevData => ({
            ...prevData,
            [event.target.name]: event.target.value
        }));
    }

    return (
        <div>
            <img src="/src/LoginPage/Images/Money.png" alt="Bank Image" />
            <form onSubmit={submitButton} className='loginPage'>
                <h1 className='LoginHeader'>Welcome To Accute Banking Online Services</h1>

                <label htmlFor='AccountNumber'>Account Number:</label>
                <input type='text'
                    id='AccountNumber'
                    name='accountNumber'
                    placeholder='Account Number'
                    onChange={handleChange} />
                
                <br /><br />

                <label htmlFor='pinNumber'>Pin:</label>
                <input type='password'
                    id='pinNumber'
                    placeholder='Enter Pin'
                    name='Pin'
                    onChange={handleChange} />

                {conditionalRender && <nav className='conditionalRender'>Wrong Credentials</nav>}

                <br /><br />

                <button className='submitButton'>
                    Login
                </button>

                <footer>
                    <br />
                    <Link to={'/newUser'}>Register</Link>
                    <br /><br />
                    <small>@Copyright AccuteBanking 2023</small>
                    <br />
                    <small>All Rights Reserved</small>
                </footer>
            </form>
        </div>
    );
}

export default LoginPage;
