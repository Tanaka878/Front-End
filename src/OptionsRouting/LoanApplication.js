import React, { useState } from 'react';

const LoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    loanAmount: '',
    loanTerm: '',
    interestRate: '',
  });

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
          interestRate: '',
        });
      } else {
        alert('Failed to submit loan application');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while submitting your application.');
    }
  };

  return (
    <div className="loan-application-form">
      <h2>Loan Application</h2>
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <label>Loan Amount:</label>
        <input
          type="number"
          name="loanAmount"
          value={formData.loanAmount}
          onChange={handleInputChange}
          required
        />

        <label>Loan Term (months):</label>
        <input
          type="number"
          name="loanTerm"
          value={formData.loanTerm}
          onChange={handleInputChange}
          required
        />

        <label>Interest Rate (%):</label>
        <input
          type="number"
          step="0.01"
          name="interestRate"
          value={formData.interestRate}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default LoanApplication;
