import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const getButtonClass = (isActive: boolean) => 
    `flex-1 flex flex-col items-center justify-center gap-1 transition-colors py-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 max-w-md mx-auto pb-safe">
      <div className="flex items-center justify-around pt-2 pb-1">
        <button 
          className={getButtonClass(currentScreen === Screen.HOME)}
          onClick={() => onNavigate(Screen.HOME)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.HOME ? 'filled' : ''}`}>home</span>
          <span className="text-[11px] font-medium">Главная</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.MAP)}
          onClick={() => onNavigate(Screen.MAP)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.MAP ? 'filled' : ''}`}>map</span>
          <span className="text-[11px] font-medium">Карта</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.FAVORITES)}
          onClick={() => onNavigate(Screen.FAVORITES)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.FAVORITES ? 'filled' : ''}`}>bookmark</span>
          <span className="text-[11px] font-medium">Избранное</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.PROFILE)}
          onClick={() => onNavigate(Screen.PROFILE)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.PROFILE ? 'filled' : ''}`}>person</span>
          <span className="text-[11px] font-medium">Профиль</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;