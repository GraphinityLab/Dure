// Utility functions for persisting selected service in localStorage

const STORAGE_KEY = 'dure_selected_service';

export const saveSelectedService = (service) => {
  try {
    const serviceData = {
      service_id: service.service_id || '',
      name: service.name || '',
      price: service.price || '0',
      category: service.category || '',
      duration: service.duration || service.duration_minutes || ''
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serviceData));
  } catch (error) {
    console.error('Error saving selected service:', error);
  }
};

export const getSelectedService = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch (error) {
    console.error('Error reading selected service:', error);
    return null;
  }
};

export const clearSelectedService = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing selected service:', error);
  }
};

