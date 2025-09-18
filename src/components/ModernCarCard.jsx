import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { createCarSlug } from '../utils/carUtils';

const ModernCarCard = ({ car }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <Card className="group overflow-hidden hover-lift shadow-card border-0 bg-card animate-scale-in">
      <div className="relative overflow-hidden">
        <img 
          src={car.image} 
          className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
          alt={car.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-4 right-4">
          <Badge variant="secondary" className="bg-white/90 text-gray-900 font-medium">
            {car.fuelType}
          </Badge>
        </div>
      </div>
      
      <CardContent className="p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-card-foreground group-hover:text-primary transition-colors">
            {car.name}
          </h3>
          <p className="text-muted-foreground text-sm">{car.bodyType}</p>
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-2xl font-bold text-primary">{formatPrice(car.price)}</p>
            <p className="text-xs text-muted-foreground">Starting from</p>
          </div>
        </div>

        <Button 
          asChild 
          className="w-full mt-4 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6"
        >
          <Link to={`/cars/${createCarSlug(car.brand, car.name)}`}>
            View Details
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ModernCarCard;