import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePhotobooth } from '../context/PhotoboothContext';
import PhotoStrip from '../components/Layout/PhotoStrip';
import CustomizationPanel from '../components/CustomizationPanel';
import SavePrintControls from '../components/SavePrintControls';
import { RotateCcw, Printer, Share2, Download, Film } from 'lucide-react';
import html2canvas from 'html2canvas';

const CustomizePage: React.FC = () => {
  const navigate = useNavigate();
  const { photos, frameLayout, selectedFrameId, clearAll } = usePhotobooth();
  const stripRef = useRef<HTMLDivElement>(null);

  const handleRetake = () => {
    if (selectedFrameId) {
      navigate(`/camera/${selectedFrameId}`);
    } else {
      navigate('/choose-layout');
    }
  };

  const handlePrint = async () => {
    if (!stripRef.current) return;
    try {
      const canvas = await html2canvas(stripRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        alert('Please allow popups to print');
        return;
      }
      printWindow.document.write(`
        <html>
          <head><title>Print Photobooth</title></head>
          <body style="margin:0;display:flex;justify-content:center;align-items:center;min-height:100vh;">
            <img src="${canvas.toDataURL('image/png')}" style="max-width:100%;height:auto;" />
            <script>window.onload=function(){window.print();window.onafterprint=function(){window.close();};}</script>
          </body>
        </html>
      `);
      printWindow.document.close();
    } catch (error) {
      console.error('Error printing:', error);
      alert('Failed to print. Please try again.');
    }
  };

  const handleShare = async () => {
    if (!stripRef.current) return;
    try {
      const canvas = await html2canvas(stripRef.current, {
        backgroundColor: '#ffffff',
        scale: 2,
        useCORS: true,
      });
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => resolve(blob!), 'image/png');
      });
      if (navigator.share) {
        await navigator.share({
          title: 'My Photobooth Photo',
          files: [new File([blob], 'photobooth.png', { type: 'image/png' })],
        });
      } else {
        alert('Sharing is not supported on this device');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleDownload = async () => {
    if (!stripRef.current) return;
    try {
      const canvas = await html2canvas(stripRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
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

  const handleDownloadGIF = () => {
    alert('GIF download feature coming soon!');
  };

  if (photos.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 text-center">
          <p className="text-gray-600 mb-4">No photos to customize. Please take photos first.</p>
          <button
            onClick={() => navigate('/choose-layout')}
            className="bg-pastel-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pastel-pink-600"
          >
            Go to Frame Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          customize your photo
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Photo Strip Preview */}
          <div className="lg:col-span-1 flex justify-center">
            <PhotoStrip stripRef={stripRef} />
          </div>

          {/* Customization Panel */}
          <div className="lg:col-span-2">
            <CustomizationPanel />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <button
            onClick={handleRetake}
            className="px-6 py-3 bg-white border-2 border-pastel-pink-500 text-pastel-pink-500 rounded-lg hover:bg-pastel-pink-50 font-semibold flex items-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Retake
          </button>
          <button
            onClick={handlePrint}
            className="px-6 py-3 bg-white border-2 border-pastel-pink-500 text-pastel-pink-500 rounded-lg hover:bg-pastel-pink-50 font-semibold flex items-center gap-2"
          >
            <Printer className="w-5 h-5" />
            Print
          </button>
          <button
            onClick={handleShare}
            className="px-6 py-3 bg-white border-2 border-pastel-pink-500 text-pastel-pink-500 rounded-lg hover:bg-pastel-pink-50 font-semibold flex items-center gap-2"
          >
            <Share2 className="w-5 h-5" />
            Share
          </button>
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-white border-2 border-pastel-pink-500 text-pastel-pink-500 rounded-lg hover:bg-pastel-pink-50 font-semibold flex items-center gap-2"
          >
            <Download className="w-5 h-5" />
            Download
          </button>
          <button
            onClick={handleDownloadGIF}
            className="px-6 py-3 bg-white border-2 border-pastel-pink-500 text-pastel-pink-500 rounded-lg hover:bg-pastel-pink-50 font-semibold flex items-center gap-2"
          >
            <Film className="w-5 h-5" />
            Download GIF
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;

