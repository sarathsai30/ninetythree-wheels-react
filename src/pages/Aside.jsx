import React, { useState, useMemo, useEffect } from 'react';
import PriceBreakupModal from './CarVariantsTable/PriceBreakupModal';
import EMICalculatorModal from './CarVariantsTable/EMICalculatorModal';

const Aside = ({ price, city = "Mumbai", carDetails, variant }) => {
  const [showPriceBreakup, setShowPriceBreakup] = useState(false);
  const [showEMICalculator, setShowEMICalculator] = useState(false);
  const [selectedCity, setSelectedCity] = useState(city);
  const [calculatedEMI, setCalculatedEMI] = useState(null);
  
  // Reset calculated EMI when price changes (new car selected)
  useEffect(() => {
    setCalculatedEMI(null); // Reset to default calculation
  }, [price, variant?.id]); // Reset when price or car ID changes

  // Format currency function
  const formatINR = (value) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);

  // Format price in Crore/Lakh format
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Calculate EMI for display (same logic as OnRoadPrice component)
  const calculateDefaultEMI = useMemo(() => {
    const loanAmount = price - price * 0.3; // 30% down payment
    const monthlyRate = 10 / 12 / 100; // 10% annual interest converted to monthly rate
    const numberOfMonths = 5 * 12; // 5 years in months
    
    const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfMonths)) /
                (Math.pow(1 + monthlyRate, numberOfMonths) - 1);
    
    return Math.floor(emi);
  }, [price]); // Recalculate when price changes

  // Use calculated EMI from modal or default calculation
  const emiAmount = calculatedEMI || calculateDefaultEMI;

  // Handle city confirmation from modal
  const handleCityConfirm = (cityName) => {
    setSelectedCity(cityName);
    console.log("City confirmed:", cityName);
  };

  // Handle EMI calculation from modal
  const handleEMICalculated = (emiValue) => {
    setCalculatedEMI(Math.floor(emiValue));
    console.log("EMI calculated:", emiValue);
  };

  const handleGetEMIOffers = () => {
    window.location.href =
      "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl&url=https%3A%2F%2Fwww.bharatloan.com%2Fapply-now&subid=93cars";
  };

  // Get car ID from carDetails or use a default
  const carId = carDetails?.id || 'default-car-id';

  return (
    <>
      <div className="card border-0 shadow-sm sticky-top" style={{top: '20px', zIndex: '10'}}>
        <div className="card-body p-4">
          <h5 className="card-title fw-bold mb-3 text-center">{carDetails?.name}</h5>
          
          {/* Main Price */}
          <div className="mb-3">
            <h2 className="text-primary fw-bold mb-1">{formatPrice(price)}</h2>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <span 
                    className="text-primary small"
                    style={{ 
                        cursor: 'pointer', 
                        textDecoration: 'underline', 
                        fontWeight: 'bold'
                    }}
                    onClick={() => setShowPriceBreakup(true)}
                    >
                    View Price Breakup
                </span>
              <span className="badge bg-light text-dark small">
                <i className="fas fa-check-circle text-success me-1"></i>
                On-Road Price {selectedCity}
              </span>
            </div>
          </div>

          <hr className="my-3" />

          {/* EMI Section - Updated with same design as OnRoadPrice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            {/* First Line: EMI Amount and Get EMI Offers button */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
              {/* Left Section: EMI Info */}
              <div className="flex flex-col xs:flex-row xs:items-center gap-3">
                {/* EMI Label with Tooltip */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-blue-800 whitespace-nowrap">EMI</span>
                  {/* Tooltip Icon */}
                  <div className="group relative flex-shrink-0">
                    <svg 
                      className="w-4 h-4 text-blue-500 cursor-help hover:text-blue-600 transition-colors" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    
                    {/* Tooltip Content */}
                    <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-72 sm:w-80 z-50">
                      <div className="bg-gray-900 text-white text-xs rounded-lg p-4 shadow-xl border border-gray-700">
                        <div className="font-semibold mb-2 text-blue-300">EMI Calculated basis:</div>
                        <ul className="space-y-1.5">
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span>Down Payment - {formatINR(price * 0.3)}</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span>Interest Rate - 10% p.a.</span>
                          </li>
                          <li className="flex items-start">
                            <span className="text-blue-400 mr-2">•</span>
                            <span>Tenure - 5 Years</span>
                          </li>
                        </ul>
                        <div className="mt-3 pt-2 border-t border-gray-700">
                          <div className="text-blue-200 text-[11px] leading-relaxed">
                            For exact EMI quotes please get in touch with Authorized Dealer
                          </div>
                          <div className="text-blue-200 text-[11px] leading-relaxed mt-1">
                            Fill in your details and get best loan deals
                          </div>
                          <div className="text-white font-medium text-[11px] mt-1">
                            Visit 93Cars Loan page
                          </div>
                        </div>
                        
                        {/* Tooltip arrow */}
                        <div className="absolute top-full left-3 border-8 border-transparent border-t-gray-900"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* EMI Amount and Duration */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-lg font-bold text-gray-900 whitespace-nowrap">          
                    {formatINR(emiAmount)}
                    <span className="text-sm text-gray-600 font-normal ml-1">/month</span>
                  </span>
                  <span className="text-sm text-gray-600 whitespace-nowrap">for 5 years</span>
                </div>
              </div>
              
              {/* Get EMI Offers Button */}
              <button
                onClick={handleGetEMIOffers}
                className="px-2 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium text-sm transition-all duration-200 whitespace-nowrap shadow-sm hover:shadow-md w-full sm:w-auto text-center"
              >
                Get EMI Offers
              </button>
            </div>

            {/* Second Line: Calculate EMI link */}
            <div className="flex items-center justify-between pt-2 border-t border-blue-200">
              <button
                onClick={() => setShowEMICalculator(true)}
                className="text-sm text-blue-600 hover:text-blue-700 hover:underline font-medium transition-colors flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Calculate EMI
              </button>
              <div className="text-xs text-gray-500 bg-blue-100 px-2 py-1 rounded">
                Starting from 8.5% p.a.
              </div>
            </div>
          </div>    
        </div>
      </div>

      {/* Price Breakup Modal */}
      {showPriceBreakup && (
        <PriceBreakupModal
          carId={carId}
          variant={variant || carDetails}
          onClose={() => setShowPriceBreakup(false)}
          onConfirmCity={handleCityConfirm}
        />
      )}

      {/* EMI Calculator Modal */}
      {showEMICalculator && (
        <EMICalculatorModal
          isOpen={showEMICalculator}
          onClose={() => setShowEMICalculator(false)}
          carData={carDetails}
          CarPriceOnRoadPrice={price}
          FinalPrice={price}
          onEmiCalculated={handleEMICalculated}
        />
      )}
    </>
  );
};

export default Aside;