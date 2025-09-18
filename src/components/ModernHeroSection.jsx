import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card } from './ui/card';
import QuickSearch from './QuickSearch';
import BlogPopup from './BlogPopup';

const ModernHeroSection = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden gradient-hero">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 to-purple-600/90" />
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container relative z-10 mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Search */}
          <div className="order-2 lg:order-1">
            <Card className="p-6 glass-effect border-white/20 shadow-2xl animate-fade-in">
              <QuickSearch />
            </Card>
          </div>
          
          {/* Right Side - Content */}
          <div className="order-1 lg:order-2 text-white space-y-6 animate-slide-up">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-balance">
                Find Your Perfect 
                <span className="block text-yellow-400">Dream Car</span>
              </h1>
              <p className="text-lg lg:text-xl text-white/90 max-w-2xl leading-relaxed">
                Discover premium vehicles with transparent pricing, detailed specifications, 
                and trusted service. Your journey to the perfect car starts here.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold px-8 py-6 text-lg hover-lift"
              >
                <Link to="/cars">
                  Browse All Cars
                </Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-6 text-lg"
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-400">500+</div>
                <div className="text-sm lg:text-base text-white/80">Quality Cars</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-400">50+</div>
                <div className="text-sm lg:text-base text-white/80">Car Brands</div>
              </div>
              <div className="text-center">
                <div className="text-2xl lg:text-3xl font-bold text-yellow-400">10k+</div>
                <div className="text-sm lg:text-base text-white/80">Happy Customers</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-pulse hidden lg:block" />
      <div className="absolute bottom-20 right-10 w-16 h-16 bg-yellow-400/20 rounded-full animate-pulse hidden lg:block" />
      
      <BlogPopup />
    </section>
  );
};

export default ModernHeroSection;