import React, { useState } from 'react';
import { FaCar, FaUser, FaUsers, FaRupeeSign, FaClock, FaShieldAlt, FaPhoneAlt, FaEnvelope, FaArrowRight, FaStar, FaHandshake, FaPlus, FaMinus } from 'react-icons/fa';
import { HiDocumentText, HiLightningBolt } from 'react-icons/hi';

const CarLoanApplication = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    carBrand: '',
    carName: '',
    mobileNumber: ''
  });
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpl&url=https%3A%2F%2Fwww.bharatloan.com%2Fapply-now&subid=93cars";
  };

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const benefits = [
    { icon: <HiLightningBolt className="text-black" />, text: 'Instant Approval', desc: 'Get approval within hours' },
    { icon: <FaRupeeSign className="text-black" />, text: 'Lowest Rates', desc: 'Starting from 7.5% p.a.' },
    { icon: <FaShieldAlt className="text-black" />, text: '100% Secure', desc: 'Your data is protected' },
    { icon: <HiDocumentText className="text-black" />, text: 'Minimal Docs', desc: 'Basic documents only' },
    { icon: <FaClock className="text-black" />, text: 'Quick Process', desc: 'Complete online' },
    { icon: <FaHandshake className="text-black" />, text: 'Best Partners', desc: 'Top lenders network' }
  ];

  const features = [
    { number: '50K+', label: 'Happy Customers', icon: <FaUsers className="text-black" /> },
    { number: '₹500Cr+', label: 'Loan Disbursed', icon: <FaRupeeSign className="text-black" /> },
    { number: '2 Hours', label: 'Average Approval', icon: <FaClock className="text-black" /> },
    { number: '15+', label: 'Partner Banks', icon: <FaShieldAlt className="text-black" /> }
  ];

  const steps = [
    { number: '01', title: 'Fill Form', desc: '2 minutes basic details', icon: <HiDocumentText /> },
    { number: '02', title: 'Get Connected', desc: 'With top loan partners', icon: <FaHandshake /> },
    { number: '03', title: 'Receive Offers', desc: 'Multiple loan options', icon: <FaEnvelope /> }
  ];

  const faqs = [
    {
      question: "Is this service completely free?",
      answer: "Yes, our service is 100% free. We connect you directly with lenders without any charges or hidden fees. There are no registration fees, processing fees, or consultation charges."
    },
    {
      question: "How long does the approval process take?",
      answer: "Most of our partner lenders provide initial approval within 2-4 hours after you complete the application on their platform. Final disbursement typically takes 24-72 hours after document verification."
    },
    {
      question: "What documents will I need?",
      answer: "Typically you'll need basic KYC documents (Aadhaar, PAN, Voter ID), income proof (salary slips for last 3 months, bank statements for last 6 months), and address verification. For self-employed individuals, business proof and ITR for last 2-3 years are required."
    },
    {
      question: "Can I apply for both new and used car loans?",
      answer: "Yes, our partner lenders offer financing for both new and pre-owned vehicles with different terms and interest rates. New car loans typically have lower interest rates and longer tenures compared to used car loans."
    },
    {
      question: "What is the minimum credit score required?",
      answer: "Most lenders prefer a credit score of 650 or above, but some may consider applications with lower scores at higher interest rates. A score above 750 gets you the best interest rates and terms."
    },
    {
      question: "Can I prepay my car loan?",
      answer: "Yes, most lenders allow prepayment of car loans, though some may charge a small penalty for early closure. For floating rate loans, prepayment is usually penalty-free after 6-12 months. Check with your specific lender for details."
    },
    {
      question: "What is the maximum loan amount I can get?",
      answer: "Loan amounts typically range from ₹1 lakh to ₹50 lakhs, depending on the car value, your income, credit score, and the lender's policies. Most lenders finance up to 85-90% of the car's ex-showroom price for new cars."
    },
    {
      question: "What is the typical interest rate for car loans?",
      answer: "Interest rates typically range from 7.5% to 15% per annum, depending on the loan amount, tenure, credit score, and type of car (new vs used). Special offers and discounts are often available during festival seasons."
    },
    {
      question: "What is the maximum loan tenure available?",
      answer: "For new cars: Up to 8 years (96 months). For used cars: Up to 5 years (60 months). Longer tenures reduce your EMI but increase the total interest paid over the loan period."
    },
    {
      question: "Can I transfer my existing car loan to another lender?",
      answer: "Yes, car loan balance transfer is possible if you find a lender offering lower interest rates. This can help you save on interest costs, but check for processing fees and other charges before transferring."
    },
    {
      question: "Is there an age limit for car loan applicants?",
      answer: "Yes, typically applicants should be between 21-65 years of age. Some lenders may have specific age criteria, and the maximum age at loan maturity is usually 65-70 years."
    },
    {
      question: "What is the minimum income requirement?",
      answer: "Most lenders require a minimum monthly income of ₹15,000-₹25,000 for salaried individuals, depending on the city and loan amount. For self-employed individuals, the requirements may vary based on business turnover and profitability."
    },
    {
      question: "Can I get a car loan if I'm self-employed?",
      answer: "Yes, self-employed individuals can get car loans. You'll need to provide business registration proof, GST registration, bank statements, and ITR for the last 2-3 years. The documentation process might be more extensive than for salaried individuals."
    },
    {
      question: "What factors affect my car loan eligibility?",
      answer: "Key factors include your income, employment stability, credit score, existing loans and liabilities, age, residential stability, and the car's make and model. Lenders also consider your repayment capacity and debt-to-income ratio."
    },
    {
      question: "Is there a processing fee for car loans?",
      answer: "Most lenders charge a processing fee ranging from 0.5% to 2% of the loan amount. Some lenders may offer zero processing fee during special promotions or for customers with excellent credit scores."
    },
    {
      question: "Can I include car accessories in the loan amount?",
      answer: "Yes, many lenders allow you to include essential car accessories like music systems, anti-theft devices, and extended warranties in the loan amount, usually up to a certain limit (typically 10-15% of the car's value)."
    },
    {
      question: "What happens if I miss an EMI payment?",
      answer: "Missing EMI payments can lead to late payment charges (usually 2-3% per month on the overdue amount), negative impact on your credit score, and in severe cases, legal action or vehicle repossession. Contact your lender immediately if you anticipate payment difficulties."
    },
    {
      question: "Can I get a car loan without a down payment?",
      answer: "Some lenders offer 100% financing on select car models, but most require a minimum down payment of 10-20% of the car's value. A larger down payment can help you get better interest rates and lower EMIs."
    },
    {
      question: "Are there any hidden charges in car loans?",
      answer: "While most charges are disclosed upfront, watch out for prepayment penalties, late payment fees, documentation charges, and foreclosure charges. Always read the loan agreement carefully and ask about all applicable charges before signing."
    },
    {
      question: "Can I apply for a car loan jointly with a family member?",
      answer: "Yes, joint car loan applications are allowed with spouses, parents, or children. This can help increase your loan eligibility and may help secure better terms if the co-applicant has a good credit profile."
    }
  ];

  // Custom color style for #FFC107
  const customColor = {
    primary: '#FFC107',
    light: '#FFECB3',
    dark: '#FFA000',
    text: '#333333'
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="space-y-8">
            <div>
              <div 
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium mb-4"
                style={{ backgroundColor: customColor.light, color: customColor.text }}
              >
                <FaStar style={{ color: customColor.primary }} />
                <span>Trusted by 50,000+ Customers</span>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 leading-tight">
                Get Your Dream Car with 
                <span style={{ color: customColor.primary }}> Easy Financing</span>
              </h1>
              <p className="text-xl text-gray-600 mt-6 leading-relaxed">
                Connect with India's best lenders and get car loan offers tailored to your needs. 
                <span className="font-semibold text-gray-900"> 100% free, no hidden charges.</span>
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: customColor.primary }}
                    >
                      {feature.icon}
                    </div>
                    <div>
                      <div className="text-xl font-bold text-gray-900">{feature.number}</div>
                      <div className="text-sm text-gray-600">{feature.label}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-200 p-8 relative z-10">
              <div className="text-center mb-8">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg"
                  style={{ backgroundColor: customColor.primary }}
                >
                  <FaCar className="text-black text-2xl" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Get Instant Loan Offers</h2>
                <p className="text-gray-600 mt-2">Fill the form to connect with top lenders</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaUser className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>

                  {/* New Fields Added Here */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Car Brand 
                      {/* <span className="text-gray-500 text-xs">(Hint: Tata)</span> */}
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="carBrand"
                        value={formData.carBrand}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter car brand (e.g., Tata)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Car Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaCar className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        name="carName"
                        value={formData.carName}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter car name (e.g., Nexon)"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mobile Number (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaPhoneAlt className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        name="mobileNumber"
                        value={formData.mobileNumber}
                        onChange={handleChange}
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your mobile number"
                      />
                    </div>
                  </div>
                  
                  {/* <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaEnvelope className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition duration-200"
                        placeholder="Enter your email address"
                      />
                    </div>
                  </div> */}
                </div>
                
                <button
                  type="submit"
                  style={{ backgroundColor: customColor.primary }}
                  className="w-full text-black py-4 px-6 rounded-xl font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 hover:opacity-90"
                >
                  <span>Get Instant Loan</span>
                  <FaArrowRight className="text-lg" />
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By clicking, you'll be redirected to our partner for loan processing
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Service?</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            We make car loan financing simple, fast, and completely free
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 hover:transform hover:-translate-y-1">
              <div className="flex items-center space-x-4">
                <div 
                  className="w-14 h-14 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: customColor.primary }}
                >
                  <div className="text-xl">
                    {benefit.icon}
                  </div>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg">{benefit.text}</h3>
                  <p className="text-gray-600 text-sm">{benefit.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Simple 3-Step Process</h2>
            <p className="text-xl text-gray-600">Get your car loan in just few minutes</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting Line */}
            <div 
              className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 -z-10"
              style={{ backgroundColor: customColor.light }}
            ></div>
            
            {steps.map((step, index) => (
              <div key={index} className="text-center relative">
                <div 
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg"
                  style={{ backgroundColor: customColor.primary }}
                >
                  <div className="text-black text-2xl">
                    {step.icon}
                  </div>
                </div>
                <div className="w-12 h-12 bg-white border-4 border-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <span 
                    className="text-lg font-bold"
                    style={{ color: customColor.primary }}
                  >
                    {step.number}
                  </span>
                </div>
                <h3 className="font-bold text-gray-900 text-xl mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="py-16" style={{ backgroundColor: customColor.primary }}>
        <div className="max-w-4xl mx-auto text-center px-4">
          <div 
            className="w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6"
            style={{ backgroundColor: 'rgba(82, 82, 82, 0.2)' }}
          >
            <FaCar className="text-black text-2xl" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4">Ready to Drive Your Dream Car?</h2>
          <p className="text-xl mb-8 text-black">Join thousands of satisfied customers today</p>
          <button
            onClick={handleSubmit}
            className="bg-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 transform hover:scale-105 shadow-2xl inline-flex items-center space-x-2"
            style={{ color: customColor.text }}
          >
            <span>Apply Now</span>
            <FaArrowRight />
          </button>
        </div>
      </div>

      {/* FAQ Section with UsedCarPriceChecker Styling */}
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Quick answers to common questions</p>
        </div>

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
                  className={`w-5 h-5 transition-all duration-300 ${
                    openFaqIndex === index ? 'transform rotate-180' : 'group-hover:text-amber-600'
                  }`}
                  style={{ color: openFaqIndex === index ? customColor.primary : customColor.primary }}
                  fill="none"
                  stroke="black"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
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

      
    </div>
  );
};

export default CarLoanApplication;