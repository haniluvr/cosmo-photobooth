import React, { createContext, useContext, useState, ReactNode } from 'react';
import { PhotoboothState, FrameLayout, LoveInterest, OverlayPosition, Photo, Sticker, CountdownDuration, Customizations } from '../types';

interface PhotoboothContextType extends PhotoboothState {
  setFrameLayout: (layout: FrameLayout) => void;
  setSelectedFrameId: (id: string | null) => void;
  setSelectedLoveInterest: (character: LoveInterest) => void;
  addPhoto: (photo: Photo) => void;
  removePhoto: (slotIndex: number) => void;
  addSticker: (sticker: Omit<Sticker, 'id'>) => void;
  updateSticker: (id: string, updates: Partial<Sticker>) => void;
  removeSticker: (id: string) => void;
  setOverlayPosition: (position: OverlayPosition) => void;
  setCountdownDuration: (duration: CountdownDuration) => void;
  updateCustomizations: (updates: Partial<Customizations>) => void;
  clearAll: () => void;
}

const PhotoboothContext = createContext<PhotoboothContextType | undefined>(undefined);

export const usePhotobooth = () => {
  const context = useContext(PhotoboothContext);
  if (!context) {
    throw new Error('usePhotobooth must be used within PhotoboothProvider');
  }
  return context;
};

interface PhotoboothProviderProps {
  children: ReactNode;
}

export const PhotoboothProvider: React.FC<PhotoboothProviderProps> = ({ children }) => {
  const [frameLayout, setFrameLayout] = useState<FrameLayout>(1);
  const [selectedFrameId, setSelectedFrameId] = useState<string | null>(null);
  const [selectedLoveInterest, setSelectedLoveInterest] = useState<LoveInterest>('all');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [overlayPosition, setOverlayPosition] = useState<OverlayPosition>('front');
  const [countdownDuration, setCountdownDuration] = useState<CountdownDuration>(3);
  const [customizations, setCustomizations] = useState<Customizations>({
    frameColor: '#FFD6E8',
    photoShape: 'square',
    stickers: [],
    logo: 'none',
    addDate: false,
    addTime: false,
  });

  const addPhoto = (photo: Photo) => {
    setPhotos(prev => {
      const filtered = prev.filter(p => p.slotIndex !== photo.slotIndex);
      return [...filtered, photo];
    });
  };

  const removePhoto = (slotIndex: number) => {
    setPhotos(prev => prev.filter(p => p.slotIndex !== slotIndex));
  };

  const addSticker = (sticker: Omit<Sticker, 'id'>) => {
    const newSticker: Sticker = {
      ...sticker,
      id: `sticker-${Date.now()}-${Math.random()}`,
    };
    setStickers(prev => [...prev, newSticker]);
  };

  const updateSticker = (id: string, updates: Partial<Sticker>) => {
    setStickers(prev =>
      prev.map(sticker => (sticker.id === id ? { ...sticker, ...updates } : sticker))
    );
  };

  const removeSticker = (id: string) => {
    setStickers(prev => prev.filter(sticker => sticker.id !== id));
  };

  const updateCustomizations = (updates: Partial<Customizations>) => {
    setCustomizations(prev => ({ ...prev, ...updates }));
  };

  const clearAll = () => {
    setPhotos([]);
    setStickers([]);
    setCustomizations({
      frameColor: '#FFD6E8',
      photoShape: 'square',
      stickers: [],
      logo: 'none',
      addDate: false,
      addTime: false,
    });
  };

  return (
    <PhotoboothContext.Provider
      value={{
        frameLayout,
        selectedFrameId,
        selectedLoveInterest,
        photos,
        stickers,
        overlayPosition,
        countdownDuration,
        customizations,
        setFrameLayout,
        setSelectedFrameId,
        setSelectedLoveInterest,
        addPhoto,
        removePhoto,
        addSticker,
        updateSticker,
        removeSticker,
        setOverlayPosition,
        setCountdownDuration,
        updateCustomizations,
        clearAll,
      }}
    >
      {children}
    </PhotoboothContext.Provider>
  );
};

