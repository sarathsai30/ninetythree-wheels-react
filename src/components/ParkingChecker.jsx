import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import ParkingVisualization from './ParkingVisualization';
import carsData from '../data/cars.json';

const ParkingChecker = () => {
  const [selectedCar, setSelectedCar] = useState('');
  const [parkingLength, setParkingLength] = useState('');
  const [parkingWidth, setParkingWidth] = useState('');
  const [parkingHeight, setParkingHeight] = useState('');
  const [showVisualization, setShowVisualization] = useState(false);

  // Get main variant cars for selection
  const mainVariantCars = carsData.filter(car => /^\D+\d+$/.test(car.id));

  // Car dimensions data (approximate dimensions in meters)
  const carDimensions = {
    'Sedan': { length: 4.5, width: 1.8, height: 1.5 },
    'Hatchback': { length: 3.8, width: 1.7, height: 1.6 },
    'SUV': { length: 4.6, width: 1.9, height: 1.8 },
    'Compact SUV': { length: 4.2, width: 1.8, height: 1.7 },
    'default': { length: 4.2, width: 1.8, height: 1.6 }
  };

  const getCarDimensions = (car) => {
    if (!car) return carDimensions.default;
    return carDimensions[car.bodyType] || carDimensions.default;
  };

  const handleCheckParking = () => {
    if (selectedCar && parkingLength && parkingWidth && parkingHeight) {
      setShowVisualization(true);
    }
  };

  const selectedCarData = mainVariantCars.find(car => car.id === selectedCar);
  const carDims = getCarDimensions(selectedCarData);

  const canFit = parkingLength && parkingWidth && parkingHeight
    ? (parseFloat(parkingLength) >= carDims.length && 
       parseFloat(parkingWidth) >= carDims.width && 
       parseFloat(parkingHeight) >= carDims.height)
    : null;

  return (
    <section className="py-16 bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">Know Your Parking</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Check if your desired car fits in your parking space with our intelligent parking calculator
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-center">Parking Space Calculator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Car Selection */}
                <div className="space-y-4">
                  <Label htmlFor="car-select">Select Your Car</Label>
                  <Select value={selectedCar} onValueChange={setSelectedCar}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a car..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mainVariantCars.map((car) => (
                        <SelectItem key={car.id} value={car.id}>
                          {car.brand} {car.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  {selectedCarData && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <h4 className="font-semibold mb-2">Car Dimensions</h4>
                      <div className="text-sm space-y-1">
                        <p>Length: {carDims.length}m</p>
                        <p>Width: {carDims.width}m</p>
                        <p>Height: {carDims.height}m</p>
                        <p>Body Type: {selectedCarData.bodyType}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Parking Dimensions */}
                <div className="space-y-4">
                  <Label>Parking Space Dimensions (in meters)</Label>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="length">Length</Label>
                      <Input
                        id="length"
                        type="number"
                        step="0.1"
                        placeholder="5.0"
                        value={parkingLength}
                        onChange={(e) => setParkingLength(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="width">Width</Label>
                      <Input
                        id="width"
                        type="number"
                        step="0.1"
                        placeholder="2.5"
                        value={parkingWidth}
                        onChange={(e) => setParkingWidth(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="height">Height</Label>
                      <Input
                        id="height"
                        type="number"
                        step="0.1"
                        placeholder="2.5"
                        value={parkingHeight}
                        onChange={(e) => setParkingHeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Results */}
              {canFit !== null && selectedCarData && (
                <div className={`p-4 rounded-lg border-2 ${canFit ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h4 className={`font-semibold mb-2 ${canFit ? 'text-green-800' : 'text-red-800'}`}>
                    {canFit ? '✅ Car Fits!' : '❌ Car Doesn\'t Fit'}
                  </h4>
                  <div className="text-sm space-y-1">
                    <p>Extra Length: {(parseFloat(parkingLength) - carDims.length).toFixed(1)}m</p>
                    <p>Extra Width: {(parseFloat(parkingWidth) - carDims.width).toFixed(1)}m</p>
                    <p>Extra Height: {(parseFloat(parkingHeight) - carDims.height).toFixed(1)}m</p>
                  </div>
                </div>
              )}

              {/* Check Parking Button */}
              <div className="text-center">
                <Dialog open={showVisualization} onOpenChange={setShowVisualization}>
                  <DialogTrigger asChild>
                    <Button 
                      onClick={handleCheckParking}
                      disabled={!selectedCar || !parkingLength || !parkingWidth || !parkingHeight}
                      className="px-8 py-3"
                    >
                      Check Parking Visualization
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Parking Space Visualization</DialogTitle>
                    </DialogHeader>
                    {selectedCarData && (
                      <ParkingVisualization
                        car={selectedCarData}
                        carDimensions={carDims}
                        parkingDimensions={{
                          length: parseFloat(parkingLength),
                          width: parseFloat(parkingWidth),
                          height: parseFloat(parkingHeight)
                        }}
                      />
                    )}
                  </DialogContent>
                </Dialog>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ParkingChecker;