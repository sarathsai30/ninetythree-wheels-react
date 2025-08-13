
import React from 'react';

const About = () => {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="text-center mb-5">
            <h1 className="fw-bold">About <span className="text-warning">93</span>cars</h1>
            <p className="lead text-muted">Your trusted partner in finding the perfect car</p>
          </div>

          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-4">Our Story</h2>
              <p className="mb-4">
                Founded with a vision to revolutionize the used car market in India, 93cars has been 
                helping thousands of customers find their dream cars at the best prices. We understand 
                that buying a car is one of the most important decisions in your life, and we're here 
                to make that journey as smooth and transparent as possible.
              </p>
              <p className="mb-4">
                Our team of automotive experts carefully inspects every vehicle in our inventory to 
                ensure quality and reliability. We believe in transparency, which is why we provide 
                detailed information about each car, including its history, condition, and fair market price.
              </p>
              <p>
                With years of experience in the automotive industry, we've built a reputation for 
                honesty, integrity, and exceptional customer service. Our mission is to connect 
                car buyers with the perfect vehicle while ensuring a hassle-free experience.
              </p>
            </div>
          </div>

          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-eye text-dark fa-2x"></i>
                </div>
                <h4 className="fw-bold">Our Vision</h4>
                <p className="text-muted">
                  To become India's most trusted platform for used car transactions, 
                  making car buying simple, transparent, and reliable.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-target text-dark fa-2x"></i>
                </div>
                <h4 className="fw-bold">Our Mission</h4>
                <p className="text-muted">
                  To provide customers with quality used cars at fair prices while 
                  ensuring complete transparency and exceptional service.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="text-center">
                <div className="bg-warning rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center" style={{width: '80px', height: '80px'}}>
                  <i className="fas fa-heart text-dark fa-2x"></i>
                </div>
                <h4 className="fw-bold">Our Values</h4>
                <p className="text-muted">
                  Integrity, transparency, customer satisfaction, and building 
                  long-lasting relationships based on trust and reliability.
                </p>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm mb-5">
            <div className="card-body p-5">
              <h2 className="fw-bold mb-4">Why Choose Us?</h2>
              <div className="row">
                <div className="col-md-6 mb-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-check-circle text-success fa-lg mt-1"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-bold">Quality Assurance</h5>
                      <p className="text-muted mb-0">Every car undergoes thorough inspection by our certified technicians</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-check-circle text-success fa-lg mt-1"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-bold">Transparent Pricing</h5>
                      <p className="text-muted mb-0">No hidden charges, fair market prices with detailed cost breakdown</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-check-circle text-success fa-lg mt-1"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-bold">Wide Selection</h5>
                      <p className="text-muted mb-0">Extensive inventory of cars from all major brands and categories</p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 mb-4">
                  <div className="d-flex">
                    <div className="flex-shrink-0">
                      <i className="fas fa-check-circle text-success fa-lg mt-1"></i>
                    </div>
                    <div className="flex-grow-1 ms-3">
                      <h5 className="fw-bold">Expert Support</h5>
                      <p className="text-muted mb-0">Dedicated team to guide you through every step of the process</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h3 className="fw-bold mb-3">Ready to Find Your Perfect Car?</h3>
            <p className="text-muted mb-4">Browse our extensive collection of quality used cars</p>
            <a href="/cars" className="btn btn-warning btn-lg px-5">
              Browse Cars
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
