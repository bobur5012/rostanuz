import React from 'react';

interface PrivacyPolicyProps {
  onBack: () => void;
}

const PrivacyPolicy: React.FC<PrivacyPolicyProps> = ({ onBack }) => {
  return (
    <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col font-display antialiased max-w-md mx-auto animate-slide-up">
      <div className="sticky top-0 z-50 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md border-b border-slate-200/50 dark:border-slate-800/50 pt-safe">
        <div className="flex items-center justify-between px-4 h-14">
          <button 
            onClick={onBack}
            className="flex items-center justify-center size-10 rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold text-center flex-1 pr-10 truncate text-slate-900 dark:text-white">Политика</h1>
          <div className="size-10"></div>
        </div>
      </div>

      <main className="flex-1 overflow-y-auto px-5 py-6 pb-24 text-slate-700 dark:text-slate-300">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">Политика конфиденциальности</h2>
        <p className="text-sm mb-2 text-slate-500">Последнее обновление: 24 мая 2025</p>
        
        <div className="space-y-6 text-sm leading-relaxed">
            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">1. Введение</h3>
                <p>Добро пожаловать в Rostan. Мы уважаем вашу конфиденциальность и стремимся защищать ваши личные данные. Настоящая Политика конфиденциальности объясняет, как мы собираем, используем и раскрываем информацию о вас.</p>
            </section>

            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">2. Сбор данных</h3>
                <p>Мы собираем информацию, которую вы предоставляете нам напрямую, например, при создании аккаунта, публикации отзывов или добавлении мест. Это может включать ваше имя, имя пользователя, фото профиля и контент ваших публикаций.</p>
            </section>

            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">3. Использование информации</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Для предоставления и улучшения наших услуг.</li>
                    <li>Для персонализации вашего опыта.</li>
                    <li>Для отображения ваших отзывов и оценок другим пользователям.</li>
                    <li>Для связи с вами по поводу обновлений или поддержки.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">4. Настройки приватности</h3>
                <p>В приложении Rostan вы можете управлять видимостью ваших личных данных (аватара и никнейма) через настройки профиля. Мы уважаем ваш выбор оставаться анонимным при публикации отзывов.</p>
            </section>

            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">5. Безопасность</h3>
                <p>Мы принимаем разумные меры для защиты вашей информации от несанкционированного доступа, использования или раскрытия.</p>
            </section>

            <section>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">6. Контакты</h3>
                <p>Если у вас есть вопросы о нашей политике конфиденциальности, пожалуйста, посетите наш сайт <a href="https://rostan.uz" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">rostan.uz</a> или свяжитесь с нами через службу поддержки.</p>
            </section>
        </div>
        
        <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-400">© 2025 Rostan Inc. Все права защищены.</p>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;