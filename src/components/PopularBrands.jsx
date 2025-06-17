
import React from 'react';

const PopularBrands = ({ brands, onBrandClick }) => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Popular Brands</h2>
          <p className="text-muted">Choose from top automotive brands</p>
        </div>
        <div className="row g-4">
          {brands.slice(0, 6).map(brand => (
            <div key={brand} className="col-lg-2 col-md-4 col-6">
              <div 
                className="card border-0 shadow-sm text-center h-100 brand-card" 
                style={{ cursor: 'pointer' }}
                onClick={() => onBrandClick(brand)}
              >
                <div className="card-body d-flex align-items-center justify-content-center">
                  <h5 className="fw-bold mb-0">{brand}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularBrands;
