import React, { useEffect, useRef } from 'react';
import { API_URL } from '../config';

interface LoginProps {
    onLogin: (user: any) => void;
    onBack?: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onBack }) => {
    const telegramWrapperRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Проверяем, есть ли успешная авторизация (после редиректа от backend)
        const urlParams = new URLSearchParams(window.location.search);
        const authSuccess = urlParams.get('auth_success');
        
        // Если есть параметр auth_success, значит backend уже сохранил данные в localStorage
        if (authSuccess === 'true') {
            const storedUser = localStorage.getItem('rostan_user');
            if (storedUser) {
                try {
                    const user = JSON.parse(storedUser);
                    console.log('User data loaded from localStorage:', user);
                    onLogin(user);
                    // Очищаем URL от параметров
                    window.history.replaceState({}, document.title, window.location.pathname);
                } catch (error) {
                    console.error('Error parsing user data:', error);
                }
            }
        }

        /**
         * Вставляем Telegram Login Widget с data-auth-url
         * Telegram сам сделает редирект на backend после клика
         */
        if (
            telegramWrapperRef.current &&
            !telegramWrapperRef.current.hasChildNodes()
        ) {
            const script = document.createElement('script');
            script.src = 'https://telegram.org/js/telegram-widget.js?22';
            script.async = true;

            // BOT_USERNAME без @
            script.setAttribute('data-telegram-login', 'uslugiuz_bot');
            script.setAttribute('data-size', 'large');
            script.setAttribute('data-auth-url', `${API_URL}/auth/telegram`);
            script.setAttribute('data-request-access', 'write');

            telegramWrapperRef.current.appendChild(script);
        }
    }, [onLogin]);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background-light dark:bg-background-dark p-6 font-display relative">

            {onBack && (
                <button
                    onClick={onBack}
                    className="absolute top-6 left-6 size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    <span className="material-symbols-outlined">arrow_back</span>
                </button>
            )}

            <div className="w-full max-w-sm bg-white dark:bg-surface-dark rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800 p-8 flex flex-col items-center text-center relative overflow-hidden">

                {/* Верхняя полоска */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-sky-400 to-primary" />

                <div className="size-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl font-black tracking-tighter text-primary">
                        R<span className="text-slate-900 dark:text-white">.</span>
                    </span>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Вход в профиль
                </h1>

                <p className="text-slate-500 dark:text-slate-400 mb-8 text-sm">
                    Авторизуйтесь через Telegram, чтобы добавлять места и отзывы
                </p>

                {/* Telegram Login Widget */}
                <div
                    ref={telegramWrapperRef}
                    className="min-h-[50px] flex items-center justify-center"
                />

                <p className="text-xs text-slate-400 dark:text-slate-500 mt-6 max-w-[220px]">
                    Нажимая кнопку, вы принимаете{' '}
                    <button className="text-primary hover:underline">
                        правила сервиса
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
