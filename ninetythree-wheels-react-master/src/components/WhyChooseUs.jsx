
import React from 'react';
import { BadgeCheck, IndianRupee, Handshake, Clock } from 'lucide-react';

const WhyChooseUs = () => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose 93cars?</h2>
          <p className="text-muted">We make car discovery simple, transparent, and trustworthy</p>
        </div>
        <div className="row g-4">
          <div className="col-lg-3 col-md-6">
            <div className="text-center">
              <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                <BadgeCheck className="text-dark" size={40} />
              </div>
              <h5 className="fw-bold">Comprehensive Listings</h5>
              <p className="text-muted">Detailed specifications, features, and high-quality images for every car.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="text-center">
              <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                <IndianRupee className="text-dark" size={40} />
              </div>
              <h5 className="fw-bold">Transparent Information</h5>
              <p className="text-muted">Clear information, including pricing, to help you compare options easily.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="text-center">
              <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                <Handshake className="text-dark" size={40} />
              </div>
              <h5 className="fw-bold">Trusted Platform</h5>
              <p className="text-muted">Connect with sellers on a reliable and user-friendly platform.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="text-center">
              <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                <Clock className="text-dark" size={40} />
              </div>
              <h5 className="fw-bold">Effortless Discovery</h5>
              <p className="text-muted">Our powerful search tools make finding your next car simple and fast.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
