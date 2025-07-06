import { useState, useCallback, useMemo, useEffect } from "react";
import { createPortal } from 'react-dom';
import {
	Heart,
	Eye,
	ShoppingCart,
	Star,
	X,
	Plus,
	Minus,
} from "lucide-react";

// Modal component using React Portal
function ProductModal({ product, isOpen, onClose, isWishlisted, onWishlistToggle }) {
	const [quantity, setQuantity] = useState(1);

	useEffect(() => {
		// Handle body scroll and escape key
		if (isOpen) {
			document.body.style.overflow = 'hidden';
			
			const handleEscape = (e) => {
				if (e.key === 'Escape') {
					onClose();
				}
			};
			
			document.addEventListener('keydown', handleEscape);
			
			return () => {
				document.removeEventListener('keydown', handleEscape);
			};
		} else {
			document.body.style.overflow = 'unset';
		}
		
		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen, onClose]);

	const handleIncreaseQuantity = () => {
		setQuantity(prev => prev + 1);
	};

	const handleDecreaseQuantity = () => {
		setQuantity(prev => prev > 1 ? prev - 1 : 1);
	};

	// Large star rating for modal
	const largeStarRating = useMemo(() => {
		const rating = product.rating?.rate || 0;
		const fullStars = Math.floor(rating);
		const hasHalfStar = rating % 1 >= 0.5;

		return (
			<div className="flex items-center gap-2">
				{[...Array(5)].map((_, i) => (
					<Star
						key={i}
						className={`w-6 h-6 ${
							i < fullStars
								? "text-yellow-400 fill-current"
								: i === fullStars && hasHalfStar
								? "text-yellow-400 fill-current opacity-50"
								: "text-gray-300"
						}`}
					/>
				))}
				<span className="text-gray-600 ml-2">
					{rating.toFixed(1)} ({product.rating?.count || 0} reviews)
				</span>
			</div>
		);
	}, [product.rating]);

	if (!isOpen) return null;

	return createPortal(
		<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
			{/* Backdrop */}
			<div 
				className="absolute inset-0 bg-black/60 backdrop-blur-sm"
				onClick={onClose}
			/>
			
			{/* Modal Content */}
			<div className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden animate-in fade-in zoom-in duration-300">
				{/* Close Button */}
				<button
					onClick={onClose}
					className="absolute top-4 right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg hover:bg-gray-100 transition-colors"
				>
					<X className="w-5 h-5" />
				</button>

				<div className="flex flex-col md:flex-row h-full">
					{/* Image Section */}
					<div className="md:w-1/2 bg-gray-50 p-8 flex items-center justify-center">
						<img
							src={product.image}
							alt={product.title}
							className="max-w-full max-h-96 object-contain"
						/>
					</div>

					{/* Details Section */}
					<div className="md:w-1/2 p-8 overflow-y-auto">
						{/* Category */}
						<div className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">
							{product.category}
						</div>

						{/* Title */}
						<h2 className="text-2xl font-bold text-gray-900 mb-4">
							{product.title}
						</h2>

						{/* Rating */}
						<div className="mb-6">{largeStarRating}</div>

						{/* Price */}
						<div className="text-3xl font-bold text-gray-900 mb-6">
							${product.price}
						</div>

						{/* Description */}
						<div className="mb-6">
							<h3 className="font-semibold text-gray-900 mb-2">Description</h3>
							<p className="text-gray-600 leading-relaxed">
								{product.description}
							</p>
						</div>

						{/* Quantity Selector */}
						<div className="mb-6">
							<h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
							<div className="flex items-center gap-4">
								<button
									onClick={handleDecreaseQuantity}
									className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
								>
									<Minus className="w-4 h-4" />
								</button>
								<span className="text-xl font-semibold w-12 text-center">
									{quantity}
								</span>
								<button
									onClick={handleIncreaseQuantity}
									className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 transition-colors"
								>
									<Plus className="w-4 h-4" />
								</button>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex gap-4">
							<button className="flex-1 bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
								<ShoppingCart className="w-5 h-5" />
								Add to Cart
							</button>
							<button
								onClick={onWishlistToggle}
								className={`p-3 rounded-full transition-colors ${
									isWishlisted
										? "bg-red-500 text-white"
										: "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
								}`}
							>
								<Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
							</button>
						</div>

						{/* Additional Info */}
						<div className="mt-6 pt-6 border-t border-gray-200">
							<div className="flex items-center gap-2 text-sm text-gray-600">
								<span className="font-semibold">SKU:</span>
								<span>#{product.id}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>,
		document.body // Render to body instead of within the component
	);
}

export default function ProductCard({ product }) {
	const [isWishlisted, setIsWishlisted] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const handleWishlistToggle = useCallback(() => {
		setIsWishlisted((prev) => !prev);
	}, []);

	const handleOpenModal = useCallback(() => {
		setShowModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
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
		<>
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
									className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""} `}
								/>
							</button>

							{/* Hidden buttons that appear on hover */}
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
								<button 
									onClick={handleOpenModal}
									className="rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg text-gray-700 hover:bg-blue-500 hover:text-white transition-all duration-300 transform hover:scale-110"
								>
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
						<button className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-transform duration-300 cursor-pointer transform hover:scale-105">
							Add to Cart
						</button>
					</div>
				</div>
			</div>

			{/* Modal rendered through portal */}
			<ProductModal 
				product={product}
				isOpen={showModal}
				onClose={handleCloseModal}
				isWishlisted={isWishlisted}
				onWishlistToggle={handleWishlistToggle}
			/>

			{/* Global styles for animations */}
			<style jsx global>{`
				@keyframes fadeIn {
					from {
						opacity: 0;
					}
					to {
						opacity: 1;
					}
				}
				
				@keyframes zoomIn {
					from {
						transform: scale(0.95);
					}
					to {
						transform: scale(1);
					}
				}
				
				.animate-in {
					animation: fadeIn 0.3s ease-out, zoomIn 0.3s ease-out;
				}
			`}</style>
		</>
	);
}