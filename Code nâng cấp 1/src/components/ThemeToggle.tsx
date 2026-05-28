import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  showLabel?: boolean;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '', showLabel = false }) => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`group relative flex items-center gap-2 p-2 rounded-xl transition-all duration-300 
        ${isDark 
          ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' 
          : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        } ${className}`}
      title={isDark ? 'Chuyển sang chế độ sáng' : 'Chuyển sang chế độ tối'}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <div className="relative w-5 h-5">
        <Sun 
          size={20} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-0 rotate-90 scale-0' : 'opacity-100 rotate-0 scale-100'
          }`} 
        />
        <Moon 
          size={20} 
          className={`absolute inset-0 transition-all duration-300 ${
            isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0'
          }`} 
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium">
          {isDark ? 'Tối' : 'Sáng'}
        </span>
      )}
      
      {/* Tooltip */}
      <div className={`absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded text-[10px] whitespace-nowrap
        opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50
        ${isDark ? 'bg-slate-600 text-white' : 'bg-gray-800 text-white'}`}>
        {isDark ? 'Chế độ sáng' : 'Chế độ tối'}
      </div>
    </button>
  );
};

export default ThemeToggle;
