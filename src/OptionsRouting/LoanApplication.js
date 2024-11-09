import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanTerm: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8082/applyLoan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Loan application submitted successfully');
        setFormData({
          fullName: '',
          email: '',
          loanAmount: '',
          loanTerm: '',
        });
      } else {
        alert('Failed to submit loan application');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting your application.');
    }
  };

  const handleCancel = () => {
    // Reset form fields and navigate back to previous page
    setFormData({
      fullName: '',
      email: '',
      loanAmount: '',
      loanTerm: '',
     
    });
    navigate("/optionPage"); 
  };

  return (
    <div className="loan-application-container">
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit} className="loan-application-form">
        <label htmlFor="fullName">Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          required
        />

        <label htmlFor="loanTerm">Loan Term (months):</label>
        <input
          type="number"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleInputChange}
          required
        />

        

        <button type="submit" className="submit-button">Apply</button>
        <button type="button" onClick={handleCancel} className="cancel-button">Cancel</button>
      </form>

      <style>
        {`
          /* General styling */
          .loan-application-container {
            font-family: 'Roboto', sans-serif;
            background-color: #f9f9f9;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 40px;
            margin-left:400px;
          }

          h2 {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }

          /* Form styling */
          .loan-application-form {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 500px;
          }

          label {
            display: block;
            margin: 15px 0 5px;
            font-weight: 700;
            color: #555;
            font-size: 18px;
          }

          input {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-sizing: border-box;
            font-size: 18px;
            margin-bottom: 20px;
          }

          input:focus {
            border-color: #4CAF50;
            outline: none;
          }

          .submit-button {
            background-color: #4CAF50;
            color: white;
            padding: 12px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
            transition: background-color 0.3s ease;
            display: block;
            margin: 20px auto;
          }

          .submit-button:hover {
            background-color: #45a049;
          }

          .cancel-button {
            background-color: #f44336;
            color: white;
            padding: 12px;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            font-size: 18px;
            font-weight: 700;
            transition: background-color 0.3s ease;
            display: block;
            margin: 10px auto;
          }

          .cancel-button:hover {
            background-color: #d32f2f;
          }

          /* Responsive styling */
          @media (max-width: 768px) {
            .loan-application-container {
              padding: 20px;
            }

            .loan-application-form {
              padding: 15px;
              width: 90%;
            }

            label, input, .submit-button, .cancel-button {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoanApplication;
