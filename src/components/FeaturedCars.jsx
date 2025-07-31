

import React from 'react';
import { Link } from 'react-router-dom';
import CarCard from './CarCard';

const FeaturedCars = ({ featuredCars }) => {
  return (
    <section className="py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Featured Cars</h2>
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

/*import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedCars = ({ featuredCars }) => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">Featured Cars</h2>
          <p className="text-gray-500">Handpicked cars with the best value for money</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">

        {featuredCars.map((car) => (


            <div
              key={car.id}
              className="min-w-[250px] max-w-[250px] bg-white border rounded-lg shadow-sm flex-shrink-0"
            >
              <img
                src={car.image}
                alt={car.name}
                className="w-full h-40 object-cover rounded-t-md"
              />
              <div className="p-4">
                <h5 className="font-semibold text-lg">{car.name}</h5>
                <p className="text-sm text-gray-500">{car.bodyType}</p>
                <p className="text-blue-600 font-medium">₹{car.price.toLocaleString('en-IN')}</p>
                <Link
                  to={`/cars/${car.id}`}
                  className="block mt-2 text-center text-white bg-blue-500 hover:bg-blue-600 text-sm py-1.5 rounded"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6">
          <Link to="/cars" className="bg-yellow-400 hover:bg-yellow-500 text-white px-6 py-2 rounded text-lg font-semibold">
            View All Cars
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCars;*/

