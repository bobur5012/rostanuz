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