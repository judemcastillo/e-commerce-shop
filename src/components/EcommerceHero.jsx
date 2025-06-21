import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X } from 'lucide-react';

export default function EcommerceHero() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
      
      {/* Fixed Background Image */}
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`
        }}
      >
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/75"></div>
      </div>

     

      {/* Main Hero Content */}
      <div className="relative z-40 flex items-center content-center justify-center px-6">
        <div className={`text-center text-white max-w-4xl mx-auto transform transition-all duration-1000 ${
          isVisible ? 'translate-y-1 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold  leading-tight mb-8">
            Discover Your Style Story
            <br />
            
          </h1>

          {/* Description */}
          <p className="text-lg md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
            Curated collections that speak to your unique personality. From everyday essentials to standout pieces, find what resonates with you.
          </p>

          {/* Call to Action Button */}
          <button className="inline-block px-12 py-4 border-2 border-white cursor-pointer text-white font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
            SHOP NOW
          </button>
        </div>
      </div>
      
    </div>
  );
}