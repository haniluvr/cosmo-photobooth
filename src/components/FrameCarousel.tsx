import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { usePhotobooth } from '../context/PhotoboothContext';

interface FrameOption {
  id: string;
  name: string;
  photoCount: number;
  layout: 1 | 2 | 3 | 4 | 5;
  preview: string;
  size: string;
}

const frameOptions: FrameOption[] = [
  { id: 'layout-a', name: 'Layout A', photoCount: 3, layout: 3, preview: '', size: '6 x 2 Strip (3 Pose)' },
  { id: 'layout-b', name: 'Layout B', photoCount: 4, layout: 4, preview: '', size: '6 x 2 Strip (4 Pose)' },
  { id: 'with-love', name: 'With Love Layout', photoCount: 4, layout: 4, preview: '', size: '6 x 2 Strip (4 Pose)' },
  { id: 'holidays', name: 'Holidays Layout', photoCount: 4, layout: 4, preview: '', size: '6 x 2 Strip (4 Pose)' },
  { id: 'layout-1', name: 'Single Photo', photoCount: 1, layout: 1, preview: '', size: '6 x 2 Strip (1 Pose)' },
  { id: 'layout-2', name: 'Two Photos', photoCount: 2, layout: 2, preview: '', size: '6 x 2 Strip (2 Pose)' },
];

const FrameCarousel: React.FC = () => {
  const navigate = useNavigate();
  const { setSelectedFrameId, setFrameLayout } = usePhotobooth();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFrameSelect = (frame: FrameOption) => {
    setSelectedFrameId(frame.id);
    setFrameLayout(frame.layout);
    navigate(`/camera/${frame.id}`);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? frameOptions.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === frameOptions.length - 1 ? 0 : prev + 1));
  };

  const visibleFrames = frameOptions.slice(currentIndex, currentIndex + 4);
  if (visibleFrames.length < 4) {
    visibleFrames.push(...frameOptions.slice(0, 4 - visibleFrames.length));
  }

  return (
    <div className="relative">
      <button
        onClick={handlePrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
      >
        <ChevronLeft className="w-6 h-6 text-gray-700" />
      </button>

      <div className="flex gap-6 overflow-hidden">
        {visibleFrames.map((frame) => (
          <div
            key={frame.id}
            onClick={() => handleFrameSelect(frame)}
            className="flex-shrink-0 w-64 bg-white rounded-xl p-4 shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300"
          >
            <div className="aspect-[3/4] bg-gradient-to-br from-pastel-pink-100 to-pastel-lavender-100 rounded-lg mb-3 flex items-center justify-center">
              <div className="text-4xl font-bold text-pastel-pink-400">{frame.photoCount}</div>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{frame.name}</h3>
            <p className="text-sm text-gray-600">{frame.size}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handleNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 z-10"
      >
        <ChevronRight className="w-6 h-6 text-gray-700" />
      </button>
    </div>
  );
};

export default FrameCarousel;

