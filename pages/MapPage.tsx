import React, { useEffect, useRef, useState } from 'react';
import { Place, Screen } from '../types';

// Declare Yandex Maps Types globally for TS
declare const ymaps: any;

declare global {
  interface Window {
    ymaps: any;
  }
}

interface MapPageProps {
  onBack: () => void;
  onNavigate: (screen: Screen, params?: any) => void;
  places: Place[];
}

const MapPage: React.FC<MapPageProps> = ({ onBack, onNavigate, places }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const objectManagerRef = useRef<any>(null);
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  // Initialize Map
  useEffect(() => {
    if (!mapRef.current || !window.ymaps) return;

    window.ymaps.ready(() => {
        if (mapInstanceRef.current) return; // Prevent double init

        const map = new ymaps.Map(mapRef.current, {
            center: [41.311081, 69.240562], // Tashkent Center
            zoom: 12,
            controls: [] // We will add custom controls or leave clean
        }, {
            suppressMapOpenBlock: true,
            yandexMapDisablePoiInteractivity: true
        });

        mapInstanceRef.current = map;

        // Use ObjectManager for better performance and handling
        const objectManager = new ymaps.ObjectManager({
            clusterize: false, // Turn off clustering for small amount of points
            gridSize: 32,
            geoObjectOpenBalloonOnClick: false // We use our own UI
        });
        
        objectManagerRef.current = objectManager;
        map.geoObjects.add(objectManager);

        // Handle clicks on map objects
        objectManager.objects.events.add('click', (e: any) => {
            const objectId = e.get('objectId');
            const place = places.find(p => p.id === objectId);
            if (place) {
                setSelectedPlace(place);
                // Center map on click (optional)
                map.panTo([place.coordinates.lat, place.coordinates.lng], {
                     delay: 0,
                     duration: 300
                });
            }
        });

        // Handle click on empty map to deselect
        map.events.add('click', () => {
             setSelectedPlace(null);
        });

        setIsMapReady(true);
        updateMapMarkers('all'); // Initial render
    });

    // Cleanup
    return () => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.destroy();
            mapInstanceRef.current = null;
        }
    };
  }, []);

  // Update markers when places prop changes or category changes
  useEffect(() => {
    if (isMapReady) {
        updateMapMarkers(activeCategory);
    }
  }, [activeCategory, isMapReady, places]);

  const updateMapMarkers = (category: string) => {
      if (!objectManagerRef.current) return;

      const om = objectManagerRef.current;
      om.removeAll();

      const filtered = category === 'all' 
        ? places 
        : places.filter(p => {
            if (category === 'Кафе') return p.category === 'Кофейня' || p.category === 'Кафе';
            if (category === 'Еда') return p.category === 'Ресторан';
            if (category === 'Кино') return p.category === 'Кинотеатр';
            return true;
        });

      const features = filtered.map(place => ({
          type: 'Feature',
          id: place.id,
          geometry: {
              type: 'Point',
              coordinates: [place.coordinates.lat, place.coordinates.lng]
          },
          properties: {
              balloonContent: place.name,
              hintContent: place.name
          },
          options: {
              preset: 'islands#blueCircleIcon', // Standard minimal icon
              iconColor: '#2baaee' // Primary color
          }
      }));

      om.add({
          type: 'FeatureCollection',
          features: features
      });
  };

  const handleMyLocation = () => {
      if (!mapInstanceRef.current) return;
      
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              mapInstanceRef.current.panTo([latitude, longitude], {
                  delay: 0,
                  duration: 500,
                  zoom: 15
              });
          }, (error) => {
              console.error("Geo error", error);
              alert("Не удалось определить местоположение");
          });
      }
  };

  const categories = [
    {name: 'Кафе', icon: 'local_cafe', color: 'text-primary'},
    {name: 'Еда', icon: 'restaurant', color: 'text-orange-400'},
    {name: 'Кино', icon: 'movie', color: 'text-purple-400'}
  ];

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col overflow-hidden pb-20 max-w-md mx-auto bg-background-light dark:bg-background-dark">
      
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 w-full h-full z-0 bg-gray-200 dark:bg-[#1a2c35]" />

      {/* Top UI Overlay */}
      <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-safe mt-4 pb-2 pointer-events-none">
        <header className="flex items-center justify-between pointer-events-auto">
          <div className="bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-slate-200 dark:border-white/10 flex items-center gap-2">
            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Карта</h1>
          </div>
          <div className="flex gap-2">
            {/* Filter button removed as requested */}
            <button 
              onClick={() => onNavigate(Screen.ADD_PLACE)}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white shadow-lg shadow-primary/30 transition-colors"
            >
              <span className="material-symbols-outlined text-[26px]">add</span>
            </button>
          </div>
        </header>

        {/* Filter Pills */}
        <div className="mt-4 pointer-events-auto overflow-x-auto no-scrollbar pb-2">
          <div className="flex gap-2 pr-5 min-w-max">
            <button 
                onClick={() => setActiveCategory('all')}
                className={`flex h-8 items-center justify-center px-4 rounded-full shadow-md transition-all active:scale-95 ${activeCategory === 'all' ? 'bg-primary text-white shadow-primary/20' : 'bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-md text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-white/10'}`}
            >
              <span className="text-xs font-semibold">Все</span>
            </button>
            {categories.map(cat => (
                <button 
                    key={cat.name} 
                    onClick={() => setActiveCategory(cat.name)}
                    className={`flex h-8 items-center justify-center px-4 rounded-full shadow-sm border transition-all active:scale-95 ${activeCategory === cat.name ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-transparent' : 'bg-white/90 dark:bg-[#101c22]/90 backdrop-blur-md border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'}`}
                >
                    <span className={`material-symbols-outlined text-[16px] mr-1.5 ${activeCategory === cat.name ? 'text-inherit' : cat.color}`}>{cat.icon}</span>
                    <span className="text-xs font-medium">{cat.name}</span>
                </button>
            ))}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {!isMapReady && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-background-light dark:bg-background-dark">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      )}

      {/* Bottom Controls & Card */}
      <div className="absolute bottom-[calc(88px+env(safe-area-inset-bottom))] left-0 right-0 p-5 z-20 pointer-events-none">
        
        {/* Selected Place Card */}
        {selectedPlace && (
            <div 
                onClick={() => onNavigate(Screen.PLACE_DETAILS, selectedPlace)}
                className="pointer-events-auto mb-4 group flex flex-row-reverse items-stretch justify-between gap-4 rounded-2xl bg-white dark:bg-slate-800 p-3 shadow-xl ring-1 ring-slate-900/5 dark:ring-white/5 transition-all animate-scale-in cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/80"
            >
            <div className="w-24 h-24 shrink-0 rounded-xl bg-gray-200 dark:bg-gray-700 bg-center bg-cover relative" style={{ backgroundImage: `url("${selectedPlace.image}")` }}>
                <button className="absolute top-1 right-1 bg-black/40 hover:bg-black/60 backdrop-blur-sm p-1 rounded-full text-white transition-colors">
                    <span className="material-symbols-outlined text-[16px]">favorite</span>
                </button>
            </div>
            <div className="flex flex-col justify-between flex-1 py-1 min-w-0">
                <div>
                    <div className="flex items-center gap-1 mb-1">
                        <span className="material-symbols-outlined text-[16px] text-yellow-400 filled">star</span>
                        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">{selectedPlace.rating > 0 ? selectedPlace.rating : '-'}</span>
                        <span className="text-xs text-slate-400 dark:text-slate-500 ml-1">• {selectedPlace.category}</span>
                    </div>
                    <h2 className="text-base font-bold leading-tight text-slate-900 dark:text-white truncate">{selectedPlace.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 truncate">{selectedPlace.address}</p>
                </div>
                <div className="flex items-center gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-medium ${selectedPlace.isOpen ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'}`}>
                        {selectedPlace.isOpen ? 'Открыто' : 'Закрыто'}
                    </span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500">• {selectedPlace.distance || 'Рядом'}</span>
                </div>
            </div>
            </div>
        )}
        
        {/* Floating Action Button for Location */}
        <div className="flex justify-end pointer-events-auto">
          <button 
            onClick={handleMyLocation}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg text-slate-700 dark:text-slate-200 ring-1 ring-slate-900/5 dark:ring-white/10 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors active:scale-95"
          >
            <span className="material-symbols-outlined text-[24px]">my_location</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapPage;