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