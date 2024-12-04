import React from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';

const LoanServices = () => {
  const navigate = useNavigate();
  

  const handleNavigation = (path) => {
    navigate(path);
  };

  function Home(){

    navigate("/optionPage")
    
  }

  return (
    <div className="loan-options-container">
      <div className="content">
        <h1>Welcome to Loan Services</h1>
        <div className="options">
 

        <button 
            className="option-button" 
            onClick={() => handleNavigation('/LoanApplication')}
          >
            <img src="/Images/instantLoan.webp" alt="History Icon" className="button-icon" />
            Apply Loan
          </button>

          <button 
            className="option-button" 
            onClick={() => handleNavigation('/LoanHistory')}
          >
            <img src="/Images/loanHistory.png" alt="History Icon" className="button-icon" />
            View Loan History
          </button>
        </div>

        <button onClick={Home} className='option-button'>Home page</button>
        <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
      </div>

      <style>
        {`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body, html {
            height: 100%;
          }

          .loan-options-container {
            font-family: 'Roboto', sans-serif;
            background-color: #f9f9f9;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100vh;
            padding: 20px;
            margin-left:auto;
            margin-right:auto;
          }

          .content {
            text-align: center;
            background-color: #fff;
            padding: 30px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            max-width: 400px;
            width: 100%;
          }

          h1 {
            font-size: 28px;
            color: #333;
            margin-bottom: 30px;
          }

          .options {
            display: flex;
            flex-direction: column;
            gap: 20px;
          }

          .option-button {
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #4CAF50;
            margin-top:20px;
            color: white;
            padding: 15px;
            font-size: 18px;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease, transform 0.2s ease;
            gap: 10px;
          }

          .option-button img.button-icon {
            width: 24px;
            height: 24px;
          }

          .option-button:hover {
            background-color: #45a049;
            transform: scale(1.05);
          }

          @media (max-width: 768px) {
            .content {
              padding: 20px;
            }

            h1 {
              font-size: 24px;
            }

            .option-button {
              font-size: 16px;
              padding: 12px;
            }

            .option-button img.button-icon {
              width: 20px;
              height: 20px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default LoanServices;
