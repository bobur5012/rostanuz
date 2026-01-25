import React, { useState } from 'react';

interface AddReviewProps {
  onBack: () => void;
  onAdd: (rating: number, text: string) => void;
}

const AddReview: React.FC<AddReviewProps> = ({ onBack, onAdd }) => {
  const [rating, setRating] = useState(0);
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubmit = () => {
    if (rating === 0) return; // Basic valid

    setStatus('loading');
    setTimeout(() => {
        setStatus('success');
        onAdd(rating, text);
    }, 1500);
  };

  return (
    <>
      {status === 'success' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 dark:bg-[#101c22]/90 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-surface-dark shadow-2xl animate-scale-in border border-slate-100 dark:border-slate-800">
             <div className="size-20 bg-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/30 mb-6">
                <span className="material-symbols-outlined text-white text-[40px] font-bold">thumb_up</span>
             </div>
             <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Спасибо!</h2>
             <p className="text-slate-500 dark:text-slate-400 text-center max-w-[250px] leading-relaxed">
               Ваш отзыв опубликован и поможет другим пользователям.
             </p>
          </div>
        </div>
      )}

      <div className="bg-background-light dark:bg-background-dark min-h-screen font-display flex flex-col antialiased selection:bg-primary/30 selection:text-primary max-w-md mx-auto relative animate-slide-up">
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 py-3 pt-safe bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50">
          <button 
            onClick={onBack}
            aria-label="Закрыть" 
            className="flex items-center justify-center w-10 h-10 -ml-2 text-gray-900 dark:text-white rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" 
            type="button"
            disabled={status !== 'idle'}
          >
            <span className="material-symbols-outlined" style={{fontSize: '24px'}}>close</span>
          </button>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white absolute left-1/2 -translate-x-1/2 pt-safe">
              Написать отзыв
          </h1>
          <div className="w-8"></div>
        </header>

        <main className="flex-1 flex flex-col w-full">
          <div className="flex flex-col items-center justify-center pt-8 pb-6 px-4">
            <div className="flex items-center gap-3 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button 
                  key={star}
                  onClick={() => setRating(star)}
                  className="group transition-transform active:scale-90 focus:outline-none"
                >
                  <span className={`material-symbols-outlined text-[40px] ${rating >= star ? 'filled text-primary' : 'text-gray-300 dark:text-gray-600'}`}>star</span>
                </button>
              ))}
            </div>
            <h2 className="text-primary font-semibold text-xl tracking-tight animate-fade-in">
                {rating === 5 ? 'Отлично' : rating === 4 ? 'Хорошо' : rating === 3 ? 'Нормально' : rating > 0 ? 'Плохо' : 'Оцените место'}
            </h2>
          </div>

          <div className="px-4 py-2 flex flex-col gap-2">
            <label className="text-base font-medium text-gray-900 dark:text-gray-100" htmlFor="review-text">
                Ваш отзыв
            </label>
            <div className="relative">
              <textarea 
                value={text} 
                onChange={(e) => setText(e.target.value)}
                className="w-full min-h-[180px] p-4 bg-white dark:bg-[#1a262d] border border-gray-200 dark:border-gray-700 rounded-xl text-base text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none shadow-sm" id="review-text" placeholder="Расскажите подробнее о вашем опыте... Что вам понравилось?"
              ></textarea>
            </div>
          </div>

          <div className="px-4 py-4">
            <div className="flex items-start gap-3 p-3 bg-primary/10 dark:bg-primary/5 rounded-lg border border-primary/10">
              <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">info</span>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">
                  Отзыв нельзя изменить после публикации. Пожалуйста, проверьте текст перед отправкой.
              </p>
            </div>
          </div>
          
          <div className="flex-1"></div>
          
          <div className="sticky bottom-0 w-full p-4 pb-safe bg-background-light dark:bg-background-dark border-t border-transparent dark:border-transparent lg:static lg:bg-transparent">
            <button 
              onClick={handleSubmit}
              disabled={status === 'loading' || rating === 0}
              className={`w-full py-4 px-6 bg-primary hover:bg-[#2299d6] text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 active:scale-[0.98] active:shadow-sm transition-all flex items-center justify-center gap-2 ${status === 'loading' || rating === 0 ? 'opacity-80' : ''}`}
            >
              {status === 'loading' ? (
                 <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Опубликовать</span>
                  <span className="material-symbols-outlined text-[20px] font-bold">send</span>
                </>
              )}
            </button>
          </div>
        </main>
      </div>
    </>
  );
};

export default AddReview;