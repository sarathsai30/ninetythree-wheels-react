// CarLoanEMICalculator.jsx
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const CarLoanEMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(3); // years
  const [interestRate, setInterestRate] = useState("10"); // string to allow decimals
  const [view, setView] = useState("graph"); // graph | schedule

  const parsedInterestRate = parseFloat(interestRate) || 0;
  const monthlyRate = parsedInterestRate / 12 / 100;
  const numberOfMonths = tenure * 12;

  // EMI calculation with rounding
  let emi = 0;
  if (monthlyRate === 0) {
    emi = loanAmount / numberOfMonths;
  } else {
    emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
  }
  emi = Math.round(emi);

  const totalPayment = emi * numberOfMonths;
  const totalInterest = totalPayment - loanAmount;

  const data = [
    { name: "Principal Loan Amount", value: loanAmount },
    { name: "Total Interest Payable", value: totalInterest },
  ];

  const COLORS = ["#00BFA6", "#FF9800"];

  // EMI schedule
  const generateSchedule = () => {
    let balance = loanAmount;
    let schedule = [];
    for (let month = 1; month <= numberOfMonths; month++) {
      let interestComp = Math.round(balance * monthlyRate);
      let principalComp = emi - interestComp;
      balance -= principalComp;
      schedule.push({
        month,
        emi,
        principal: principalComp,
        interest: interestComp,
        balance: balance > 0 ? balance : 0,
      });
    }
    return schedule;
  };

  const scheduleData = generateSchedule();

  return (
    <div className="p-6 bg-white rounded-xl shadow-md max-w-6xl mx-auto mt-5 mb-5">
      <h2 className="text-2xl font-bold mb-2">Customize Car Loan EMI</h2>
      <p className="text-gray-600 mb-4">
        Get attractive rates on car loans with instant approval.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT SIDE */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-800">
            ₹{emi.toLocaleString("en-IN")}{" "}
            <span className="text-base font-normal text-gray-500">
              EMI For {tenure} years
            </span>
          </h3>

          {/* Loan Amount */}
          <p className="mt-4 text-gray-700">
            Loan amount:{" "}
            <span className="font-semibold text-teal-600">
              ₹{loanAmount.toLocaleString("en-IN")}
            </span>
          </p>
          <input
            type="range"
            min={100000}
            max={5000000}
            step={50000}
            value={loanAmount}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            className="w-full mt-2"
          />
          <input
            type="text"
            className="w-full border p-2 rounded mt-2"
            value={loanAmount}
            onChange={(e) => {
              const val = e.target.value;
              if (!isNaN(val) && val !== "") setLoanAmount(Number(val));
            }}
          />

          {/* Tenure */}
          <div className="mt-6">
            <p className="text-gray-700">
              Tenure: {tenure} Years ({tenure * 12} months)
            </p>
            <input
              type="range"
              min={1}
              max={8}
              value={tenure}
              onChange={(e) => setTenure(Number(e.target.value))}
              className="w-full mt-2"
            />
            <input
              type="text"
              className="w-full border p-2 rounded mt-2"
              value={tenure}
              onChange={(e) => {
                const val = e.target.value;
                if (!isNaN(val) && val !== "") setTenure(Number(val));
              }}
            />
          </div>

          {/* Interest */}
          <div className="mt-6">
            <p className="text-gray-700">Interest: {interestRate}%</p>
            <input
              type="range"
              min={0}
              max={20}
              step={0.01}
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              className="w-full mt-2"
            />
            <input
              type="text"
              className="w-full border p-2 rounded mt-2"
              value={interestRate}
              onChange={(e) => {
                const val = e.target.value;
                if (val === "" || (!isNaN(val) && Number(val) >= 0)) setInterestRate(val);
              }}
              placeholder="Enter interest rate like 7.89"
            />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Toggle */}
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => setView("graph")}
              className={`px-4 py-1 rounded-full ${
                view === "graph" ? "bg-teal-600 text-white" : "bg-gray-200"
              }`}
            >
              Graph
            </button>
            <button
              onClick={() => setView("schedule")}
              className={`px-4 py-1 rounded-full ${
                view === "schedule" ? "bg-teal-600 text-white" : "bg-gray-200"
              }`}
            >
              Schedule
            </button>
          </div>

          {view === "graph" ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={data}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={2}
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value) =>
                      ` ₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`
                    }
                  />
                </PieChart>
              </ResponsiveContainer>

              <div className="mt-6 flex justify-center gap-8 text-center">
                <p className="text-teal-600 font-semibold">
                  Principal Loan Amount <br />₹{loanAmount.toLocaleString("en-IN")}
                </p>
                <p className="text-orange-500 font-semibold">
                  Total Interest Payable <br />₹{totalInterest.toLocaleString("en-IN")}
                </p>
              </div>

              <p className="mt-4 font-bold text-xl">
                Total Amount Payable:{" "}
                <span className="text-gray-800">₹{totalPayment.toLocaleString("en-IN")}</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Note: This doesn’t include bank processing fee.
              </p>
            </>
          ) : (
            <div className="overflow-y-auto max-h-80 w-full border rounded">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-2 border">Month</th>
                    <th className="p-2 border">EMI</th>
                    <th className="p-2 border">Principal</th>
                    <th className="p-2 border">Interest</th>
                    <th className="p-2 border">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleData.map((row) => (
                    <tr key={row.month}>
                      <td className="p-2 border">{row.month}</td>
                      <td className="p-2 border">₹{row.emi.toLocaleString("en-IN")}</td>
                      <td className="p-2 border">₹{row.principal.toLocaleString("en-IN")}</td>
                      <td className="p-2 border">₹{row.interest.toLocaleString("en-IN")}</td>
                      <td className="p-2 border">₹{row.balance.toLocaleString("en-IN")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarLoanEMICalculator;
