import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import ModernCarCard from './ModernCarCard';

const ModernFeaturedCars = ({ featuredCars }) => {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            Featured Cars
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Handpicked premium vehicles with the best value for money and outstanding features
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {featuredCars.map((car, index) => (
            <div key={car.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ModernCarCard car={car} />
            </div>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-semibold hover-lift"
          >
            <Link to="/cars">
              View All Cars
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ModernFeaturedCars;