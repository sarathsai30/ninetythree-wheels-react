
/*import React, { useEffect, useState } from 'react';
import carsData from '../data/cars.json';

const Compare = () => {
  const [selectedCars, setSelectedCars] = useState([]);

  useEffect(() => {
    const ids = JSON.parse(localStorage.getItem('compareIds')) || [];
    const matched = carsData.filter(car => ids.includes(car.id));
    setSelectedCars(matched);
  }, []);

  const clearCompare = () => {
    localStorage.removeItem('compareIds');
    setSelectedCars([]);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">🔍 Compare Cars</h2>

      {selectedCars.length === 0 ? (
        <p className="text-gray-500">No cars selected for comparison yet.</p>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse border border-gray-300">
              <thead>
                <tr>
                  <th className="border p-2">Attribute</th>
                  {selectedCars.map(car => (
                    <th key={car.id} className="border p-2">{car.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">Price</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">₹{car.price.toLocaleString('en-IN')}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2">Mileage</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">{car.mileage || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2">Engine</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">{car.engine || '—'}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2">Fuel Type</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">{car.fuelType}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2">Transmission</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">{car.transmission}</td>
                  ))}
                </tr>
                <tr>
                  <td className="border p-2">Body Type</td>
                  {selectedCars.map(car => (
                    <td key={car.id} className="border p-2">{car.bodyType}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-right">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={clearCompare}
            >
              Clear All
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Compare;*/
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import carsData from '../data/cars.json';

const Compare = () => {
  const [searchParams] = useSearchParams();
  const ids = searchParams.get('ids')?.split(',') || [];

  const selectedCars = carsData.filter(car => ids.includes(car.id));

  if (selectedCars.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-600">
        No cars selected for comparison.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Compare Cars</h2>
      <div className="overflow-auto">
        <table className="table-auto w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2 font-semibold">Feature</th>
              {selectedCars.map(car => (
                <th key={car.id} className="p-2">{car.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 font-semibold">Image</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-32 h-20 object-cover mx-auto rounded shadow"
                  />
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Price</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2 text-green-700 font-medium">
                  ₹{car.price?.toLocaleString('en-IN') || '—'}
                </td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Mileage / Range</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">{car.mileage || '—'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Engine</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">{car.engine || '—'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Transmission</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">{car.transmission || '—'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Fuel Type</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">{car.fuelType || '—'}</td>
              ))}
            </tr>
            <tr>
              <td className="p-2 font-semibold">Body Type</td>
              {selectedCars.map(car => (
                <td key={car.id} className="p-2">{car.bodyType || '—'}</td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Compare;

