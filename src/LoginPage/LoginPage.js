import React from 'react';
import accuteImage from './Images/accute.jpg';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import api, { baseURL } from '../OptionsRouting/api';

const LoginPage = (props) => {
    const navigate = useNavigate();
    const [enteredValues, setEnteredValues] = React.useState({
        accountNumber: "",
        Pin: ""
    });

    const [userData, setUserData] = React.useState(null);
    const [conditionalRender, changeConditionalRender] = React.useState(false);

    // State to track if the user has started typing
    const [isTypingEmail, setIsTypingEmail] = React.useState(false);
    const [isTypingPassword, setIsTypingPassword] = React.useState(false);

    async function submitButton(event) {
        event.preventDefault();

        try {
        const email = enteredValues.accountNumber;
        const response = await fetch(`${baseURL}/customer/${email}`);
            const data = await response.json();

            if (data) {
                setUserData(data);
                const userEmail = data.email;
                localStorage.setItem('email', userEmail);
                localStorage.setItem('accountNumber', data.accountNumber);

                if (data.password === enteredValues.Pin) {
                    props.getDetails(data.name, data.balance, data.accountNumber, userEmail);
                    navigate('/optionPage');
                } else {
                    changeConditionalRender(true);
                }
            } else {
                changeConditionalRender(true);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
            changeConditionalRender(true);
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setEnteredValues(prevData => ({
            ...prevData,
            [name]: value
        }));

        // Track if the user is typing in the email or password input
        if (name === "accountNumber") {
            setIsTypingEmail(value.length > 0);
        }
        if (name === "Pin") {
            setIsTypingPassword(value.length > 0);
        }
    }

    return (
        <div>
            <style>
                {`
                    /* Centering container on desktop */
                    .loginContainer {
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 100vw;
                        height: 100vh;
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                        background-color: #f0f2f5;
                    }

                    .loginPage {
                        max-width: 400px;
                        width: 100%;
                        margin: auto;
                        padding: 20px;
                        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
                        border-radius: 8px;
                        text-align: center;
                        background-color: #f9f9f9;
                    }

                    .loginPage img {
                        max-width: 100%;
                        height: auto;
                    }

                    .LoginHeader {
                        font-size: 1.5em;
                        color: #333;
                        margin: 10px 0;
                    }

                    .loginPage label {
                        display: block;
                        margin-top: 20px;
                        font-size: 1em;
                        color: #555;
                        text-align: left;
                    }

                    .loginPage input {
                        width: 100%;
                        padding: 10px 10px 10px 40px; /* Adjust padding for icon */
                        font-size: 1em;
                        margin-top: 8px;
                        border: 1px solid #ddd;
                        border-radius: 4px;
                        box-sizing: border-box;
                    }

                    .submitButton {
                        width: 100%;
                        padding: 10px;
                        background-color: #007BFF;
                        color: white;
                        font-size: 1em;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                        margin-top: 20px;
                    }

                    .submitButton:hover {
                        background-color: #0056b3;
                    }

                    footer {
                        margin-top: 20px;
                    }

                    footer a {
                        color: #007BFF;
                        text-decoration: none;
                        font-size: 0.9em;
                    }

                    footer a:hover {
                        text-decoration: underline;
                    }

                    footer small {
                        display: block;
                        font-size: 0.8em;
                        color: #777;
                        margin-top: 5px;
                    }

                    .conditionalRender {
                        color: red;
                        font-size: 0.9em;
                        margin-top: 10px;
                    }

                    @media (max-width: 768px) {
                        .loginPage {
                            max-width: 90%;
                            padding: 15px;
                        }

                        .LoginHeader {
                            font-size: 1.2em;
                        }

                        footer small {
                            font-size: 0.7em;
                        }

                        .submitButton {
                            padding: 8px;
                            font-size: 0.9em;
                        }
                    }
                `}
            </style>

            <div className='loginContainer'>
                <form onSubmit={submitButton} className='loginPage'>
                    <img src={accuteImage} alt="bank logo" height={150} width={300} />
                    <h1 className='LoginHeader'>Accute Banking Online Service</h1>

                    <label htmlFor='AccountNumber'>Email Account:</label>
                    <div style={{ position: "relative" }}>
                        {!isTypingEmail && (
                            <FontAwesomeIcon 
                                icon={faEnvelope} 
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#888",
                                }} 
                            />
                        )}
                        <input
                            type='text'
                            id='AccountNumber'
                            name='accountNumber'
                            onChange={handleChange}
                        />
                    </div>

                    <br /><br />

                    <label htmlFor='pinNumber'>Password:</label>
                    <div style={{ position: "relative" }}>
                        {!isTypingPassword && (
                            <FontAwesomeIcon 
                                icon={faLock} 
                                style={{
                                    position: "absolute",
                                    left: "10px",
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    color: "#888",
                                }} 
                            />
                        )}
                        <input
                            type='password'
                            id='pinNumber'
                            name='Pin'
                            onChange={handleChange}
                        />
                    </div>

                    {conditionalRender && <nav className='conditionalRender'>Wrong Credentials</nav>}

                    <br /><br />

                    <button className='submitButton'>
                        Login
                    </button>

                    <footer>
                        <br />
                        <Link to={'/newUser'}>Register</Link>
                        <br />
                        <Link to={'/ResetPassword'}>Forgot Password</Link>
                        <br /><br />
                        <small>@Copyright AccuteBanking 2023</small>
                        <br />
                        <small>All Rights Reserved</small>
                    </footer>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
