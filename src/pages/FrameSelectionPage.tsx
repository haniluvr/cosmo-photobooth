import React from 'react';
import Header from '../components/Layout/Header';
import FrameCarousel from '../components/FrameCarousel';

const FrameSelectionPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <Header />
        
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            choose your layout
          </h1>
          <p className="text-lg text-gray-600">
            Select from our collection of photo booth layouts
          </p>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
          <FrameCarousel />
        </div>
      </div>
    </div>
  );
};

export default FrameSelectionPage;

