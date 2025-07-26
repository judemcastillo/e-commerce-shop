import { useState, useEffect } from "react";

export const useLocalStorage = (key, initialValue) => {
	// State to store our value
	// Pass initial state function to useState so logic is only executed once
	const [storedValue, setStoredValue] = useState(() => {
		// Prevent build error by checking if window is defined
		if (typeof window === "undefined") {
			return initialValue;
		}

		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);

			// If no item, return initial value
			if (item === null) {
				return initialValue;
			}

			// Check for corrupted data (when the key itself was stored as value)
			if (item === key || item === `"${key}"`) {
				console.warn(
					`Corrupted data in localStorage for key "${key}". Resetting...`
				);
				window.localStorage.removeItem(key);
				return initialValue;
			}

			// Parse stored json
			const parsed = JSON.parse(item);

			// Additional validation: ensure the parsed value is the expected type
			if (initialValue instanceof Array && !Array.isArray(parsed)) {
				console.warn(
					`Expected array for key "${key}" but got ${typeof parsed}. Resetting...`
				);
				window.localStorage.removeItem(key);
				return initialValue;
			}

			return parsed;
		} catch (error) {
			// If error also return initialValue
			console.warn(`Error reading localStorage key "${key}":`, error);
			// Remove corrupted data
			window.localStorage.removeItem(key);
			return initialValue;
		}
	});

	// Return a wrapped version of useState's setter function that ...
	// ... persists the new value to localStorage.
	const setValue = (value) => {
		try {
			// Allow value to be a function so we have same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;

			// Save state
			setStoredValue(valueToStore);

			// Save to local storage
			if (typeof window !== "undefined") {
				window.localStorage.setItem(key, JSON.stringify(valueToStore));
			}
		} catch (error) {
			// A more advanced implementation would handle the error case
			console.warn(`Error setting localStorage key "${key}":`, error);
		}
	};

	// Listen for changes in other tabs/windows
	useEffect(() => {
		if (typeof window === "undefined") return;

		const handleStorageChange = (e) => {
			if (e.key === key && e.newValue !== null) {
				try {
					setStoredValue(JSON.parse(e.newValue));
				} catch (error) {
					console.warn(
						`Error parsing localStorage value for key "${key}":`,
						error
					);
				}
			}
		};

		// Listen for storage changes
		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, [key]);

	return [storedValue, setValue];
};
