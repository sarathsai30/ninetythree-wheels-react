import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const CarLoanApplication = () => {
  const [formData, setFormData] = useState({
    // Personal Information
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    panNumber: '',
    
    // Employment Details
    employmentType: 'salaried',
    companyName: '',
    monthlyIncome: '',
    workExperience: '',
    
    // Loan Details
    loanAmount: '',
    loanTenure: '',
    carPrice: '',
    carModel: '',
    manufacturer: '',
    
    // Address
    residenceType: 'owned',
    city: '',
    pincode: '',
    
    // Additional Details
    existingLoans: 'no',
    creditScore: ''
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [emiDetails, setEmiDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('graph');
  const [interestRate, setInterestRate] = useState(8.5);

  useEffect(() => {
    if (formData.loanAmount && formData.loanTenure) {
      calculateEMIDetails();
    }
  }, [formData.loanAmount, formData.loanTenure, interestRate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const calculateEMIDetails = () => {
  const principal = parseFloat(formData.loanAmount) || 0;
  const rate = interestRate;
  const tenure = parseFloat(formData.loanTenure) || 1;
  
  if (principal === 0 || tenure === 0) return;

  const monthlyRate = rate / 12 / 100;
  const numberOfMonths = tenure * 12;

  // Calculate EMI
  const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) / 
              (Math.pow(1 + monthlyRate, numberOfMonths) - 1);

  // Generate schedule with exact final payment
  let balance = principal;
  const schedule = [];
  
  for (let month = 1; month <= numberOfMonths; month++) {
    const interest = balance * monthlyRate;
    let principalPaid = emi - interest;
    let actualEMI = emi;
    
    // Adjust final payment to clear balance exactly
    if (month === numberOfMonths) {
      principalPaid = balance;
      actualEMI = principalPaid + interest;
    }
    
    balance -= principalPaid;
    
    schedule.push({
      month,
      emi: Math.round(actualEMI),
      principal: Math.round(principalPaid),
      interest: Math.round(interest),
      balance: Math.max(0, Math.round(balance))
    });

    if (balance <= 0) break;
  }

  // Calculate totals from the actual schedule
  const totalAmount = schedule.reduce((sum, payment) => sum + payment.emi, 0);
  const totalInterest = schedule.reduce((sum, payment) => sum + payment.interest, 0);

  setEmiDetails({
    emi: Math.round(emi),
    totalAmount: Math.round(totalAmount),
    totalInterest: Math.round(totalInterest),
    principal: Math.round(principal),
    schedule: schedule
  });
};

  const calculateEMI = () => {
    if (!emiDetails) return '0';
    return emiDetails.emi;
  };

  const getChartData = () => {
    if (!emiDetails) return null;
    
    const principal = parseFloat(emiDetails.principal);
    const interest = parseFloat(emiDetails.totalInterest);
    const total = principal + interest;
    
    return {
      principal,
      interest,
      principalPercentage: ((principal / total) * 100).toFixed(1),
      interestPercentage: ((interest / total) * 100).toFixed(1)
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowSuccess(true);
    console.log('Form submitted:', formData);
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Separate handler for tab switching
  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const chartData = getChartData();

  if (showSuccess) {
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card shadow-lg border-0">
              <div className="card-body text-center py-5">
                <div className="text-success mb-4">
                  <i className="fas fa-check-circle fa-5x"></i>
                </div>
                <h2 className="text-success mb-3">Application Submitted Successfully!</h2>
                <p className="lead mb-4">
                  Thank you for applying for a car loan. Our executive will contact you within 24 hours.
                </p>
                <button 
                  className="btn btn-primary"
                  onClick={() => {
                    setShowSuccess(false);
                    setCurrentStep(1);
                    setFormData({
                      fullName: '', email: '', mobile: '', dob: '', panNumber: '',
                      employmentType: 'salaried', companyName: '', monthlyIncome: '', workExperience: '',
                      loanAmount: '', loanTenure: '', carPrice: '', carModel: '', manufacturer: '',
                      residenceType: 'owned', city: '', pincode: '',
                      existingLoans: 'no', creditScore: ''
                    });
                    setEmiDetails(null);
                    setInterestRate(8.5);
                  }}
                >
                  Apply Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4 mb-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {/* Header */}
          <div className="text-center mb-5">
            <h1 className="display-5 fw-bold text-primary">Apply for Car Loan</h1>
            <p className="lead">Get the best car loan deals with competitive interest rates</p>
          </div>

          {/* Progress Bar */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <div className="progress mb-3" style={{ height: '10px' }}>
                <div 
                  className="progress-bar bg-success" 
                  style={{ width: `${(currentStep / 4) * 100}%` }}
                ></div>
              </div>
              <div className="d-flex justify-content-between">
                <span className={currentStep >= 1 ? 'fw-bold text-primary' : 'text-muted'}>
                  Personal Details
                </span>
                <span className={currentStep >= 2 ? 'fw-bold text-primary' : 'text-muted'}>
                  Employment
                </span>
                <span className={currentStep >= 3 ? 'fw-bold text-primary' : 'text-muted'}>
                  Loan Details
                </span>
                <span className={currentStep >= 4 ? 'fw-bold text-primary' : 'text-muted'}>
                  Review & Submit
                </span>
              </div>
            </div>
          </div>

          <div className="card shadow-lg border-0">
            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div>
                    <h4 className="mb-4 text-primary">
                      <i className="fas fa-user me-2"></i>
                      Personal Information
                    </h4>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Full Name *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Email Address *</label>
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Mobile Number *</label>
                        <input
                          type="tel"
                          className="form-control"
                          name="mobile"
                          value={formData.mobile}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Date of Birth *</label>
                        <input
                          type="date"
                          className="form-control"
                          name="dob"
                          value={formData.dob}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">PAN Number *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="panNumber"
                          value={formData.panNumber}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Employment Details */}
                {currentStep === 2 && (
                  <div>
                    <h4 className="mb-4 text-primary">
                      <i className="fas fa-briefcase me-2"></i>
                      Employment Details
                    </h4>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Employment Type *</label>
                        <select
                          className="form-select"
                          name="employmentType"
                          value={formData.employmentType}
                          onChange={handleChange}
                          required
                        >
                          <option value="salaried">Salaried</option>
                          <option value="self-employed">Self Employed</option>
                          <option value="business">Business</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Company/Business Name</label>
                        <input
                          type="text"
                          className="form-control"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Monthly Income (₹) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="monthlyIncome"
                          value={formData.monthlyIncome}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Work Experience (Years) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="workExperience"
                          value={formData.workExperience}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">City *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Pincode *</label>
                        <input
                          type="text"
                          className="form-control"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Loan & Car Details */}
                {currentStep === 3 && (
                  <div>
                    <h4 className="mb-4 text-primary">
                      <i className="fas fa-car me-2"></i>
                      Car & Loan Details
                    </h4>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Car Manufacturer</label>
                        <input
                          type="text"
                          className="form-control"
                          name="manufacturer"
                          value={formData.manufacturer}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Car Model</label>
                        <input
                          type="text"
                          className="form-control"
                          name="carModel"
                          value={formData.carModel}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Car Price (₹) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="carPrice"
                          value={formData.carPrice}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Loan Amount Required (₹) *</label>
                        <input
                          type="number"
                          className="form-control"
                          name="loanAmount"
                          value={formData.loanAmount}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Loan Tenure (Years) *</label>
                        <select
                          className="form-select"
                          name="loanTenure"
                          value={formData.loanTenure}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select Tenure</option>
                          <option value="1">1 Year</option>
                          <option value="2">2 Years</option>
                          <option value="3">3 Years</option>
                          <option value="4">4 Years</option>
                          <option value="5">5 Years</option>
                          <option value="7">7 Years</option>
                        </select>
                      </div>
                      <div className="col-md-6 mb-3">
                        <label className="form-label">Existing Loans?</label>
                        <select
                          className="form-select"
                          name="existingLoans"
                          value={formData.existingLoans}
                          onChange={handleChange}
                        >
                          <option value="no">No</option>
                          <option value="yes">Yes</option>
                        </select>
                      </div>
                    </div>

                    {/* Interest Rate Slider */}
                    <div className="card mt-4">
                      <div className="card-header">
                        <h6 className="mb-0">
                          <i className="fas fa-sliders-h me-2"></i>
                          Adjust Interest Rate
                        </h6>
                      </div>
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-md-8">
                            <label className="form-label">
                              Interest Rate: <strong>{interestRate}%</strong>
                            </label>
                            <input
                              type="range"
                              className="form-range"
                              min="7"
                              max="15"
                              step="0.1"
                              value={interestRate}
                              onChange={(e) => setInterestRate(parseFloat(e.target.value))}
                            />
                            <div className="d-flex justify-content-between">
                              <small>7%</small>
                              <small>15%</small>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <div className="text-center p-3 bg-light rounded">
                              <small className="text-muted">Current Rate</small>
                              <h4 className="text-primary mb-0">{interestRate}%</h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* EMI Calculator with Graphs and Schedule */}
                    {formData.loanAmount && formData.loanTenure && emiDetails && (
                      <div className="card mt-4">
                        <div className="card-header bg-primary text-white">
                          <h5 className="mb-0">
                            <i className="fas fa-calculator me-2"></i>
                            EMI Breakdown
                          </h5>
                        </div>
                        <div className="card-body">
                          {/* Quick Summary */}
                          <div className="row mb-4">
                            <div className="col-md-3">
                              <div className="text-center p-3 border rounded">
                                <h6 className="text-muted">Monthly EMI</h6>
                                <h4 className="text-primary">₹{parseInt(emiDetails.emi).toLocaleString('en-IN')}</h4>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="text-center p-3 border rounded">
                                <h6 className="text-muted">Principal Amount</h6>
                                <h4 className="text-success">₹{parseInt(emiDetails.principal).toLocaleString('en-IN')}</h4>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="text-center p-3 border rounded">
                                <h6 className="text-muted">Total Interest</h6>
                                <h4 className="text-warning">₹{parseInt(emiDetails.totalInterest).toLocaleString('en-IN')}</h4>
                              </div>
                            </div>
                            <div className="col-md-3">
                              <div className="text-center p-3 border rounded">
                                <h6 className="text-muted">Total Amount</h6>
                                <h4 className="text-info">₹{parseInt(emiDetails.totalAmount).toLocaleString('en-IN')}</h4>
                              </div>
                            </div>
                          </div>

                          {/* Tabs for Graph and Schedule */}
                          <div className="emi-tabs-container">
                            <ul className="nav nav-tabs" id="emiTabs" role="tablist">
                              <li className="nav-item" role="presentation">
                                <button
                                  type="button"
                                  className={`nav-link ${activeTab === 'graph' ? 'active' : ''}`}
                                  onClick={() => handleTabSwitch('graph')}
                                >
                                  <i className="fas fa-chart-pie me-2"></i>
                                  Payment Breakdown
                                </button>
                              </li>
                              <li className="nav-item" role="presentation">
                                <button
                                  type="button"
                                  className={`nav-link ${activeTab === 'schedule' ? 'active' : ''}`}
                                  onClick={() => handleTabSwitch('schedule')}
                                >
                                  <i className="fas fa-table me-2"></i>
                                  Schedule
                                </button>
                              </li>
                            </ul>

                            <div className="tab-content mt-3">
                              {/* Graph Tab */}
                              {activeTab === 'graph' && chartData && (
                                <div className="tab-pane fade show active">
                                  <div className="row">
                                    <div className="col-md-6">
                                      <div className="card">
                                        <div className="card-header">
                                          <h6 className="mb-0">Payment Distribution</h6>
                                        </div>
                                        <div className="card-body text-center">
                                          <div className="pie-chart-container mb-4 position-relative">
                                            <div 
                                              className="pie-chart mx-auto"
                                              style={{
                                                width: '200px',
                                                height: '200px',
                                                borderRadius: '50%',
                                                background: `conic-gradient(
                                                  #4CAF50 0% ${chartData.principalPercentage}%,
                                                  #FF9800 ${chartData.principalPercentage}% 100%
                                                )`
                                              }}
                                            ></div>
                                            <div className="position-absolute top-50 start-50 translate-middle text-center">
                                              <div className="bg-white rounded-circle d-flex align-items-center justify-content-center"
                                                style={{ width: '150px', height: '150px' }}>
                                                <div>
                                                  <div className="small text-muted">Total</div>
                                                  <div className="fw-bold">₹{parseInt(emiDetails.totalAmount).toLocaleString('en-IN')}</div>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                          
                                          <div className="legend">
                                            <div className="d-flex align-items-center justify-content-center mb-2">
                                              <div 
                                                className="color-box me-2"
                                                style={{
                                                  width: '20px',
                                                  height: '20px',
                                                  backgroundColor: '#4CAF50',
                                                  borderRadius: '3px'
                                                }}
                                              ></div>
                                              <span>
                                                Principal: ₹{parseInt(emiDetails.principal).toLocaleString('en-IN')} ({chartData.principalPercentage}%)
                                              </span>
                                            </div>
                                            <div className="d-flex align-items-center justify-content-center">
                                              <div 
                                                className="color-box me-2"
                                                style={{
                                                  width: '20px',
                                                  height: '20px',
                                                  backgroundColor: '#FF9800',
                                                  borderRadius: '3px'
                                                }}
                                              ></div>
                                              <span>
                                                Interest: ₹{parseInt(emiDetails.totalInterest).toLocaleString('en-IN')} ({chartData.interestPercentage}%)
                                              </span>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="col-md-6">
                                      <div className="card h-100">
                                        <div className="card-header">
                                          <h6 className="mb-0">Loan Summary</h6>
                                        </div>
                                        <div className="card-body">
                                          <div className="loan-summary">
                                            <div className="d-flex justify-content-between mb-3">
                                              <span>Principal Loan Amount</span>
                                              <strong className="text-success">₹{parseInt(emiDetails.principal).toLocaleString('en-IN')}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                              <span>Total Interest Payable</span>
                                              <strong className="text-warning">₹{parseInt(emiDetails.totalInterest).toLocaleString('en-IN')}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between mb-3">
                                              <span>Interest Rate</span>
                                              <strong className="text-info">{interestRate}%</strong>
                                            </div>
                                            <hr />
                                            <div className="d-flex justify-content-between mb-3">
                                              <span className="fw-bold">Total Amount Payable</span>
                                              <strong className="text-primary">₹{parseInt(emiDetails.totalAmount).toLocaleString('en-IN')}</strong>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                              <small className="text-muted">Loan Tenure</small>
                                              <small className="text-muted">{formData.loanTenure} years</small>
                                            </div>
                                          </div>
                                          
                                          <div className="alert alert-warning mt-3 mb-0">
                                            <small>
                                              <i className="fas fa-info-circle me-1"></i>
                                              Note: This doesn't include bank processing fee and other charges.
                                            </small>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Schedule Tab */}
                              {activeTab === 'schedule' && emiDetails && (
                                <div className="tab-pane fade show active">
                                  <div className="schedule-container">
                                    <div className="table-responsive" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                                      <table className="table table-striped table-hover table-sm">
                                        <thead className="table-dark sticky-top">
                                          <tr>
                                            <th style={{ position: 'sticky', top: 0, background: '#343a40' }}>Month</th>
                                            <th style={{ position: 'sticky', top: 0, background: '#343a40' }}>EMI</th>
                                            <th style={{ position: 'sticky', top: 0, background: '#343a40' }}>Principal</th>
                                            <th style={{ position: 'sticky', top: 0, background: '#343a40' }}>Interest</th>
                                            <th style={{ position: 'sticky', top: 0, background: '#343a40' }}>Balance</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {emiDetails.schedule.map((payment, index) => (
                                            <tr key={index}>
                                              <td>{payment.month}</td>
                                              <td>₹{parseInt(payment.emi).toLocaleString('en-IN')}</td>
                                              <td className="text-success">₹{parseInt(payment.principal).toLocaleString('en-IN')}</td>
                                              <td className="text-danger">₹{parseInt(payment.interest).toLocaleString('en-IN')}</td>
                                              <td className="text-muted">₹{parseInt(payment.balance).toLocaleString('en-IN')}</td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>
                                    
                                    <div className="schedule-summary mt-3 p-3 bg-light rounded">
                                      <div className="row text-center">
                                        <div className="col-md-3">
                                          <small className="text-muted">Total Months</small>
                                          <div className="fw-bold">{emiDetails.schedule.length}</div>
                                        </div>
                                        <div className="col-md-3">
                                          <small className="text-muted">Total EMI Paid</small>
                                          <div className="fw-bold">₹{(parseInt(emiDetails.emi) * emiDetails.schedule.length).toLocaleString('en-IN')}</div>
                                        </div>
                                        <div className="col-md-3">
                                          <small className="text-muted">Total Principal</small>
                                          <div className="fw-bold text-success">₹{parseInt(emiDetails.principal).toLocaleString('en-IN')}</div>
                                        </div>
                                        <div className="col-md-3">
                                          <small className="text-muted">Total Interest</small>
                                          <div className="fw-bold text-danger">₹{parseInt(emiDetails.totalInterest).toLocaleString('en-IN')}</div>
                                        </div>
                                      </div>
                                    </div>
                                    
                                    <div className="alert alert-info mt-3">
                                      <small>
                                        <i className="fas fa-lightbulb me-1"></i>
                                        <strong>Tip:</strong> In the initial months, a larger portion of your EMI goes towards interest payment.
                                        Scroll down to see the complete payment schedule for all {emiDetails.schedule.length} months.
                                      </small>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Step 4: Review & Submit */}
                {currentStep === 4 && (
                  <div>
                    <h4 className="mb-4 text-primary">
                      <i className="fas fa-clipboard-check me-2"></i>
                      Review Your Application
                    </h4>
                    
                    <div className="row">
                      <div className="col-md-6">
                        <h5>Personal Details</h5>
                        <p><strong>Name:</strong> {formData.fullName}</p>
                        <p><strong>Email:</strong> {formData.email}</p>
                        <p><strong>Mobile:</strong> {formData.mobile}</p>
                        <p><strong>PAN:</strong> {formData.panNumber}</p>
                      </div>
                      <div className="col-md-6">
                        <h5>Employment Details</h5>
                        <p><strong>Employment Type:</strong> {formData.employmentType}</p>
                        <p><strong>Monthly Income:</strong> ₹{formData.monthlyIncome}</p>
                        <p><strong>Experience:</strong> {formData.workExperience} years</p>
                        <p><strong>City:</strong> {formData.city}</p>
                      </div>
                    </div>
                    
                    <div className="row mt-4">
                      <div className="col-md-6">
                        <h5>Loan Details</h5>
                        <p><strong>Loan Amount:</strong> ₹{formData.loanAmount}</p>
                        <p><strong>Tenure:</strong> {formData.loanTenure} years</p>
                        <p><strong>Interest Rate:</strong> {interestRate}%</p>
                        {emiDetails && (
                          <p><strong>Estimated EMI:</strong> ₹{parseInt(emiDetails.emi).toLocaleString('en-IN')}</p>
                        )}
                      </div>
                      <div className="col-md-6">
                        <h5>Car Details</h5>
                        <p><strong>Car Model:</strong> {formData.carModel}</p>
                        <p><strong>Manufacturer:</strong> {formData.manufacturer}</p>
                        <p><strong>Car Price:</strong> ₹{formData.carPrice}</p>
                      </div>
                    </div>
                    
                    <div className="form-check mt-4">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="termsCheck"
                        required
                      />
                      <label className="form-check-label" htmlFor="termsCheck">
                        I agree to the terms and conditions and authorize the bank to verify my details
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="d-flex justify-content-between mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={prevStep}
                    disabled={currentStep === 1}
                  >
                    <i className="fas fa-arrow-left me-2"></i>
                    Previous
                  </button>
                  
                  {currentStep < 4 ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={nextStep}
                    >
                      Next
                      <i className="fas fa-arrow-right ms-2"></i>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      className="btn btn-success"
                    >
                      <i className="fas fa-paper-plane me-2"></i>
                      Submit Application
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* Features Section */}
          <div className="row mt-5">
            <div className="col-md-4 text-center">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-percentage fa-2x text-primary mb-3"></i>
                  <h5>Low Interest Rates</h5>
                  <p className="text-muted">Starting from 8.5% with flexible repayment options</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-bolt fa-2x text-primary mb-3"></i>
                  <h5>Quick Approval</h5>
                  <p className="text-muted">Get approval within 24 hours with minimal documentation</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 text-center">
              <div className="card border-0">
                <div className="card-body">
                  <i className="fas fa-shield-alt fa-2x text-primary mb-3"></i>
                  <h5>100% Secure</h5>
                  <p className="text-muted">Your data is protected with bank-level security</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLoanApplication;