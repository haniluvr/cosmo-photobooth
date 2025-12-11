import React from 'react';
import { usePhotobooth } from '../context/PhotoboothContext';
import html2canvas from 'html2canvas';
import { Download, Printer } from 'lucide-react';

interface SavePrintControlsProps {
  frameRef: React.RefObject<HTMLDivElement>;
}

const SavePrintControls: React.FC<SavePrintControlsProps> = ({ frameRef }) => {
  const { photos, stickers } = usePhotobooth();

  const handleSave = async () => {
    if (!frameRef.current) return;

    try {
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const link = document.createElement('a');
      link.download = `photobooth-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Error saving image:', error);
      alert('Failed to save image. Please try again.');
    }
  };

  const handlePrint = async () => {
    if (!frameRef.current) return;

    try {
      const canvas = await html2canvas(frameRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
        logging: false,
      });

      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print');
        return;
      }

      printWindow.document.write(`
        <html>
          <head>
            <title>Print Photobooth</title>
            <style>
              @media print {
                body { margin: 0; }
                img { width: 100%; height: auto; }
              }
            </style>
          </head>
          <body>
            <img src="${canvas.toDataURL('image/png')}" />
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() {
                  window.close();
                };
              };
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const hasContent = photos.length > 0 || stickers.length > 0;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          disabled={!hasContent}
          className="flex-1 bg-pastel-pink-500 text-white py-3 rounded-lg hover:bg-pastel-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
        >
          <Download className="w-5 h-5" />
          Save Image
        </button>
        <button
          onClick={handlePrint}
          disabled={!hasContent}
          className="flex-1 bg-pastel-purple-500 text-white py-3 rounded-lg hover:bg-pastel-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 font-semibold"
        >
          <Printer className="w-5 h-5" />
          Print
        </button>
      </div>
      {!hasContent && (
        <p className="text-xs text-gray-500 mt-2 text-center">
          Add photos and stickers to enable save/print
        </p>
      )}
    </div>
  );
};

export default SavePrintControls;

