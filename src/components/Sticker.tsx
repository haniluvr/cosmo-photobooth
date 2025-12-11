import React, { useState } from 'react';
import { Rnd } from 'react-rnd';
import { X, RotateCw } from 'lucide-react';
import { Sticker as StickerType } from '../types';

interface StickerProps {
  sticker: StickerType;
  onUpdate: (updates: Partial<StickerType>) => void;
  onRemove: () => void;
}

const Sticker: React.FC<StickerProps> = ({ sticker, onUpdate, onRemove }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleRotate = () => {
    onUpdate({ rotation: (sticker.rotation + 15) % 360 });
  };

  return (
    <Rnd
      size={{ width: sticker.width, height: sticker.height }}
      position={{ x: sticker.x, y: sticker.y }}
      onDragStop={(e, d) => onUpdate({ x: d.x, y: d.y })}
      onResizeStop={(e, direction, ref, delta, position) => {
        onUpdate({
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
          x: position.x,
          y: position.y,
        });
      }}
      lockAspectRatio
      enableResizing={{
        top: true,
        right: true,
        bottom: true,
        left: true,
        topRight: true,
        bottomRight: true,
        bottomLeft: true,
        topLeft: true,
      }}
      style={{
        transform: `rotate(${sticker.rotation}deg)`,
      }}
      bounds="parent"
      className="sticker-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full group">
        <img
          src={sticker.imageUrl}
          alt="Sticker"
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />
        {isHovered && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg z-10"
            >
              <X className="w-3 h-3" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleRotate();
              }}
              className="absolute -top-2 -left-2 bg-pastel-purple-500 text-white rounded-full p-1.5 hover:bg-pastel-purple-600 transition-colors shadow-lg z-10"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </>
        )}
      </div>
    </Rnd>
  );
};

export default Sticker;

