import React from 'react';
import { Car, Ruler, CheckCircle, XCircle } from 'lucide-react';

const ParkingVisualization = ({ car, carDimensions, parkingDimensions }) => {
  const scale = 60; // pixels per meter for visualization
  
  const parkingPixels = {
    length: parkingDimensions.length * scale,
    width: parkingDimensions.width * scale,
    height: parkingDimensions.height * scale
  };
  
  const carPixels = {
    length: carDimensions.length * scale,
    width: carDimensions.width * scale,
    height: carDimensions.height * scale
  };

  const canFit = parkingDimensions.length >= carDimensions.length && 
                 parkingDimensions.width >= carDimensions.width && 
                 parkingDimensions.height >= carDimensions.height;

  // Calculate remaining space
  const remainingSpace = {
    length: parkingDimensions.length - carDimensions.length,
    width: parkingDimensions.width - carDimensions.width,
    height: parkingDimensions.height - carDimensions.height
  };

  return (
    <div className="space-y-8">
      {/* Status Header */}
      <div className="text-center p-6 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100 border border-blue-200">
        <div className="flex items-center justify-center mb-3">
          {canFit ? (
            <CheckCircle className="w-12 h-12 text-green-600" />
          ) : (
            <XCircle className="w-12 h-12 text-red-600" />
          )}
        </div>
        <h2 className={`text-2xl font-bold ${canFit ? 'text-green-700' : 'text-red-700'}`}>
          {canFit ? 'Perfect Fit! ✨' : 'Won\'t Fit ⚠️'}
        </h2>
        <p className="text-gray-600 mt-2">
          {car.brand} {car.name} {canFit ? 'fits comfortably' : 'is too large'} for your parking space
        </p>
      </div>

      {/* Visualizations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Top View */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Car className="w-5 h-5 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Top View</h3>
          </div>
          
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
            {/* Parking Space */}
            <div 
              className="relative mx-auto shadow-lg rounded-lg border-4 border-blue-500 bg-gradient-to-br from-blue-100 to-blue-200"
              style={{
                width: `${Math.max(parkingPixels.width, 200)}px`,
                height: `${Math.max(parkingPixels.length, 200)}px`
              }}
            >
              {/* Parking lines */}
              <div className="absolute inset-2 border-2 border-dashed border-blue-400 rounded opacity-50"></div>
              
              <div className="absolute -top-8 left-0 text-sm font-medium text-blue-700 bg-blue-100 px-2 py-1 rounded">
                Parking: {parkingDimensions.width}m × {parkingDimensions.length}m
              </div>
              
              {/* Car */}
              <div 
                className={`absolute top-3 left-3 rounded-lg shadow-md border-3 transition-all duration-300 ${
                  canFit 
                    ? 'border-green-500 bg-gradient-to-br from-green-300 to-green-400 shadow-green-200' 
                    : 'border-red-500 bg-gradient-to-br from-red-300 to-red-400 shadow-red-200'
                }`}
                style={{
                  width: `${carPixels.width}px`,
                  height: `${carPixels.length}px`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Car className="w-6 h-6 mx-auto mb-1 text-white" />
                    <div className="text-xs font-bold text-white drop-shadow">
                      {car.brand}
                    </div>
                  </div>
                </div>
                
                {/* Car details overlay */}
                <div className="absolute inset-1 border border-white/30 rounded opacity-50"></div>
              </div>
              
              {/* Dimension indicators */}
              <div className="absolute -bottom-8 left-0 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                Car: {carDimensions.width}m × {carDimensions.length}m
              </div>
            </div>
          </div>
        </div>

        {/* Side View */}
        <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <div className="flex items-center mb-4">
            <Ruler className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-800">Side View</h3>
          </div>
          
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-lg border-2 border-dashed border-gray-300">
            {/* Ground line */}
            <div className="absolute bottom-8 left-8 right-8 h-1 bg-gray-400 rounded"></div>
            
            {/* Parking Space Height */}
            <div 
              className="relative mx-auto shadow-lg rounded-lg border-4 border-purple-500 bg-gradient-to-br from-purple-100 to-purple-200"
              style={{
                width: `${Math.max(parkingPixels.length, 200)}px`,
                height: `${Math.max(parkingPixels.height, 150)}px`
              }}
            >
              <div className="absolute -top-8 left-0 text-sm font-medium text-purple-700 bg-purple-100 px-2 py-1 rounded">
                Height: {parkingDimensions.height}m
              </div>
              
              {/* Car Side Profile */}
              <div 
                className={`absolute bottom-0 left-3 rounded-lg shadow-md border-3 transition-all duration-300 ${
                  canFit 
                    ? 'border-green-500 bg-gradient-to-t from-green-400 to-green-300 shadow-green-200' 
                    : 'border-red-500 bg-gradient-to-t from-red-400 to-red-300 shadow-red-200'
                }`}
                style={{
                  width: `${carPixels.length}px`,
                  height: `${carPixels.height}px`
                }}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Car className="w-5 h-5 mx-auto mb-1 text-white" />
                    <div className="text-xs font-bold text-white drop-shadow">
                      {car.brand}
                    </div>
                  </div>
                </div>
                
                {/* Car details overlay */}
                <div className="absolute inset-1 border border-white/30 rounded opacity-50"></div>
              </div>
              
              {/* Height indicator */}
              <div className="absolute -bottom-8 left-0 text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                Car Height: {carDimensions.height}m
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Analysis Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Fit Status */}
        <div className={`p-6 rounded-xl shadow-lg border-2 transition-all duration-300 ${
          canFit 
            ? 'bg-gradient-to-br from-green-50 to-green-100 border-green-300 hover:shadow-green-200' 
            : 'bg-gradient-to-br from-red-50 to-red-100 border-red-300 hover:shadow-red-200'
        }`}>
          <div className="flex items-center mb-3">
            {canFit ? (
              <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 mr-2" />
            )}
            <h4 className={`font-bold text-lg ${canFit ? 'text-green-800' : 'text-red-800'}`}>
              {canFit ? 'Excellent Fit!' : 'Too Large'}
            </h4>
          </div>
          <p className="text-sm text-gray-700">
            {canFit 
              ? 'Your car will park comfortably with room to spare.'
              : 'This parking space is too small for your vehicle.'
            }
          </p>
        </div>

        {/* Space Analysis */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-xl shadow-lg hover:shadow-blue-200 transition-all duration-300">
          <div className="flex items-center mb-3">
            <Ruler className="w-6 h-6 text-blue-600 mr-2" />
            <h4 className="font-bold text-lg text-blue-800">Space Analysis</h4>
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Extra Length:</span>
              <span className={`font-medium ${remainingSpace.length >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {remainingSpace.length.toFixed(1)}m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Extra Width:</span>
              <span className={`font-medium ${remainingSpace.width >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {remainingSpace.width.toFixed(1)}m
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Extra Height:</span>
              <span className={`font-medium ${remainingSpace.height >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {remainingSpace.height.toFixed(1)}m
              </span>
            </div>
          </div>
        </div>

        {/* Efficiency Score */}
        <div className="p-6 bg-gradient-to-br from-indigo-50 to-indigo-100 border-2 border-indigo-300 rounded-xl shadow-lg hover:shadow-indigo-200 transition-all duration-300">
          <div className="flex items-center mb-3">
            <div className="w-6 h-6 bg-indigo-600 rounded-full flex items-center justify-center mr-2">
              <span className="text-white text-xs font-bold">%</span>
            </div>
            <h4 className="font-bold text-lg text-indigo-800">Space Usage</h4>
          </div>
          <div className="space-y-2">
            {canFit && (
              <>
                <div className="text-2xl font-bold text-indigo-700">
                  {Math.round(((carDimensions.length * carDimensions.width) / (parkingDimensions.length * parkingDimensions.width)) * 100)}%
                </div>
                <div className="text-xs text-gray-600">of parking space used</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, ((carDimensions.length * carDimensions.width) / (parkingDimensions.length * parkingDimensions.width)) * 100)}%`
                    }}
                  ></div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Car Details */}
      <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
        <h4 className="font-bold text-xl text-gray-800 mb-4 flex items-center">
          <Car className="w-6 h-6 text-blue-600 mr-2" />
          Selected Vehicle Details
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Brand & Model</span>
              <p className="font-semibold text-gray-800">{car.brand} {car.name}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Body Type</span>
              <p className="font-semibold text-gray-800">{car.bodyType}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Price</span>
              <p className="font-semibold text-gray-800">₹{car.price.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Fuel Type</span>
              <p className="font-semibold text-gray-800">{car.fuelType}</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Transmission</span>
              <p className="font-semibold text-gray-800">{car.transmission}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-500">Seating</span>
              <p className="font-semibold text-gray-800">{car.seatingCapacity} seats</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingVisualization;