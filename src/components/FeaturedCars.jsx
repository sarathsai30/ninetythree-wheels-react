
import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

const FeaturedCars = ({ featuredCars, title = "Featured Cars" }) => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">{title}</h2>
          <p className="text-muted">Handpicked cars with the best value for money</p>
        </div>
        <div className="row">
          {featuredCars.map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        <div className="text-center mt-4">
          <Link to="/cars" className="btn btn-warning btn-lg px-5">
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;
