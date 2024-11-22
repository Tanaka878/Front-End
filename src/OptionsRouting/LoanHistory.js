import React, { useState, useEffect } from 'react';

const LoanHistory = (props) => {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`https://distinguished-happiness-production.up.railway.app/rest/loan/getLoanDetails/${props.Email}`); // Replace with your backend endpoint
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
  }, []);

  if (loading) {
    return <div className="loading">Loading loan history...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="loan-history-container">
      <h2>Loan History</h2>
      {loans.length === 0 ? (
        <p>No loans found.</p>
      ) : (
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
                <td>{loan.loanStatus}</td>
                <td>{loan.paybackPeriod} months</td>
                <td>{loan.interestRate}%</td>
                <td>${loan.monthlyInstallment.toFixed(2)}</td>
                <td>{loan.monthsLeft}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <style>
        {`
          .loan-history-container {
            font-family: 'Roboto', sans-serif;
            padding: 20px;
            max-width: 1000px;
            margin: 0 auto;
            background: #f9f9f9;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          }

          h2 {
            text-align: center;
            margin-bottom: 20px;
          }

          .loan-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
          }

          .loan-table th, .loan-table td {
            padding: 10px 15px;
            text-align: left;
            border: 1px solid #ddd;
          }

          .loan-table th {
            background-color: #4CAF50;
            color: white;
          }

          .loan-table tr:nth-child(even) {
            background-color: #f2f2f2;
          }

          .loan-table tr:hover {
            background-color: #f1f1f1;
          }

          .loading, .error {
            text-align: center;
            margin-top: 20px;
            font-size: 18px;
          }

          .error {
            color: red;
          }
        `}
      </style>
    </div>
  );
};

export default LoanHistory;
