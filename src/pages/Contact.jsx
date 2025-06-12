
import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    });
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact <span className="text-warning">93</span>cars</h1>
        <p className="lead text-muted">Get in touch with us for any queries or assistance</p>
      </div>

      <div className="row g-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="fw-bold mb-4">Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Full Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email Address *</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Subject *</label>
                    <select
                      className="form-select"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select Subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="buying">Car Buying</option>
                      <option value="selling">Car Selling</option>
                      <option value="financing">Financing</option>
                      <option value="support">Technical Support</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="col-12">
                    <label className="form-label fw-semibold">Message *</label>
                    <textarea
                      className="form-control"
                      rows="5"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please describe your inquiry in detail..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn-warning btn-lg px-5">
                      <i className="fas fa-paper-plane me-2"></i>Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Contact Information</h4>
              
              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="fas fa-map-marker-alt text-dark"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Address</h6>
                  <p className="text-muted mb-0">
                    123 Car Street, Auto Nagar<br />
                    Mumbai, Maharashtra 400001<br />
                    India
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="fas fa-phone text-dark"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Phone</h6>
                  <p className="text-muted mb-0">
                    +91 93000 93000<br />
                    +91 93001 93001
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="fas fa-envelope text-dark"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Email</h6>
                  <p className="text-muted mb-0">
                    info@93cars.com<br />
                    support@93cars.com
                  </p>
                </div>
              </div>

              <div className="d-flex">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <i className="fas fa-clock text-dark"></i>
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Business Hours</h6>
                  <p className="text-muted mb-0">
                    Monday - Saturday: 9:00 AM - 7:00 PM<br />
                    Sunday: 10:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="card border-0 shadow-sm">
            <div className="card-body p-4 text-center">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex justify-content-center gap-3">
                <a href="#" className="btn btn-outline-warning btn-sm">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="btn btn-outline-warning btn-sm">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="btn btn-outline-warning btn-sm">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" className="btn btn-outline-warning btn-sm">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body p-0">
            <div className="ratio ratio-21x9">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d241317.14571842485!2d72.74109995625!3d19.08218205000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c6306644edc1%3A0x5da4ed8f8d648c69!2sMumbai%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1647845234567!5m2!1sen!2sin"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
