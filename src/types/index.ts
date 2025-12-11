export type LoveInterest = 'all' | 'xavier' | 'zayne' | 'rafayel' | 'sylus' | 'caleb';

export type FrameLayout = 1 | 2 | 3 | 4 | 5;

export type OverlayPosition = 'front' | 'behind';

export interface Photo {
  id: string;
  url: string;
  slotIndex: number;
}

export interface Sticker {
  id: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

export type CountdownDuration = 3 | 5 | 10;

export type PhotoShape = 'square' | 'circle' | 'heart' | 'rounded';

export interface Customizations {
  frameColor: string;
  photoShape: PhotoShape;
  stickers: Sticker[];
  logo: 'ENG' | 'KOR' | 'CN' | 'none';
  addDate: boolean;
  addTime: boolean;
}

export interface PhotoboothState {
  frameLayout: FrameLayout;
  selectedFrameId: string | null;
  selectedLoveInterest: LoveInterest;
  photos: Photo[];
  stickers: Sticker[];
  overlayPosition: OverlayPosition;
  countdownDuration: CountdownDuration;
  customizations: Customizations;
}

