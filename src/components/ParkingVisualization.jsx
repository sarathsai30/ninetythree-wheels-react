import React from 'react';

const ParkingVisualization = ({ car, carDimensions, parkingDimensions }) => {
  const scale = 50; // pixels per meter for visualization
  
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
    <div className="space-y-6">
      {/* Top View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Top View</h3>
        <div className="relative border-2 border-gray-300 bg-gray-50 p-4 rounded-lg">
          {/* Parking Space */}
          <div 
            className="relative border-2 border-blue-500 bg-blue-100/30"
            style={{
              width: `${parkingPixels.width}px`,
              height: `${parkingPixels.length}px`,
              margin: '0 auto'
            }}
          >
            <div className="absolute -top-6 left-0 text-xs text-blue-600">
              Parking Space: {parkingDimensions.width}m × {parkingDimensions.length}m
            </div>
            
            {/* Car */}
            <div 
              className={`absolute top-2 left-2 border-2 ${canFit ? 'border-green-500 bg-green-200' : 'border-red-500 bg-red-200'} rounded`}
              style={{
                width: `${carPixels.width}px`,
                height: `${carPixels.length}px`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {car.brand}
              </div>
            </div>
            
            {/* Dimensions Labels */}
            <div className="absolute -bottom-6 left-0 text-xs text-gray-600">
              Car: {carDimensions.width}m × {carDimensions.length}m
            </div>
          </div>
        </div>
      </div>

      {/* Side View */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Side View</h3>
        <div className="relative border-2 border-gray-300 bg-gray-50 p-4 rounded-lg">
          {/* Parking Space Height */}
          <div 
            className="relative border-2 border-blue-500 bg-blue-100/30"
            style={{
              width: `${parkingPixels.length}px`,
              height: `${parkingPixels.height}px`,
              margin: '0 auto'
            }}
          >
            <div className="absolute -top-6 left-0 text-xs text-blue-600">
              Parking Height: {parkingDimensions.height}m
            </div>
            
            {/* Car Side Profile */}
            <div 
              className={`absolute bottom-0 left-2 border-2 ${canFit ? 'border-green-500 bg-green-200' : 'border-red-500 bg-red-200'} rounded`}
              style={{
                width: `${carPixels.length}px`,
                height: `${carPixels.height}px`
              }}
            >
              <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                {car.brand}
              </div>
            </div>
            
            {/* Car Height Label */}
            <div className="absolute -bottom-6 left-0 text-xs text-gray-600">
              Car Height: {carDimensions.height}m
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Fit Status */}
        <div className={`p-4 rounded-lg border-2 ${canFit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
          <h4 className={`font-semibold mb-2 ${canFit ? 'text-green-800' : 'text-red-800'}`}>
            {canFit ? '✅ Perfect Fit!' : '❌ Won\'t Fit'}
          </h4>
          <p className="text-sm">
            {canFit 
              ? 'Your car will fit comfortably in this parking space.'
              : 'This parking space is too small for your selected car.'
            }
          </p>
        </div>

        {/* Remaining Space */}
        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
          <h4 className="font-semibold mb-2 text-blue-800">Space Analysis</h4>
          <div className="text-sm space-y-1">
            <p>Extra Length: {remainingSpace.length.toFixed(1)}m</p>
            <p>Extra Width: {remainingSpace.width.toFixed(1)}m</p>
            <p>Extra Height: {remainingSpace.height.toFixed(1)}m</p>
          </div>
        </div>
      </div>

      {/* Car Details */}
      <div className="p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">Selected Car Details</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Model:</strong> {car.name}</p>
            <p><strong>Body Type:</strong> {car.bodyType}</p>
          </div>
          <div>
            <p><strong>Price:</strong> ₹{car.price.toLocaleString()}</p>
            <p><strong>Fuel:</strong> {car.fuelType}</p>
            <p><strong>Transmission:</strong> {car.transmission}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingVisualization;