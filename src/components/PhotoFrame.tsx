import React, { useState } from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import { Camera, X } from 'lucide-react';
import CameraCapture from './CameraCapture';

const PhotoFrame: React.FC = () => {
  const { frameLayout, photos, addPhoto, removePhoto } = usePhotobooth();
  const [activeCameraSlot, setActiveCameraSlot] = useState<number | null>(null);
  const [draggedPhoto, setDraggedPhoto] = useState<string | null>(null);

  const handleDragStart = (e: React.DragEvent, photoUrl: string) => {
    setDraggedPhoto(photoUrl);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, slotIndex: number) => {
    e.preventDefault();
    if (draggedPhoto) {
      addPhoto({
        id: `photo-${Date.now()}-${slotIndex}`,
        url: draggedPhoto,
        slotIndex,
      });
      setDraggedPhoto(null);
    }
  };

  const handleSlotClick = (slotIndex: number) => {
    setActiveCameraSlot(slotIndex);
  };

  const handlePhotoCapture = (slotIndex: number, photoUrl: string) => {
    addPhoto({
      id: `photo-${Date.now()}-${slotIndex}`,
      url: photoUrl,
      slotIndex,
    });
    setActiveCameraSlot(null);
  };

  const handleRemovePhoto = (e: React.MouseEvent, slotIndex: number) => {
    e.stopPropagation();
    removePhoto(slotIndex);
  };

  const getGridLayout = (count: number) => {
    switch (count) {
      case 1:
        return 'grid-cols-1';
      case 2:
        return 'grid-cols-2';
      case 3:
        return 'grid-cols-2 grid-rows-2';
      case 4:
        return 'grid-cols-2';
      case 5:
        return 'grid-cols-3 grid-rows-2';
      default:
        return 'grid-cols-1';
    }
  };

  const getSlotStyle = (index: number, total: number) => {
    if (total === 3 && index === 0) {
      return 'col-span-2 row-span-2';
    }
    if (total === 5 && index === 0) {
      return 'col-span-2 row-span-2';
    }
    return '';
  };

  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Photo Frame</h2>
        <div className={`grid ${getGridLayout(frameLayout)} gap-4`}>
          {Array.from({ length: frameLayout }).map((_, index) => {
            const photo = photos.find(p => p.slotIndex === index);
            return (
              <div
                key={index}
                className={`
                  relative aspect-square bg-gradient-to-br from-pastel-pink-100 to-pastel-lavender-100
                  rounded-xl border-2 border-dashed border-pastel-purple-300
                  flex items-center justify-center cursor-pointer
                  hover:border-pastel-purple-500 hover:bg-gradient-to-br hover:from-pastel-pink-200 hover:to-pastel-lavender-200
                  transition-all duration-300
                  ${getSlotStyle(index, frameLayout)}
                `}
                onClick={() => handleSlotClick(index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                {photo ? (
                  <>
                    <img
                      src={photo.url}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover rounded-xl"
                      draggable
                      onDragStart={(e) => handleDragStart(e, photo.url)}
                    />
                    <button
                      onClick={(e) => handleRemovePhoto(e, index)}
                      className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 transition-colors shadow-lg"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <div className="text-center">
                    <Camera className="w-12 h-12 text-pastel-purple-400 mx-auto mb-2" />
                    <p className="text-pastel-purple-600 font-medium">Click to add photo</p>
                    <p className="text-xs text-gray-500 mt-1">or drag & drop</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {activeCameraSlot !== null && (
        <CameraCapture
          slotIndex={activeCameraSlot}
          onClose={() => setActiveCameraSlot(null)}
          onCapture={(photoUrl) => handlePhotoCapture(activeCameraSlot, photoUrl)}
        />
      )}
    </>
  );
};

export default PhotoFrame;

