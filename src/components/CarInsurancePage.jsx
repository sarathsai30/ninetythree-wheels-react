import React, { useState } from 'react';

const AccordionItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-200 rounded-xl mb-4 shadow-sm hover:shadow-md transition-shadow duration-300">
      <button
        onClick={onToggle}
        className="w-full text-left px-6 py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 flex justify-between items-center font-semibold text-gray-800 rounded-xl transition-all duration-300"
      >
        <span className="text-lg pr-4">{question}</span>
        <svg
          className={`w-6 h-6 transition-transform duration-300 text-red-600 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          fill="none"
          stroke="gray"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-white text-gray-700 leading-relaxed border-t border-gray-100 rounded-b-xl">
          {answer}
        </div>
      )}
    </div>
  );
};

const CarInsurancePage = () => {
  const [activeTab, setActiveTab] = useState('car');
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  // Function to toggle FAQ
  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const affiliateLinks = {
    car: "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpm_car&url=https%3A%2F%2Fwww.acko.com%2Flp%2Fnew-car-comprehensive&subid=93cars",
    bikeAcko: "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpm&url=https%3A%2F%2Fwww.acko.com%2Flp%2Fnew-bike%2F&subid=93cars",
    bikeICICI: "https://inr.deals/track?id=car778279331&src=merchant-detail-backend&campaign=cpa&url=https%3A%2F%2Fwww.icicilombard.com%2Fmotor-insurance%2Ftwo-wheeler-insurance&subid=93cars"
  };

  const openAffiliateLink = (url) => {
    window.open(url, '_blank');
  };

  const carContent = (
    <>
      <div className="my-16 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-10 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Protect Your Vehicle?</h3>
        <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">Get your personalized car insurance quote in just 2 minutes. Comprehensive coverage at competitive prices.</p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => openAffiliateLink(affiliateLinks.car)}
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Buy/Renew Acko Car Insurance
          </button>
          
          <button
            onClick={() => openAffiliateLink(affiliateLinks.car)}
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Get Car Insurance Quotation
          </button>
          
          <button
            onClick={() => openAffiliateLink(affiliateLinks.car)}
            className="bg-white text-red-600 px-6 py-3 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Check Car Insurance Status
          </button>
        </div>
      </div>
      <div className="text-center mb-12 px-4 sm:px-6 lg:px-0 max-w-4xl mx-auto">
        <div className="inline-block bg-gradient-to-r from-red-50 to-orange-50 px-4 py-2 sm:px-6 sm:py-3 rounded-full mb-4 border border-red-100">
            <span className="text-red-600 font-semibold text-sm sm:text-base">Complete Car Insurance Guide</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-gray-900 leading-tight">
            Comprehensive Guide to Car Insurance in India
        </h1>
        <div className="w-16 sm:w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mb-6 rounded-full"></div>
      </div>

      
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 border border-blue-100">
        <p className="text-xl text-gray-800 leading-relaxed text-center">
          Buying a new car is a milestone achievement that brings joy to you and your family. Celebrate this special moment by safeguarding your vehicle with <strong className="text-red-600">  Car Insurance</strong>. This comprehensive guide will help you understand everything about car insurance in India, from mandatory requirements to optional add-ons that enhance your coverage.
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Understanding Car Insurance: What You Need to Know</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Car insurance is a contract between you and an insurance provider that offers financial protection against losses resulting from accidents, theft, natural calamities, and third-party liabilities. According to the Motor Vehicles Act, 1988, having at least third-party car insurance is mandatory for all vehicle owners in India.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            While third-party insurance is legally required, it only covers damages or injuries caused to others. It does not protect your own vehicle or compensate you for damages to your car. This is where comprehensive car insurance becomes essential for complete protection.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Types of Car Insurance Coverage in India</h2>
        </div>
        
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Third-Party Liability Insurance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              This is the minimum mandatory insurance required by law. Third-party liability insurance covers:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-3 ml-4">
              <li className="text-lg">Damages to third-party property caused by your vehicle</li>
              <li className="text-lg">Bodily injury or death of third parties in an accident involving your car</li>
              <li className="text-lg">Legal liabilities arising from accidents</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p className="text-gray-700 font-medium">
                However, it does <strong>not cover</strong> damages to your own vehicle, theft, or personal injuries to you or your passengers.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Comprehensive Car Insurance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              Comprehensive insurance is the most popular choice among car owners as it provides complete protection. It includes:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-3 ml-4">
              <li className="text-lg">All benefits of third-party liability coverage</li>
              <li className="text-lg">Own damage cover for your vehicle against accidents, fire, theft, and natural calamities</li>
              <li className="text-lg">Coverage for damages during riots, strikes, and malicious acts</li>
              <li className="text-lg">Protection against man-made and natural disasters like floods, earthquakes, and landslides</li>
              <li className="text-lg">Optional personal accident cover for the owner-driver</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Standalone Own Damage Insurance
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              If you already have a valid long-term third-party policy, you can purchase standalone own damage insurance separately. This covers only damages to your vehicle without including third-party liability coverage.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Popular Car Insurance Add-On Covers</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            Enhance your basic car insurance policy with these valuable add-on covers that provide extended protection:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Zero Depreciation Cover (Bumper to Bumper)",
              desc: "This is one of the most popular add-ons. When you file a claim, the insurance company typically deducts depreciation on parts replaced. With zero depreciation cover, you receive the full claim amount without any depreciation deductions, ensuring maximum financial protection especially for new cars."
            },
            {
              title: "No Claim Bonus (NCB) Protection",
              desc: "NCB is a discount you earn for every claim-free year, which can go up to 50%. NCB Protection allows you to make a limited number of claims without losing your accumulated bonus, helping you maintain your discount benefits."
            },
            {
              title: "Engine Protection Cover",
              desc: "Protects your car's engine against water damage, oil leakage, gearbox damage, and hydrostatic lock. This is particularly useful during monsoon seasons when waterlogging is common."
            },
            {
              title: "Roadside Assistance",
              desc: "Provides 24/7 emergency assistance including towing services, flat tire replacement, fuel delivery, battery jumpstart, and on-spot repairs. Essential for long-distance travelers."
            },
            {
              title: "Return to Invoice (RTI)",
              desc: "In case of total loss or theft, this cover ensures you receive the invoice value of your car instead of the depreciated IDV amount."
            },
            {
              title: "Consumables Cover",
              desc: "Covers the cost of consumables like engine oil, nuts, bolts, screws, grease, and other items that are typically not covered in standard policies."
            },
            {
              title: "Tyre Protection Cover",
              desc: "Covers the cost of tire damage and replacement, which is otherwise excluded from standard comprehensive policies."
            },
            {
              title: "Key Replacement Cover",
              desc: "Covers the cost of replacing lost or stolen car keys, including reprogramming of electronic keys."
            },
            {
              title: "Passenger Cover",
              desc: "Provides personal accident cover for passengers traveling in your vehicle, ensuring their medical expenses are covered in case of accidents."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Important Car Insurance Terms Explained</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              term: "Insured Declared Value (IDV)",
              desc: "IDV is the current market value of your vehicle and represents the maximum amount you can claim in case of total loss or theft. It's calculated as: IDV = (Manufacturer's listed selling price - Depreciation) + (Accessories value - Depreciation on accessories). Higher IDV means higher premium but better coverage."
            },
            {
              term: "Premium",
              desc: "The amount you pay annually to maintain your car insurance policy. Premiums vary based on IDV, engine capacity, location, coverage type, and add-ons selected."
            },
            {
              term: "No Claim Bonus (NCB)",
              desc: "A reward in the form of a discount (ranging from 20% to 50%) given for every claim-free year. NCB is linked to the policyholder, not the vehicle, so it can be transferred to a new car."
            },
            {
              term: "Deductible (Voluntary Excess)",
              desc: "The amount you agree to pay from your pocket during claim settlement. Opting for a higher deductible reduces your premium but increases your out-of-pocket expense during claims."
            },
            {
              term: "Cashless Claim",
              desc: "When you get your car repaired at a network garage, the insurer pays the repair costs directly to the garage. You don't need to pay upfront, making the process hassle-free."
            },
            {
              term: "Reimbursement Claim",
              desc: "If you choose a non-network garage, you pay for repairs first and then submit bills to the insurer for reimbursement."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.term}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">How is Car Insurance Premium Calculated?</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Several factors influence your car insurance premium:
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "1. Insured Declared Value (IDV)",
              desc: "Higher IDV means higher premium. The IDV decreases every year due to depreciation, which in turn reduces your premium."
            },
            {
              title: "2. Engine Cubic Capacity",
              desc: "Cars with larger engine capacities attract higher premiums. Here's the IRDAI-mandated third-party premium structure:",
              table: true
            },
            {
              title: "3. Geographic Location",
              desc: "Cities are divided into zones (A, B, C) based on traffic density and accident rates. Metro cities in Zone A have higher premiums compared to smaller towns."
            },
            {
              title: "4. Age of the Vehicle",
              desc: "Newer cars have higher premiums due to higher IDV. As the car ages, premiums decrease with depreciation."
            },
            {
              title: "5. Add-On Covers",
              desc: "Each add-on you select increases the overall premium but provides enhanced coverage."
            },
            {
              title: "6. No Claim Bonus (NCB)",
              desc: "Claim-free years earn you NCB discounts that significantly reduce your premium renewal costs."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed mb-4">{item.desc}</p>
              {item.table && (
                <div className="overflow-x-auto">
                  <table className="w-full border border-gray-300 text-sm rounded-lg overflow-hidden">
                    <thead>
                      <tr className="bg-gradient-to-r from-red-600 to-red-700 text-left text-white">
                        <th className="border border-red-500 px-4 py-3 font-semibold">Engine Cubic Capacity (CC)</th>
                        <th className="border border-red-500 px-4 py-3 font-semibold">Third-Party Premium (INR)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">Less than 1000 CC</td>
                        <td className="border border-gray-300 px-4 py-3">₹2,094</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">1000 CC to 1500 CC</td>
                        <td className="border border-gray-300 px-4 py-3">₹3,416</td>
                      </tr>
                      <tr className="hover:bg-gray-50">
                        <td className="border border-gray-300 px-4 py-3 font-medium">More than 1500 CC</td>
                        <td className="border border-gray-300 px-4 py-3">₹7,897</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Documents Required for Car Insurance</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            To purchase or renew car insurance, you'll need the following documents:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Vehicle Registration Certificate (RC Book)",
              "Valid driving license",
              "Aadhaar Card or PAN Card for identity proof",
              "Address proof (Passport, Voter ID, Utility Bills)",
              "Previous insurance policy copy (for renewals)",
              "Pollution Under Control (PUC) certificate",
              "Fitness certificate for vehicles older than 15 years"
            ].map((doc, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">✓</div>
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">KYC Requirements for Car Insurance</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            As per IRDAI guidelines effective from January 2023, KYC (Know Your Customer) verification is mandatory for purchasing car insurance. Accepted KYC methods include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                method: "Aadhaar-based KYC",
                desc: "Quick verification using Aadhaar number and OTP"
              },
              {
                method: "Video KYC",
                desc: "Live video verification with an authorized representative"
              },
              {
                method: "Central KYC (CKYC)",
                desc: "If you've completed KYC with another financial institution"
              },
              {
                method: "Digital KYC",
                desc: "Online document submission and verification"
              },
              {
                method: "Offline KYC",
                desc: "Physical document submission at branches"
              }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.method}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">How to File a Car Insurance Claim</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Filing a claim is straightforward if you follow these steps:
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {[
            {
              step: "Step 1: Inform the Insurer Immediately",
              desc: "Notify your insurance company within 24-48 hours of the incident. Most insurers provide 24/7 claim helplines and mobile apps for instant intimation."
            },
            {
              step: "Step 2: File an FIR (if required)",
              desc: "For theft, major accidents, or third-party involvement, file an FIR with the police and obtain a copy for claim submission."
            },
            {
              step: "Step 3: Document the Damage",
              desc: "Take clear photographs and videos of the damaged vehicle from multiple angles. This helps in faster claim processing."
            },
            {
              step: "Step 4: Surveyor Inspection",
              desc: "The insurance company will send a surveyor to assess the damage and estimate repair costs. Cooperate fully and provide all requested documents."
            },
            {
              step: "Step 5: Choose Repair Option",
              desc: "For cashless claims, get your car repaired at a network garage where the insurer settles bills directly. For reimbursement, choose any garage, pay upfront, and submit bills for reimbursement."
            },
            {
              step: "Step 6: Claim Settlement",
              desc: "After repairs, the insurer processes your claim. For cashless claims, you're done once the garage releases your car. For reimbursement, the approved amount is transferred to your account within 7-10 days."
            }
          ].map((item, index) => (
            <div key={index} className="flex bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-red-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.step}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
          <p className="text-gray-700 font-medium text-lg">
            <strong>Important:</strong> Claims must typically be filed within 7 days of the incident for timely processing.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-red-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Why Choose   Car Insurance?</h2>
        </div>
        <div className="bg-gradient-to-br from-red-50 to-white rounded-2xl p-8 border border-red-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "High Claim Settlement Ratio:   maintains a claim settlement ratio of 99%+, ensuring reliable claim processing",
              "4500+ Cashless Garages: Extensive network across India for convenient repairs",
              "24/7 Customer Support: Round-the-clock assistance for claims and queries",
              "Quick Policy Issuance: Get your policy instantly online with minimal paperwork",
              "12 Add-On Options: Customize your policy with comprehensive add-on covers",
              "Easy Online Renewal: Renew your policy in minutes through website or mobile app",
              "Competitive Premiums: Affordable rates with up to 85% discount on select policies"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">✓</div>
                <span className="text-gray-700 leading-relaxed text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="my-16 text-center bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-10 shadow-lg">
        <h3 className="text-2xl font-bold text-white mb-4">Ready to Protect Your Vehicle?</h3>
        <p className="text-red-100 text-lg mb-6 max-w-2xl mx-auto">Get your personalized   car insurance quote in just 2 minutes. Comprehensive coverage at competitive prices.</p>
        <button
          onClick={() => openAffiliateLink(affiliateLinks.car)}
          className="bg-white text-red-600 px-12 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Get Your   Car Insurance Quote Now
        </button>
      </div>
    </>
  );

  const bikeContent = (
    <>
      <div className="my-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 md:p-10 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Protect Your Two-Wheeler Today</h3>
        <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto">Compare the best bike insurance policies and get comprehensive coverage at affordable rates.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => openAffiliateLink(affiliateLinks.bikeAcko)}
            className="bg-white text-blue-600 px-4 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Get Acko Bike Insurance Quote
          </button>
          <button
            onClick={() => openAffiliateLink(affiliateLinks.bikeICICI)}
            className="bg-white text-blue-600 px-4 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Get ICICI Lombard Bike Insurance Quote
          </button>
        </div>
      </div>
      <div className="text-center mb-12">
        <div className="inline-block bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-3 rounded-full mb-6 border border-blue-100">
          <span className="text-blue-600 font-semibold">Complete Bike Insurance Guide</span>
        </div>
        <h1 className="text-5xl font-bold mb-6 text-gray-900 leading-tight">Complete Guide to   Bike Insurance in India</h1>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mb-8 rounded-full"></div>
      </div>

      <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 mb-12 border border-blue-100">
        <p className="text-xl text-gray-800 leading-relaxed text-center">
          Your bike is more than just a mode of transport it's your daily companion and often represents your freedom and lifestyle. Protect your two-wheeler with <strong className="text-blue-600">  Bike Insurance</strong> that offers comprehensive coverage starting at just ₹538/year. This guide covers everything you need to know about bike insurance in India.
        </p>
      </div>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">What is Bike Insurance and Why is it Important?</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            Bike insurance (also called two-wheeler insurance) is a contract that provides financial protection against damages to your bike and third-party liabilities arising from accidents. Under the Motor Vehicles Act, 1988, having at least third-party bike insurance is mandatory for all two-wheeler owners in India.
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            With increasing road accidents, bike theft cases, and unpredictable weather conditions, having comprehensive insurance ensures you're not financially burdened by unexpected events. Beyond legal compliance, bike insurance provides peace of mind knowing you're protected on the road.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Types of Two-Wheeler Insurance Coverage</h2>
        </div>

        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Third-Party Liability Insurance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              This is the legally mandated minimum coverage that every bike owner must have. It covers:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-3 ml-4">
              <li className="text-lg">Third-party property damage caused by your bike</li>
              <li className="text-lg">Bodily injury or death of third parties in accidents</li>
              <li className="text-lg">Legal liability arising from accidents</li>
            </ul>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
              <p className="text-gray-700 font-medium">
                <strong>Limitation:</strong> It does NOT cover damages to your own bike, theft, or personal injuries to you.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Comprehensive Bike Insurance
            </h3>
            <p className="text-gray-700 leading-relaxed mb-4 text-lg">
              This is the recommended option for complete protection. Comprehensive coverage includes:
            </p>
            <ul className="list-disc list-inside mb-4 text-gray-700 leading-relaxed space-y-3 ml-4">
              <li className="text-lg">All third-party liability coverage benefits</li>
              <li className="text-lg">Own damage cover for your bike against accidents, fire, and theft</li>
              <li className="text-lg">Protection against natural calamities (floods, earthquakes, storms)</li>
              <li className="text-lg">Coverage during riots, strikes, and malicious acts</li>
              <li className="text-lg">Personal accident cover for the rider (mandatory)</li>
              <li className="text-lg">Option to add multiple add-on covers</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-cyan-50 to-white rounded-2xl p-8 border border-cyan-100 shadow-sm">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center">
              <span className="w-8 h-8 bg-cyan-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Standalone Own Damage Cover
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">
              If you have a long-term third-party policy (3 or 5 years), you can separately purchase standalone own damage cover annually to protect your bike from damages.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Essential Bike Insurance Add-Ons</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg text-center">
            Enhance your basic bike insurance with these valuable add-on covers:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              title: "Zero Depreciation Cover",
              desc: "Without this cover, insurers deduct depreciation on parts (plastic, rubber, fiber, metal) during claims. Zero depreciation ensures you get the full replacement cost without any deductions, especially beneficial for new bikes."
            },
            {
              title: "Engine Protection Cover",
              desc: "Protects against engine damage due to water ingress (waterlogging during rains), oil leakage, and lubrication issues. Critical during monsoon months."
            },
            {
              title: "Roadside Assistance",
              desc: "Provides 24/7 help including towing services, flat tire assistance, fuel delivery, battery jumpstart, and minor on-spot repairs when your bike breaks down."
            },
            {
              title: "Return to Invoice",
              desc: "In case of total loss or theft, you receive the invoice value of the bike instead of the depreciated IDV amount."
            },
            {
              title: "Pillion Rider Cover",
              desc: "Extends personal accident cover to pillion riders, providing financial compensation for injuries or death to passengers."
            },
            {
              title: "Consumables Cover",
              desc: "Covers cost of consumable items like engine oil, coolant, nuts and bolts which are excluded from standard policies."
            },
            {
              title: "NCB Protection",
              desc: "Allows you to make limited claims without losing your accumulated No Claim Bonus discount."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Key Bike Insurance Terms You Should Know</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              term: "Insured Declared Value (IDV)",
              desc: "Current market value of your bike minus depreciation. It's the maximum amount you can claim for total loss or theft. IDV decreases every year with depreciation."
            },
            {
              term: "Premium",
              desc: "Annual payment to maintain your insurance coverage. Bike insurance premiums are generally lower than car insurance due to lower vehicle values."
            },
            {
              term: "No Claim Bonus (NCB)",
              desc: "Discount ranging from 20% to 50% offered for claim-free years. NCB is rider-specific, so you can transfer it to a new bike."
            },
            {
              term: "Compulsory Deductible",
              desc: "Mandatory amount (typically ₹100 for bikes below 75cc and ₹500 for bikes above 75cc) that you must pay during claim settlement."
            },
            {
              term: "Cashless Claim",
              desc: "Repair your bike at network garages where the insurer directly settles the bill. No upfront payment required from you."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-300">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.term}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">How is Bike Insurance Premium Calculated?</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 mb-6">
          <p className="text-gray-700 leading-relaxed text-lg">
            Several factors determine your bike insurance premium:
          </p>
        </div>

        <div className="space-y-6">
          {[
            {
              title: "1. Bike's IDV",
              desc: "Higher IDV (newer, premium bikes) means higher premiums. As bikes age, IDV and premiums decrease."
            },
            {
              title: "2. Engine Cubic Capacity",
              desc: "Bikes with larger engines (above 150cc) have higher premiums compared to smaller commuter bikes."
            },
            {
              title: "3. Geographic Location",
              desc: "Cities in Zone A (metros) have higher premiums due to traffic density and accident rates compared to Zone B and C cities."
            },
            {
              title: "4. Age of the Bike",
              desc: "Older bikes have lower premiums. Bikes older than 15 years require fitness certificates and may have limited coverage options."
            },
            {
              title: "5. Add-Ons Selected",
              desc: "Each add-on increases premium. Choose only the add-ons you genuinely need to keep costs optimal."
            },
            {
              title: "6. Claim History (NCB)",
              desc: "Claim-free years earn substantial NCB discounts, significantly reducing renewal premiums."
            }
          ].map((item, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-xl font-bold mb-3 text-gray-800">{item.title}</h3>
              <p className="text-gray-700 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Documents Required for Bike Insurance</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            To purchase or renew bike insurance, keep these documents ready:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Bike Registration Certificate (RC Book)",
              "Valid two-wheeler driving license",
              "Aadhaar Card, PAN Card, or Passport for identity verification",
              "Address proof (Voter ID, Utility Bills, Passport)",
              "Previous insurance policy copy (for renewals)",
              "Valid Pollution Under Control (PUC) certificate",
              "Bank account details for premium payment and claim settlements",
              "Passport size photograph"
            ].map((doc, index) => (
              <div key={index} className="flex items-center bg-gray-50 rounded-lg p-4">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center mr-3 text-sm">✓</div>
                <span className="text-gray-700 font-medium">{doc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">KYC Requirements for Two-Wheeler Insurance</h2>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <p className="text-gray-700 leading-relaxed mb-6 text-lg">
            IRDAI mandates KYC verification for all insurance purchases. Available methods include:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                method: "Aadhaar-based e-KYC",
                desc: "Instant verification using Aadhaar number and OTP authentication"
              },
              {
                method: "Video KYC",
                desc: "Live video call with authorized representative for document verification"
              },
              {
                method: "Central KYC Records",
                desc: "Use existing KYC from other financial institutions"
              },
              {
                method: "Digital KYC",
                desc: "Upload documents online for verification"
              }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 rounded-xl p-5 border border-blue-200">
                <h3 className="text-lg font-bold mb-2 text-gray-800">{item.method}</h3>
                <p className="text-gray-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">How to File a Bike Insurance Claim</h2>
        </div>

        <div className="space-y-6 mb-8">
          {[
            {
              step: "Step 1: Immediate Notification",
              desc: "Inform your insurer within 24 hours of the incident through helpline, mobile app, or email. Provide basic details of the accident."
            },
            {
              step: "Step 2: File FIR (When Required)",
              desc: "For theft, major accidents with third-party involvement, or hit-and-run cases, file an FIR at the nearest police station."
            },
            {
              step: "Step 3: Document Everything",
              desc: "Take clear photos and videos of damage from all angles. Document the accident scene if possible."
            },
            {
              step: "Step 4: Surveyor Assessment",
              desc: "Insurance surveyor will inspect damage and estimate repair costs. Provide complete information during inspection."
            },
            {
              step: "Step 5: Repairs and Settlement",
              desc: "For cashless claims, choose a network garage. For reimbursement, get repairs done anywhere, pay, and submit bills for reimbursement."
            }
          ].map((item, index) => (
            <div key={index} className="flex bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold text-lg">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-gray-800">{item.step}</h3>
                <p className="text-gray-700 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
          <p className="text-gray-700 font-medium text-lg">
            <strong>Timeline:</strong> Most bike insurance claims are settled within 7-10 days of document submission.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <div className="flex items-center mb-6">
          <div className="w-3 h-10 bg-blue-600 rounded-full mr-4"></div>
          <h2 className="text-3xl font-bold text-gray-900">Why Choose   Bike Insurance?</h2>
        </div>
        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              "Starting at ₹538/year: Affordable premiums for comprehensive protection",
              "99%+ Claim Settlement Ratio: Reliable and quick claim approvals",
              "Wide Network Garages: Thousands of cashless repair garages nationwide",
              "Instant Policy Issuance: Get coverage within minutes online",
              "24/7 Claim Support: Round-the-clock assistance for emergencies",
              "Multiple Add-On Options: Customize coverage based on your needs",
              "Easy Renewals: Hassle-free online renewal process",
              "No Paperwork: Completely digital process from purchase to claims"
            ].map((benefit, index) => (
              <div key={index} className="flex items-start">
                <div className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0 text-sm">✓</div>
                <span className="text-gray-700 leading-relaxed text-lg">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="my-16 text-center bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 md:p-10 shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold text-white mb-4">Protect Your Two-Wheeler Today</h3>
        <p className="text-blue-100 text-base md:text-lg mb-6 max-w-2xl mx-auto">Compare the best bike insurance policies and get comprehensive coverage at affordable rates.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={() => openAffiliateLink(affiliateLinks.bikeAcko)}
            className="bg-white text-blue-600 px-4 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Get Acko Bike Insurance Quote
          </button>
          <button
            onClick={() => openAffiliateLink(affiliateLinks.bikeICICI)}
            className="bg-white text-blue-600 px-4 py-3 md:px-8 md:py-4 rounded-lg font-bold text-base md:text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto"
          >
            Get ICICI Lombard Bike Insurance Quote
          </button>
        </div>
      </div>
    </>
  );

  const carFAQs = [
    {
      question: "What is the difference between third-party and comprehensive car insurance?",
      answer: "Third-party insurance only covers damages to others and is mandatory by law. Comprehensive insurance covers both third-party liabilities and damages to your own vehicle, providing complete protection."
    },
    {
      question: "How is the Insured Declared Value (IDV) calculated?",
      answer: "IDV is calculated as: (Manufacturer's listed selling price - Depreciation based on vehicle age) + (Value of accessories - Depreciation on accessories). It represents the maximum claim amount you can receive."
    },
    {
      question: "Can I transfer my No Claim Bonus (NCB) to a new car?",
      answer: "Yes, NCB is linked to the policyholder, not the vehicle. You can transfer your accumulated NCB when you buy a new car or switch insurance providers."
    },
    {
      question: "What documents are required to file a car insurance claim?",
      answer: "You need: Policy copy, RC book, driving license, FIR (if applicable), photographs of damage, surveyor's report, repair bills and invoices, and claim form."
    },
    {
      question: "Is zero depreciation cover worth buying?",
      answer: "Yes, especially for new cars (up to 5 years old). It ensures you get full claim amount without depreciation deductions, saving significant money on parts replacement."
    },
    {
      question: "How long does car insurance claim settlement take?",
      answer: "For cashless claims at network garages, settlement is immediate. For reimbursement claims, it typically takes 7-15 days after document submission and verification."
    },
    {
      question: "Can I renew my car insurance after it has expired?",
      answer: "Yes, but you'll lose your NCB if the gap exceeds 90 days. The car will also need a fresh inspection before renewal. It's best to renew before expiry."
    },
    {
      question: "What is covered under own damage in comprehensive insurance?",
      answer: "Own damage covers: accidents, fire, theft, natural calamities (floods, earthquakes), man-made disasters (riots, strikes), falling objects, and malicious acts."
    },
    {
      question: "Are accessories covered in car insurance?",
      answer: "Electrical and non-electrical accessories can be covered by declaring them and their value when buying the policy. This increases the IDV and premium accordingly."
    },
    {
      question: "What is the claim settlement ratio and why is it important?",
      answer: "Claim settlement ratio indicates the percentage of claims settled by an insurer.  's 99%+ ratio means they approve and settle most claims, ensuring reliability."
    },
    {
      question: "Can I buy car insurance from a dealer or online?",
      answer: "You can buy from dealers, directly from insurers online, or through insurance aggregators. Online purchases often offer better rates and instant policy issuance."
    },
    {
      question: "What is not covered in standard car insurance?",
      answer: "Exclusions include: driving without valid license, drunk driving, mechanical breakdown, wear and tear, driving outside geographical limits, consequential losses, and depreciation (unless zero dep is added)."
    },
    {
      question: "How does roadside assistance add-on work?",
      answer: "It provides 24/7 emergency services like towing, flat tire change, fuel delivery, battery jumpstart, and minor repairs. You just call the helpline when stranded."
    },
    {
      question: "Is personal accident cover mandatory in car insurance?",
      answer: "Yes, personal accident cover of ₹15 lakhs for owner-driver is mandatory as per IRDAI regulations for all new car insurance policies."
    },
    {
      question: "What is voluntary deductible and how does it affect premium?",
      answer: "Voluntary deductible is an amount you agree to pay during claims. Choosing higher deductible (₹5000-₹15000) can reduce your premium by 15-30%."
    },
    {
      question: "Can I add or remove add-ons during policy renewal?",
      answer: "Yes, you can modify your add-on covers during renewal based on your current needs. This flexibility allows you to customize coverage year by year."
    },
    {
      question: "What is the cooling period after buying car insurance?",
      answer: "There's typically no cooling period, but policies become active 24 hours after purchase. However, if you had a lapsed policy, a 15-day waiting period may apply for own damage claims."
    },
    {
      question: "How do I choose the right car insurance company?",
      answer: "Consider: claim settlement ratio, network garage availability, customer service quality, premium rates, policy features, add-on options, and customer reviews."
    }
  ];

  const bikeFAQs = [
    {
      question: "Is bike insurance mandatory in India?",
      answer: "Yes, at least third-party liability insurance is mandatory under the Motor Vehicles Act, 1988. Riding without insurance can result in fines up to ₹2,000 and/or imprisonment."
    },
    {
      question: "What is the difference between comprehensive and third-party bike insurance?",
      answer: "Third-party insurance only covers damages to others. Comprehensive insurance covers both third-party liabilities and damages to your own bike from accidents, theft, and natural disasters."
    },
    {
      question: "How is bike insurance premium calculated?",
      answer: "Premium depends on bike's IDV, engine capacity, age, location (city zone), coverage type, add-ons selected, and your claim history (NCB)."
    },
    {
      question: "Can I transfer NCB to a new bike?",
      answer: "Yes, NCB is linked to the rider, not the bike. You can transfer your accumulated NCB when buying a new bike or switching insurers, provided you do it within 90 days of policy expiry."
    },
    {
      question: "What documents are needed to renew bike insurance?",
      answer: "You need: RC book, previous policy copy, valid driving license, and PUC certificate. KYC is required as per IRDAI guidelines."
    },
    {
      question: "How long does it take to settle a bike insurance claim?",
      answer: "Cashless claims are settled immediately at network garages. Reimbursement claims typically take 7-15 days after document verification."
    },
    {
      question: "Is zero depreciation cover necessary for bikes?",
      answer: "Highly recommended for new bikes (up to 5 years old) as it ensures full replacement costs without depreciation deductions, saving money on expensive parts like headlights, fairings, and mirrors."
    },
    {
      question: "What is not covered in bike insurance?",
      answer: "Exclusions include: riding without valid license, drunk driving, mechanical/electrical breakdown, normal wear and tear, consequential losses, and damages when riding outside geographical limits."
    },
    {
      question: "Can I buy bike insurance online?",
      answer: "Yes, you can purchase bike insurance online from insurer websites, aggregator platforms, or through mobile apps. The process is instant with immediate policy issuance."
    },
    {
      question: "What happens if I don't renew bike insurance on time?",
      answer: "You lose legal protection, accumulated NCB (if gap exceeds 90 days), and will need vehicle inspection for renewal. Riding uninsured invites hefty fines."
    },
    {
      question: "Is personal accident cover included in bike insurance?",
      answer: "Yes, personal accident cover for owner-rider is mandatory in all bike insurance policies as per IRDAI regulations, providing ₹15 lakhs coverage."
    },
    {
      question: "How do I find the best bike insurance policy?",
      answer: "Compare policies based on: premium rates, claim settlement ratio, network garage availability, add-on options, customer reviews, and insurer reputation."
    },
    {
      question: "Can I get insurance for an old bike?",
      answer: "Yes, but bikes older than 15 years require fitness certificates. Coverage options may be limited, and premiums could be higher due to increased risk."
    },
    {
      question: "What is engine protection cover and is it necessary?",
      answer: "It covers engine damage from water ingress, oil leakage, and lubrication issues. Essential during monsoons, especially if you ride in waterlogging-prone areas."
    },
    {
      question: "How does roadside assistance work in bike insurance?",
      answer: "Call the insurer's helpline when your bike breaks down. They send help for towing, fuel delivery, flat tire assistance, or minor repairs at your location."
    },
    {
      question: "Can I add pillion rider cover to my policy?",
      answer: "Yes, pillion rider cover is available as an add-on, providing personal accident coverage for passengers riding with you."
    },
    {
      question: "What is the compulsory deductible in bike insurance?",
      answer: "Compulsory deductible is the amount you must pay during claims: ₹100 for bikes below 75cc, ₹500 for bikes above 75cc. This is mandatory and non-negotiable."
    },
    {
      question: "How do I switch my bike insurance to another provider?",
      answer: "Simply don't renew with current insurer and buy from a new provider before expiry. Ensure continuity to retain NCB. Provide previous policy details to transfer NCB."
    },
    {
      question: "Are electric bikes/scooters covered under bike insurance?",
      answer: "Yes, electric two-wheelers are covered. Some insurers offer specialized EV insurance with battery protection and charging station network benefits."
    },
    {
      question: "What should I do immediately after a bike accident?",
      answer: "Ensure safety, call emergency services if needed, inform police (for FIR if required), take photos of damage, note witness details, and inform your insurer within 24 hours."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 text-gray-900 font-sans min-h-screen">
      <div className="flex justify-center mb-16 px-4">
        <div className="bg-white rounded-2xl p-2 shadow-lg border border-gray-200 flex flex-wrap gap-4 w-full max-w-3xl">
            <button
            onClick={() => setActiveTab('car')}
            className={`flex-1 min-w-[150px] flex items-center justify-center space-x-3 px-6 py-3 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'car'
                ? 'bg-red-600 text-white shadow-md'
                : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
            }`}
            >
            <i className="fas fa-car text-lg"></i>
            <span>Car Insurance</span>
            </button>
            <button
            onClick={() => setActiveTab('bike')}
            className={`flex-1 min-w-[150px] flex items-center justify-center space-x-3 px-6 py-3 text-lg font-bold rounded-xl transition-all duration-300 ${
                activeTab === 'bike'
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
            }`}
            >
            <i className="fas fa-motorcycle text-lg"></i>
            <span>Bike Insurance</span>
            </button>
        </div>
      </div>


      {activeTab === 'car' ? (
        <>
          {carContent}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions About Car Insurance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Find answers to common questions about car insurance coverage, claims, and policy details.</p>
              <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="max-w-5xl mx-auto">
              {carFAQs.map(({ question, answer }, index) => (
                <AccordionItem 
                  key={index} 
                  question={question} 
                  answer={answer} 
                  isOpen={openFaqIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        <>
          {bikeContent}
          <section className="mt-20">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 text-gray-900">Frequently Asked Questions About Bike Insurance</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">Get answers to frequently asked questions about two-wheeler insurance policies and coverage.</p>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-cyan-500 mx-auto mt-6 rounded-full"></div>
            </div>
            <div className="max-w-5xl mx-auto">
              {bikeFAQs.map(({ question, answer }, index) => (
                <AccordionItem 
                  key={index} 
                  question={question} 
                  answer={answer} 
                  isOpen={openFaqIndex === index}
                  onToggle={() => toggleFaq(index)}
                />
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default CarInsurancePage;