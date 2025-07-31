
import React, { useState, useRef } from 'react';
import { Youtube, Linkedin, X, Instagram, MapPin, Phone, Mail, Clock, Send, Loader } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Toaster, toast } from "@/components/ui/sonner";

const Contact = () => {
  const form = useRef();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const serviceID = 'service_c90bj98';
    const templateID = 'template_wbs53iq';
    const publicKey = 'Hselr5qg0TYx_ho7X';

    emailjs.sendForm(serviceID, templateID, form.current, publicKey)
      .then((result) => {
        console.log('EmailJS Success:', result.text);
        toast.success('Message Sent!', {
          description: 'Thank you for your message! We will get back to you soon.',
        });
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
      }, (error) => {
        console.error('EmailJS Error:', error.text);
        toast.error('Failed to send message', {
          description: 'Sorry, something went wrong. Please try again later.',
        });
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="container py-5">
      <Toaster richColors />
      <div className="text-center mb-5">
        <h1 className="fw-bold">Contact <span className="text-warning">93</span>cars</h1>
        <p className="lead text-muted">Get in touch with us for any queries or assistance</p>
      </div>

      <div className="row g-5">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-5">
              <h3 className="fw-bold mb-4">Send us a Message</h3>
              <form ref={form} onSubmit={handleSubmit}>
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
                    <button type="submit" className="btn btn-warning btn-lg px-5 d-inline-flex align-items-center" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader size={18} className="me-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={18} className="me-2" />
                          Send Message
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-5 mt-5">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Contact Information</h4>
              
              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <MapPin className="text-dark" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Address</h6>
                  <p className="text-muted mb-0">
                    CARS93 INFOTECH PRIVATE LIMITED<br />
                    WorkFlo, Ranka Junction, Property No.224<br />
                    3rd Floor, #80/3, Vijinpur Village, Old<br />
                    Madras Road, KR Puram, Hobli,<br />
                    Benguluru, KA, 560016, India.
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <Phone className="text-dark" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Phone</h6>
                  <p className="text-muted mb-0">
                    +91 7026433985<br />
                  
                  </p>
                </div>
              </div>

              <div className="d-flex mb-4">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <Mail className="text-dark" size={24} />
                  </div>
                </div>
                <div className="flex-grow-1 ms-3">
                  <h6 className="fw-bold">Email</h6>
                  <p className="text-muted mb-0">
                    contact@93cars.com

                  </p>
                </div>
              </div>

             {/*
              <div className="d-flex">
                <div className="flex-shrink-0">
                  <div className="bg-warning rounded-circle d-flex align-items-center justify-content-center" style={{width: '50px', height: '50px'}}>
                    <Clock className="text-dark" size={24} />
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
              */}
            </div>
          </div>
        </div>
        

        <div className="col-lg-4">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-body p-4 text-center d-flex flex-column justify-content-center">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <div className="d-flex justify-content-center gap-3">
                <a
                 href="https://youtube.com/@93carsofficial?si=s3gG9SkUnhrmTgev"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline-warning btn-sm"
                 >
                  <Youtube size={18} />
                </a>
                <a
                 href="https://www.linkedin.com/company/93cars/"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline-warning btn-sm"
                 >
                  <Linkedin size={18} />
                </a>
                <a 
                 href="https://x.com/93CarsOfficial?t=YsvlX-gYA-V57xUvSWqLfw&s=09"
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline-warning btn-sm"
                 >
                  <X size={18} />
                </a>
                <a 
                 href="https://www.instagram.com/93carsofficial?igsh=MW45ZnM4aHh3MGY1cg=="
                 target="_blank"
                 rel="noopener noreferrer"
                 className="btn btn-outline-warning btn-sm"
                 >
                  <Instagram size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
