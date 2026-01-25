import React, { useState, useRef, useEffect } from 'react';
import { Place, Screen } from '../types';
import { API_URL } from '../config';

interface AddPlaceProps {
  onBack: () => void;
  onAdd: (place: Partial<Place>) => void;
}

const AddPlace: React.FC<AddPlaceProps> = ({ onBack, onAdd }) => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Map State
  const [isMapOpen, setIsMapOpen] = useState(false);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    city: 'Ташкент',
    address: '',
    description: '',
    coordinates: { lat: 41.311081, lng: 69.240562 }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  // Handle Image Upload
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const url = URL.createObjectURL(file);
      setImagePreview(url);
    }
  };

  // Handle Map Picker
  useEffect(() => {
    if (isMapOpen && mapContainerRef.current && window.ymaps) {
      window.ymaps.ready(() => {
        if (mapInstanceRef.current) return;

        const map = new window.ymaps.Map(mapContainerRef.current, {
          center: [formData.coordinates.lat, formData.coordinates.lng],
          zoom: 13,
          controls: ['zoomControl']
        });
        mapInstanceRef.current = map;

        // Add click listener
        map.events.add('click', async (e: any) => {
          const coords = e.get('coords'); // [lat, lng]

          // Update marker
          if (placemarkRef.current) {
            placemarkRef.current.geometry.setCoordinates(coords);
          } else {
            const placemark = new window.ymaps.Placemark(coords, {}, {
              preset: 'islands#redDotIcon',
              draggable: true
            });
            map.geoObjects.add(placemark);
            placemarkRef.current = placemark;

            // Listener for drag end
            placemark.events.add('dragend', async (evt: any) => {
              const newCoords = evt.get('target').geometry.getCoordinates();
              updateLocationFromCoords(newCoords);
            });
          }

          await updateLocationFromCoords(coords);
        });
      });
    }

    return () => {
      // Cleanup if needed, though usually we keep map instance if user closes/reopens in same session
      // For this simple case, we destroy on unmount if we were really navigating away, 
      // but here we just hide the modal. We can keep it or destroy it.
      // Let's destroy to save memory if closed.
      if (!isMapOpen && mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
        placemarkRef.current = null;
      }
    };
  }, [isMapOpen]);

  const updateLocationFromCoords = async (coords: number[]) => {
    // Update coordinates in state
    setFormData(prev => ({
      ...prev,
      coordinates: { lat: coords[0], lng: coords[1] }
    }));

    // Reverse geocoding to get address
    try {
      const res = await window.ymaps.geocode(coords);
      const firstGeoObject = res.geoObjects.get(0);
      const addressLine = firstGeoObject.getAddressLine();

      if (addressLine) {
        // Try to strip City from address if possible for cleaner look
        // But simplest is just set the whole line
        setFormData(prev => ({ ...prev, address: addressLine }));
      }
    } catch (e) {
      console.error("Geocoding failed", e);
    }
  };

  const confirmMapSelection = () => {
    setIsMapOpen(false);
  };


  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.category || !formData.address) return;

    setStatus('loading');

    try {
      let finalImageUrl = imagePreview || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1000&auto=format&fit=crop';

      // If we have a real file, upload it
      if (imageFile) {
        const formDataUpload = new FormData();
        formDataUpload.append('image', imageFile);

        const uploadRes = await fetch(`${API_URL}/api/upload`, {
          method: 'POST',
          body: formDataUpload
        });

        const uploadData = await uploadRes.json();
        if (uploadData.url) {
          finalImageUrl = `${API_URL}${uploadData.url}`;
        }
      }

      setStatus('success');
      // Perform addition
      onAdd({
        ...formData,
        image: finalImageUrl
      });
    } catch (error) {
      console.error("Error during submission:", error);
      setStatus('idle');
    }
  };

  return (
    <>
      {status === 'success' && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/80 dark:bg-[#101c22]/90 backdrop-blur-md animate-fade-in">
          <div className="flex flex-col items-center p-8 rounded-3xl bg-white dark:bg-surface-dark shadow-2xl animate-scale-in border border-slate-100 dark:border-slate-800">
            <div className="size-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 mb-6">
              <span className="material-symbols-outlined text-white text-[40px] font-bold">check</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 text-center">Добавлено!</h2>
            <p className="text-slate-500 dark:text-slate-400 text-center max-w-[250px] leading-relaxed">
              Заведение успешно добавлено в список.
            </p>
          </div>
        </div>
      )}

      {/* Map Picker Modal */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[70] flex flex-col bg-background-light dark:bg-background-dark animate-fade-in">
          <div className="relative flex-1 bg-gray-200">
            <div ref={mapContainerRef} className="absolute inset-0 w-full h-full" />

            {/* Map Controls Overlay */}
            <div className="absolute top-4 left-0 right-0 px-4 flex justify-between items-start pointer-events-none">
              <button
                onClick={() => setIsMapOpen(false)}
                className="pointer-events-auto size-10 rounded-full bg-white dark:bg-slate-800 shadow-lg flex items-center justify-center text-slate-900 dark:text-white"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
              <div className="pointer-events-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur px-4 py-2 rounded-xl shadow-lg">
                <p className="text-xs font-semibold text-center text-slate-900 dark:text-white">Коснитесь карты,</p>
                <p className="text-xs text-center text-slate-500">чтобы выбрать место</p>
              </div>
              <div className="size-10"></div>
            </div>

            <div className="absolute bottom-10 left-4 right-4 pointer-events-none">
              <button
                onClick={confirmMapSelection}
                className="pointer-events-auto w-full py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 active:scale-95 transition-transform"
              >
                Подтвердить адрес
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="relative flex h-screen w-full flex-col overflow-hidden max-w-md mx-auto bg-background-light dark:bg-background-dark animate-slide-up">
        <header className="flex items-center justify-between px-4 py-4 pt-safe bg-background-light dark:bg-background-dark z-10 shrink-0">
          <button
            onClick={onBack}
            className="flex size-10 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white"
            disabled={status !== 'idle'}
          >
            <span className="material-symbols-outlined text-[24px]">arrow_back</span>
          </button>
          <h2 className="text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 text-slate-900 dark:text-white">
            Добавить место
          </h2>
        </header>

        <main className="flex-1 overflow-y-auto no-scrollbar pb-24 px-4">

          {/* Image Upload Area */}
          <div className="mb-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <div
              onClick={handleImageClick}
              className={`w-full h-48 rounded-2xl border-2 border-dashed transition-all cursor-pointer relative overflow-hidden group ${imagePreview ? 'border-transparent' : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800'}`}
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-white text-[32px]">edit</span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 dark:text-slate-500">
                  <span className="material-symbols-outlined text-[40px] mb-2">add_a_photo</span>
                  <span className="text-sm font-medium">Добавить фото</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal ml-1">Название места <span className="text-primary">*</span></label>
            <div className="relative">
              <input name="name" onChange={handleChange} value={formData.name} className="form-input flex w-full min-w-0 flex-1 resize-none rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2630] focus:border-primary h-12 px-4 text-base font-normal leading-normal shadow-sm transition-all" placeholder="например, Osh Markazi" type="text" />
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal ml-1">Категория <span className="text-primary">*</span></label>
            <div className="relative">
              <select name="category" onChange={handleChange} value={formData.category} className="form-select flex w-full min-w-0 flex-1 appearance-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2630] focus:border-primary h-12 px-4 pr-10 text-base font-normal leading-normal shadow-sm transition-all">
                <option disabled value="">Выберите категорию...</option>
                <option value="Ресторан">Ресторан</option>
                <option value="Кофейня">Кофейня</option>
                <option value="Бар">Бар</option>
                <option value="Отель">Отель</option>
                <option value="Парк">Парк</option>
                <option value="Магазин">Магазин</option>
                <option value="Кинотеатр">Кинотеатр</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 dark:text-slate-400">
                <span className="material-symbols-outlined">expand_more</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal ml-1">Город <span className="text-primary">*</span></label>
            <div className="relative">
              <input name="city" onChange={handleChange} value={formData.city} className="form-input flex w-full min-w-0 flex-1 resize-none rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2630] focus:border-primary h-12 px-4 text-base font-normal leading-normal shadow-sm transition-all" placeholder="например, Ташкент" type="text" />
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                <span className="material-symbols-outlined text-[20px]">location_city</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-5">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal ml-1">Адрес <span className="text-primary">*</span></label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input name="address" onChange={handleChange} value={formData.address} className="form-input flex w-full min-w-0 flex-1 resize-none rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2630] focus:border-primary h-12 px-4 pr-10 text-base font-normal leading-normal shadow-sm transition-all" placeholder="Адрес или точка на карте" type="text" />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-slate-400">
                  <span className="material-symbols-outlined text-[20px]">pin_drop</span>
                </div>
              </div>
              <button
                onClick={() => setIsMapOpen(true)}
                className="shrink-0 size-12 rounded-lg bg-primary/10 hover:bg-primary/20 active:bg-primary/30 text-primary flex items-center justify-center transition-colors border border-primary/20"
                type="button"
              >
                <span className="material-symbols-outlined">map</span>
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-1 mb-6">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-medium leading-normal ml-1">Описание <span className="text-slate-400 font-normal ml-1">(необязательно)</span></label>
            <div className="relative">
              <textarea name="description" onChange={handleChange} value={formData.description} className="form-textarea flex w-full min-w-0 flex-1 resize-none rounded-lg text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-0 focus:ring-2 focus:ring-primary/20 border border-slate-200 dark:border-slate-700 bg-white dark:bg-[#1A2630] focus:border-primary p-4 text-base font-normal leading-normal shadow-sm transition-all h-32" placeholder="Расскажите об этом месте..."></textarea>
            </div>
          </div>

          <div className="h-8"></div>
        </main>

        <div className="absolute bottom-0 left-0 w-full p-4 pb-safe bg-background-light/90 dark:bg-background-dark/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 z-20">
          <button
            onClick={handleSubmit}
            disabled={status === 'loading'}
            className={`w-full h-14 bg-primary hover:bg-sky-400 active:bg-sky-600 text-white font-bold rounded-lg shadow-lg shadow-primary/30 transition-all flex items-center justify-center gap-2 group ${status === 'loading' ? 'opacity-80 cursor-wait' : ''}`}
          >
            {status === 'loading' ? (
              <div className="size-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <>
                <span>Добавить</span>
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">add_circle</span>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default AddPlace;