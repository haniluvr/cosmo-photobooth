import React, { useRef } from 'react';
import { usePhotobooth } from '../../context/PhotoboothContext';
import Sticker from '../Sticker';

interface PhotoStripProps {
  stripRef?: React.RefObject<HTMLDivElement>;
}

const PhotoStrip: React.FC<PhotoStripProps> = ({ stripRef: externalRef }) => {
  const { photos, frameLayout, customizations, stickers, updateSticker, removeSticker } = usePhotobooth();
  const internalRef = useRef<HTMLDivElement>(null);
  const stripRef = externalRef || internalRef;

  const getPhotoShapeClass = (shape: string) => {
    switch (shape) {
      case 'circle':
        return 'rounded-full';
      case 'heart':
        return 'rounded-lg'; // Heart shape would need custom CSS
      case 'rounded':
        return 'rounded-xl';
      default:
        return 'rounded-none';
    }
  };

  return (
    <div
      ref={stripRef}
      className="relative w-64 bg-white rounded-lg shadow-lg p-4"
      style={{ backgroundColor: customizations.frameColor }}
    >
      <div className="space-y-2">
        {Array.from({ length: frameLayout }).map((_, index) => {
          const photo = photos.find(p => p.slotIndex === index);
          return (
            <div
              key={index}
              className={`relative aspect-[3/4] bg-gray-200 overflow-hidden ${getPhotoShapeClass(customizations.photoShape)}`}
            >
              {photo ? (
                <img
                  src={photo.url}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <span>Photo {index + 1}</span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Stickers overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{ pointerEvents: 'auto' }}>
        {stickers.map((sticker) => (
          <Sticker
            key={sticker.id}
            sticker={sticker}
            onUpdate={(updates) => updateSticker(sticker.id, updates)}
            onRemove={() => removeSticker(sticker.id)}
          />
        ))}
      </div>

      {/* Logo and text overlays */}
      <div className="mt-4 text-center">
        {customizations.logo !== 'none' && (
          <div className="text-xs text-gray-600 mb-1">{customizations.logo}</div>
        )}
        {customizations.addDate && (
          <div className="text-xs text-gray-600">
            {new Date().toLocaleDateString()}
          </div>
        )}
        {customizations.addTime && (
          <div className="text-xs text-gray-600">
            {new Date().toLocaleTimeString()}
          </div>
        )}
        <div className="text-xs font-semibold text-gray-800 mt-2">photobooth</div>
      </div>
    </div>
  );
};

export default PhotoStrip;

