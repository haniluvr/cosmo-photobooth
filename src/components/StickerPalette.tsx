import React from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import { Sparkles } from 'lucide-react';

// Placeholder sticker URLs - in production, these would be actual sticker images
const placeholderStickers = [
  { name: 'Heart', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgODVjLTE1LTE1LTM1LTI1LTM1LTQwIDAtMTAgOC0xOCAxOC0xOCAxMCAwIDE4IDggMTggMTggMCAxMC04IDE4LTE4IDE4eiIgZmlsbD0iI0ZGMDA3NyIvPjwvc3ZnPg==' },
  { name: 'Sparkle', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMTAgMzAgMzAgMTAtMzAgMTAtMTAgMzAtMTAtMzAtMzAtMTAgMzAtMTB6IiBmaWxsPSIjRkZEMDAwIi8+PC9zdmc+' },
  { name: 'Star', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMTAgMzBoMzBsLTI1IDIwIDEwIDMwLTI1LTIwLTI1IDIwIDEwLTMwLTI1LTIwaDMweiIgZmlsbD0iI0ZGRkYwMCIvPjwvc3ZnPg==' },
  { name: 'Flower', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNSIgZmlsbD0iI0ZGMDBGRiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjRkZGRjAwIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSIzMCIgcj0iMTAiIGZpbGw9IiNGRkZGMDAiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjcwIiByPSIxMCIgZmlsbD0iI0ZGRkYwMCIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNzAiIHI9IjEwIiBmaWxsPSIjRkZGRjAwIi8+PC9zdmc+' },
  { name: 'Moon', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBjLTIwIDAtMzUgMTUtMzUgMzVzMTUgMzUgMzUgMzVjNSAwIDEwLTEgMTUtMy0xMC0xMC0xNS0yNS0xNS00MHM1LTMwIDE1LTQwYy01LTItMTAtMy0xNS0zeiIgZmlsbD0iI0ZGRkYwMCIvPjwvc3ZnPg==' },
  { name: 'Diamond', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMjAgMjAtMjAgMjAtMjAtMjB6IiBmaWxsPSIjMDBGRkZGIi8+PC9zdmc+' },
];

const StickerPalette: React.FC = () => {
  const { addSticker } = usePhotobooth();

  const handleStickerClick = (stickerUrl: string) => {
    addSticker({
      imageUrl: stickerUrl,
      x: 100,
      y: 100,
      width: 80,
      height: 80,
      rotation: 0,
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-pastel-purple-600" />
        <h2 className="text-xl font-semibold text-gray-800">Stickers</h2>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {placeholderStickers.map((sticker, index) => (
          <button
            key={index}
            onClick={() => handleStickerClick(sticker.url)}
            className="aspect-square bg-pastel-purple-100 rounded-lg p-3 hover:bg-pastel-purple-200 hover:scale-105 transition-all duration-300 flex items-center justify-center"
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-full h-full object-contain"
            />
          </button>
        ))}
      </div>
      <p className="text-xs text-gray-500 mt-3 text-center">
        Click a sticker to add it to your frame
      </p>
    </div>
  );
};

export default StickerPalette;

