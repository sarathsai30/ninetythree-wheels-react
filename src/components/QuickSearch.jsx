
import React from 'react';
import { Link } from 'react-router-dom';

const QuickSearch = ({ brands }) => {
  return (
    <section className="py-4 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row g-3 align-items-end">
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Brand</label>
                    <select className="form-select">
                      <option>Select Brand</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>
                  <div className="col-md-4">
                    <label className="form-label fw-semibold">Body Type</label>
                    <select className="form-select">
                      <option>Select Body Type</option>
                      <option>SUV</option>
                      <option>Sedan</option>
                      <option>Hatchback</option>
                    </select>
                  </div>
                  <div className="col-md-4">
                    <Link to="/cars" className="btn btn-primary w-100">
                      <i className="fas fa-search me-2"></i>Search Cars
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSearch;
