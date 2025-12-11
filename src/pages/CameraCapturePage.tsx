import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCamera } from '../hooks/useCamera';
import { usePhotobooth } from '../context/PhotoboothContext';
import CountdownTimer from '../components/CountdownTimer';
import OverlaySelector from '../components/OverlaySelector';
import { Camera, Check, X, Maximize2 } from 'lucide-react';

const CameraCapturePage: React.FC = () => {
  const { frameId } = useParams<{ frameId: string }>();
  const navigate = useNavigate();
  const { videoRef, startCamera, stopCamera, capturePhoto, error, isLoading } = useCamera();
  const { frameLayout, photos, addPhoto, removePhoto, selectedLoveInterest, overlayPosition, countdownDuration, setCountdownDuration } = usePhotobooth();
  const [overlayImage, setOverlayImage] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (selectedLoveInterest !== 'all') {
      const img = new Image();
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
        setOverlayImage(null);
      };
    } else {
      setOverlayImage(null);
    }
  }, [selectedLoveInterest]);

  const handleCapture = () => {
    setShowCountdown(true);
  };

  const handleCountdownComplete = () => {
    setShowCountdown(false);
    setIsCapturing(true);
    
    setTimeout(() => {
      const photoUrl = capturePhoto();
      if (photoUrl) {
        const nextSlot = photos.length;
        if (nextSlot < frameLayout) {
          let finalPhotoUrl = photoUrl;
          
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
                  finalPhotoUrl = canvas.toDataURL('image/png');
                  addPhoto({
                    id: `photo-${Date.now()}-${nextSlot}`,
                    url: finalPhotoUrl,
                    slotIndex: nextSlot,
                  });
                  setIsCapturing(false);
                };
              };
            }
          } else {
            addPhoto({
              id: `photo-${Date.now()}-${nextSlot}`,
              url: finalPhotoUrl,
              slotIndex: nextSlot,
            });
            setIsCapturing(false);
          }
        }
      }
    }, 100);
  };

  const handleRetake = (slotIndex: number) => {
    removePhoto(slotIndex);
  };

  const handleDone = () => {
    if (photos.length === frameLayout) {
      navigate('/customize');
    }
  };

  const allPhotosTaken = photos.length === frameLayout;

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-md">
          <div className="text-red-500 mb-4">{error}</div>
          <button
            onClick={() => navigate('/choose-layout')}
            className="w-full bg-pastel-pink-500 text-white py-2 rounded-lg hover:bg-pastel-pink-600"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-pink-100 via-pastel-lavender-100 to-pastel-mint-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Photo {photos.length}/{frameLayout}
            </h2>
            <select
              value={countdownDuration}
              onChange={(e) => setCountdownDuration(Number(e.target.value) as 3 | 5 | 10)}
              className="px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-pastel-pink-500 outline-none"
            >
              <option value={3}>3s</option>
              <option value={5}>5s</option>
              <option value={10}>10s</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
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
                <button className="absolute bottom-4 right-4 bg-white/80 rounded-full p-2 z-50 hover:bg-white">
                  <Maximize2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCapture}
                  disabled={isCapturing || allPhotosTaken}
                  className="flex-1 bg-pastel-pink-500 text-white py-3 rounded-lg hover:bg-pastel-pink-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 font-semibold"
                >
                  <Camera className="w-5 h-5" />
                  {allPhotosTaken ? 'All Photos Taken' : 'START'}
                </button>
                {allPhotosTaken && (
                  <button
                    onClick={handleDone}
                    className="flex-1 bg-pastel-purple-500 text-white py-3 rounded-lg hover:bg-pastel-purple-600 flex items-center justify-center gap-2 font-semibold"
                  >
                    <Check className="w-5 h-5" />
                    DONE
                  </button>
                )}
              </div>
            </div>

            <OverlaySelector />
          </div>

          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Photo Previews</h3>
            {Array.from({ length: frameLayout }).map((_, index) => {
              const photo = photos.find(p => p.slotIndex === index);
              return (
                <div
                  key={index}
                  className="relative aspect-[3/4] bg-gradient-to-br from-pastel-pink-100 to-pastel-lavender-100 rounded-lg overflow-hidden"
                >
                  {photo ? (
                    <>
                      <img
                        src={photo.url}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleRetake(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <Camera className="w-8 h-8 mx-auto mb-2" />
                        <span className="text-sm">Slot {index + 1}</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {showCountdown && (
        <CountdownTimer
          duration={countdownDuration}
          onComplete={handleCountdownComplete}
          onCancel={() => setShowCountdown(false)}
        />
      )}
    </div>
  );
};

export default CameraCapturePage;

