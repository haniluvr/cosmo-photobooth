import React, { useState, useEffect } from 'react';
import { useCamera } from '../hooks/useCamera';
import { usePhotobooth } from '../context/PhotoboothContext';
import { Camera, X, RotateCcw, Check } from 'lucide-react';

interface CameraCaptureProps {
  slotIndex: number;
  onClose: () => void;
  onCapture: (photoUrl: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ slotIndex, onClose, onCapture }) => {
  const { videoRef, startCamera, stopCamera, capturePhoto, error, isLoading } = useCamera();
  const { selectedLoveInterest, overlayPosition, setOverlayPosition } = usePhotobooth();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [overlayImage, setOverlayImage] = useState<string | null>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Load character overlay image if not 'all'
    if (selectedLoveInterest !== 'all') {
      const img = new Image();
      // Try both public and src paths
      img.src = `/src/assets/characters/${selectedLoveInterest}.png`;
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          setOverlayImage(canvas.toDataURL());
        }
      };
      img.onerror = () => {
        // Placeholder if image doesn't exist - create a simple placeholder
        const placeholder = document.createElement('canvas');
        placeholder.width = 400;
        placeholder.height = 600;
        const ctx = placeholder.getContext('2d');
        if (ctx) {
          ctx.fillStyle = 'rgba(255, 182, 193, 0.3)';
          ctx.fillRect(0, 0, 400, 600);
          ctx.fillStyle = '#FFB6C1';
          ctx.font = '48px Arial';
          ctx.textAlign = 'center';
          ctx.fillText(selectedLoveInterest.toUpperCase(), 200, 300);
        }
        setOverlayImage(placeholder.toDataURL());
      };
    } else {
      setOverlayImage(null);
    }
  }, [selectedLoveInterest]);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;
    let animationFrameId: number;

    const drawFrame = () => {
      if (!video.videoWidth || !video.videoHeight) {
        animationFrameId = requestAnimationFrame(drawFrame);
        return;
      }

      // The overlay will be handled via CSS positioning instead
      animationFrameId = requestAnimationFrame(drawFrame);
    };

    drawFrame();
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [videoRef]);

  const handleCapture = () => {
    const photoUrl = capturePhoto();
    if (photoUrl) {
      // Composite with overlay if needed
      if (overlayImage && videoRef.current) {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        if (ctx && videoRef.current) {
          const video = videoRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const img = new Image();
          img.src = photoUrl;
          img.onload = () => {
            const overlayImg = new Image();
            overlayImg.src = overlayImage;
            overlayImg.onload = () => {
              if (overlayPosition === 'behind') {
                ctx.globalAlpha = 0.7;
                ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1.0;
                ctx.drawImage(img, 0, 0);
              } else {
                ctx.drawImage(img, 0, 0);
                ctx.globalAlpha = 0.8;
                ctx.drawImage(overlayImg, 0, 0, canvas.width, canvas.height);
                ctx.globalAlpha = 1.0;
              }
              const finalImage = canvas.toDataURL('image/png');
              setCapturedImage(finalImage);
            };
          };
        }
      } else {
        setCapturedImage(photoUrl);
      }
    }
  };

  const handleConfirm = () => {
    if (capturedImage) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    startCamera();
  };

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={onClose}
            className="w-full bg-pastel-pink-500 text-white py-2 rounded-lg hover:bg-pastel-pink-600"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 max-w-4xl w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          Capture Photo for Slot {slotIndex + 1}
        </h2>

        {capturedImage ? (
          <div className="space-y-4">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img src={capturedImage} alt="Captured" className="w-full h-auto" />
            </div>
            <div className="flex gap-3">
              <button
                onClick={handleRetake}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 flex items-center justify-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                Retake
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 bg-pastel-pink-500 text-white py-3 rounded-lg hover:bg-pastel-pink-600 flex items-center justify-center gap-2"
              >
                <Check className="w-5 h-5" />
                Use This Photo
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedLoveInterest !== 'all' && (
              <div className="flex items-center justify-center gap-4 bg-pastel-lavender-100 p-4 rounded-lg">
                <span className="text-gray-700 font-medium">Overlay Position:</span>
                <button
                  onClick={() => setOverlayPosition(overlayPosition === 'front' ? 'behind' : 'front')}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    overlayPosition === 'front'
                      ? 'bg-pastel-purple-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {overlayPosition === 'front' ? 'Front' : 'Behind'}
                </button>
              </div>
            )}

            <div className="relative bg-gray-900 rounded-lg overflow-hidden aspect-video">
              {overlayPosition === 'behind' && overlayImage && (
                <img
                  src={overlayImage}
                  alt="Character overlay"
                  className="absolute inset-0 w-full h-full object-contain z-10 opacity-70"
                  style={{ transform: 'scaleX(-1)' }}
                />
              )}
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover relative z-20"
                style={{ transform: 'scaleX(-1)' }}
              />
              {overlayPosition === 'front' && overlayImage && (
                <img
                  src={overlayImage}
                  alt="Character overlay"
                  className="absolute inset-0 w-full h-full object-contain z-30 opacity-80 pointer-events-none"
                  style={{ transform: 'scaleX(-1)' }}
                />
              )}
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-40">
                  <div className="text-white">Loading camera...</div>
                </div>
              )}
            </div>

            <button
              onClick={handleCapture}
              disabled={isLoading}
              className="w-full bg-pastel-pink-500 text-white py-4 rounded-lg hover:bg-pastel-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg font-semibold"
            >
              <Camera className="w-6 h-6" />
              Capture Photo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CameraCapture;

