import React, { useState, useMemo } from 'react';
import { Place, Screen } from '../types';

interface ReviewsListProps {
    onBack: () => void;
    onNavigate: (screen: Screen) => void;
    place: Place;
    onLikeReview: (placeId: string, reviewId: string) => void;
    likedReviewIds: Set<string>;
}

type SortType = 'newest' | 'high' | 'low';

const ReviewsList: React.FC<ReviewsListProps> = ({ onBack, onNavigate, place, onLikeReview, likedReviewIds }) => {
  const [sortType, setSortType] = useState<SortType>('newest');

  const sortedReviews = useMemo(() => {
    const reviews = [...(place.reviews || [])];
    
    if (sortType === 'high') {
        return reviews.sort((a, b) => b.rating - a.rating);
    } else if (sortType === 'low') {
        return reviews.sort((a, b) => a.rating - b.rating);
    }
    // Default 'newest'
    return reviews; 
  }, [place.reviews, sortType]);

  const ratingCounts = useMemo(() => {
      const counts = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      const total = place.reviews?.length || 0;
      place.reviews?.forEach(r => {
          const rRounded = Math.round(r.rating) as 1|2|3|4|5;
          if (counts[rRounded] !== undefined) counts[rRounded]++;
      });
      return { counts, total };
  }, [place.reviews]);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-x-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark">
      <header className="sticky top-0 z-50 flex items-center bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-sm p-4 pt-safe border-b border-slate-200 dark:border-slate-800 justify-between">
        <button 
          onClick={onBack}
          className="text-text-main-light dark:text-text-main-dark flex size-10 shrink-0 items-center justify-center rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
        >
          <span className="material-symbols-outlined" style={{fontSize: '24px'}}>arrow_back_ios_new</span>
        </button>
        <h2 className="text-text-main-light dark:text-text-main-dark text-lg font-bold leading-tight tracking-[-0.015em]">Отзывы</h2>
        <div className="size-10 shrink-0"></div> 
      </header>

      <main className="flex-1 flex flex-col pb-24">
        <section className="flex flex-col gap-4 p-5 bg-card-light dark:bg-card-dark mx-4 mt-4 rounded-xl shadow-sm">
          <div className="flex flex-wrap gap-x-6 items-center">
            <div className="flex flex-col items-center gap-1">
              <p className="text-text-main-light dark:text-text-main-dark text-5xl font-black leading-tight tracking-[-0.033em]">{place.rating > 0 ? place.rating : 0}</p>
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map(s => (
                  <span key={s} className={`material-symbols-outlined text-primary text-[18px] ${place.rating >= s ? 'filled' : ''}`}>star</span>
                ))}
              </div>
              <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-medium">{place.reviewsCount} отзывов</p>
            </div>
            <div className="flex-1 grid grid-cols-[12px_1fr_30px] items-center gap-y-2 gap-x-2">
              {[5, 4, 3, 2, 1].map(star => {
                const count = ratingCounts.counts[star as 1|2|3|4|5];
                const pct = ratingCounts.total > 0 ? Math.round((count / ratingCounts.total) * 100) : 0;
                return (
                    <React.Fragment key={star}>
                    <p className="text-text-main-light dark:text-text-main-dark text-xs font-medium">{star}</p>
                    <div className="flex h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                        <div className="rounded-full bg-primary" style={{ width: `${pct}%` }}></div>
                    </div>
                    <p className="text-text-sub-light dark:text-text-sub-dark text-xs text-right">{pct}%</p>
                    </React.Fragment>
                );
              })}
            </div>
          </div>
        </section>

        <section className="sticky top-[72px] z-40 bg-background-light dark:bg-background-dark py-3 pl-4 overflow-x-auto no-scrollbar">
          <div className="flex gap-3 pr-4">
            <button 
                onClick={() => setSortType('newest')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 shadow-sm transition-all active:scale-95 ${sortType === 'newest' ? 'bg-primary text-white' : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200'}`}
            >
              <span className="material-symbols-outlined text-[18px]">sort</span>
              <p className="text-sm font-semibold">Сначала новые</p>
            </button>
            <button 
                onClick={() => setSortType('high')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all active:scale-95 ${sortType === 'high' ? 'bg-primary text-white shadow-sm border-transparent' : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-text-main-light dark:text-text-main-dark'}`}
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <p className="text-sm font-medium">Высокий рейтинг</p>
            </button>
            <button 
                onClick={() => setSortType('low')}
                className={`flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4 transition-all active:scale-95 ${sortType === 'low' ? 'bg-primary text-white shadow-sm border-transparent' : 'bg-white dark:bg-card-dark border border-slate-200 dark:border-slate-700 text-text-main-light dark:text-text-main-dark'}`}
            >
              <span className="material-symbols-outlined text-[18px]">circle</span>
              <p className="text-sm font-medium">Низкий рейтинг</p>
            </button>
          </div>
        </section>

        <section className="flex flex-col gap-4 px-4 mt-2">
          {sortedReviews.length > 0 ? (
            sortedReviews.map(review => (
             <article key={review.id} className="flex flex-col gap-3 bg-card-light dark:bg-card-dark p-4 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 relative animate-fade-in">
                <button aria-label="Пожаловаться на отзыв" className="absolute top-4 right-4 text-slate-300 hover:text-red-400 dark:text-slate-600 dark:hover:text-red-400 transition-colors">
                    <span className="material-symbols-outlined text-[20px]">flag</span>
                </button>
                <div className="flex items-center gap-3 pr-8">
                    <div className="size-8 rounded-full bg-slate-200 overflow-hidden shrink-0 ring-1 ring-slate-100 dark:ring-slate-700">
                        <img src={review.userAvatar} alt={review.userName} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex flex-col">
                        <p className="text-text-main-light dark:text-text-main-dark text-sm font-semibold leading-tight">{review.userName}</p>
                        <p className="text-text-sub-light dark:text-text-sub-dark text-xs font-normal">{review.date}</p>
                    </div>
                </div>
                <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map(star => (
                        <span key={star} className={`material-symbols-outlined text-[18px] ${review.rating >= star ? 'text-primary filled' : 'text-slate-200 dark:text-slate-600'}`}>star</span>
                    ))}
                </div>
                <p className="text-text-main-light dark:text-text-main-dark text-sm font-normal leading-relaxed">
                    {review.text}
                </p>
                {review.images && (
                    <div className="flex gap-2 mt-1 overflow-x-auto no-scrollbar">
                        {review.images.map((img, i) => (
                            <div key={i} className="shrink-0 size-20 rounded-lg bg-cover bg-center border border-slate-100 dark:border-slate-700/50" style={{ backgroundImage: `url('${img}')` }}></div>
                        ))}
                    </div>
                )}
                <div className="flex gap-6 mt-1 text-text-sub-light dark:text-text-sub-dark">
                    <button 
                        onClick={() => onLikeReview(place.id, review.id)}
                        className={`flex items-center gap-1.5 transition-colors ${likedReviewIds.has(review.id) ? 'text-primary font-bold' : 'hover:text-primary'}`}
                    >
                        <span className={`material-symbols-outlined text-[18px] ${likedReviewIds.has(review.id) ? 'filled' : ''}`}>thumb_up</span>
                        <span className="text-xs font-medium">{review.likes}</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-red-400 transition-colors">
                        <span className="material-symbols-outlined text-[18px]">thumb_down</span>
                        {review.dislikes > 0 && <span className="text-xs font-medium">{review.dislikes}</span>}
                    </button>
                </div>
             </article>
            ))
          ) : (
             <div className="text-center py-10 text-gray-400 dark:text-gray-600">
                <p>Отзывов пока нет</p>
             </div>
          )}
        </section>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-4 pb-safe bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex justify-center max-w-md mx-auto z-50">
        <button 
          onClick={() => onNavigate(Screen.ADD_REVIEW)}
          className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-sky-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-lg shadow-primary/30 transition-all active:scale-95"
        >
          <span className="material-symbols-outlined text-[20px]">edit_square</span>
          <span>Написать отзыв</span>
        </button>
      </div>
    </div>
  );
};

export default ReviewsList;