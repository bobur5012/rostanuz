import React from 'react';
import { Place, Screen } from '../types';

interface FavoritesProps {
  onNavigate: (screen: Screen, params?: any) => void;
  places: Place[];
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
}

const Favorites: React.FC<FavoritesProps> = ({ onNavigate, places, favorites, onToggleFavorite }) => {
  
  if (places.length === 0) {
      return (
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24 animate-fade-in">
           <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 pt-safe">
            <div className="flex items-center justify-center h-14 relative">
                <h1 className="text-lg font-bold">Избранное</h1>
            </div>
           </header>
           <div className="flex-1 flex flex-col items-center justify-center p-8 text-center -mt-20">
               <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-6">
                   <span className="material-symbols-outlined text-slate-300 dark:text-slate-600 text-[48px] filled">bookmark</span>
               </div>
               <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Здесь пока пусто</h2>
               <p className="text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                   Добавляйте любимые места в закладки, чтобы они всегда были под рукой.
               </p>
               <button 
                 onClick={() => onNavigate(Screen.HOME)}
                 className="mt-8 px-6 py-3 bg-primary text-white rounded-xl font-medium shadow-lg shadow-primary/20 active:scale-95 transition-transform"
               >
                   Найти места
               </button>
           </div>
        </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark pb-24">
      <header className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 pt-safe">
        <div className="flex items-center justify-center h-14 relative">
            <h1 className="text-lg font-bold">Избранное</h1>
        </div>
      </header>

      <div className="flex flex-col gap-4 p-5 animate-slide-up">
        {places.map((place) => (
          <div 
            key={place.id}
            onClick={() => onNavigate(Screen.PLACE_DETAILS, place)}
            className="group relative flex gap-4 p-3 bg-white dark:bg-slate-800 rounded-[20px] shadow-soft hover:shadow-lg transition-all ring-1 ring-slate-900/5 dark:ring-white/5 active:scale-[0.99] cursor-pointer"
          >
            <div 
              className="w-24 h-24 shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 bg-center bg-cover shadow-inner relative overflow-hidden" 
              style={{ backgroundImage: `url("${place.image}")` }}
            >
            </div>
            
            <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
              <div>
                <div className="flex justify-between items-start gap-2">
                  <h2 className="text-[16px] font-bold leading-tight text-slate-900 dark:text-white truncate pr-6">{place.name}</h2>
                </div>
                <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">{place.address}</p>
                <span className="text-[11px] text-primary mt-1 inline-block font-medium bg-primary/10 px-2 py-0.5 rounded-md">{place.category}</span>
              </div>
              
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-amber-400 filled">star</span>
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-300">{place.rating}</span>
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 ml-1">({place.reviewsCount})</span>
                </div>
                <button 
                  onClick={(e) => onToggleFavorite(e, place.id)}
                  className="text-primary transition-colors p-1 -mr-2"
                >
                  <span className="material-symbols-outlined text-[24px] filled">bookmark</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;