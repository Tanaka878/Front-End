import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

const TransactionHistory = (props) => {
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const tableRef = useRef();

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

  const handleExportPDF = async () => {
    const element = tableRef.current;
    if (!element) {
      console.error('Table container not found! Ensure transactions are loaded.');
      alert('No transaction data available to export.');
      return;
    }

    // Temporarily adjust the styles to capture full content
    const originalStyle = window.getComputedStyle(element);
    const originalOverflow = originalStyle.overflow;
    const originalHeight = originalStyle.height;
    const originalWidth = originalStyle.width;

    element.style.overflow = 'visible'; // Ensure it is not clipped
    element.style.height = 'auto'; // Ensure the table height is fully expanded
    element.style.width = 'auto';  // Allow table to expand horizontally as well

    try {
      // Capture the full content including both vertical and horizontal scrollable sections
      const canvas = await html2canvas(element, { 
        scale: 2,   // High resolution
        useCORS: true,  // Ensure cross-origin resources are captured correctly
        logging: false,
        x: 0,
        y: 0,
        width: element.scrollWidth,  // Capture the full width
        height: element.scrollHeight,  // Capture the full height
        scrollX: 0,
        scrollY: -window.scrollY,  // Adjust to capture the correct part of the element
      });

      // Create a PDF and add the image of the table
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 10, pdfWidth, pdfHeight);
      pdf.save('Transaction_History.pdf');
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      // Restore the original styles
      element.style.overflow = originalOverflow;
      element.style.height = originalHeight;
      element.style.width = originalWidth;
    }
  };

  return (
    
    <div style={styles.transactionHistory}>
      <h2 style={styles.heading}>Transaction History</h2>
      
      <nav style={{display:'flex'}}>
      <button style={styles.button} onClick={goToHome}>
        Home
      </button>

      <button 
        style={styles.button} 
        onClick={handleExportPDF} 
        disabled={transactions.length === 0}
      >
        Download as PDF
      </button>


      </nav>
     
      <div style={styles.tableContainer} ref={tableRef}>
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
      </div>
    </div>
  );
};

const styles = {
  transactionHistory: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '100%',
    overflowX: 'auto',
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
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  tableContainer: {
    overflowX: 'auto', // Allow horizontal scroll on smaller screens
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    minWidth: '600px', // Minimum width to avoid text wrapping on small screens
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
    wordBreak: 'break-word', // Prevent overflow of long text
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
  // Media query for mobile responsiveness
  '@media (max-width: 768px)': {
    tableHeader: {
      fontSize: '12px',
      padding: '8px',
    },
    tableCell: {
      fontSize: '12px',
      padding: '8px',
    },
    button: {
      fontSize: '0.9em',
      padding: '8px 16px',
    },
  },
};

export default TransactionHistory;
