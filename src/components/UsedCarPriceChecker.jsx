import React, { useState, useMemo } from 'react';
import dealersData from '../data/dealers.json';

const UsedCarPriceChecker = () => {
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState(null);
  
  // Get brands data from dealers.json
  const carBrands = useMemo(() => 
    dealersData.brands.map(brand => ({
      name: brand.name,
      logo: brand.logo
    })), 
    []
  );

  const INITIAL_BRANDS_COUNT = 12;
  
  const displayedBrands = useMemo(() => {
    return showAllBrands ? carBrands : carBrands.slice(0, INITIAL_BRANDS_COUNT);
  }, [carBrands, showAllBrands]);

  const toggleBrandsView = () => {
    setShowAllBrands(!showAllBrands);
  };

  const openAffiliateLink = () => {
    window.open('https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl_sell&url=https%3A%2F%2Fwww.cars24.com%2F&subid=93cars', '_blank', 'noopener,noreferrer');
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How is the used car price determined?",
      answer: "Used car prices are calculated based on multiple factors including the vehicle's make, model, year of manufacture, condition, mileage, location, and current market demand to provide you with the most accurate valuation."
    },
    {
      question: "What factors affect my car's resale value?",
      answer: "Key factors include the car's age, total distance driven, overall condition, service history, number of previous owners, accident records, and current market trends for that particular model."
    },
    {
      question: "How often should I check my car's value?",
      answer: "It's recommended to check your vehicle's value every 6-12 months as market conditions change frequently. Regular checks help you understand depreciation patterns and optimal selling time."
    },
    {
      question: "Does location impact my car's price?",
      answer: "Yes, car prices vary by location due to differences in demand, climate conditions, local regulations, and availability of specific models in different regions across the country."
    },
    {
      question: "Is the car valuation service free?",
      answer: "Yes, our car valuation service is completely free. You can check the market value of your used car without any charges or hidden fees."
    },
    {
      question: "How accurate are the price estimates?",
      answer: "Our price estimates are highly accurate as they are based on real-time market data, recent transaction prices, and comprehensive analysis of various factors affecting car values in your area."
    }
  ];

  return (
    <div className="min-h-screen from-gray-50 via-white to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">

        
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Check Price of Used Car
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Get accurate market valuations for all car brands. Discover your vehicle's true worth with our comprehensive pricing analysis.
          </p>
        </div>

        {/* Main CTA Section */}
        <div className="bg-[#FFC107] from-blue-600 to-blue-700 rounded-2xl p-8 md:p-12 text-center text-black mb-12 shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Get Instant Used Car Valuation
          </h2>
          <p className="text-black-100 text-lg mb-8 max-w-2xl mx-auto">
            Find out exactly how much your car is worth in today's market. Our advanced algorithm provides real-time pricing based on current market trends.
          </p>
          <button
            onClick={openAffiliateLink}
            className="bg-black text-white hover:text-[#FFC107] px-8 py-4 rounded-lg font-bold text-lg transition-all duration-300 hover:scale-105 shadow-sm hover:shadow-md inline-flex items-center"
          >
            <span>Get Used Car Price</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>

        {/* Car Brands Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-12 border border-gray-100">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
                Check Used Car Price by Brand
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 mb-8">
                {displayedBrands.map((brand) => (
                <div
                    key={brand.name}
                    onClick={() => window.open('https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl_sell&url=https%3A%2F%2Fwww.cars24.com%2F&subid=93cars', '_blank', 'noopener,noreferrer')}
                    className="bg-white border border-gray-200 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer shadow-sm hover:shadow-md hover:border-blue-200 transition-all duration-300 group"
                >
                    {/* Brand Logo */}
                    <div className="w-24 h-24 flex items-center justify-center mb-2 transition-all duration-300 group-hover:scale-105 rounded-xl overflow-hidden bg-white p-2">
                    <img
                        src={brand.logo}
                        alt={brand.name}
                        className="w-full h-full object-contain transition-transform duration-300"
                        onError={(e) => {
                        e.target.style.display = 'none';
                        const fallback = e.target.nextSibling;
                        if (fallback) fallback.style.display = 'block';
                        }}
                    />
                    {/* Fallback icon */}
                    <div className="hidden w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                    </div>
                    </div>

                    {/* Brand Name */}
                    <span className="text-sm font-medium text-gray-900 text-center group-hover:text-blue-600 transition-colors duration-300">
                    {brand.name}
                    </span>
                </div>
                ))}
            </div>
            
            {/* View More/Less Brands Button */}
            {carBrands.length > INITIAL_BRANDS_COUNT && (
                <div className="text-center">
                <button
                    onClick={toggleBrandsView}
                    className="bg-[#FFC107] text-black px-8 py-4 rounded-xl hover:bg-[#FFB300] transition-all duration-300 font-semibold shadow-sm hover:shadow-md text-lg"
                >
                    {showAllBrands ? 'View Less Brands' : 'View More Brands'}
                </button>
                </div>
            )}
        </div>        

        {/* FAQ Section with Accordion */}
        <div className="bg-white mb-5 p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4 max-w-5xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300">
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full bg-gray-50 rounded-3 px-6 py-4 text-left hover:bg-gray-100 transition-all duration-300 flex items-center justify-between group"
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4 transition-colors duration-300">
                    {faq.question}
                  </h3>
                  <svg
                    className={`w-5 h-5 text-blue-600 transition-all duration-300 ${
                      openFaqIndex === index ? 'transform rotate-180 text-blue-700' : 'group-hover:text-blue-700'
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  className={`px-6 overflow-hidden transition-all duration-300 ${
                    openFaqIndex === index ? 'max-h-96 pb-4' : 'max-h-0'
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed rounded-lg p-4">
                    {faq.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-12 mb-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-[#FFC107] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accurate Pricing</h4>
              <p className="text-gray-600 text-sm">Real-time market data ensures precise valuations</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-[#FFC107] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Instant Results</h4>
              <p className="text-gray-600 text-sm">Get your car's value in seconds, not days</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-[#FFC107] rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-black-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Best Value</h4>
              <p className="text-gray-600 text-sm">Maximize your returns with optimal pricing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsedCarPriceChecker;