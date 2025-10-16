import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EVCalculator = () => {
  const [currentScreen, setCurrentScreen] = useState('input');
  
  // EV State
  const [evRange, setEvRange] = useState(200);
  const [batteryCapacity, setBatteryCapacity] = useState(15);
  const [monthlyTravel, setMonthlyTravel] = useState(100);
  const [evChargingCost, setEvChargingCost] = useState(40);
  
  // Results
  const [evAnnualCost, setEvAnnualCost] = useState(900.00);
  const [evCostPerKm, setEvCostPerKm] = useState(0.75);
  const [monthlyCost, setMonthlyCost] = useState(75.00);
  const [totalAnnualTravel, setTotalAnnualTravel] = useState(1200);

  const handleCalculate = () => {
    const annualTravel = monthlyTravel * 12;
    
    // EV calculations
    const evEnergyConsumption = batteryCapacity / evRange;
    const evAnnualEnergy = annualTravel * evEnergyConsumption;
    const calculatedEvAnnualCost = evAnnualEnergy * evChargingCost;
    const calculatedEvCostPerKm = calculatedEvAnnualCost / annualTravel;
    const calculatedMonthlyCost = calculatedEvAnnualCost / 12;
    
    // Update results state
    setEvAnnualCost(calculatedEvAnnualCost);
    setEvCostPerKm(calculatedEvCostPerKm);
    setMonthlyCost(calculatedMonthlyCost);
    setTotalAnnualTravel(annualTravel);
    
    setCurrentScreen('results');
  };

  const handleCalculateAgain = () => {
    setCurrentScreen('input');
  };

  // Input Screen
  if (currentScreen === 'input') {
    return (
      <div className="container-fluid min-vh-100 py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-3">EV Travel Cost Calculator</h1>
            <p className="lead text-muted">
              Calculate your Electric Vehicle travel costs by entering a few details about your vehicle and usage.
            </p>
          </div>

          <div className="card shadow-lg border-0">
            <div className="card-body p-4 p-md-5">
              <h2 className="text-center mb-4 text-dark">Enter Your EV Details</h2>
              
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  {/* EV Range */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">EV Range (km per charge)</label>
                    <input 
                      type="range" 
                      min="100" 
                      max="900" 
                      value={evRange}
                      onChange={(e) => setEvRange(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">100 km</small>
                      <span className="badge bg-primary fs-6">{evRange} km</span>
                      <small className="text-muted">900 km</small>
                    </div>
                  </div>

                  {/* Battery Capacity */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Battery Capacity (kWh)</label>
                    <input 
                      type="range" 
                      min="10" 
                      max="200" 
                      value={batteryCapacity}
                      onChange={(e) => setBatteryCapacity(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">10 kWh</small>
                      <span className="badge bg-primary fs-6">{batteryCapacity} kWh</span>
                      <small className="text-muted">200 kWh</small>
                    </div>
                  </div>

                  {/* Monthly Travel */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Monthly Travel Distance (km)</label>
                    <input 
                      type="range" 
                      min="100" 
                      max="5000" 
                      value={monthlyTravel}
                      onChange={(e) => setMonthlyTravel(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">100 km</small>
                      <span className="badge bg-primary fs-6">{monthlyTravel} km</span>
                      <small className="text-muted">5000 km</small>
                    </div>
                  </div>

                  {/* EV Charging Cost */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Charging Cost (₹ per kWh)</label>
                    <input 
                      type="range" 
                      min="4" 
                      max="100" 
                      value={evChargingCost}
                      onChange={(e) => setEvChargingCost(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">₹4</small>
                      <span className="badge bg-primary fs-6">₹{evChargingCost}</span>
                      <small className="text-muted">₹100</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center mt-4">
                <button 
                  onClick={handleCalculate}
                  className="btn btn-primary btn-lg px-5"
                >
                  Calculate EV Costs
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Results Screen
  return (
    <div className="container-fluid min-vh-100 py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="display-5 fw-bold text-dark mb-3">EV Travel Cost Calculator</h1>
          <p className="lead text-muted">Your Electric Vehicle cost breakdown</p>
        </div>

        <div className="card shadow-lg border-0">
          <div className="card-body p-4 p-md-5">
            {/* Summary Section */}
            <div className="text-center mb-5 p-4 bg-opacity-10 rounded-3 border border-primary border-opacity-25">
              <h2 className="mb-3 text-dark">Your EV Cost Summary</h2>
              <div className="display-4 fw-bold text-primary mb-2">
                ₹{evAnnualCost.toFixed(2)}
              </div>
              <div className="fs-5 text-muted">
                Total annual cost for {totalAnnualTravel.toLocaleString()} km
              </div>
            </div>

            {/* Cost Breakdown Section */}
            <div className="mb-5">
              <h2 className="text-center mb-4 text-dark">Cost Breakdown</h2>
              <div className="row">
                <div className="col-md-4 mb-3">
                  <div className="card h-100 border-primary">
                    <div className="card-body text-center">
                      <div className="text-muted mb-2">Monthly Cost</div>
                      <div className="h3 fw-bold text-primary">₹{monthlyCost.toFixed(2)}</div>
                      <small className="text-muted">for {monthlyTravel} km/month</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card h-100 border-success">
                    <div className="card-body text-center">
                      <div className="text-muted mb-2">Cost per km</div>
                      <div className="h3 fw-bold text-success">₹{evCostPerKm.toFixed(2)}</div>
                      <small className="text-muted">per kilometer</small>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card h-100 border-info">
                    <div className="card-body text-center">
                      <div className="text-muted mb-2">Annual Travel</div>
                      <div className="h3 fw-bold text-info">{totalAnnualTravel.toLocaleString()} km</div>
                      <small className="text-muted">total distance</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Efficiency Metrics */}
            <div className="mb-5">
              <h3 className="text-center mb-4 text-dark">Efficiency Metrics</h3>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Energy Consumption</div>
                      <div className="h5 fw-bold text-dark">
                        {(batteryCapacity / evRange).toFixed(2)} kWh/km
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="card">
                    <div className="card-body text-center">
                      <div className="text-muted mb-1">Charging Efficiency</div>
                      <div className="h5 fw-bold text-dark">
                        {((evRange / batteryCapacity) * 100).toFixed(1)} km/100 kWh
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Again Button */}
            <div className="text-center">
              <button 
                onClick={handleCalculateAgain}
                className="btn btn-primary btn-lg px-5"
              >
                Calculate Again
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EVCalculator;