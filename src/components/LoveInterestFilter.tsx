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

const LoveInterestFilter: React.FC = () => {
  const { selectedLoveInterest, setSelectedLoveInterest } = usePhotobooth();

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Heart className="w-5 h-5 text-pastel-pink-600" />
        <h2 className="text-xl font-semibold text-gray-800">Choose Love Interest</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {loveInterests.map((interest) => (
          <button
            key={interest.value}
            onClick={() => setSelectedLoveInterest(interest.value)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300 font-medium
              ${selectedLoveInterest === interest.value
                ? 'bg-pastel-pink-500 text-white shadow-lg scale-105'
                : 'bg-pastel-pink-100 text-gray-700 hover:bg-pastel-pink-200 hover:scale-102'
              }
            `}
          >
            {interest.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoveInterestFilter;

