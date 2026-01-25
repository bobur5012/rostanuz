import React from 'react';
import { Place, Screen } from '../types';

interface PlaceDetailsProps {
  place: Place;
  onNavigate: (screen: Screen, params?: any) => void;
  isFavorite: boolean;
  onToggleFavorite: (e: React.MouseEvent) => void;
}

const PlaceDetails: React.FC<PlaceDetailsProps> = ({ place, onNavigate, isFavorite, onToggleFavorite }) => {
  return (
    <div className="relative flex h-auto min-h-screen w-full flex-col max-w-md mx-auto bg-background-light dark:bg-background-dark overflow-hidden animate-fade-in">
      {/* Hero Image */}
      <div className="relative w-full h-80 shrink-0">
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between p-4 pt-safe bg-gradient-to-b from-black/60 to-transparent">
          <button 
            onClick={() => onNavigate(Screen.HOME)}
            className="flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors mt-2"
          >
            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>arrow_back</span>
          </button>
          <div className="flex gap-3 mt-2">
            <button className="flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-md text-white hover:bg-white/30 transition-colors">
              <span className="material-symbols-outlined" style={{fontSize: '24px'}}>ios_share</span>
            </button>
            <button 
              onClick={onToggleFavorite}
              className={`flex items-center justify-center size-10 rounded-full bg-white/20 backdrop-blur-md transition-colors hover:bg-white/30 ${isFavorite ? 'text-primary' : 'text-white'}`}
            >
              <span className={`material-symbols-outlined ${isFavorite ? 'filled' : ''}`} style={{fontSize: '24px'}}>bookmark</span>
            </button>
          </div>
        </div>
        <div 
          className="w-full h-full bg-center bg-no-repeat bg-cover" 
          style={{ backgroundImage: `url("${place.image}")` }}
        ></div>
      </div>

      {/* Content */}
      <div className="relative -mt-6 z-10 flex flex-col flex-1 rounded-t-3xl bg-background-light dark:bg-background-dark px-5 pt-8 pb-10 gap-6">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white leading-tight">{place.name}</h1>
            <div className="flex h-7 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 mt-1">
              <span className="text-primary text-xs font-semibold uppercase tracking-wide">{place.category}</span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-amber-400 filled">star</span>
              <span className="text-slate-900 dark:text-white font-bold text-base">{place.rating > 0 ? place.rating : 'Нет оценок'}</span>
              <span className="text-slate-500 dark:text-slate-400 text-sm">({place.reviewsCount} отзывов)</span>
              <span className="mx-1 text-slate-300 dark:text-slate-600">•</span>
              <button onClick={() => onNavigate(Screen.REVIEWS_LIST)} className="text-primary text-sm font-medium">Смотреть все</button>
            </div>
            <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
              <span className="material-symbols-outlined text-slate-400 dark:text-slate-500" style={{fontSize: '20px'}}>location_on</span>
              <p className="text-sm font-medium truncate">{place.address}, {place.city}</p>
            </div>
          </div>
        </div>

        <button 
          onClick={() => onNavigate(Screen.ADD_REVIEW, place.id)}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-sky-400 text-white font-semibold h-12 rounded-xl transition-all shadow-lg shadow-primary/25 active:scale-[0.98]"
        >
          <span className="material-symbols-outlined" style={{fontSize: '20px'}}>edit</span>
          <span>Оставить отзыв</span>
        </button>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>

        <div className="flex flex-col gap-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">О месте</h2>
          <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
            {place.description || "Описание отсутствует."}
          </p>
        </div>

        {/* Map Preview */}
        <div className="w-full h-32 rounded-xl overflow-hidden relative group cursor-pointer" onClick={() => onNavigate(Screen.MAP)}>
          <div 
            className="absolute inset-0 bg-cover bg-center" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDTFd11LJcyYDBIXl_R52E5bOFLz8uW8_Fepmf59Fk2DO6IlQOp0ks1kdUp2DN2S8R5lbzn6spbP3jSKs75uID8UnIdJ-tVaoPvInVaIhhsepAtTuGH0DTlaZZ7Tq39pKOIP-4Br47irYGWaoeBDdzYe_vniWxvaMnhkOvEsyGaGPmMwZPS2f93PKq4e88hbD399L5K92WBQgNLccKDIr4Sc5RmCynGzQ0Yw9snLDopQGEeCUSuNZgqHTkwrgK4VPjOv2UktFgpFVnF')" }}
          ></div>
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-lg shadow-sm flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">map</span>
              <span className="text-xs font-bold text-slate-900 dark:text-white">Открыть на карте</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-slate-200 dark:bg-slate-700/50"></div>

        {/* Reviews Preview */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Отзывы</h2>
          </div>
          
          <div className="flex flex-col gap-4">
             {place.reviews && place.reviews.length > 0 ? place.reviews.slice(0, 2).map(review => (
               <div key={review.id} className="flex flex-col p-4 bg-surface-light dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-full bg-slate-200 overflow-hidden shrink-0 ring-1 ring-slate-100 dark:ring-slate-700">
                        <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">{review.userName}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500">{review.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center bg-slate-50 dark:bg-slate-800 px-2 py-1 rounded-lg">
                      <span className="material-symbols-outlined text-amber-400 text-[16px] filled">star</span>
                      <span className="ml-1 text-xs font-bold text-slate-900 dark:text-white">{review.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                     {review.text}
                  </p>
               </div>
             )) : (
               <div className="text-center py-6 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
                 <p className="text-slate-500">Пока нет отзывов. Станьте первым!</p>
               </div>
             )}
          </div>
          {place.reviews && place.reviews.length > 0 && (
            <button onClick={() => onNavigate(Screen.REVIEWS_LIST)} className="w-full py-3 text-primary font-semibold text-sm bg-primary/5 hover:bg-primary/10 rounded-xl transition-colors">
                Читать все отзывы ({place.reviewsCount})
            </button>
          )}
        </div>
        <div className="h-6"></div>
      </div>
    </div>
  );
};

export default PlaceDetails;