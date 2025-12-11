# Photobooth App

A cute, aesthetic photobooth web application for otome game fans! Create beautiful photo memories with your favorite love interests.

## Features

- **Frame Selection**: Choose from 1-5 photo frame layouts
- **Love Interest Filter**: Select from All, Xavier, Zayne, Rafayel, Sylus, or Caleb
- **Camera Integration**: Take photos with your camera with optional character overlays
- **Overlay Positioning**: Choose to place characters in front or behind you
- **Drag & Drop**: Easily add photos to frames by clicking or dragging
- **Stickers**: Add, drag, resize, and rotate decorative stickers
- **Save & Print**: Export your creations as images or print them

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Adding Your Assets

### Frame Images
Place your frame images in `src/assets/frames/`:
- `frame-1.png` - Single photo frame
- `frame-2.png` - Two photo frame
- `frame-3.png` - Three photo frame
- `frame-4.png` - Four photo frame
- `frame-5.png` - Five photo frame

### Character Overlays
Place character PNG overlays in `src/assets/characters/`:
- `xavier.png`
- `zayne.png`
- `rafayel.png`
- `sylus.png`
- `caleb.png`

### Stickers
Place sticker images in `src/assets/stickers/` and update `StickerPalette.tsx` to reference them.

## Technology Stack

- React 18 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- react-rnd for draggable/resizable stickers
- html2canvas for image export

## Browser Compatibility

Requires a modern browser with:
- Camera access (getUserMedia API)
- Canvas API support
- ES6+ JavaScript support

## License

MIT

