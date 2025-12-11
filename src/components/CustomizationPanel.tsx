import React from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import { PhotoShape } from '../types';
import { Palette, Shapes, Sparkles, Globe } from 'lucide-react';

const frameColors = [
  { name: 'Pink', value: '#FFD6E8' },
  { name: 'Lavender', value: '#E6D5FF' },
  { name: 'Mint', value: '#D5FFE6' },
  { name: 'Peach', value: '#FFE6D5' },
  { name: 'Blue', value: '#D5E6FF' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
];

const patterns = [
  { name: 'Polka Dots', value: 'polka' },
  { name: 'Floral', value: 'floral' },
  { name: 'Plaid', value: 'plaid' },
  { name: 'Marble', value: 'marble' },
  { name: 'Wood', value: 'wood' },
];

const photoShapes: { value: PhotoShape; label: string; icon: string }[] = [
  { value: 'square', label: 'Square', icon: '▢' },
  { value: 'circle', label: 'Circle', icon: '○' },
  { value: 'heart', label: 'Heart', icon: '♥' },
  { value: 'rounded', label: 'Rounded', icon: '▢' },
];

const placeholderStickers = [
  { name: 'Heart', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgODVjLTE1LTE1LTM1LTI1LTM1LTQwIDAtMTAgOC0xOCAxOC0xOCAxMCAwIDE4IDggMTggMTggMCAxMC04IDE4LTE4IDE4eiIgZmlsbD0iI0ZGMDA3NyIvPjwvc3ZnPg==' },
  { name: 'Sparkle', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMTAgMzAgMzAgMTAtMzAgMTAtMTAgMzAtMTAtMzAtMzAtMTAgMzAtMTB6IiBmaWxsPSIjRkZEMDAwIi8+PC9zdmc+' },
  { name: 'Star', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMTAgMzBoMzBsLTI1IDIwIDEwIDMwLTI1LTIwLTI1IDIwIDEwLTMwLTI1LTIwaDMweiIgZmlsbD0iI0ZGRkYwMCIvPjwvc3ZnPg==' },
  { name: 'Flower', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSI1MCIgY3k9IjUwIiByPSIxNSIgZmlsbD0iI0ZGMDBGRiIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEwIiBmaWxsPSIjRkZGRjAwIi8+PGNpcmNsZSBjeD0iNzAiIGN5PSIzMCIgcj0iMTAiIGZpbGw9IiNGRkZGMDAiLz48Y2lyY2xlIGN4PSIzMCIgY3k9IjcwIiByPSIxMCIgZmlsbD0iI0ZGRkYwMCIvPjxjaXJjbGUgY3g9IjcwIiBjeT0iNzAiIHI9IjEwIiBmaWxsPSIjRkZGRjAwIi8+PC9zdmc+' },
  { name: 'Moon', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBjLTIwIDAtMzUgMTUtMzUgMzVzMTUgMzUgMzUgMzVjNSAwIDEwLTEgMTUtMy0xMC0xMC0xNS0yNS0xNS00MHM1LTMwIDE1LTQwYy01LTItMTAtMy0xNS0zeiIgZmlsbD0iI0ZGRkYwMCIvPjwvc3ZnPg==' },
  { name: 'Diamond', url: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNTAgMTBsMjAgMjAtMjAgMjAtMjAtMjB6IiBmaWxsPSIjMDBGRkZGIi8+PC9zdmc+' },
];

const CustomizationPanel: React.FC = () => {
  const { customizations, updateCustomizations, addSticker } = usePhotobooth();

  return (
    <div className="space-y-6">
      {/* Frame Color */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Palette className="w-5 h-5 text-pastel-pink-600" />
          <h3 className="font-semibold text-gray-800">Frame Color</h3>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-3">
          {frameColors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateCustomizations({ frameColor: color.value })}
              className={`aspect-square rounded-lg border-2 transition-all ${
                customizations.frameColor === color.value
                  ? 'border-pastel-pink-500 scale-110'
                  : 'border-gray-300 hover:border-pastel-pink-300'
              }`}
              style={{ backgroundColor: color.value }}
              title={color.name}
            />
          ))}
        </div>
        <div className="grid grid-cols-5 gap-2">
          {patterns.map((pattern) => (
            <button
              key={pattern.value}
              onClick={() => updateCustomizations({ frameColor: pattern.value })}
              className={`aspect-square rounded-lg border-2 bg-gradient-to-br from-pastel-pink-200 to-pastel-lavender-200 ${
                customizations.frameColor === pattern.value
                  ? 'border-pastel-pink-500 scale-110'
                  : 'border-gray-300 hover:border-pastel-pink-300'
              }`}
              title={pattern.name}
            >
              <span className="text-xs text-gray-600">{pattern.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Photo Shape */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Shapes className="w-5 h-5 text-pastel-purple-600" />
          <h3 className="font-semibold text-gray-800">Photo Shape</h3>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {photoShapes.map((shape) => (
            <button
              key={shape.value}
              onClick={() => updateCustomizations({ photoShape: shape.value })}
              className={`p-3 rounded-lg border-2 transition-all ${
                customizations.photoShape === shape.value
                  ? 'border-pastel-purple-500 bg-pastel-purple-100'
                  : 'border-gray-300 hover:border-pastel-purple-300'
              }`}
            >
              <div className="text-2xl mb-1">{shape.icon}</div>
              <div className="text-xs text-gray-600">{shape.label}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Stickers */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-pastel-pink-600" />
          <h3 className="font-semibold text-gray-800">Stickers</h3>
        </div>
        <div className="grid grid-cols-6 gap-2">
          {placeholderStickers.map((sticker, index) => (
            <button
              key={index}
              onClick={() => addSticker({
                imageUrl: sticker.url,
                x: 100,
                y: 100,
                width: 80,
                height: 80,
                rotation: 0,
              })}
              className="aspect-square bg-pastel-pink-100 rounded-lg p-2 hover:bg-pastel-pink-200 transition-colors flex items-center justify-center"
            >
              <img src={sticker.url} alt={sticker.name} className="w-full h-full object-contain" />
            </button>
          ))}
        </div>
      </div>

      {/* Logo/Text Options */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Globe className="w-5 h-5 text-pastel-blue-600" />
          <h3 className="font-semibold text-gray-800">Logo</h3>
        </div>
        <div className="flex gap-2 mb-4">
          {(['ENG', 'KOR', 'CN', 'none'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => updateCustomizations({ logo: lang })}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                customizations.logo === lang
                  ? 'bg-pastel-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {lang === 'none' ? 'None' : lang}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={customizations.addDate}
              onChange={(e) => updateCustomizations({ addDate: e.target.checked })}
              className="w-4 h-4 text-pastel-pink-500 rounded"
            />
            <span className="text-sm text-gray-700">Add Date</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={customizations.addTime}
              onChange={(e) => updateCustomizations({ addTime: e.target.checked })}
              className="w-4 h-4 text-pastel-pink-500 rounded"
            />
            <span className="text-sm text-gray-700">Add Time</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomizationPanel;

