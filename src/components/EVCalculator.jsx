import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Doughnut, Bar, Line, Radar, PolarArea } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  RadialLinearScale,
  ChartTooltip,
  Legend,
  Filler
);

const EVCalculator = () => {
  const [currentScreen, setCurrentScreen] = useState('input');
  
  // EV State
  const [evRange, setEvRange] = useState(200);
  const [batteryCapacity, setBatteryCapacity] = useState(10);
  const [monthlyTravel, setMonthlyTravel] = useState(100);
  const [evChargingCost, setEvChargingCost] = useState(8);
  
  // Conventional Vehicle State
  const [fuelType, setFuelType] = useState('petrol');
  const [fuelPrice, setFuelPrice] = useState(100);
  const [mileage, setMileage] = useState(20);

  // Results
  const [evAnnualCost, setEvAnnualCost] = useState(0);
  const [iceAnnualCost, setIceAnnualCost] = useState(0);
  const [savings, setSavings] = useState(0);
  const [evCostPerKm, setEvCostPerKm] = useState(0);
  const [iceCostPerKm, setIceCostPerKm] = useState(0);
  const [savingsPercentage, setSavingsPercentage] = useState(0);

  // Chart Data States
  const [savingsPieData, setSavingsPieData] = useState(null);
  const [costComparisonPieData, setCostComparisonPieData] = useState(null);
  const [annualCostBarData, setAnnualCostBarData] = useState(null);
  const [savingsOverTimeData, setSavingsOverTimeData] = useState(null);
  const [costPerKmComparisonData, setCostPerKmComparisonData] = useState(null);
  const [environmentalImpactData, setEnvironmentalImpactData] = useState(null);
  const [vehicleComparisonRadarData, setVehicleComparisonRadarData] = useState(null);
  const [monthlyCostTrendData, setMonthlyCostTrendData] = useState(null);

  const handleCalculate = () => {
    const annualTravel = monthlyTravel * 12;
    
    // EV calculations
    const evEnergyConsumption = batteryCapacity / evRange; // kWh per km
    const evAnnualEnergy = annualTravel * evEnergyConsumption;
    const calculatedEvAnnualCost = evAnnualEnergy * evChargingCost;
    const calculatedEvCostPerKm = calculatedEvAnnualCost / annualTravel;
    
    // ICE calculations
    const iceAnnualFuel = annualTravel / mileage;
    const calculatedIceAnnualCost = iceAnnualFuel * fuelPrice;
    const calculatedIceCostPerKm = calculatedIceAnnualCost / annualTravel;
    
    // Savings
    const calculatedSavings = calculatedIceAnnualCost - calculatedEvAnnualCost;
    const calculatedSavingsPercentage = ((calculatedSavings / calculatedIceAnnualCost) * 100);
    
    // Update results state
    setEvAnnualCost(calculatedEvAnnualCost);
    setIceAnnualCost(calculatedIceAnnualCost);
    setSavings(calculatedSavings);
    setEvCostPerKm(calculatedEvCostPerKm);
    setIceCostPerKm(calculatedIceCostPerKm);
    setSavingsPercentage(calculatedSavingsPercentage);
    
    // Prepare chart data
    prepareChartData(
      calculatedEvAnnualCost,
      calculatedIceAnnualCost,
      calculatedSavings,
      calculatedEvCostPerKm,
      calculatedIceCostPerKm,
      monthlyTravel
    );
    
    setCurrentScreen('results');
  };

  const prepareChartData = (evAnnual, iceAnnual, totalSavings, evCostKm, iceCostKm, monthlyTravel) => {
    // Savings Pie Data
    setSavingsPieData({
      labels: ['EV Cost', 'Your Savings'],
      datasets: [
        {
          data: [evAnnual, totalSavings],
          backgroundColor: ['#28a745', '#007bff'],
          borderColor: ['#1e7e34', '#0056b3'],
          borderWidth: 2,
        },
      ],
    });

    // Annual Cost Bar Data
    setAnnualCostBarData({
      labels: ['Electric Vehicle', 'Conventional Vehicle'],
      datasets: [{
        label: 'Annual Cost (₹)',
        data: [evAnnual, iceAnnual],
        backgroundColor: ['#28a745', '#dc3545'],
        borderColor: ['#1e7e34', '#c82333'],
        borderWidth: 2,
        borderRadius: 8,
      }],
    });

    // 5-Year Savings Projection Line Chart
    const years = [1, 2, 3, 4, 5];
    const cumulativeSavings = years.map(year => totalSavings * year);
    
    setSavingsOverTimeData({
      labels: years.map(year => `Year ${year}`),
      datasets: [
        {
          label: 'Cumulative Savings (₹)',
          data: cumulativeSavings,
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.4,
        },
      ],
    });

    // Cost per Km Comparison Bar Chart
    setCostPerKmComparisonData({
      labels: ['Electric Vehicle', 'Conventional Vehicle'],
      datasets: [
        {
          label: 'Cost per Kilometer (₹)',
          data: [evCostKm, iceCostKm],
          backgroundColor: ['#28a745', '#dc3545'],
          borderColor: ['#1e7e34', '#c82333'],
          borderWidth: 2,
          borderRadius: 8,
        },
      ],
    });

    // Environmental Impact Polar Area Chart - FIXED VERSION
    // Using meaningful values based on actual calculations
    const co2Reduction = Math.min(95, Math.max(60, (iceAnnual / 100) * 2)); // CO₂ reduction percentage
    const energyEfficiency = Math.min(90, Math.max(70, 100 - (evCostKm * 50))); // Energy efficiency score
    const noiseReduction = 85; // Fixed benefit for EVs
    const airQuality = Math.min(95, Math.max(65, (iceAnnual / 100) * 1.5)); // Air quality improvement
    
    setEnvironmentalImpactData({
      labels: ['CO₂ Reduction', 'Energy Efficiency', 'Noise Reduction', 'Air Quality'],
      datasets: [
        {
          label: 'Environmental Benefits Score',
          data: [co2Reduction, energyEfficiency, noiseReduction, airQuality],
          backgroundColor: [
            'rgba(40, 167, 69, 0.7)',
            'rgba(0, 123, 255, 0.7)',
            'rgba(111, 66, 193, 0.7)',
            'rgba(253, 126, 20, 0.7)'
          ],
          borderColor: [
            'rgba(40, 167, 69, 1)',
            'rgba(0, 123, 255, 1)',
            'rgba(111, 66, 193, 1)',
            'rgba(253, 126, 20, 1)'
          ],
          borderWidth: 2,
        },
      ],
    });

    // Vehicle Comparison Radar Chart - FIXED VERSION
    // Calculate scores based on actual cost comparisons
    const fuelCostScore = Math.min(95, Math.max(60, 100 - (evCostKm / iceCostKm) * 30));
    const maintenanceScore = 80; // EVs generally have lower maintenance
    const performanceScore = 90; // EVs have better acceleration
    const environmentScore = Math.min(100, Math.max(70, co2Reduction + 10));
    const convenienceScore = 75; // Charging vs refueling trade-off
    const noiseScore = 85; // EVs are quieter
    
    setVehicleComparisonRadarData({
      labels: ['Fuel Cost', 'Maintenance', 'Performance', 'Environment', 'Convenience', 'Noise Level'],
      datasets: [
        {
          label: 'Electric Vehicle',
          data: [fuelCostScore, maintenanceScore, performanceScore, environmentScore, convenienceScore, noiseScore],
          backgroundColor: 'rgba(40, 167, 69, 0.2)',
          borderColor: 'rgba(40, 167, 69, 1)',
          pointBackgroundColor: 'rgba(40, 167, 69, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(40, 167, 69, 1)',
        },
        {
          label: 'Conventional Vehicle',
          data: [100 - fuelCostScore + 20, 60, 70, 30, 85, 50],
          backgroundColor: 'rgba(220, 53, 69, 0.2)',
          borderColor: 'rgba(220, 53, 69, 1)',
          pointBackgroundColor: 'rgba(220, 53, 69, 1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(220, 53, 69, 1)',
        },
      ],
    });

    // Monthly Cost Trend Line Chart
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const monthlyEvCost = evAnnual / 12;
    const monthlyIceCost = iceAnnual / 12;
    
    setMonthlyCostTrendData({
      labels: months,
      datasets: [
        {
          label: 'Electric Vehicle',
          data: months.map(() => monthlyEvCost),
          borderColor: '#28a745',
          backgroundColor: 'rgba(40, 167, 69, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.1,
        },
        {
          label: 'Conventional Vehicle',
          data: months.map(() => monthlyIceCost),
          borderColor: '#dc3545',
          backgroundColor: 'rgba(220, 53, 69, 0.1)',
          borderWidth: 3,
          fill: true,
          tension: 0.1,
        },
      ],
    });
  };

  const handleCalculateAgain = () => {
    setCurrentScreen('input');
  };

  // Chart options
  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ₹${value.toFixed(2)} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%',
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `₹${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (₹)'
        }
      },
    },
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ₹${context.raw.toFixed(2)}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Amount (₹)'
        }
      },
    },
  };

  const radarChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        angleLines: {
          display: true
        },
        suggestedMin: 0,
        suggestedMax: 100,
        ticks: {
          stepSize: 20
        }
      }
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      },
    },
  };

  const polarAreaOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      },
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          stepSize: 20
        }
      }
    }
  };

  // Input Screen (unchanged from your original code)
  if (currentScreen === 'input') {
    return (
      <div className="container-fluid min-vh-100 py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-dark mb-3">EV Travel Cost Calculator</h1>
            <p className="lead text-muted">
              Estimate how much you can save by switching to an Electric Vehicle. Calculate your savings against a conventional (ICE) vehicle by entering a few details.
            </p>
          </div>

          <div className="row g-4">
            {/* Electric Vehicle Section */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-primary text-white py-3">
                  <h3 className="mb-0">
                    <i className="bi bi-lightning-charge me-2"></i>
                    Electric Vehicle
                  </h3>
                </div>
                <div className="card-body p-4">
                  {/* EV Range */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      EV Range
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            Distance EV covers in one full charge
                          </Tooltip>
                        }
                      >
                        <i className="bi bi-info-circle ms-2 text-muted" style={{ cursor: 'help' }}></i>
                      </OverlayTrigger>
                    </label>
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
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <input 
                          type="number" 
                          min="100" 
                          max="900" 
                          value={evRange}
                          onChange={(e) => setEvRange(parseInt(e.target.value) || 100)}
                          className="form-control text-center"
                          style={{width: '80px'}}
                        />
                        <span className="input-group-text bg-primary text-white">km</span>
                      </div>
                      <small className="text-muted">900 km</small>
                    </div>
                  </div>

                  {/* Battery Capacity */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      Battery Capacity
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            Battery Capacity of the EV in kWh
                          </Tooltip>
                        }
                      >
                        <i className="bi bi-info-circle ms-2 text-muted" style={{ cursor: 'help' }}></i>
                      </OverlayTrigger>
                    </label>
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
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <input 
                          type="number" 
                          min="10" 
                          max="200" 
                          value={batteryCapacity}
                          onChange={(e) => setBatteryCapacity(parseInt(e.target.value) || 10)}
                          className="form-control text-center"
                          style={{width: '80px'}}
                        />
                        <span className="input-group-text bg-primary text-white">kWh</span>
                      </div>
                      <small className="text-muted">200 kWh</small>
                    </div>
                  </div>

                  {/* Monthly Travel */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      Monthly Travel (in km)
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            The total distance you typically drive in a month.                     
                          </Tooltip>
                        }
                      >
                        <i className="bi bi-info-circle ms-2 text-muted" style={{ cursor: 'help' }}></i>
                      </OverlayTrigger>
                    </label>
                    <input 
                      type="range" 
                      min="100" 
                      max="10000" 
                      value={monthlyTravel}
                      onChange={(e) => setMonthlyTravel(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">100 km</small>
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <input 
                          type="number" 
                          min="100" 
                          max="10000" 
                          value={monthlyTravel}
                          onChange={(e) => setMonthlyTravel(parseInt(e.target.value) || 100)}
                          className="form-control text-center"
                          style={{width: '80px'}}
                        />
                        <span className="input-group-text bg-primary text-white">km</span>
                      </div>
                      <small className="text-muted">10000 km</small>
                    </div>
                  </div>

                  {/* EV Charging Cost */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold d-flex align-items-center">
                      EV Charging Cost (₹ / kWh)
                      <OverlayTrigger
                        placement="top"
                        overlay={
                          <Tooltip>
                            The cost of electricity per unit (kWh) for charging your EV.                           
                          </Tooltip>
                        }
                      >
                        <i className="bi bi-info-circle ms-2 text-muted" style={{ cursor: 'help' }}></i>
                      </OverlayTrigger>
                    </label>
                    <input 
                      type="range" 
                      min="4" 
                      max="100" 
                      value={evChargingCost}
                      onChange={(e) => setEvChargingCost(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">₹4 / kWh</small>
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <span className="input-group-text bg-primary text-white">₹</span>
                        <input 
                          type="number" 
                          min="4" 
                          max="100" 
                          value={evChargingCost}
                          onChange={(e) => setEvChargingCost(parseInt(e.target.value) || 4)}
                          className="form-control text-center"
                          style={{width: '70px'}}
                        />
                        <span className="input-group-text bg-primary text-white">/kWh</span>
                      </div>
                      <small className="text-muted">₹100 / kWh</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Conventional Vehicle Section */}
            <div className="col-lg-6">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-header bg-secondary text-white py-3">
                  <h3 className="mb-0">
                    <i className="bi bi-fuel-pump me-2"></i>
                    Conventional Vehicle
                  </h3>
                </div>
                <div className="card-body p-4">
                  {/* Fuel Type */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Fuel Type</label>
                    <div>
                      <div className="form-check form-check-inline">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="fuelType" 
                          id="petrol" 
                          value="petrol"
                          checked={fuelType === 'petrol'}
                          onChange={(e) => setFuelType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="petrol">Petrol</label>
                      </div>
                      <div className="form-check form-check-inline">
                        <input 
                          className="form-check-input" 
                          type="radio" 
                          name="fuelType" 
                          id="diesel" 
                          value="diesel"
                          checked={fuelType === 'diesel'}
                          onChange={(e) => setFuelType(e.target.value)}
                        />
                        <label className="form-check-label" htmlFor="diesel">Diesel</label>
                      </div>
                    </div>
                  </div>

                  {/* Fuel Price */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Fuel price (₹ / litre)</label>
                    <input 
                      type="range" 
                      min="80" 
                      max="120" 
                      step="1"
                      value={fuelPrice}
                      onChange={(e) => setFuelPrice(parseFloat(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">₹80 / litre</small>
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <span className="input-group-text bg-secondary text-white">₹</span>
                        <input 
                          type="number" 
                          min="80" 
                          max="120" 
                          step="0.1"
                          value={fuelPrice}
                          onChange={(e) => setFuelPrice(parseFloat(e.target.value) || 80)}
                          className="form-control text-center"
                          style={{width: '70px'}}
                        />
                        <span className="input-group-text bg-secondary text-white">/litre</span>
                      </div>
                      <small className="text-muted">₹120 / litre</small>
                    </div>
                  </div>

                  {/* Average Mileage */}
                  <div className="mb-4">
                    <label className="form-label fw-semibold">Avg. mileage (km/l)</label>
                    <input 
                      type="range" 
                      min="5" 
                      max="30" 
                      value={mileage}
                      onChange={(e) => setMileage(parseInt(e.target.value))}
                      className="form-range"
                    />
                    <div className="d-flex justify-content-between align-items-center mt-2">
                      <small className="text-muted">5 km/l</small>
                      <div className="input-group input-group-sm" style={{width: '150px'}}>
                        <input 
                          type="number" 
                          min="5" 
                          max="30" 
                          value={mileage}
                          onChange={(e) => setMileage(parseInt(e.target.value) || 5)}
                          className="form-control text-center"
                          style={{width: '80px'}}
                        />
                        <span className="input-group-text bg-secondary text-white">km/l</span>
                      </div>
                      <small className="text-muted">30 km/l</small>
                    </div>
                  </div>

                  {/* Additional Info */}
                  <div className="mt-4 p-3 bg-light rounded">
                    <small className="text-muted">
                      <i className="bi bi-info-circle me-1"></i>
                      Based on current fuel prices and average vehicle efficiency
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calculate Button */}
          <div className="text-center mt-5">
            <button 
              onClick={handleCalculate}
              className="btn btn-primary btn-lg px-5 py-3 fw-bold"
              style={{ fontSize: '1.2rem' }}
            >
              <i className="bi bi-calculator me-2"></i>
              Calculate Savings
            </button>
          </div>

          {/* Features Overview */}
          <div className="row mt-5">
            <div className="col-12">
              <div className="card border-0 bg-transparent">
                <div className="card-body text-center">
                  <div className="row">
                    <div className="col-md-3 mb-3">
                      <div className="text-primary d-flex justify-content-center align-items-center" style={{height: '64px'}}>
                        <i className="bi bi-graph-up-arrow fs-1"></i>
                      </div>
                      <h6 className="mt-2">Cost Analysis</h6>
                      <small className="text-muted">Detailed cost breakdown</small>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-success d-flex justify-content-center align-items-center" style={{height: '64px'}}>
                        <i className="fa-solid fa-leaf fs-1"></i>
                      </div>
                      <h6 className="mt-2">Environmental Impact</h6>
                      <small className="text-muted">CO₂ savings calculation</small>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-info d-flex justify-content-center align-items-center" style={{height: '64px'}}>
                        <i className="bi bi-clock-history fs-1"></i>
                      </div>
                      <h6 className="mt-2">Long-term Projections</h6>
                      <small className="text-muted">5-year savings forecast</small>
                    </div>
                    <div className="col-md-3 mb-3">
                      <div className="text-warning d-flex justify-content-center align-items-center" style={{height: '64px'}}>
                        <i className="bi bi-bar-chart fs-1"></i>
                      </div>
                      <h6 className="mt-2">Visual Comparison</h6>
                      <small className="text-muted">Multiple chart types</small>
                    </div>
                  </div>
                </div>
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
          <p className="lead text-muted">Comprehensive comparison between EV and Conventional Vehicle</p>
        </div>

        <div className="card shadow-lg border-0">
          <div className="card-body p-4 p-md-5">
            {/* Savings Summary */}
            <div className="text-center mb-5 p-4 bg-light rounded-3">
              <h2 className="mb-3 text-dark">Annual Savings</h2>
              <div className="display-4 fw-bold text-success mb-2">
                ₹{savings.toFixed(2)}
              </div>
              <div className="fs-5 text-muted">
                <strong>{savingsPercentage.toFixed(2)}% less cost</strong> than a conventional vehicle
              </div>
              <div className="mt-3">
                <span className="badge bg-success fs-6">
                  <i className="bi bi-check-circle me-1"></i>
                  You save ₹{(savings / 12).toFixed(2)} every month
                </span>
              </div>
            </div>

            {/* Financial Analysis Section */}
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="text-center mb-4 text-dark" style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  <i className="bi bi-cash-coin me-2"></i>
                  Financial Analysis
                </h2>
                
                <div className="row g-4 justify-content-center">
                  {/* Annual Cost Comparison */}
                  <div className="col-lg-5 col-xl-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header text-center py-3 bg-primary text-white">
                        <h6 className="mb-0">Annual Cost Comparison</h6>
                      </div>
                      <div className="card-body">
                        <div style={{ height: '250px', position: 'relative' }}>
                          {annualCostBarData && (
                            <Bar data={annualCostBarData} options={barChartOptions} />
                          )}
                        </div>
                        <div className="text-center mt-3">
                          <small className="text-muted">
                            EV saves <strong className="text-success">₹{savings.toFixed(2)}</strong> annually
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cost per Km Comparison */}
                  <div className="col-lg-5 col-xl-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header text-center py-3 bg-success text-white">
                        <h6 className="mb-0">Cost per Kilometer</h6>
                      </div>
                      <div className="card-body">
                        <div style={{ height: '250px', position: 'relative' }}>
                          {costPerKmComparisonData && (
                            <Bar data={costPerKmComparisonData} options={barChartOptions} />
                          )}
                        </div>
                        <div className="text-center mt-3">
                          <small className="text-muted">
                            Save <strong className="text-success">₹{(iceCostPerKm - evCostPerKm).toFixed(2)}</strong> per km
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Time-Based Projections */}
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="text-center mb-4 text-dark" style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  <i className="bi bi-graph-up me-2"></i>
                  Long-Term Projections
                </h2>
                
                <div className="row g-4">
                  {/* 5-Year Savings Projection */}
                  <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header text-center py-3 bg-warning text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-piggy-bank me-2"></i>
                          Your Money Grows Over Time
                        </h6>
                      </div>
                      <div className="card-body">
                        <div style={{ height: '250px', position: 'relative' }}>
                          {savingsOverTimeData && (
                            <Line data={savingsOverTimeData} options={lineChartOptions} />
                          )}
                        </div>
                        <div className="text-center mt-3">
                          <div className="alert alert-success border-0 py-2">
                            <h6 className="mb-1">Total in 5 Years: <strong>₹{(savings * 5).toFixed(2)}</strong></h6>
                            <small className="mb-0">That's like getting 5 years of fuel for FREE!</small>
                          </div>
                          
                          <div className="row text-center small mt-3">
                            <div className="col-6 border-end">
                              <div className="text-muted">This Year</div>
                              <div className="h6 text-success fw-bold mb-1">₹{savings.toFixed(2)}</div>
                              <small className="text-muted">saved</small>
                            </div>
                            <div className="col-6">
                              <div className="text-muted">In 5 Years</div>
                              <div className="h6 text-warning fw-bold mb-1">₹{(savings * 5).toFixed(2)}</div>
                              <small className="text-muted">accumulated</small>
                            </div>
                          </div>

                          <div className="mt-3 p-2 bg-light rounded">
                            <small className="text-muted">
                              <i className="bi bi-lightbulb me-1"></i>
                              <strong>Smart thinking:</strong> This money could help pay for your EV or other investments!
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Savings Distribution */}
                  <div className="col-lg-6">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header text-center py-3 bg-success text-white">
                        <h6 className="mb-0">
                          <i className="bi bi-pie-chart me-2"></i>
                          Where Your Money Goes
                        </h6>
                      </div>
                      <div className="card-body">
                        <div style={{ height: '250px', position: 'relative' }}>
                          {savingsPieData && (
                            <Doughnut data={savingsPieData} options={pieChartOptions} />
                          )}
                        </div>
                        <div className="text-center mt-4">
                          <div className="row mb-3">
                            <div className="col-6">
                              <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="bg-success rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                                <small className="fw-bold">EV Cost</small>
                              </div>
                              <div className="h6 text-success mb-1">₹{evAnnualCost.toFixed(2)}</div>
                              <small className="text-muted">What you pay</small>
                            </div>
                            <div className="col-6">
                              <div className="d-flex align-items-center justify-content-center mb-2">
                                <div className="bg-primary rounded-circle me-2" style={{width: '12px', height: '12px'}}></div>
                                <small className="fw-bold">Your Savings</small>
                              </div>
                              <div className="h6 text-primary mb-1">₹{savings.toFixed(2)}</div>
                              <small className="text-muted">Money in your pocket</small>
                            </div>
                          </div>
                          
                          <div className="alert alert-info border-0 py-2 small">
                            <i className="bi bi-info-circle me-1"></i>
                            <strong>See the difference:</strong> The green part is what you pay for EV, the blue is what you save compared to petrol/diesel!
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Comprehensive Comparison */}
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="text-center mb-4 text-dark" style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  <i className="bi bi-clipboard-data me-2"></i>
                  Comprehensive Vehicle Comparison
                </h2>
                
                <div className="row g-4">
                  <div className="col-12">
                    <div className="card h-100 shadow-sm mx-auto" style={{maxWidth: '800px'}}>
                      <div className="card-header text-center py-3 bg-success text-white">
                        <h6 className="mb-0">Environmental Impact Analysis</h6>
                      </div>
                      <div className="card-body text-center">
                        <div style={{ height: '350px', position: 'relative' }} className="d-flex align-items-center justify-content-center">
                          {environmentalImpactData ? (
                            <PolarArea 
                              data={environmentalImpactData} 
                              options={polarAreaOptions}
                            />
                          ) : (
                            <div className="text-muted">
                              <i className="bi bi-graph-up fs-1"></i>
                              <p>Loading chart data...</p>
                            </div>
                          )}
                        </div>
                        <div className="text-center mt-3">
                          <small className="text-muted">
                            EV environmental benefits across key areas - Higher scores indicate better performance
                          </small>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>            

            {/* Cost Breakup Cards */}
            <div className="row mb-5">
              <div className="col-12">
                <h2 className="text-center mb-4 text-dark" style={{ fontSize: '1.9rem', fontWeight: '600' }}>
                  <i className="bi bi-wallet2 me-2"></i>
                  Detailed Cost Analysis
                </h2>
                <div className="row justify-content-center">
                  <div className="col-lg-10">
                    <div className="row">
                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-success shadow-sm">
                          <div className="card-header bg-success text-white text-center py-3">
                            <h5 className="mb-0">
                              <i className="bi bi-lightning-charge me-2"></i>
                              Electric Vehicle
                            </h5>
                          </div>
                          <div className="card-body text-center">
                            <div className="mb-3">
                              <div className="text-muted mb-1">Annual Cost</div>
                              <div className="h4 fw-bold text-success">₹{evAnnualCost.toFixed(2)}</div>
                            </div>
                            <div className="mb-3">
                              <div className="text-muted mb-1">Cost per km</div>
                              <div className="h5 fw-bold text-dark">₹{evCostPerKm.toFixed(2)}</div>
                            </div>
                            <div className="mb-3">
                              <div className="text-muted mb-1">Monthly Cost</div>
                              <div className="h5 fw-bold text-dark">₹{(evAnnualCost / 12).toFixed(2)}</div>
                            </div>
                            <div className="mt-4 p-3 bg-success bg-opacity-10 rounded">
                              <small className="text-success">
                                <i className="bi bi-check-circle me-1"></i>
                                Lower maintenance costs
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-md-6 mb-4">
                        <div className="card h-100 border-danger shadow-sm">
                          <div className="card-header bg-danger text-white text-center py-3">
                            <h5 className="mb-0">
                              <i className="bi bi-fuel-pump me-2"></i>
                              Conventional Vehicle
                            </h5>
                          </div>
                          <div className="card-body text-center">
                            <div className="mb-3">
                              <div className="text-muted mb-1">Annual Cost</div>
                              <div className="h4 fw-bold text-danger">₹{iceAnnualCost.toFixed(2)}</div>
                            </div>
                            <div className="mb-3">
                              <div className="text-muted mb-1">Cost per km</div>
                              <div className="h5 fw-bold text-dark">₹{iceCostPerKm.toFixed(2)}</div>
                            </div>
                            <div className="mb-3">
                              <div className="text-muted mb-1">Monthly Cost</div>
                              <div className="h5 fw-bold text-dark">₹{(iceAnnualCost / 12).toFixed(2)}</div>
                            </div>
                            <div className="mt-4 p-3 bg-danger bg-opacity-10 rounded">
                              <small className="text-danger">
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                Higher operational costs
                              </small>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Additional Key Metrics */}
            <div className="row mt-4">
              <div className="col-md-3 mb-3">
                <div className="card text-center border-0 bg-primary text-white shadow-sm">
                  <div className="card-body p-3">
                    <h5 className="mb-3" style={{ fontSize: '1rem', fontWeight: '600' }}>
                      <i className="bi bi-calendar-check me-2"></i>
                      Monthly Savings
                    </h5>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '700' }}>
                      ₹{(savings / 12).toFixed(2)}
                    </h3>
                    <small>
                      Extra in your pocket monthly
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center border-0 bg-success text-white shadow-sm">
                  <div className="card-body p-3">
                    <h5 className="mb-3" style={{ fontSize: '1rem', fontWeight: '600' }}>
                      <i className="bi bi-speedometer2 me-2"></i>
                      Savings per km
                    </h5>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '700' }}>₹{(savings / (monthlyTravel * 12)).toFixed(2)}</h3>
                    <small>
                      Save on every drive
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center border-0 bg-info text-white shadow-sm">
                  <div className="card-body p-3">
                    <h5 className="mb-3" style={{ fontSize: '1rem', fontWeight: '600' }}>
                      <i className="bi bi-geo-alt me-2"></i>
                      Annual Travel
                    </h5>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '700' }}>{(monthlyTravel * 12).toLocaleString()} km</h3>
                    <small>
                      Distance covered yearly
                    </small>
                  </div>
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <div className="card text-center border-0 bg-warning text-white shadow-sm">
                  <div className="card-body p-3">
                    <h5 className="mb-3" style={{ fontSize: '1rem', fontWeight: '600' }}>
                      <i className="fa-solid fa-leaf me-2"></i>
                      CO₂ Reduction
                    </h5>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: '700' }}>{(iceAnnualCost / 50).toFixed(0)} kg</h3>
                    <small>
                      Annual environmental impact
                    </small>
                  </div>
                </div>
              </div>
            </div>

            {/* Environmental Impact Banner */}
            <div className="row mt-4">
              <div className="col-12">
                <div className="card border-0 shadow-sm" style={{
                  background: 'linear-gradient(135deg, #ecfdf5, #d1fae5)',
                  borderLeft: '4px solid #10b981'
                }}>
                  <div className="card-body text-center p-4">
                    <div className="row align-items-center">
                      <div className="col-md-8 text-md-start">
                        <h5 className="fw-bold text-success mb-2">
                          <i className="fa-solid fa-leaf me-2"></i>
                          Positive Environmental Impact
                        </h5>
                        <p className="text-muted mb-0">
                          By switching to EV, you're not just saving money but also reducing your carbon footprint by approximately <strong>{(iceAnnualCost / 50).toFixed(0)} kg of CO₂</strong> annually - equivalent to planting about {Math.ceil(iceAnnualCost / 500)} trees!
                        </p>
                      </div>
                      <div className="col-md-4 text-md-end">
                        <div className="h4 fw-bold text-success">
                          ~{(iceAnnualCost / 50).toFixed(0)} kg CO₂ saved
                        </div>
                        <small className="text-muted">per year</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Calculate Again Button */}
            <div className="text-center mt-5">
              <button 
                onClick={handleCalculateAgain}
                className="btn btn-primary btn-lg px-5 py-3 fw-bold"
                style={{ fontSize: '1.2rem' }}
              >
                <i className="bi bi-arrow-repeat me-2"></i>
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