import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [count, chnageCount] = React.useState();

    // State for form values
    const [enteredValues, setEnteredValues] = React.useState({
        accountNumber: "",
        Pin: ""
    });

    // State for user data fetched from the API
    const [userData, setUserData] = React.useState({
        id: "",
        name: "",
        surname: "",
        email: "",
        accountNumber: {},
        password: "",
        balance: ""
    });

    // Fetch user data when `count` changes
    React.useEffect(() => {
        if (count) {
            fetch(`https://distinguished-happiness-production.up.railway.app/customer/${count}`)
                .then(res => res.json())
                .then(data => {
                    console.log("Fetched data:", data); // Log to check response
                    setUserData({
                        id: data.id,
                        name: data.name,
                        surname: data.surname,
                        email: data.email,
                        accountNumber: data.accountNumber,
                        password: data.password,
                        balance: data.balance
                    });
                });
        }
    }, [count]);

    console.log("User Data:", userData); // Check if balance is present

    // Conditional render for wrong credentials
    const [conditionalRender, changeConditionalRender] = React.useState(false);

    // Form submission
    function submitButton(event) {
        event.preventDefault();
        console.log("Submitted");

        chnageCount(enteredValues.accountNumber);
        console.log("Count state updated");

        // Authenticate after fetching data
        if (userData.password === enteredValues.Pin) {
            props.getDetails(userData.name, userData.balance, userData.accountNumber); // Pass latest userData to getDetails
            navigate('/optionPage');
            console.log('Authenticated');
        } else {
            console.log("Failed to authenticate");
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
                
                <br/><br/>

                <label htmlFor='pinNumber'>Pin:</label>
                <input type='password' 
                    id='pinNumber' 
                    placeholder='Enter Pin' 
                    name='Pin' 
                    onChange={handleChange} />

                {conditionalRender && <nav className='conditionalRender'>Wrong Credentials</nav>}

                <br/><br/>

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
