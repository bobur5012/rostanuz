# Project Files Backup

## index.tsx

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

## metadata.json

```json
{
  "name": "Rostan",
  "description": "A Telegram-first reviews application where users can find places, leave honest reviews, and manage content.",
  "requestFramePermissions": []
}
```

## index.html

```html
<!DOCTYPE html>
<html lang="ru" class="light">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
    <title>Rostan</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
    
    <!-- Yandex Maps API -->
    <script src="https://api-maps.yandex.ru/2.1/?apikey=34326806-895d-4878-96c6-da6d65c3482d&lang=ru_RU" type="text/javascript"></script>

    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script>
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              "primary": "#2baaee",
              "background-light": "#f6f7f8",
              "background-dark": "#101c22",
              "surface-light": "#ffffff",
              "surface-dark": "#182830",
              "card-light": "#ffffff",
              "card-dark": "#1a262d",
              "text-main-light": "#0d161b",
              "text-main-dark": "#e7eff3",
              "text-sub-light": "#4c7e9a",
              "text-sub-dark": "#94a3b8",
            },
            fontFamily: {
              "display": ["Inter", "sans-serif"]
            },
            borderRadius: {
              "DEFAULT": "0.5rem",
              "lg": "1rem",
              "xl": "1.5rem", 
              "2xl": "2rem",
              "full": "9999px"
            },
            boxShadow: {
              'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
            }
          },
        },
      }
    </script>
    <style>
      body {
        font-family: 'Inter', sans-serif;
        -webkit-tap-highlight-color: transparent;
        min-height: 100vh;
        background-color: #f6f7f8;
      }
      .dark body {
        background-color: #101c22;
      }
      .no-scrollbar::-webkit-scrollbar {
        display: none;
      }
      .no-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .bg-map-pattern {
        background-color: #e5e7eb;
        background-image: 
            linear-gradient(rgba(255, 255, 255, 0.4) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.4) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px);
        background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
        background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
      }
      .dark .bg-map-pattern {
        background-color: #1a2c35;
        background-image: 
            linear-gradient(rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 2px, transparent 2px),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      }
      .material-symbols-outlined {
        font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .material-symbols-outlined.filled {
        font-variation-settings: 'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24;
      }
      .pb-safe {
        padding-bottom: env(safe-area-inset-bottom, 20px);
      }
      .pt-safe {
        padding-top: env(safe-area-inset-top, 20px);
      }

      /* Animations */
      @keyframes slideUp {
        from { transform: translateY(20px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
      }
      .animate-slide-up {
        animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
      }

      @keyframes scaleIn {
        0% { transform: scale(0.9); opacity: 0; }
        100% { transform: scale(1); opacity: 1; }
      }
      .animate-scale-in {
        animation: scaleIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
      }
      
      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }
      .animate-fade-in {
        animation: fadeIn 0.3s ease-out forwards;
      }

      /* Yandex Map Canvas Fixes */
      [class*="ymaps-2"][class*="-ground-pane"] {
        filter: saturate(0.8);
      }
      .dark [class*="ymaps-2"][class*="-ground-pane"] {
        filter: invert(1) hue-rotate(180deg) brightness(0.8) contrast(1.1);
      }
    </style>
  <script type="importmap">
{
  "imports": {
    "react/": "https://esm.sh/react@^19.2.3/",
    "react": "https://esm.sh/react@^19.2.3",
    "react-dom/": "https://esm.sh/react-dom@^19.2.3/"
  }
}
</script>
</head>
  <body class="bg-background-light dark:bg-background-dark text-slate-900 dark:text-white antialiased overflow-x-hidden">
    <div id="root"></div>
  </body>
</html>
```

## types.ts

```ts
export enum Screen {
  HOME = 'HOME',
  MAP = 'MAP',
  FAVORITES = 'FAVORITES',
  PROFILE = 'PROFILE',
  PLACE_DETAILS = 'PLACE_DETAILS',
  ADD_PLACE = 'ADD_PLACE',
  ADD_REVIEW = 'ADD_REVIEW',
  REVIEWS_LIST = 'REVIEWS_LIST',
  MY_REVIEWS = 'MY_REVIEWS',
  MY_PLACES = 'MY_PLACES',
  PRIVACY_POLICY = 'PRIVACY_POLICY',
  LOGIN = 'LOGIN',
}

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  isVerified: boolean;
  reviewsCount: number;
  placesCount: number;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  text: string;
  likes: number;
  dislikes: number;
  ownerResponse?: string;
  images?: string[];
  placeId?: string; // Link review to a place
  placeName?: string; // For display in My Reviews
}

export interface Place {
  id: string;
  name: string;
  category: string;
  categoryIcon: string;
  address: string;
  city: string;
  rating: number;
  reviewsCount: number;
  description: string;
  image: string;
  coordinates: { lat: number; lng: number };
  isOpen?: boolean;
  distance?: string;
  reviews?: Review[];
  isFavorite?: boolean; // Helper for UI
}
```

## constants.ts

```ts
import { Place, Review, User } from './types';

export const CURRENT_USER: User = {
  id: 'u1',
  name: 'Алексей Петров',
  username: '@alex_petrov',
  avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFe5R2B8YCKMmWH27OKiKv0qzO3d_T-Pcc4_vUjR9LM_84XFGaf3r32-uA-LBFrbwr0hYng5uOrEwvtKaD0gC07IKr1f_Yvx4O3naaeTAwUmM1X4vpWGST7wpY0OrXEH_KgzYqOPN3gx8EiJzJdxVLv-vJjtKCMC9FnHftWdoXCPs1QLNsU7qddLRFl6md_nPFlHTWHvRgclvPvvj2xtxnmmBcdw2dqBEU63UMRO-2ReKE5uc8jWkseoOi0a5d9o4WV2sV5I4BwlzS',
  isVerified: true,
  reviewsCount: 12,
  placesCount: 3,
};

export const MOCK_REVIEWS: Review[] = [
  {
    id: 'r1',
    userId: 'u2',
    userName: 'Алишер К.',
    userAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC93diBlW0eETFMS29n2aaVZSgMZTrQhFQtvTWfS5LkvpKGTp8fGfBKbeTChCPL0UqCDMSKfPzcKZ1VTba2dVOTEwoFb6cGRRhCrJLPfFL74HTu3g9bbYgfZK9Adpb29OFy4bqJegeJghJSnJQVsTLQBbUj0xJdsMTlDDTgeIwcLMT5vVdW06_C1LkzUN5QrlBUmF1XWeP3gBi0PR00gyOiVu2HBFlP6wN5d_g0g_lV9janilPKeiCayyzKZt1h4rKLMpcm5BY9fxvn',
    rating: 5,
    date: '2 дня назад',
    text: 'Отличная атмосфера! Кофе был идеальным, а самсы просто тают во рту. Обязательно вернусь сюда с друзьями.',
    likes: 12,
    dislikes: 0
  },
  {
    id: 'r2',
    userId: 'u3',
    userName: 'Мария С.',
    userAvatar: 'https://ui-avatars.com/api/?name=Мария+С&background=cbd5e1&color=64748b',
    rating: 3,
    date: '1 неделю назад',
    text: 'Заказ несли долго, хотя людей было немного. Место приятное, но сервис нужно подтянуть.',
    ownerResponse: 'Приносим извинения, Мария! В следующий раз мы постараемся обслужить вас быстрее.',
    likes: 5,
    dislikes: 1
  },
  {
    id: 'r3',
    userId: 'u4',
    userName: 'Джамшид',
    userAvatar: 'https://ui-avatars.com/api/?name=Джамшид&background=e0e7ff&color=4f46e5',
    rating: 4.5,
    date: '2 недели назад',
    text: 'Лучший плов в Ташкенте. Без сомнений. Приходите к 12, чтобы успеть на самый свежий.',
    images: [
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCzjnQqJv1oTRmKyTb67tYe9LvdW1XYDifVLRS0lclmNQzypZkep8PZYMXeaHnCo4aNFk_IN2ITsQ-8_iC4CTbibqqp9takSt7hmDnUjArOWTLtkAillpJvsXP_EfpGMuMnHp5lsjhixqGJi7A2MPeRapw9v9iHFEIDndY5xPessfQH4aI7Lanf-fhz3slAHXCAs3PN9_CjldMxO7WWdxBV-yiWDFQkKhF6BoO_b-7GUkvz44I8s_84lPI-ml9Kb22KTimnvwBk_zj3',
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDnOQrSW2aYABGZeHDWMRbVP1-5Sd3kqa7SizN4D7Fjdxa_VIhZWcZuC_AHRpPpGsGuEhTdcPaTWRms9e62GpO0has_5Rb3VZZ5z4-ShcGUhNpFFIh7GXzVDzablnuL3KebKXIsZ8OSB6wwzo24QXTHg08Ab6kwplFyzHtanvXAgk42ldVsV-vg5wvASZO0tdIDHbp_FyzZBIozY5O94dYlDAG5LPge1NllJ3V_n8FvDJfw239zaL06e07JKoPd5L3J4FEJhCUk3fTG'
    ],
    likes: 8,
    dislikes: 0
  }
];

export const MOCK_PLACES: Place[] = [
  {
    id: 'p1',
    name: 'Black Bear Kofi',
    category: 'Кофейня',
    categoryIcon: 'local_cafe',
    address: 'ул. Шота Руставели, 53',
    city: 'Ташкент',
    rating: 4.8,
    reviewsCount: 128,
    description: 'Уютное местечко для книголюбов и ценителей кофе. Мы подаем авторские купажи и вкуснейшие десерты.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD7j9J49icgPb6ELoOpaxa_6Ib1H1i_fAsqASqYNi9uAPEEen2zZUEJvc4JTMFbQErtl416hUFCYXOzrOMW33Er2mKG-wL5JNYBb7xQmNHC4GH4itUQ4WWKiqGfqROMNB4I_2qIPwGuLbf9fUQ1Vd2eAFd01qq5U1XEQOxJlbQMr_kc8V-vcYPAeUB23_QMwnqOKMPH6ql1g104dqz4HtIx3bZge80-K5ox1sUAbGq6nWt42k8zNRjfxtximKNlqL9d-vBGwpHLChiG',
    coordinates: { lat: 41.2856, lng: 69.2530 },
    isOpen: true,
    distance: '150 м от вас',
    reviews: MOCK_REVIEWS
  },
  {
    id: 'p2',
    name: 'Tashkent City Park',
    category: 'Парк',
    categoryIcon: 'park',
    address: 'ул. Укчи',
    city: 'Ташкент',
    rating: 4.9,
    reviewsCount: 2400,
    description: 'Крупнейший рекреационный парк в центре города с поющими фонтанами, планетарием и зонами отдыха.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzM0xVSlCFsaJtI_kVXF20A900wnK-_8bSm2_DUSahqS0QFemuWs1zojImMHRZ7yADPgVzgKKxYOuDgA2ypV_hlaz_SPQU4yfFn27wnqCnz297o0IPBjljQZxHGDrG5MeU7BY2t4BRJWzuD3xALgmeLwyyC6uY8mJ5dB3T5qYU43JGnAzlTTMNysS_D9XBYrP_xrpRkoFcGcqTUY-yctFaLNIWOejLotQeeYIhcoYCK0rgT2TpQwsQE11KpCPGeWiu_E093FsHaSMi',
    coordinates: { lat: 41.3135, lng: 69.2518 },
    reviews: []
  },
  {
    id: 'p3',
    name: 'Riviera Cinema',
    category: 'Кинотеатр',
    categoryIcon: 'movie',
    address: 'ул. Нурафшон, 5',
    city: 'Ташкент',
    rating: 4.6,
    reviewsCount: 856,
    description: 'Современный кинотеатр с залами IMAX и комфортными креслами.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4doVRvBO_UcLwFJsZ--YFoPgRIC3u8v-0E2mjP22v2iakqDhP4syRTAFVpbei2G7sDGaAYmSrP4_JyZvtr7tW5nejWbGQMIzf3dWCWPcvJsRC1x-j-KlrFRA-hIAUcP9ke14TwVJzNh6yeH5TwgOtySKYgWzTMCln6L9KDDfrueWuBfFVkgeeEQTup2RicFcXwRYJP14ehibNcil6ig5pCSj_U6RSgz7COm73xbhEP4B0cV5zt3Zj9dbTIIU8Mr6ybxqlmf9CW4zi',
    coordinates: { lat: 41.3384, lng: 69.2396 },
    reviews: []
  },
  {
    id: 'p4',
    name: 'Besh Qozon',
    category: 'Ресторан',
    categoryIcon: 'restaurant',
    address: 'ул. Ифтихор, 1',
    city: 'Ташкент',
    rating: 4.7,
    reviewsCount: 3420,
    description: 'Легендарный Центр плова. Готовим тонны плова каждый день в гигантских казанах.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxo5NvpugXRPKt81HisSbJpI2cPuHe4K4O7uj6cvVkPjYnHJjMtOk37yQEsHkT_yap_-84OYhJzlkro1OyUAOcN2Yr7gKwuvVjb096d21WCN6axX2UFgLHzRkg17ngVNQKDqs8auvFyH-Oe-O_K4s2NgtKHnwG5QtRw5PvGdODPr1bvmjUECTJHOTtylvnngkgDiL2_a25YI43ZxV5Yx0FpFXxXf2IFVb2W3MTEy649QZMr3Q9EAIrkFAWTiwtlmKPzfOUTlqDcLZl',
    coordinates: { lat: 41.3438, lng: 69.2837 },
    reviews: []
  }
];
```

## components/BottomNav.tsx

```tsx
import React from 'react';
import { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ currentScreen, onNavigate }) => {
  const getButtonClass = (isActive: boolean) => 
    `flex-1 flex flex-col items-center justify-center gap-1 transition-colors py-1 ${isActive ? 'text-primary' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300'}`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-xl border-t border-slate-200 dark:border-white/5 max-w-md mx-auto pb-safe">
      <div className="flex items-center justify-around pt-2 pb-1">
        <button 
          className={getButtonClass(currentScreen === Screen.HOME)}
          onClick={() => onNavigate(Screen.HOME)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.HOME ? 'filled' : ''}`}>home</span>
          <span className="text-[11px] font-medium">Главная</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.MAP)}
          onClick={() => onNavigate(Screen.MAP)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.MAP ? 'filled' : ''}`}>map</span>
          <span className="text-[11px] font-medium">Карта</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.FAVORITES)}
          onClick={() => onNavigate(Screen.FAVORITES)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.FAVORITES ? 'filled' : ''}`}>bookmark</span>
          <span className="text-[11px] font-medium">Избранное</span>
        </button>

        <button 
          className={getButtonClass(currentScreen === Screen.PROFILE)}
          onClick={() => onNavigate(Screen.PROFILE)}
        >
          <span className={`material-symbols-outlined text-[26px] ${currentScreen === Screen.PROFILE ? 'filled' : ''}`}>person</span>
          <span className="text-[11px] font-medium">Профиль</span>
        </button>
      </div>
    </nav>
  );
};

export default BottomNav;
```

## pages/Home.tsx

```tsx
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
```

## pages/PlaceDetails.tsx

```tsx
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
              <span className