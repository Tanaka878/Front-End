import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = (props) => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/optionPage");
  };

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get(`https://distinguished-happiness-production.up.railway.app/transactionHistory/history/${props.Email}`);
        setTransactions(response.data);
      } catch (error) {
        console.error('Error fetching transaction data:', error);
      }
    };
    
    fetchTransactions();
  }, [props.Email]);

  return (
    <div style={styles.transactionHistory}>
      <h2 style={styles.heading}>Transaction History</h2>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Account Holder</th>
            <th style={styles.tableHeader}>Receiver</th>
            <th style={styles.tableHeader}>Amount</th>
            <th style={styles.tableHeader}>Date</th>
            <th style={styles.tableHeader}>Transaction Type</th>
            <th style={styles.tableHeader}>Status</th>
            <th style={styles.tableHeader}>Comment</th>
            <th style={styles.tableHeader}>Bank Name</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td style={styles.tableCell}>{transaction.accountHolder}</td>
              <td style={styles.tableCell}>{transaction.receiver}</td>
              <td style={styles.tableCell}>${transaction.amount.toFixed(2)}</td>
              <td style={styles.tableCell}>{new Date(transaction.localDate).toLocaleDateString()}</td>
              <td style={{ ...styles.tableCell, ...styles[transaction.transactionType.toLowerCase()] }}>
                {transaction.transactionType}
              </td>
              <td style={{ ...styles.tableCell, ...styles[transaction.status.toLowerCase()] }}>
                {transaction.status}
              </td>
              <td style={styles.tableCell}>{transaction.comment}</td>
              <td style={styles.tableCell}>{transaction.bankName}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <button style={styles.button} onClick={goToHome}>
        Home
      </button>
    </div>
  );
};

const styles = {
  transactionHistory: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
  },
  button: {
    padding: '10px 20px',
    marginTop: '20px',
    fontSize: '1em',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007bff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
  },
  tableHeader: {
    padding: '10px',
    backgroundColor: '#f4f4f4',
    color: '#333',
    border: '1px solid #ddd',
  },
  tableCell: {
    padding: '10px',
    textAlign: 'center',
    border: '1px solid #ddd',
  },
  credit: {
    color: '#4CAF50', // Green for credit
    fontWeight: 'bold',
  },
  debit: {
    color: '#FF5733', // Orange for debit
    fontWeight: 'bold',
  },
  success: {
    color: '#4CAF50', // Green for success
  },
  failed: {
    color: '#E74C3C', // Red for failed
  },
  pending: {
    color: '#F39C12', // Yellow for pending
  },
};

export default TransactionHistory;
