import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PhotoboothProvider } from './context/PhotoboothContext';
import HomePage from './pages/HomePage';
import FrameSelectionPage from './pages/FrameSelectionPage';
import CameraCapturePage from './pages/CameraCapturePage';
import CustomizePage from './pages/CustomizePage';

function App() {
  return (
    <PhotoboothProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/choose-layout" element={<FrameSelectionPage />} />
          <Route path="/camera/:frameId" element={<CameraCapturePage />} />
          <Route path="/customize" element={<CustomizePage />} />
        </Routes>
      </BrowserRouter>
    </PhotoboothProvider>
  );
}

export default App;
