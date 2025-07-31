/*import React, { useState } from 'react';

const EMICalculator = ({ price }) => {
  const [interestRate, setInterestRate] = useState(9.5); // default 9.5%
  const [tenure, setTenure] = useState(60); // 60 months = 5 years
  const [downPayment, setDownPayment] = useState(0);

  const loanAmount = price - downPayment;
  const monthlyRate = interestRate / 12 / 100;

  const emi = loanAmount > 0
    ? Math.round(
        (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
        (Math.pow(1 + monthlyRate, tenure) - 1)
      )
    : 0;

  return (
    <div className="bg-white border rounded p-4 shadow-sm mt-4">
      <h5 className="font-bold text-lg mb-3">🧮 EMI Calculator</h5>

      <div className="space-y-2">
        <div>
          <label className="block text-sm font-medium">Down Payment (₹)</label>
          <input
            type="number"
            className="border px-3 py-1 w-full rounded"
            value={downPayment}
            onChange={(e) => setDownPayment(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Interest Rate (%)</label>
          <input
            type="number"
            className="border px-3 py-1 w-full rounded"
            value={interestRate}
            onChange={(e) => setInterestRate(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Loan Tenure (Months)</label>
          <input
            type="number"
            className="border px-3 py-1 w-full rounded"
            value={tenure}
            onChange={(e) => setTenure(Number(e.target.value))}
          />
        </div>

        <div className="text-center mt-4">
          <p className="font-semibold text-blue-600 text-xl">
            Monthly EMI: ₹{emi.toLocaleString('en-IN')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EMICalculator;*/
// components/EMICalculator.jsx
import React, { useState, useEffect } from 'react';

const EMICalculator = ({ price }) => {
  const [loanAmount, setLoanAmount] = useState(price || 0);
  const [interestRate, setInterestRate] = useState(9.5);
  const [loanTenure, setLoanTenure] = useState(5);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTenure]);

  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const months = parseFloat(loanTenure) * 12;

    if (principal && rate && months) {
      const emiValue = (principal * rate * Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
      setEmi(emiValue.toFixed(0));
    } else {
      setEmi(0);
    }
  };

  return (
    <div className="bg-light p-3 rounded">
      <h5 className="mb-3">EMI Calculator</h5>
      <div className="mb-2">
        <label className="form-label">Loan Amount (₹)</label>
        <input
          type="number"
          className="form-control"
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
        />
      </div>
      <div className="mb-2">
        <label className="form-label">Interest Rate (%)</label>
        <input
          type="number"
          step="0.1"
          className="form-control"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tenure (Years)</label>
        <input
          type="number"
          className="form-control"
          value={loanTenure}
          onChange={(e) => setLoanTenure(Number(e.target.value))}
        />
      </div>
      <div className="alert alert-info text-center">
        Estimated EMI: <strong>₹{emi.toLocaleString('en-IN')}/month</strong>
      </div>
    </div>
  );
};

export default EMICalculator;
