import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Camera } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'home' },
    { path: '/choose-layout', label: 'choose layout' },
  ];

  return (
    <header className="bg-white/80 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-md mb-6">
      <div className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <Camera className="w-6 h-6 text-pastel-pink-500" />
          photobooth
        </Link>
        
        <nav className="flex gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded-lg transition-colors ${
                location.pathname === link.path
                  ? 'bg-pastel-pink-500 text-white'
                  : 'text-gray-600 hover:text-pastel-pink-500'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;

