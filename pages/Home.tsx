import React, { useState, useMemo } from 'react';
import { Place, Screen, Review } from '../types';

interface HomeProps {
  onNavigate: (screen: Screen, params?: any) => void;
  places: Place[];
  favorites: string[];
  onToggleFavorite: (e: React.MouseEvent, id: string) => void;
  onLikeReview: (placeId: string, reviewId: string) => void;
  likedReviewIds: Set<string>;
}

const Home: React.FC<HomeProps> = ({ onNavigate, places, favorites, onToggleFavorite, onLikeReview, likedReviewIds }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  // Filter Places Logic
  const filteredPlaces = useMemo(() => {
    return places.filter(place => {
      const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            place.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            place.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'Все' || place.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [places, searchQuery, selectedCategory]);

  // Extract and Sort Reviews for Modules
  const { topReviews, latestReviews } = useMemo(() => {
    // Flatten all reviews and attach place info for context
    const allReviews = places.flatMap(p => 
      (p.reviews || []).map(r => ({
        ...r, 
        placeId: p.id, 
        placeName: p.name,
        placeImage: p.image 
      }))
    );

    // Top: Sort by likes desc
    const top = [...allReviews].sort((a, b) => b.likes - a.likes).slice(0, 5);
    
    // Latest: Just take the first few (assuming mock order is chrono)
    const latest = [...allReviews].slice(0, 5);

    return { topReviews: top, latestReviews: latest };
  }, [places]);

  const categories = [
     { name: 'Все', icon: '' }, // Special case
     { name: 'Ресторан', icon: '🍽️' },
     { name: 'Кофейня', icon: '☕️' },
     { name: 'Парк', icon: '🌳' },
     { name: 'Кинотеатр', icon: '🎬' },
     { name: 'Бар', icon: '🍸' },
     { name: 'Магазин', icon: '🛍️' },
  ];

  const handleReviewLikeClick = (e: React.MouseEvent, placeId: string, reviewId: string) => {
    e.stopPropagation();
    onLikeReview(placeId, reviewId);
  }

  return (
    <div className="relative flex min-h-screen w-full flex-col pb-28 max-w-md mx-auto bg-background-light dark:bg-background-dark">
      {/* Sticky Header Group */}
      <div className="sticky top-0 z-30 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-white/5 transition-colors pt-safe">
        <header className="flex items-center justify-between px-5 pt-4 pb-2">
          <div className="flex items-center gap-2">
            <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white">Rostan<span className="text-primary">.</span></h1>
          </div>
          <button 
            onClick={() => onNavigate(Screen.ADD_PLACE)}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-white dark:bg-slate-800 shadow-sm ring-1 ring-slate-900/5 hover:bg-slate-50 dark:hover:bg-slate-700 text-primary transition-all active:scale-95"
          >
            <span className="material-symbols-outlined text-[28px]">add_location_alt</span>
          </button>
        </header>

        {/* Search */}
        <div className="px-5 pb-4 pt-1">
          <label className="relative flex items-center w-full h-12 rounded-2xl bg-white dark:bg-slate-800 shadow-soft ring-1 ring-slate-900/5 dark:ring-white/10 overflow-hidden group focus-within:ring-2 focus-within:ring-primary/50 transition-all">
            <div className="grid place-items-center h-full w-12 text-slate-400 dark:text-slate-500 group-focus-within:text-primary transition-colors">
              <span className="material-symbols-outlined">search</span>
            </div>
            <input 
              className="peer h-full w-full border-none bg-transparent p-0 pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 focus:ring-0 text-[15px] font-medium" 
              id="search" 
              placeholder="Поиск мест, категорий..." 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                <span className="material-symbols-outlined text-[20px]">cancel</span>
              </button>
            )}
          </label>
        </div>
      </div>

      {/* Reviews Modules - NOW AT TOP */}
      {topReviews.length > 0 && !searchQuery && (
        <div className="mt-4 mb-2 animate-slide-up">
          
          {/* Latest Reviews Section */}
          <div className="pl-5 mb-3 flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">💬 Свежие отзывы</h3>
          </div>
          <div className="w-full overflow-x-auto no-scrollbar pb-4 pl-5">
             <div className="flex gap-4 pr-5 w-max">
                {latestReviews.map((review) => (
                    <div 
                      key={`latest-${review.id}`}
                      onClick={() => onNavigate(Screen.PLACE_DETAILS, { id: review.placeId })}
                      className="w-64 bg-surface-light dark:bg-surface-dark p-3 rounded-2xl border border-slate-200 dark:border-slate-700/50 flex flex-col cursor-pointer active:scale-[0.98] transition-transform"
                    >
                        <div className="flex items-center gap-2 mb-2">
                            <div className="size-8 rounded-lg bg-cover bg-center shrink-0" style={{backgroundImage: `url('${(review as any).placeImage}')`}}></div>
                            <div className="flex flex-col min-w-0">
                                <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{(review as any).placeName}</span>
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-[12px] text-amber-400 filled">star</span>
                                    <span className="text-[10px] font-bold">{review.rating}</span>
                                </div>
                            </div>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 min-h-[32px]">
                           {review.text}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                           <span className="text-[10px] text-slate-400">{review.date}</span>
                           <button 
                             className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${likedReviewIds.has(review.id) ? 'text-primary' : 'text-slate-400'}`}
                             onClick={(e) => handleReviewLikeClick(e, review.placeId!, review.id)}
                           >
                             <span className={`material-symbols-outlined text-[14px] ${likedReviewIds.has(review.id) ? 'filled' : ''}`}>thumb_up</span>
                             {review.likes}
                           </button>
                        </div>
                    </div>
                ))}
             </div>
          </div>

          {/* Top Reviews Section */}
          <div className="pl-5 mb-3 mt-1 flex items-center gap-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">🔥 Топ обсуждений</h3>
          </div>
          <div className="w-full overflow-x-auto no-scrollbar pb-6 pl-5">
             <div className="flex gap-4 pr-5 w-max">
                {topReviews.map((review) => (
                    <div 
                      key={review.id}
                      onClick={() => onNavigate(Screen.PLACE_DETAILS, { id: review.placeId })}
                      className="w-72 bg-gradient-to-br from-white to-slate-50 dark:from-slate-800 dark:to-slate-800/50 p-4 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-800 cursor-pointer active:scale-[0.98] transition-transform"
                    >
                        <div className="flex items-center gap-3 mb-3">
                           <div className="size-10 rounded-full bg-slate-200 overflow-hidden shrink-0 ring-2 ring-white dark:ring-slate-700">
                              <img src={review.userAvatar} className="w-full h-full object-cover" alt={review.userName}/>
                           </div>
                           <div className="min-w-0 flex-1">
                              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{review.userName}</p>
                              <div className="flex items-center gap-1 text-xs text-slate-500">
                                 <span className="truncate max-w-[120px]">@{review.placeName}</span>
                              </div>
                           </div>
                           <button 
                             className={`flex flex-col items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-700/50 transition-colors ${likedReviewIds.has(review.id) ? 'text-primary bg-primary/10' : 'text-slate-400'}`}
                             onClick={(e) => handleReviewLikeClick(e, review.placeId!, review.id)}
                           >
                             <span className={`material-symbols-outlined text-[18px] ${likedReviewIds.has(review.id) ? 'filled' : ''}`}>thumb_up</span>
                             <span className="text-[9px] font-bold">{review.likes}</span>
                           </button>
                        </div>
                        <p className="text-sm text-slate-700 dark:text-slate-300 line-clamp-3 leading-relaxed italic">
                           "{review.text}"
                        </p>
                    </div>
                ))}
             </div>
          </div>

        </div>
      )}

      {/* Categories */}
      <div className="w-full overflow-x-auto no-scrollbar pb-4 pt-2 pl-5">
        <div className="flex gap-3 pr-5 min-w-max">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.name;
            return (
              <button 
                key={cat.name} 
                onClick={() => setSelectedCategory(cat.name)}
                className={`flex h-10 items-center justify-center px-4 rounded-2xl transition-transform active:scale-95 border ${isActive 
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent shadow-lg shadow-slate-900/20' 
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/50 dark:border-white/5'}`}
              >
                {cat.icon && <span className="text-[20px] mr-2">{cat.icon}</span>}
                <span className="text-[15px] font-medium">{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Places List */}
      <div className="flex flex-col gap-5 px-5 mt-1 min-h-[300px]">
        {filteredPlaces.length > 0 ? (
          filteredPlaces.map((place) => (
            <div 
              key={place.id}
              onClick={() => onNavigate(Screen.PLACE_DETAILS, place)}
              className="group relative flex gap-4 p-3 bg-white dark:bg-slate-800 rounded-[20px] shadow-soft hover:shadow-lg transition-all ring-1 ring-slate-900/5 dark:ring-white/5 active:scale-[0.99] cursor-pointer"
            >
              <div 
                className="w-28 h-28 shrink-0 rounded-2xl bg-gray-200 dark:bg-gray-700 bg-center bg-cover shadow-inner relative overflow-hidden" 
                style={{ backgroundImage: `url("${place.image}")` }}
              >
                <div className="absolute top-0 left-0 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-br-xl">
                  <span className="text-[10px] font-medium text-white">{place.category}</span>
                </div>
              </div>
              
              <div className="flex flex-col justify-between flex-1 py-0.5 min-w-0">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="text-[17px] font-bold leading-tight text-slate-900 dark:text-white truncate pr-1">{place.name}</h2>
                    <div className="flex items-center gap-1 bg-green-50 dark:bg-green-500/20 px-1.5 py-0.5 rounded-md shrink-0">
                      <span className="material-symbols-outlined text-[14px] text-green-600 dark:text-green-400 filled">star</span>
                      <span className="text-xs font-bold text-green-700 dark:text-green-400">{place.rating > 0 ? place.rating : '-'}</span>
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-slate-500 dark:text-slate-400 mt-1 truncate">{place.address}</p>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-1.5">
                    <span className="flex -space-x-2 overflow-hidden">
                      <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-slate-800 bg-gray-200"></span>
                      <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-slate-800 bg-gray-300"></span>
                      <span className="inline-block h-5 w-5 rounded-full ring-2 ring-white dark:ring-slate-800 bg-gray-400"></span>
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">{place.reviewsCount} отзывов</span>
                  </div>
                  <button 
                    onClick={(e) => onToggleFavorite(e, place.id)}
                    className={`transition-colors ${favorites.includes(place.id) ? 'text-primary' : 'text-slate-300 hover:text-slate-400'}`}
                  >
                    <span className={`material-symbols-outlined text-[24px] ${favorites.includes(place.id) ? 'filled' : ''}`}>bookmark</span>
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-10 opacity-60">
            <span className="material-symbols-outlined text-4xl mb-2">search_off</span>
            <p className="text-sm font-medium">Ничего не найдено</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;