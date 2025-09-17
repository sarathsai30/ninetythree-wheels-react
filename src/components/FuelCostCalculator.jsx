import React, { useState } from "react";

const FuelCostCalculator = () => {
  const [unit, setUnit] = useState("Daily"); // Daily / Monthly / Yearly
  const [distance, setDistance] = useState(""); // empty input by default

  // Initial prices set to today's rates
  const [fuelData, setFuelData] = useState({
    Petrol: { efficiency: "", price: "109.65 " },
    Diesel: { efficiency: "", price: "97.57" },
    CNG: { efficiency: "", price: "89.00" },
  });

  const handleChange = (type, field, value) => {
    setFuelData({
      ...fuelData,
      [type]: { ...fuelData[type], [field]: value }, // keep string
    });
  };

  // Convert safely (if blank → NaN)
  const toNumber = (val) => {
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
  };

  // Adjust distance based on unit
  const getDailyDistance = () => {
    const d = toNumber(distance);
    if (d === null) return null;

    if (unit === "Daily") return d;
    if (unit === "Monthly") return d / 30;
    if (unit === "Yearly") return d / 365;
    return d;
  };

  const calculateCosts = (efficiency, price) => {
    const eff = toNumber(efficiency);
    const pr = toNumber(price);
    const dDist = getDailyDistance();

    if (eff === null || pr === null || dDist === null) return null;

    const daily = (dDist / eff) * pr;
    return {
      daily,
      monthly: daily * 30,
      yearly: daily * 365,
    };
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Fuel Cost Calculator
        </h2>

        {/* Top Filters */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Country
            </label>
            <input
              type="text"
              value="India"
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Currency
            </label>
            <input
              type="text"
              value="INR"
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Distance
            </label>
            <input
              type="text"
              value="Kilometre"
              readOnly
              className="w-full p-2 border rounded-lg bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Driving Distance
            </label>
            <div className="flex gap-2">
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="p-2 border rounded-lg"
              >
                <option>Daily</option>
                <option>Monthly</option>
                <option>Yearly</option>
              </select>
              <input
                type="text"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-24 p-2 border rounded-lg"
                placeholder="Enter"
              />
            </div>
          </div>
        </div>

        {/* Fuel Table */}
        <div className="grid grid-cols-4 gap-6">
          <div></div>
          {Object.keys(fuelData).map((type) => (
            <div
              key={type}
              className="bg-yellow-50 border border-yellow-200 rounded-md py-2 text-center font-semibold text-gray-700"
            >
              {type}
            </div>
          ))}

          {/* Efficiency Row */}
          <div className="font-medium text-gray-700 flex items-center">
            Enter Fuel Efficiency (km/l)
          </div>
          {Object.keys(fuelData).map((type) => (
            <input
              key={type}
              type="text"
              value={fuelData[type].efficiency}
              onChange={(e) =>
                handleChange(type, "efficiency", e.target.value)
              }
              className="p-2 border rounded-lg text-center"
              placeholder="Enter"
            />
          ))}

          {/* Price Row */}
          <div className="font-medium text-gray-700 flex items-center">
            Enter Fuel Cost (₹/litre)
          </div>
          {Object.keys(fuelData).map((type) => (
            <input
              key={type}
              type="text"
              value={fuelData[type].price}
              onChange={(e) => handleChange(type, "price", e.target.value)}
              className="p-2 border rounded-lg text-center"
              placeholder="Enter"
            />
          ))}

          {/* Daily Cost */}
          <div className="font-medium text-gray-700 flex items-center">
            Daily Fuel Cost
          </div>
          {Object.keys(fuelData).map((type) => {
            const cost = calculateCosts(
              fuelData[type].efficiency,
              fuelData[type].price
            );
            return (
              <div
                key={type}
                className="p-2 text-green-600 font-semibold text-center"
              >
                {cost ? `₹${cost.daily.toFixed(0)}` : "-"}
              </div>
            );
          })}

          {/* Monthly Cost */}
          <div className="font-medium text-gray-700 flex items-center">
            Monthly Fuel Cost
          </div>
          {Object.keys(fuelData).map((type) => {
            const cost = calculateCosts(
              fuelData[type].efficiency,
              fuelData[type].price
            );
            return (
              <div
                key={type}
                className="p-2 text-green-600 font-semibold text-center"
              >
                {cost
                  ? `₹${cost.monthly.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}`
                  : "-"}
              </div>
            );
          })}

          {/* Yearly Cost */}
          <div className="font-medium text-gray-700 flex items-center">
            Yearly Fuel Cost
          </div>
          {Object.keys(fuelData).map((type) => {
            const cost = calculateCosts(
              fuelData[type].efficiency,
              fuelData[type].price
            );
            return (
              <div
                key={type}
                className="p-2 text-green-600 font-semibold text-center"
              >
                {cost
                  ? `₹${cost.yearly.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}`
                  : "-"}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FuelCostCalculator;
