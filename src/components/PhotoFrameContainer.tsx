import React, { useRef } from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import Sticker from './Sticker';
import PhotoFrame from './PhotoFrame';
import SavePrintControls from './SavePrintControls';

const PhotoFrameContainer: React.FC = () => {
  const { stickers, updateSticker, removeSticker } = usePhotobooth();
  const frameRef = useRef<HTMLDivElement>(null);

  return (
    <div className="space-y-6">
      <div 
        ref={frameRef} 
        className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg min-h-[400px]"
        style={{ position: 'relative' }}
      >
        <PhotoFrame />
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
      </div>
      <SavePrintControls frameRef={frameRef} />
    </div>
  );
};

export default PhotoFrameContainer;

