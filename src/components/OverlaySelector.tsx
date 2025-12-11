import React from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import { LoveInterest } from '../types';
import { Heart } from 'lucide-react';

const loveInterests: { value: LoveInterest; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'xavier', label: 'Xavier' },
  { value: 'zayne', label: 'Zayne' },
  { value: 'rafayel', label: 'Rafayel' },
  { value: 'sylus', label: 'Sylus' },
  { value: 'caleb', label: 'Caleb' },
];

const OverlaySelector: React.FC = () => {
  const { selectedLoveInterest, setSelectedLoveInterest, overlayPosition, setOverlayPosition } = usePhotobooth();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2 mb-3">
        <Heart className="w-5 h-5 text-pastel-pink-600" />
        <h3 className="font-semibold text-gray-800">Love Interest</h3>
      </div>
      
      <div className="flex flex-wrap gap-2 mb-4">
        {loveInterests.map((interest) => (
          <button
            key={interest.value}
            onClick={() => setSelectedLoveInterest(interest.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
              selectedLoveInterest === interest.value
                ? 'bg-pastel-pink-500 text-white shadow-md'
                : 'bg-pastel-pink-100 text-gray-700 hover:bg-pastel-pink-200'
            }`}
          >
            {interest.label}
          </button>
        ))}
      </div>

      {selectedLoveInterest !== 'all' && (
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-700 font-medium">Position:</span>
          <button
            onClick={() => setOverlayPosition(overlayPosition === 'front' ? 'behind' : 'front')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              overlayPosition === 'front'
                ? 'bg-pastel-purple-500 text-white'
                : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-pastel-purple-300'
            }`}
          >
            {overlayPosition === 'front' ? 'Front' : 'Behind'}
          </button>
        </div>
      )}
    </div>
  );
};

export default OverlaySelector;

