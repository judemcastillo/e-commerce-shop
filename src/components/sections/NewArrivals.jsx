import { useEffect, useState, useCallback, useMemo, useRef } from "react";
import Reveal from "../animations/Reveal.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
	Heart,
	Eye,
	ShoppingCart,
	ChevronLeft,
	ChevronRight,
	Star,
} from "lucide-react";

export default function NewArrivals() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const sliderRef = useRef(null);

	// React Slick settings
	const sliderSettings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			autoplay: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		}),
		[]
	);

	// Memoized navigation handlers
	const handlePrev = useCallback(() => {
		sliderRef.current?.slickPrev();
	}, []);

	const handleNext = useCallback(() => {
		sliderRef.current?.slickNext();
	}, []);

	// Enhanced fetch with error handling
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				setLoading(true);
				setError(null);
				const response = await fetch(
					"https://fakestoreapi.com/products?limit=8"
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
	}, []);

	// Enhanced loading state
	if (loading) {
		return (
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
						<div className="w-48 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
							>
								<div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
								<div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
								<div className="w-1/2 h-4 bg-gray-200 rounded"></div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<div className="bg-red-50 border border-red-200 rounded-xl p-8">
						<h2 className="text-2xl font-bold text-red-800 mb-2">
							Oops! Something went wrong
						</h2>
						<p className="text-red-600">
							Failed to load products. Please try again later.
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
			<div className="max-w-7xl mx-auto px-4">
				{/* Enhanced Header */}
				<div className="text-center mb-16">
					<Reveal>
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
							New Arrivals
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover our latest collection of premium products, carefully
							curated just for you
						</p>
					</Reveal>
				</div>

				{/* Enhanced Carousel */}
				<div className="relative">
					{/* Navigation Buttons */}
					<button
						className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-full p-3 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
						onClick={handlePrev}
						aria-label="Previous products"
					>
						<ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
					</button>

					<button
						className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-full p-3 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
						onClick={handleNext}
						aria-label="Next products"
					>
						<ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
					</button>

					{/* Product Slider */}
					<Reveal>
						<div className="px-3">
							<Slider ref={sliderRef} {...sliderSettings}>
								{products.map((product) => (
									<div key={product.id} className="px-3">
										<ProductCard product={product} />
									</div>
								))}
							</Slider>
						</div>
					</Reveal>
				</div>
			</div>

			{/* Custom Slick Carousel Styles */}
			<style jsx>{`
				:global(.slick-slide) {
					height: auto;
				}
				:global(.slick-track) {
					display: flex;
					align-items: stretch;
				}
				:global(.slick-slide > div) {
					height: 100%;
				}
			`}</style>
		</section>
	);
}

// Extracted ProductCard component for better organization
function ProductCard({ product }) {
	const [isWishlisted, setIsWishlisted] = useState(false);

	const handleWishlistToggle = useCallback(() => {
		setIsWishlisted((prev) => !prev);
	}, []);

	// Generate star rating display
	const starRating = useMemo(() => {
		const rating = product.rating?.rate || 0;
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		return (
			<div className="flex items-center gap-1 mb-3">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`w-4 h-4 ${
							i < fullStars
								? "text-yellow-400 fill-current"
								: i === fullStars && hasHalfStar
								? "text-yellow-400 fill-current opacity-50"
								: "text-gray-300"
						}`}
					/>
				))}
				<span className="text-sm text-gray-500 ml-1">
					({product.rating?.count || 0})
				</span>
			</div>
		);
	}, [product.rating]);

	return (
		<div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xs transition-all duration-500 overflow-hidden border border-gray-200 hover:border-gray-200 h-full">
			{/* Product Image Container */}
			<div className="group relative overflow-hidden bg-white">
				<div className="aspect-square flex items-center justify-center p-8">
					<img
						src={product.image}
						alt={product.title}
						className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
						loading="lazy"
					/>
				</div>

				{/* Overlay with action buttons */}
				<div className="absolute inset-0 bg-black/0 transition-colors duration-300">
					{/* Action Buttons */}
					<div className="absolute top-4 right-4 flex flex-col gap-2">
						<button
							onClick={handleWishlistToggle}
							className={`rounded-full p-2.5 backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
								isWishlisted
									? "bg-red-500 text-white"
									: "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
							}`}
							aria-label="Add to wishlist"
						>
							<Heart
								className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
							/>
						</button>

						{/* Hidden buttons that appear on hover */}
						<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
							<button className="rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110">
								<Eye className="w-4 h-4" />
							</button>
							<button className="rounded-full bg-gray-900/90 backdrop-blur-sm p-2.5 shadow-lg text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-110">
								<ShoppingCart className="w-4 h-4" />
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Product Info */}
			<div className="p-6 space-y-3 flex-1 flex flex-col">
				{/* Category */}
				<div className="text-xs font-medium text-blue-600 uppercase tracking-wider">
					{product.category}
				</div>
				{/* Rating */}
				{starRating}

				{/* Title */}
				<h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2 h-[3.5rem] m-0 overflow-hidden truncate flex-1">
					{product.title}
				</h3>

				{/* Price */}
				<div className="flex items-center justify-between pt-2 mt-auto">
					<span className="text-2xl font-bold text-gray-900">
						${product.price}
					</span>
					<button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors duration-300 transform hover:scale-105">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}
