import React from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import { FrameLayout } from '../types';
import { Grid } from 'lucide-react';

const FrameSelector: React.FC = () => {
  const { frameLayout, setFrameLayout } = usePhotobooth();

  const layouts: FrameLayout[] = [1, 2, 3, 4, 5];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Grid className="w-5 h-5 text-pastel-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Choose Frame Layout</h2>
      </div>
      <div className="grid grid-cols-5 gap-3">
        {layouts.map((layout) => (
          <button
            key={layout}
            onClick={() => setFrameLayout(layout)}
            className={`
              relative p-4 rounded-xl transition-all duration-300
              ${frameLayout === layout
                ? 'bg-pastel-purple-500 text-white shadow-lg scale-105'
                : 'bg-pastel-purple-100 text-gray-700 hover:bg-pastel-purple-200 hover:scale-102'
              }
            `}
          >
            <div className="text-2xl font-bold mb-1">{layout}</div>
            <div className="text-xs opacity-80">Photo{layout > 1 ? 's' : ''}</div>
            {frameLayout === layout && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-pastel-pink-500 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FrameSelector;

