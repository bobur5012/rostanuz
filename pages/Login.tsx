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

        // Определяем, используем ли мы локальную разработку или продакшен
        const isLocalhost = window.location.hostname === 'localhost' || 
                           window.location.hostname === '127.0.0.1' || 
                           window.location.hostname === '';
        const isProduction = API_URL.startsWith('https://') && !isLocalhost;
        
        console.log('Auth mode:', { isLocalhost, isProduction, API_URL, hostname: window.location.hostname });

        /**
         * Вставляем Telegram Login Widget
         * Для локальной разработки используем onAuth callback
         * Для продакшена используем data-auth-url
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
            script.setAttribute('data-request-access', 'write');

            if (isLocalhost || !isProduction) {
                // Локальная разработка: используем onAuth callback
                console.log('Using onAuth callback for local development');
                
                // Объявляем callback ДО создания скрипта
                (window as any).onTelegramAuth = async (user: any) => {
                    console.log('Telegram Auth Data (callback):', user);

                    try {
                        // Отправляем данные на backend для проверки
                        const res = await fetch(`${API_URL}/auth/telegram`, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify(user),
                        });

                        if (!res.ok) {
                            const errorData = await res.json().catch(() => ({ error: 'Unknown error' }));
                            console.error('Backend auth failed:', res.status, errorData);
                            alert(`Ошибка авторизации: ${errorData.error || 'Неизвестная ошибка'}`);
                            return;
                        }

                        const data = await res.json();
                        console.log('Backend auth response:', data);

                        if (data.status === 'ok' && data.user) {
                            onLogin(data.user);
                        } else {
                            alert('Ошибка авторизации: ' + (data.error || 'Неверный ответ от сервера'));
                        }
                    } catch (error) {
                        console.error('Auth request error:', error);
                        alert('Ошибка соединения с сервером');
                    }
                };

                script.setAttribute('data-onauth', 'onTelegramAuth');
            } else {
                // Продакшен: используем data-auth-url
                console.log('Using data-auth-url for production');
                script.setAttribute('data-auth-url', `${API_URL}/auth/telegram`);
            }

            telegramWrapperRef.current.appendChild(script);
        }

        // Cleanup
        return () => {
            if (isLocalhost || !isProduction) {
                delete (window as any).onTelegramAuth;
            }
        };
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
