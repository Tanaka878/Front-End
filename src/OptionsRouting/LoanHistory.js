import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import PropTypes from 'prop-types';
import { baseURL } from './api';

const LoanHistory = (props) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const tableRef = useRef();

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(
          `${baseURL}/rest/loan/getLoanDetails/${props.Email}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch loans');
        }
        const data = await response.json();
        setLoans(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchLoans();
  }, [props.Email]);

  const handleBack = () => {
    navigate('/LoanServices');
  };
  const handleExportPDF = async () => {
    const element = tableRef.current;
    if (!element) {
      console.error('Table container not found! Ensure loans are loaded.');
      alert('No loan data available to export.');
      return;
    }
  
   
    const originalStyle = window.getComputedStyle(element);
    const originalOverflow = originalStyle.overflow;
    const originalHeight = originalStyle.height;
    const originalWidth = originalStyle.width;
  
    element.style.overflow = 'visible'; 
    element.style.height = 'auto'; 
    element.style.width = 'auto'; 
  
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,  
        useCORS: true,  
        logging: false,
        x: 0,
        y: 0,
        width: element.scrollWidth,  
        height: element.scrollHeight,  
        scrollX: 0,
        scrollY: -window.scrollY,  
      });
  
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('Loan_History.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.width = originalWidth;
    }
  };
  
  if (loading) {
    return <div className="loading" aria-live="polite">Loading loan history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="loan-history-container">
      <h2>Loan History</h2>
      <button className="back-button" onClick={handleBack}>
        Back to Home
      </button>

      <button
        className="back-button"
        onClick={handleExportPDF}
        disabled={loans.length === 0}
      >
        Download as PDF
      </button>

      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
        <div className="table-container" ref={tableRef}>
          <table className="loan-table">
            <thead>
              <tr>
                <th>Loan ID</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Status</th>
                <th>Payback Period</th>
                <th>Interest Rate</th>
                <th>Monthly Installment</th>
                <th>Months Left</th>
              </tr>
            </thead>
            <tbody>
              {loans.map((loan) => (
                <tr key={loan.loanId}>
                  <td>{loan.loanId}</td>
                  <td>{loan.loanDate}</td>
                  <td>${loan.loanAmount.toLocaleString()}</td>
                  <td>{loan.loanType}</td>
                  <td
                    className={`status-${loan.loanStatus.toLowerCase()}`}
                  >
                    {loan.loanStatus}
                  </td>
                  <td>{loan.paybackPeriod} months</td>
                  <td>{loan.interestRate}%</td>
                  <td>${loan.monthlyInstallment.toFixed(2)}</td>
                  <td>{loan.monthsLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <footer className='NewUserFooter'>
        <small>Accute Banking Services 2024 &copy; All rights reserved</small>
      </footer>
        </div>
      )}

      <style>
        {`
          .loan-history-container {
            font-family: 'Roboto', sans-serif;
            padding: 20px;
            max-width: 90%;
            margin: 20px auto;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
            font-size: 24px;
          }

          .back-button {
            display: inline-block;
            margin-bottom: 20px;
            padding: 10px 20px;
            font-size: 16px;
            color: white;
            background-color: red;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            margin-left:20px;
            transition: background-color 0.3s ease;
          }

          .back-button:hover {
            background-color: #45a049;
          }

          .table-container {
            overflow-x: auto;
          }

          .loan-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            font-size: 14px;
          }

          .loan-table th, .loan-table td {
            padding: 10px 15px;
            text-align: left;
            border: 1px solid #ddd;
          }

          .loan-table th {
            background-color: #4CAF50;
            color: white;
            font-size: 16px;
          }

          .loan-table tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          .loan-table tr:hover {
            background-color: #f1f1f1;
          }

          .status-pending {
            color: blue;
            font-weight: bold;
          }

          .status-accepted {
            color: green;
            font-weight: bold;
          }

          .status-declined {
            color: red;
            font-weight: bold;
          }

          .loading, .error {
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
          }

          .error {
            color: red;
          }

          @media (max-width: 768px) {
            .loan-history-container {
              padding: 10px;
            }

            .loan-table th, .loan-table td {
              padding: 8px;
              font-size: 12px;
            }

            h2 {
              font-size: 20px;
            }
          }

          @media (min-width: 1024px) {
            .loan-history-container {
              max-width: 800px;
            }
          }
        `}
      </style>
    </div>
  );
};

LoanHistory.propTypes = {
  Email: PropTypes.string.isRequired,
};

export default LoanHistory;
