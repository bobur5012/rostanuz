import React, { useState, useEffect, useCallback } from 'react';
import { Screen, Place, Review, User } from './types';
import { API_URL } from './config';
import Home from './pages/Home';
import BottomNav from './components/BottomNav';
import PlaceDetails from './pages/PlaceDetails';
import AddPlace from './pages/AddPlace';
import AddReview from './pages/AddReview';
import ReviewsList from './pages/ReviewsList';
import MapPage from './pages/MapPage';
import Profile from './pages/Profile';
import Favorites from './pages/Favorites';
import UserLists from './pages/UserLists';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Login from './pages/Login';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>(Screen.HOME); // Default to HOME
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);

  // Global State
  const [places, setPlaces] = useState<Place[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [myReviews, setMyReviews] = useState<Review[]>([]);
  const [likedReviewIds, setLikedReviewIds] = useState<Set<string>>(new Set());

  // User Settings
  const [isAvatarVisible, setIsAvatarVisible] = useState(true);
  const [isUsernameVisible, setIsUsernameVisible] = useState(true);

  // Check for stored session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('rostan_user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);

      // Fetch favorites for returning user
      fetch(`${API_URL}/api/users/${user.id}/favorites`)
        .then(res => res.json())
        .then(data => {
          if (data && Array.isArray(data)) {
            setFavorites(data.map((p: any) => p.id));
          }
        })
        .catch(err => console.error("Error fetching favorites:", err));
    }

    // Fetch places from backend
    fetch(`${API_URL}/api/places`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setPlaces(data);
        }
      })
      .catch(err => console.error("Error fetching places:", err));
  }, []);

  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const handleLogin = useCallback((backendUser: any) => {
    if (!backendUser) {
      console.error('handleLogin: backendUser is null or undefined');
      return;
    }

    console.log('handleLogin: received user data:', backendUser);

    // Use the UUID id from database, not telegramId
    if (!backendUser.id) {
      console.error('handleLogin: backendUser.id is missing', backendUser);
      alert('Ошибка: не получен ID пользователя');
      return;
    }

    // Support both Prisma camelCase and Telegram/DB snake_case
    const newUser: User = {
      id: String(backendUser.id), // Use UUID from database
      name: (backendUser.firstName || backendUser.first_name)
        ? `${backendUser.firstName || backendUser.first_name} ${backendUser.lastName || backendUser.last_name || ''}`.trim()
        : backendUser.name || 'Пользователь',
      username: backendUser.username ? (backendUser.username.startsWith('@') ? backendUser.username : `@${backendUser.username}`) : '@user',
      avatar: backendUser.photoUrl || backendUser.photo_url || backendUser.avatar || `https://ui-avatars.com/api/?name=${backendUser.firstName || backendUser.first_name || 'U'}`,
      isVerified: backendUser.isVerified || backendUser.is_verified || false,
      reviewsCount: backendUser.reviewsCount || backendUser.reviews_count || 0,
      placesCount: backendUser.placesCount || backendUser.places_count || 0
    };

    console.log('handleLogin: created newUser:', newUser);

    setCurrentUser(newUser);
    localStorage.setItem('rostan_user', JSON.stringify(newUser));

    // Switch screen to PROFILE immediately
    setCurrentScreen(Screen.PROFILE);

    // Background fetch favorites
    fetch(`${API_URL}/api/users/${newUser.id}/favorites`)
      .then(res => {
        if (!res.ok) {
          console.error('Failed to fetch favorites:', res.status, res.statusText);
          return [];
        }
        return res.json();
      })
      .then(data => {
        if (data && Array.isArray(data)) {
          setFavorites(data.map((p: any) => p.id));
        }
      })
      .catch(err => console.error("Error fetching favorites:", err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('rostan_user');
    setCurrentUser(null);
    setCurrentScreen(Screen.HOME);
  };

  const handleNavigate = (screen: Screen, params?: any) => {
    // PROTECTED ROUTES: Check if user is logged in
    const protectedScreens = [Screen.PROFILE, Screen.ADD_PLACE, Screen.ADD_REVIEW, Screen.MY_REVIEWS, Screen.MY_PLACES];

    if (protectedScreens.includes(screen) && !currentUser) {
      setCurrentScreen(Screen.LOGIN);
      return;
    }

    if (screen === Screen.PLACE_DETAILS && params) {
      setSelectedPlaceId((params as Place).id);
    }
    if (screen === Screen.ADD_REVIEW && params) {
      setSelectedPlaceId(params);
    }
    setCurrentScreen(screen);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    // If on Login screen, go back to Home
    if (currentScreen === Screen.LOGIN) {
      setCurrentScreen(Screen.HOME);
      return;
    }

    if (currentScreen === Screen.PLACE_DETAILS || currentScreen === Screen.ADD_PLACE || currentScreen === Screen.ADD_REVIEW || currentScreen === Screen.REVIEWS_LIST || currentScreen === Screen.MY_REVIEWS || currentScreen === Screen.MY_PLACES || currentScreen === Screen.PRIVACY_POLICY) {
      if (currentScreen === Screen.ADD_REVIEW || currentScreen === Screen.REVIEWS_LIST) {
        setCurrentScreen(Screen.PLACE_DETAILS);
      } else if (currentScreen === Screen.MY_REVIEWS || currentScreen === Screen.MY_PLACES || currentScreen === Screen.PRIVACY_POLICY) {
        setCurrentScreen(Screen.PROFILE);
      } else {
        setCurrentScreen(Screen.HOME);
      }
    } else {
      setCurrentScreen(Screen.HOME);
    }
  };

  // Logic Handlers
  const toggleFavorite = (e: React.MouseEvent, placeId: string) => {
    e.stopPropagation();
    if (!currentUser) {
      setCurrentScreen(Screen.LOGIN);
      return;
    }

    const isFavorite = favorites.includes(placeId);
    const method = isFavorite ? 'DELETE' : 'POST';

    fetch(`${API_URL}/api/favorites`, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id, placeId })
    })
      .then(() => {
        setFavorites(prev =>
          isFavorite ? prev.filter(id => id !== placeId) : [...prev, placeId]
        );
      })
      .catch(err => console.error("Error toggling favorite:", err));
  };

  const handleLikeReview = (placeId: string, reviewId: string) => {
    // Note: Implementing real likes would require a separate ReviewLike table in DB
    // For now, we'll keep it local or just simulate for 'powerful' effect
    const isLiked = likedReviewIds.has(reviewId);
    setPlaces(prevPlaces => prevPlaces.map(place => {
      if (place.id !== placeId) return place;
      const updatedReviews = place.reviews?.map(review => {
        if (review.id !== reviewId) return review;
        return {
          ...review,
          likes: isLiked ? Math.max(0, review.likes - 1) : review.likes + 1
        };
      });
      return { ...place, reviews: updatedReviews };
    }));
    setLikedReviewIds(prev => {
      const next = new Set(prev);
      if (isLiked) next.delete(reviewId);
      else next.add(reviewId);
      return next;
    });
  };

  const handleAddPlace = (newPlaceData: Partial<Place>) => {
    if (!currentUser) return;

    fetch(`${API_URL}/api/places`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...newPlaceData,
        userId: currentUser.id,
        latitude: newPlaceData.coordinates?.lat || 41.311081,
        longitude: newPlaceData.coordinates?.lng || 69.240562
      })
    })
      .then(res => res.json())
      .then(data => {
        setPlaces([data, ...places]);
        handleNavigate(Screen.HOME);
      })
      .catch(err => console.error("Error adding place:", err));
  };

  const handleAddReview = (rating: number, text: string) => {
    if (!selectedPlaceId || !currentUser) return;

    fetch(`${API_URL}/api/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text,
        rating,
        userId: currentUser.id,
        placeId: selectedPlaceId,
        images: [] // Handle image uploads if needed
      })
    })
      .then(res => res.json())
      .then(newReview => {
        setMyReviews([newReview, ...myReviews]);
        setPlaces(places.map(p => {
          if (p.id === selectedPlaceId) {
            const updatedReviews = [newReview, ...(p.reviews || [])];
            const newRating = ((p.rating * (p.reviewsCount || 0)) + rating) / ((p.reviewsCount || 0) + 1);
            return {
              ...p,
              reviews: updatedReviews,
              reviewsCount: (p.reviewsCount || 0) + 1,
              rating: parseFloat(newRating.toFixed(1))
            };
          }
          return p;
        }));
        handleNavigate(Screen.PLACE_DETAILS, { id: selectedPlaceId });
      })
      .catch(err => console.error("Error adding review:", err));
  };

  // Helpers
  const getSelectedPlace = () => places.find(p => p.id === selectedPlaceId) || places[0];
  const getFavoritePlaces = () => places.filter(p => favorites.includes(p.id));
  const getMyPlaces = () => places.filter(p => parseInt(p.id.replace('p', '')) > 100);

  const renderScreen = () => {
    switch (currentScreen) {
      case Screen.HOME:
        return <Home onNavigate={handleNavigate} places={places} favorites={favorites} onToggleFavorite={toggleFavorite} onLikeReview={handleLikeReview} likedReviewIds={likedReviewIds} />;
      case Screen.PLACE_DETAILS:
        const place = getSelectedPlace();
        return <PlaceDetails place={place} onNavigate={handleNavigate} isFavorite={favorites.includes(place.id)} onToggleFavorite={(e) => toggleFavorite(e, place.id)} />;
      case Screen.ADD_PLACE:
        return <AddPlace onBack={handleBack} onAdd={handleAddPlace} />;
      case Screen.ADD_REVIEW:
        return <AddReview onBack={handleBack} onAdd={handleAddReview} />;
      case Screen.REVIEWS_LIST:
        const selectedPlace = getSelectedPlace();
        return <ReviewsList onBack={handleBack} onNavigate={handleNavigate} place={selectedPlace} onLikeReview={handleLikeReview} likedReviewIds={likedReviewIds} />;
      case Screen.MAP:
        return <MapPage onBack={handleBack} onNavigate={handleNavigate} places={places} />;
      case Screen.PROFILE:
        // Safe check, though navigation logic handles it, TS might complain or rendering could glitch
        if (!currentUser) return <Login onLogin={handleLogin} onBack={handleBack} />;
        return <Profile
          onBack={handleBack}
          onNavigate={handleNavigate}
          myReviewsCount={myReviews.length}
          myPlacesCount={getMyPlaces().length}
          isAvatarVisible={isAvatarVisible}
          onToggleAvatar={() => setIsAvatarVisible(!isAvatarVisible)}
          isUsernameVisible={isUsernameVisible}
          onToggleUsername={() => setIsUsernameVisible(!isUsernameVisible)}
        />;
      case Screen.FAVORITES:
        return <Favorites onNavigate={handleNavigate} places={getFavoritePlaces()} favorites={favorites} onToggleFavorite={toggleFavorite} />;
      case Screen.MY_REVIEWS:
        return <UserLists title="Мои отзывы" type="reviews" data={myReviews} onBack={handleBack} onNavigate={handleNavigate} />;
      case Screen.MY_PLACES:
        return <UserLists title="Мои места" type="places" data={getMyPlaces()} onBack={handleBack} onNavigate={handleNavigate} />;
      case Screen.PRIVACY_POLICY:
        return <PrivacyPolicy onBack={handleBack} />;
      case Screen.LOGIN:
        return <Login onLogin={handleLogin} onBack={handleBack} />;
      default:
        return <Home onNavigate={handleNavigate} places={places} favorites={favorites} onToggleFavorite={toggleFavorite} onLikeReview={handleLikeReview} likedReviewIds={likedReviewIds} />;
    }
  };

  const showBottomNav = [Screen.HOME, Screen.MAP, Screen.PROFILE, Screen.FAVORITES].includes(currentScreen);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark text-slate-900 dark:text-white">
      {renderScreen()}
      {/* Do not show Bottom Nav on Login screen */}
      {showBottomNav && currentScreen !== Screen.LOGIN && <BottomNav currentScreen={currentScreen} onNavigate={handleNavigate} />}
    </div>
  );
};

export default App;