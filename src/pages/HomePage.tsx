import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera } from 'lucide-react';

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/choose-layout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-gray-800 mb-4">
            photobooth
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8">
            Capture the moment, cherish the magic, relive the love
          </p>
        </div>
        
        <button
          onClick={handleStart}
          className="bg-pastel-pink-500 hover:bg-pastel-pink-600 text-white text-xl font-semibold px-12 py-4 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-3 mx-auto"
        >
          <Camera className="w-6 h-6" />
          START
        </button>

        <div className="mt-16 flex justify-center gap-8 opacity-60">
          <div className="w-32 h-48 bg-white rounded-lg shadow-md transform rotate-3">
            <div className="w-full h-full bg-gradient-to-br from-pastel-pink-200 to-pastel-lavender-200 rounded-lg"></div>
          </div>
          <div className="w-32 h-48 bg-white rounded-lg shadow-md transform -rotate-3">
            <div className="w-full h-full bg-gradient-to-br from-pastel-mint-200 to-pastel-blue-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

