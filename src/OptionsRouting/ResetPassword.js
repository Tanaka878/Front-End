import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [responseMessage, setResponseMessage] = useState('');

    const navigate = useNavigate()

    function LoginPage(){
        
        navigate("/");
    }

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission
        
        try {
            const response = await fetch(`https://distinguished-happiness-production.up.railway.app/customer/resetPassword/${encodeURIComponent(email)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.text(); // Get response message
                setResponseMessage(data); // Display success message
                setEmail(''); // Clear the input field
            } else {
                window.alert("No customer with that email")
                throw new Error('Customer not found');
                 // Handle not found error
            }
        } catch (error) {
            setResponseMessage(error.message); // Display error message
        }
    };

    return (
        <div className="container">
            <h1>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Enter your email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <br></br>
            
            <button onClick={LoginPage}>Home</button>
            <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
            {responseMessage && (
                <div className="response-message">{responseMessage}</div>
            )}
            <style jsx>{`
                .container {
                    max-width: 400px;
                    margin: auto;
                    background: white;
                    padding: 20px;
                    border-radius: 5px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                }

                h1 {
                    text-align: center;
                }

                label {
                    display: block;
                    margin-bottom: 5px;
                }

                input[type="email"] {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                }

                button {
                    width: 100%;
                    padding: 10px;
                    background-color: #28a745;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                }

                button:hover {
                    background-color: #218838;
                }

                .response-message {
                    margin-top: 10px;
                    text-align: center;
                    color: green; /* Adjust color based on success/error */
                }
            `}</style>
        </div>
    );
};

export default ResetPassword;
