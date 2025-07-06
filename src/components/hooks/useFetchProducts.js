import { useEffect, useState } from "react";

export default function useFetchProducts(limit = 8) {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(
					`https://fakestoreapi.com/products?limit=${limit}`
				);

				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}

				const data = await response.json();
				setProducts(data);
			} catch (err) {
				setError(err.message);
				console.error("Failed to fetch products:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchProducts();
	}, [limit]);

	return { products, loading, error };
}