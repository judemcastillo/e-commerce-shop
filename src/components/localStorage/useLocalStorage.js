import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initialValue) => {
  // Get from local storage then parse stored json or return initialValue
  const readValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(readValue);

  // Return a wrapped version of useState's setter function that persists the new value to localStorage
  const setValue = (value) => {
    try {
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(value));
      // Save state
      setStoredValue(value);
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    setStoredValue(readValue());
  }, []);

  return [storedValue, setValue];
};