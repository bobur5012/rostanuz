import React from 'react';
import { CURRENT_USER } from '../constants'; // Keeping for fallback or structure
import { Screen } from '../types';

interface ProfileProps {
  onBack: () => void;
  onNavigate: (screen: Screen) => void;
  myReviewsCount: number;
  myPlacesCount: number;
  isAvatarVisible: boolean;
  onToggleAvatar: () => void;
  isUsernameVisible: boolean;
  onToggleUsername: () => void;
}

// NOTE: In App.tsx, we control who is logged in. 
// We are accessing the global user via a context or props in a real app.
// Here we assume App.tsx passes the logic, but for display, 
// we need to access the stored user from localStorage or the passed prop.
// Since I didn't update the Props to include 'user' object explicitly 
// to avoid breaking all signatures, I will read from localStorage for display 
// inside the component if needed, or rely on App.tsx rendering.
// However, strictly following the request, App.tsx now handles the "User" state.
// Let's grab the user from localStorage for rendering here to be consistent.

const Profile: React.FC<ProfileProps> = ({ 
    onBack, 
    onNavigate, 
    myReviewsCount, 
    myPlacesCount, 
    isAvatarVisible, 
    onToggleAvatar,
    isUsernameVisible,
    onToggleUsername
}) => {

  const storedUser = localStorage.getItem('rostan_user');
  const user = storedUser ? JSON.parse(storedUser) : CURRENT_USER;

  // Handle logout specifically
  const handleLogout = () => {
      localStorage.removeItem('rostan_user');
      window.location.reload(); // Simple reload to reset state to Login screen
  };

  return (
    <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-white min-h-screen flex flex-col antialiased max-w-md mx-auto pb-24 relative">
        <div className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 pt-safe">
            <div className="flex items-center justify-between px-4 h-14">
                <button 
                  onClick={onBack}
                  className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
                >
                    <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
                </button>
                <h1 className="text-lg font-bold text-center flex-1 pr-10 truncate">Мой профиль</h1>
                <div className="size-10"></div>
            </div>
        </div>
        
        <main className="flex-1 overflow-y-auto pb-6">
            <div className="flex flex-col items-center pt-8 pb-8 px-4">
                <div className="relative">
                    <div className="size-28 rounded-full ring-4 ring-white dark:ring-surface-dark shadow-xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
                        {isAvatarVisible ? (
                            <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                        ) : (
                            <span className="material-symbols-outlined text-slate-400 dark:text-slate-500 text-[64px]">account_circle</span>
                        )}
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
                    <div className={`flex items-center justify-center gap-1 mt-1 transition-all duration-300 ${isUsernameVisible ? 'opacity-100' : 'opacity-40'}`}>
                        <span className="material-symbols-outlined text-primary text-[18px]">chat</span>
                        <p className="text-primary font-medium text-base">
                            {isUsernameVisible ? user.username : 'Скрыто'}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="px-4 w-full mx-auto">
                <div className="bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/50">
                    <button 
                        onClick={() => onNavigate(Screen.MY_REVIEWS)}
                        className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors group border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">star</span>
                            </div>
                            <div className="flex flex-col items-start truncate">
                                <span className="text-base font-medium text-slate-900 dark:text-white truncate">Мои отзывы</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{myReviewsCount > 0 ? myReviewsCount : user.reviewsCount} отзывов</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
                    </button>
                    
                    <button 
                        onClick={() => onNavigate(Screen.MY_PLACES)}
                        className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors group border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">map</span>
                            </div>
                            <div className="flex flex-col items-start truncate">
                                <span className="text-base font-medium text-slate-900 dark:text-white truncate">Добавленные заведения</span>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{myPlacesCount > 0 ? myPlacesCount : user.placesCount} места</span>
                            </div>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600">chevron_right</span>
                    </button>
                    
                    {/* Username Privacy Toggle */}
                    <div className="w-full flex items-start justify-between p-4 border-b border-slate-100 dark:border-slate-700/50 last:border-0">
                        <div className="flex gap-4 overflow-hidden flex-1 mr-2">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-blue-500/10 text-blue-500 mt-0.5">
                                <span className="material-symbols-outlined">visibility</span>
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                                <span className="text-base font-medium text-slate-900 dark:text-white truncate w-full">Никнейм Telegram</span>
                                <span className="text-[11px] leading-snug text-slate-400 dark:text-slate-500 mt-0.5">
                                    Если скрыть, в отзывах будет отображаться только Имя и Фамилия
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={onToggleUsername}
                            className={`shrink-0 w-12 h-7 rounded-full transition-colors relative mt-2 ${isUsernameVisible ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-sm transition-transform ${isUsernameVisible ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>

                    {/* Avatar Visibility Toggle */}
                    <div className="w-full flex items-start justify-between p-4">
                        <div className="flex gap-4 overflow-hidden flex-1 mr-2">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-purple-500/10 text-purple-500 mt-0.5">
                                <span className="material-symbols-outlined">face</span>
                            </div>
                            <div className="flex flex-col items-start min-w-0">
                                <span className="text-base font-medium text-slate-900 dark:text-white truncate w-full">Фото профиля</span>
                                <span className="text-[11px] leading-snug text-slate-400 dark:text-slate-500 mt-0.5">
                                    Если скрыть, другие пользователи увидят иконку вместо вашего фото
                                </span>
                            </div>
                        </div>
                        
                        <button 
                            onClick={onToggleAvatar}
                            className={`shrink-0 w-12 h-7 rounded-full transition-colors relative mt-2 ${isAvatarVisible ? 'bg-primary' : 'bg-slate-200 dark:bg-slate-700'}`}
                        >
                            <div className={`absolute top-1 left-1 size-5 bg-white rounded-full shadow-sm transition-transform ${isAvatarVisible ? 'translate-x-5' : 'translate-x-0'}`}></div>
                        </button>
                    </div>
                </div>

                <div className="mt-6 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/50">
                    <button 
                        onClick={() => onNavigate(Screen.PRIVACY_POLICY)}
                        className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors group border-b border-slate-100 dark:border-slate-700/50 last:border-0"
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">policy</span>
                            </div>
                            <span className="text-base font-medium text-slate-900 dark:text-white truncate">Политика конфиденциальности</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[24px]">chevron_right</span>
                    </button>

                    <a 
                        href="https://t.me/botiroffdes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-between p-4 active:bg-slate-50 dark:active:bg-slate-800/50 transition-colors group"
                    >
                        <div className="flex items-center gap-4 overflow-hidden">
                            <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-sky-500/10 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                                <span className="material-symbols-outlined">support_agent</span>
                            </div>
                            <span className="text-base font-medium text-slate-900 dark:text-white truncate">Техническая поддержка</span>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[20px]">open_in_new</span>
                    </a>
                </div>
                
                <div className="mt-6 bg-surface-light dark:bg-surface-dark rounded-2xl shadow-sm overflow-hidden border border-slate-100 dark:border-slate-800/50">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-start gap-4 p-4 active:bg-red-50 dark:active:bg-red-900/10 transition-colors group"
                    >
                        <div className="flex items-center justify-center shrink-0 size-10 rounded-full bg-red-50 dark:bg-red-900/20 text-red-500 group-hover:bg-red-100 dark:group-hover:bg-red-900/30 transition-colors">
                            <span className="material-symbols-outlined">logout</span>
                        </div>
                        <span className="text-base font-medium text-red-500">Выйти</span>
                    </button>
                </div>
                
                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400 dark:text-slate-600">Версия приложения 1.1.0</p>
                </div>
            </div>
        </main>
    </div>
  );
};

export default Profile;