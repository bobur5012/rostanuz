import React from 'react';
import { Place, Review, Screen } from '../types';

interface UserListsProps {
  title: string;
  type: 'places' | 'reviews';
  data: (Place | Review)[];
  onBack: () => void;
  onNavigate: (screen: Screen, params?: any) => void;
}

const UserLists: React.FC<UserListsProps> = ({ title, type, data, onBack, onNavigate }) => {
  
  const isEmpty = data.length === 0;

  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col animate-slide-up">
      <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 pt-safe bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
          <button 
            onClick={onBack}
            className="flex items-center justify-center w-10 h-10 -ml-2 text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 pt-safe">
              {title}
          </h1>
          <div className="w-8"></div>
      </header>

      <main className="flex-1 p-4">
        {isEmpty ? (
            <div className="flex flex-col items-center justify-center pt-32 text-center opacity-60">
                <span className="material-symbols-outlined text-6xl mb-4 text-slate-300">
                    {type === 'places' ? 'storefront' : 'rate_review'}
                </span>
                <p className="text-lg font-medium">Список пуст</p>
                <p className="text-sm">Вы еще ничего не добавили</p>
            </div>
        ) : (
            <div className="flex flex-col gap-4">
                {type === 'places' && (data as Place[]).map(place => (
                    <div 
                        key={place.id}
                        onClick={() => onNavigate(Screen.PLACE_DETAILS, place)}
                        className="flex gap-4 p-3 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-[0.99] transition-transform"
                    >
                        <div className="size-20 rounded-lg bg-gray-200 bg-cover bg-center shrink-0" style={{backgroundImage: `url('${place.image}')`}}></div>
                        <div className="flex flex-col justify-center">
                            <h3 className="font-bold text-slate-900 dark:text-white mb-1">{place.name}</h3>
                            <p className="text-xs text-slate-500 mb-2">{place.address}</p>
                            <span className="text-[10px] bg-green-100 text-green-700 px-2 py-0.5 rounded w-fit">На проверке</span>
                        </div>
                    </div>
                ))}

                {type === 'reviews' && (data as Review[]).map(review => (
                    <div key={review.id} className="p-4 bg-white dark:bg-surface-dark rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <div className="flex justify-between items-center mb-2">
                             <h3 className="font-bold text-primary text-sm">{review.placeName || 'Заведение'}</h3>
                             <span className="text-xs text-slate-400">{review.date}</span>
                        </div>
                        <div className="flex mb-2">
                            {[1,2,3,4,5].map(s => (
                                <span key={s} className={`material-symbols-outlined text-[16px] ${s <= review.rating ? 'text-amber-400 filled' : 'text-slate-200'}`}>star</span>
                            ))}
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300">{review.text}</p>
                    </div>
                ))}
            </div>
        )}
      </main>
    </div>
  );
};

export default UserLists;