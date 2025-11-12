import React, { useState, useMemo, useEffect } from "react";
import { BsLightbulbFill as Lightbulb } from "react-icons/bs";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const EMICalculatorModal = ({ isOpen, onClose, carData, CarPriceOnRoadPrice, FinalPrice, onEmiCalculated }) => {
  // --- State ---
  const [activeLoanType, setActiveLoanType] = useState("standard");
  const [activeView, setActiveView] = useState("graph");
  const [downPayment, setDownPayment] = useState((FinalPrice * 0.3));
  const [tenure, setTenure] = useState(5);
  const [interestRate, setInterestRate] = useState(10);
  const [monthlyIncome, setMonthlyIncome] = useState(60000);
  const [prepayAmount, setPrepayAmount] = useState(0);
  const [prepayMonth, setPrepayMonth] = useState(12);
  const [showPrepay, setShowPrepay] = useState(false);

  const carName = carData?.name || "Hyundai Venue";
  const fuelType = carData?.fuelType || "1.2 Petrol";
  const onRoadPrice = FinalPrice;
  const loanAmount = Math.max(0, onRoadPrice - downPayment);

  // --- Prevent background scroll when modal is open ---
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setDownPayment(FinalPrice * 0.3);
  }, [FinalPrice]);

  // --- EMI Calculations ---
  const { emi, totalPayment, totalInterest } = useMemo(() => {
    const monthlyRate = interestRate / 12 / 100;
    const numberOfMonths = tenure * 12;

    if (monthlyRate === 0) {
      const calculatedEMI = Math.round(loanAmount / numberOfMonths);
      const total = calculatedEMI * numberOfMonths;
      return {
        emi: calculatedEMI,
        totalPayment: total,
        totalInterest: total - loanAmount,
      };
    }

    const emiValue =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
      (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

    const calculatedEMI = Math.floor(emiValue);
    const totalPay = calculatedEMI * numberOfMonths;
    return {
      emi: calculatedEMI,
      totalPayment: totalPay,
      totalInterest: totalPay - loanAmount,
    };
  }, [loanAmount, tenure, interestRate]);

  // --- Helpers ---
  const formatINR = (val) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  // --- Smart Features ---
  const affordability = monthlyIncome
    ? Math.round((emi / monthlyIncome) * 100)
    : 0;

  const prepaySavings = useMemo(() => {
    if (!prepayAmount || prepayAmount <= 0) return 0;
    const remainingPrincipal = Math.max(0, loanAmount - prepayAmount);
    const reducedInterest =
      totalInterest * (remainingPrincipal / loanAmount) ** 1.1;
    return Math.round(totalInterest - reducedInterest);
  }, [prepayAmount, loanAmount, totalInterest]);

  const smartTip = useMemo(() => {
    const altDown = downPayment + 50000;
    const altLoan = onRoadPrice - altDown;
    const altEmi =
      (altLoan * (interestRate / 12 / 100) *
        Math.pow(1 + interestRate / 12 / 100, tenure * 12)) /
      (Math.pow(1 + interestRate / 12 / 100, tenure * 12) - 1);
    const altTotal = Math.round(altEmi * tenure * 12);
    const altInterest = altTotal - altLoan;
    const saving = totalInterest - altInterest;
    return saving > 0 ? saving : 0;
  }, [downPayment, interestRate, tenure, totalInterest]);

  // --- Schedule generation ---
  const generateSchedule = () => {
    const monthlyRate = interestRate / 12 / 100;
    let balance = loanAmount;
    const schedule = [];

    for (let month = 1; month <= tenure * 12; month++) {
      const interest = Math.round(balance * monthlyRate);
      let principal = emi - interest;
      if (month === tenure * 12) principal = balance;
      balance -= principal;
      schedule.push({
        month,
        emi: month === tenure * 12 ? principal + interest : emi,
        principal,
        interest,
        balance: Math.max(0, balance),
      });
      if (balance <= 0) break;
    }
    return schedule;
  };
  // Calculate EMI whenever relevant values change
  useEffect(() => {
    if (emi > 0 && onEmiCalculated) {
      onEmiCalculated(emi);
    }
  }, [emi, onEmiCalculated]);
  const scheduleData = generateSchedule();

  const pieData = [
    { name: "Principal", value: loanAmount, color: "#000000" },
    { name: "Interest", value: totalInterest, color: "#FFC107" },
  ];

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-3 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto animate-fadeInUp">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between items-center gap-3 px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-black">
              {carData.brand} {carData.model} <span className="text-gray-500">({fuelType})</span>
            </h3>
            <p className="text-sm text-gray-500">
              On-road Price:{" "}
              <span className="font-medium text-black">
                {formatINR(FinalPrice)}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex bg-gray-100 rounded-md overflow-hidden text-sm">
              <button
                onClick={() => setActiveLoanType("standard")}
                className={`px-3 sm:px-4 py-2 font-medium ${
                  activeLoanType === "standard"
                    ? "bg-[#FFC107] text-black"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Standard
              </button>
              <button
                onClick={() => setActiveLoanType("instant")}
                className={`px-3 sm:px-4 py-2 font-medium ${
                  activeLoanType === "instant"
                    ? "bg-[#FFC107] text-black"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Instant
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-gray-300 text-gray-700 flex items-center justify-center hover:bg-[#FFC107] hover:text-black transition"
            >
              ✕
            </button>
          </div>
        </div>

        {/* STANDARD LOAN */}
        {activeLoanType === "standard" ? (
          <div className="flex flex-col lg:flex-row flex-1 transition-all duration-500 ease-in-out">
            {/* LEFT PANEL */}
            <aside className="w-full lg:w-1/3 bg-white border-r border-gray-100 p-5 sm:p-6 space-y-6">
              <div className="bg-[#FFF8E1] p-4 rounded-lg border border-[#FFE082] text-center sm:text-left">
                <div className="text-sm text-gray-600">Your Monthly EMI</div>
                <div className="text-3xl font-bold text-black">
                  {formatINR(emi)}
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  For {tenure} years @ {interestRate}%
                </p>
              </div>

              {/* Down Payment Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-700">Down Payment</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={onRoadPrice * 0.1}
                      max={onRoadPrice - 50000}
                      step="1000"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="w-28 text-right border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#FFC107] focus:border-[#FFC107]"
                    />
                    {/* <span className="font-semibold text-[#FFC107] text-sm">
                      {formatINR(downPayment)}
                    </span> */}
                  </div>
                </div>

                <input
                  type="range"
                  min={onRoadPrice * 0.1}
                  max={onRoadPrice - 50000}
                  step="1000"
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-[#FFC107] cursor-pointer"
                />

                <p className="text-xs text-gray-500 mt-1">
                  Your Loan Amount will be {formatINR(loanAmount)}
                </p>
              </div>

              {/* Tenure Slider */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-700">Tenure (Years)</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="1"
                      max="7"
                      value={tenure}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="w-16 text-right border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#FFC107] focus:border-[#FFC107]"
                    />
                    {/* <span className="font-semibold text-[#FFC107]">{tenure} yrs</span> */}
                  </div>
                </div>

                <input
                  type="range"
                  min="1"
                  max="7"
                  value={tenure}
                  onChange={(e) => setTenure(Number(e.target.value))}
                  className="w-full accent-[#FFC107] cursor-pointer"
                />
              </div>

              {/* Interest Rate Slider */}
              <div>
                <div className="flex justify-between items-center text-sm mb-2">
                  <span className="text-gray-700">Interest Rate %</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="8"
                      max="20"
                      step="0.25"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="w-16 text-right border border-gray-300 rounded-md px-2 py-1 text-sm focus:ring-[#FFC107] focus:border-[#FFC107]"
                    />
                    {/* <span className="font-semibold text-[#FFC107]">{interestRate}%</span> */}
                  </div>
                </div>

                <input
                  type="range"
                  min="8"
                  max="20"
                  step="0.25"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full accent-[#FFC107] cursor-pointer"
                />
              </div>


              {/* Affordability Meter */}
              <div>
                <label className="block text-sm text-gray-600 mb-1">
                  Monthly Income
                </label>
                <input
                  type="number"
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
                <div className="mt-2 text-xs text-gray-600">
                  Affordability: {affordability}% of income
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden mt-1">
                  <div
                    className={`h-full transition-all ${
                      affordability <= 25
                        ? "bg-green-500"
                        : affordability <= 40
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(affordability, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Prepayment Simulator */}
              <div>
                <button
                  className="text-sm font-medium text-[#FFC107] hover:text-black"
                  onClick={() => setShowPrepay(!showPrepay)}
                >
                  {showPrepay
                    ? "Hide Prepayment Simulator"
                    : "Try Prepayment Simulator"}
                </button>
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    showPrepay ? "max-h-96 mt-3" : "max-h-0"
                  }`}
                >
                  <div className="pt-3 border-t space-y-3 text-sm">
                    <div>
                      <label>Prepay Amount</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={
                          prepayAmount
                            ? prepayAmount.toLocaleString("en-IN")
                            : ""
                        }
                        onChange={(e) => {
                          const cleaned = e.target.value.replace(/[^\d]/g, "");
                          setPrepayAmount(Number(cleaned));
                        }}
                        placeholder="Enter amount (e.g. 50,000)"
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <label>Month of Prepayment</label>
                      <input
                        type="number"
                        min="1"
                        max={tenure * 12}
                        value={prepayMonth}
                        onChange={(e) => setPrepayMonth(Number(e.target.value))}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mt-1"
                      />
                    </div>
                    {prepaySavings > 0 && (
                      <div className="text-xs text-green-600 font-medium">
                        You could save about {formatINR(prepaySavings)} in
                        interest.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </aside>

            {/* RIGHT PANEL */}
            <main className="flex-1 bg-gray-50 p-5 sm:p-6 flex flex-col">
              {smartTip > 0 && (
                <div className="flex items-start gap-2 bg-[#FFF8E1] border border-[#FFE082] rounded-md px-4 py-3 mb-4 text-sm text-gray-800">
                  <Lightbulb className="w-5 h-5 text-[#FFC107] shrink-0 mt-[2px]" />
                  <p>
                    Increase your down payment by{" "}
                    <span className="font-semibold">₹50,000</span> to save around{" "}
                    <span className="font-semibold">
                      {formatINR(smartTip)}
                    </span>{" "}
                    in interest.
                  </p>
                </div>
              )}

              {/* Graph / Schedule Toggle */}
              <div className="flex justify-between flex-wrap items-center mb-4">
                <h4 className="font-semibold text-gray-800">EMI Breakdown</h4>
                <div className="flex bg-white border border-gray-200 rounded-md overflow-hidden text-sm mt-2 sm:mt-0">
                  <button
                    onClick={() => setActiveView("graph")}
                    className={`px-3 py-2 ${
                      activeView === "graph"
                        ? "bg-[#FFC107] text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Graph
                  </button>
                  <button
                    onClick={() => setActiveView("schedule")}
                    className={`px-3 py-2 ${
                      activeView === "schedule"
                        ? "bg-[#FFC107] text-black"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    Schedule
                  </button>
                </div>
              </div>

              {activeView === "graph" ? (
                <div className="flex flex-col items-center justify-center flex-1">
                  <div className="h-56 sm:h-64 w-56 sm:w-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          dataKey="value"
                          nameKey="name"
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={2}
                        >
                          {pieData.map((entry, i) => (
                            <Cell key={i} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(v) => formatINR(v)} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>

                  <div className="mt-6 w-full max-w-xs text-sm space-y-2">
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="font-medium text-gray-800">
                        Principal Amount:
                      </span>
                      <span className="font-medium text-black">
                        {formatINR(loanAmount)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center border-b pb-1">
                      <span className="font-medium text-gray-800">
                        Interest Amount:
                      </span>
                      <span className="font-medium text-[#FFC107]">
                        {formatINR(totalInterest)}
                      </span>
                    </div>
                    <div className="flex justify-between items-center mt-2 font-semibold text-black">
                      <span>Total Amount:</span>
                      <span>{formatINR(totalPayment)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg overflow-hidden bg-white max-h-[400px] overflow-y-auto">
                  <table className="w-full text-xs sm:text-sm">
                    <thead className="bg-gray-100 sticky top-0">
                      <tr>
                        {["Month", "EMI", "Principal", "Interest", "Balance"].map(
                          (h) => (
                            <th key={h} className="px-3 py-2 text-right">
                              {h}
                            </th>
                          )
                        )}
                      </tr>
                    </thead>
                    <tbody>
                      {scheduleData.map((r) => (
                        <tr
                          key={r.month}
                          className="odd:bg-white even:bg-gray-50"
                        >
                          <td className="px-3 py-2 text-left">{r.month}</td>
                          <td className="px-3 py-2 text-right">{formatINR(r.emi)}</td>
                          <td className="px-3 py-2 text-right">{formatINR(r.principal)}</td>
                          <td className="px-3 py-2 text-right">{formatINR(r.interest)}</td>
                          <td className="px-3 py-2 text-right">{formatINR(r.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </main>
          </div>
        ) : (
          // INSTANT LOAN TAB
          <div className="flex flex-col items-center justify-center py-10 px-3 bg-gray-50">
            <div className="w-full max-w-md bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-sm">
              <h4 className="text-lg font-semibold text-center mb-2 text-black">
                Get Instant Loan Offers
              </h4>
              <p className="text-sm text-gray-600 text-center mb-6">
                Apply in minutes and get offers instantly.
              </p>

              <form
                className="space-y-4"
                onSubmit={(e) => {
                  e.preventDefault();
                  window.location.href =
                    "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl&url=https%3A%2F%2Fwww.bharatloan.com%2Fapply-now&subid=93cars";
                }}
              >
                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter full name"
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#FFC107] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600 mb-1">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="9876543210"
                    required
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-1 focus:ring-[#FFC107] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2 bg-[#FFC107] text-black rounded-md font-semibold shadow-md hover:shadow-lg hover:-translate-y-[2px] hover:bg-[#FFB300] hover:text-[#FFC107] transition-all duration-300 ease-in-out"
                >
                  Get Loan Offers
                </button>
              </form>

              {/* Loan Partners Section */}
              <div className="mt-8 border-t pt-6">
                <h5 className="text-sm font-semibold text-gray-800 text-center mb-4">
                  Our Lending Partners
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-center justify-items-center">
                  {Array(3)
                    .fill(
                      "https://press-release-v1-new.s3.ap-south-1.amazonaws.com/order/31048/1748503489822_content_img.jpeg"
                    )
                    .map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`Partner ${i + 1}`}
                        className="h-12 w-24 sm:h-14 sm:w-28 object-contain rounded-md"
                      />
                    ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* FOOTER */}
        <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between items-center text-center">
          <span className="text-xs text-gray-500">
            Secure • Transparent • Trusted Partners
          </span>
          <button className="px-6 py-2 bg-[#FFC107] text-black rounded-md font-semibold hover:bg-[#FFB300] hover:text-[#FFC107] transition" onClick={(e) => {
            e.stopPropagation();
            window.location.href =
                        "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl&url=https%3A%2F%2Fwww.bharatloan.com%2Fapply-now&subid=93cars";
            // toast.success("EMI Offers will be shown here");
          }}>
            Get EMI Offers
          </button>
        </div>
      </div>
    </div>
  );
};

export default EMICalculatorModal;
