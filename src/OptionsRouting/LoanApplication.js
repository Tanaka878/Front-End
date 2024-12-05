import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoanApplication = (props) => {
  const [formData, setFormData] = useState({
    email: props.Email,
    loanAmount: '',
    paybackPeriod: '',
    loanType: '',
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://distinguished-happiness-production.up.railway.app/rest/loan/save/applyLoan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Loan application submitted successfully');
        setFormData({
          
          email: props.Email,
          loanAmount: '',
          paybackPeriod: '',
          loanType: '',
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
    setFormData({
     
      email: props.Email,
      loanAmount: '',
      paybackPeriod: '',
      loanType: '',
    });
    navigate('/LoanServices');
  };

  return (
    <div className="loan-application-container">
      <form onSubmit={handleSubmit} className="loan-application-form">
        <h2>Loan Application</h2>


        <label htmlFor="loanAmount">Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          required
          minLength={20}
        />

        <label htmlFor="paybackPeriod">Payback Period:</label>
        <select
          name="paybackPeriod"
          value={formData.paybackPeriod}
          onChange={handleInputChange}
          required
          
        >
          <option value="">Select Payback Period</option>
          <option value="3">3 Months</option>
          <option value="9">9 Months</option>
          <option value="12">12 Months</option>
          <option value="12">1 Year</option>
          <option value="84">7 Years</option>
        </select>

        <label htmlFor="loanType">Loan Type:</label>
        <select
          name="loanType"
          value={formData.loanType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select Loan Type</option>
          <option value="PERSONAL_LOAN">Personal</option>
          <option value="MORTGAGE_LOAN">Home</option>
          <option value="AUTO_LOAN">Car</option>
          <option value="STUDENT_LOAN">Education</option>
        </select>

        <button type="submit" className="submit-button">Apply</button>
        <button type="button" onClick={handleCancel} className="cancel-button">
          Cancel
        </button>
        <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
      </form>

      <style>
        {`
          /* Global Styles */
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          html, body {
            height: 100%;
          }

          .loan-application-container {
            font-family: 'Roboto', sans-serif;
            background-color: #f9f9f9;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 20px;
            text-align: center;
            margin-left: auto;
            margin-right: auto;
          }

          /* Form Styles */
          .loan-application-form {
            background-color: white;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
            width: 100%;
            max-width: 500px;
            margin: 0 auto;
          }

          .loan-application-form h2 {
            font-size: 28px;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }

          .loan-application-form label {
            display: block;
            margin: 15px 0 5px;
            font-weight: 700;
            color: #555;
            font-size: 18px;
          }

          .loan-application-form input,
          .loan-application-form select {
            width: 100%;
            padding: 12px;
            border: 1px solid #ddd;
            border-radius: 8px;
            font-size: 18px;
            margin-bottom: 20px;
          }

          .loan-application-form input:focus,
          .loan-application-form select:focus {
            border-color: #4CAF50;
            outline: none;
          }

          /* Buttons */
          .loan-application-form .submit-button {
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

          .loan-application-form .submit-button:hover {
            background-color: #45a049;
          }

          .loan-application-form .cancel-button {
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

          .loan-application-form .cancel-button:hover {
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

            .loan-application-form label,
            .loan-application-form input,
            .loan-application-form select,
            .loan-application-form .submit-button,
            .loan-application-form .cancel-button {
              font-size: 16px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoanApplication;
