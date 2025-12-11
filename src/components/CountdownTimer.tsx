import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  duration: number;
  onComplete: () => void;
  onCancel?: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ duration, onComplete, onCancel }) => {
  const [count, setCount] = useState(duration);

  useEffect(() => {
    if (count <= 0) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      setCount(count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count, onComplete]);

  if (count <= 0) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="text-9xl font-bold text-white mb-4 animate-pulse">
          {count}
        </div>
        {onCancel && (
          <button
            onClick={onCancel}
            className="text-white hover:text-gray-300 underline"
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
};

export default CountdownTimer;

