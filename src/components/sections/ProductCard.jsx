import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import ProductModal from "./ProductModal";
import { useShop } from "../context/ShopContext";
import { useToast } from "../context/ToastContext";

export default function ProductCard({ product }) {
	const [showModal, setShowModal] = useState(false);
	const { showToast } = useToast();

	// Use the shop context
	const { addToCart, isInWishlist, toggleWishlist } = useShop();

	// Check if product is in wishlist
	const isWishlisted = isInWishlist(product.id);

	const handleWishlistToggle = useCallback(() => {
		toggleWishlist(product);
	}, [product, toggleWishlist]);

	const handleAddToCart = useCallback(
		(quantity = 1) => {
			// Add items based on quantity
			for (let i = 0; i < quantity; i++) {
				addToCart(product);
			}

			// Show appropriate toast based on quantity
			if (quantity > 1) {
				showToast(`Added ${quantity} × ${product.title} to cart!`, "cart");
			} else {
				showToast(`${product.title} added to cart!`, "cart");
			}
		},
		[product, addToCart, showToast]
	);
	
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
			<motion.div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xs transition-all duration-500 overflow-hidden border border-gray-200 hover:border-gray-200 h-full">
				{/* Product Image Container */}
				<div className="group relative overflow-hidden bg-white">
					<div className="aspect-square flex items-center justify-center p-8 ">
						<img
							src={product.image}
							alt={product.title}
							className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 cursor-pointer"
							loading="lazy"
						/>
					</div>

					{/* Overlay with action buttons */}
					<div className="absolute inset-0 bg-black/0 transition-colors duration-300">
						{/* Action Buttons */}
						<div className="absolute top-4 right-4 flex flex-col gap-2">
							<motion.button
								onClick={handleWishlistToggle}
								className={`rounded-full p-2.5 backdrop-blur-sm cursor-pointer ${
									isWishlisted
										? "bg-red-500 text-white"
										: "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
								}`}
								aria-label="Add to wishlist"
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								transition={{
									duration: 0.3,
								}}
							>
								<Heart
									className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""} `}
								/>
							</motion.button>

							{/* Hidden buttons that appear on hover */}
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2 ">
								<motion.button
									onClick={handleOpenModal}
									className="rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg text-gray-700 hover:bg-blue-500 cursor-pointer hover:text-white "
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									transition={{
										duration: 0.3,
									}}
								>
									<Eye className="w-4 h-4" />
								</motion.button>
								<motion.button
									onClick={handleAddToCart}
									className="rounded-full bg-gray-900/90 backdrop-blur-sm p-2.5 shadow-lg text-white hover:bg-gray-800  cursor-pointer "
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									transition={{
										duration: 0.3,
									}}
								>
									<ShoppingCart className="w-4 h-4" />
								</motion.button>
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
						<motion.button
							onClick={handleAddToCart}
							className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800  cursor-pointer"
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{
								duration: 0.3,
							}}
						>
							Add to Cart
						</motion.button>
					</div>
				</div>
			</motion.div>

			{/* Modal rendered through portal */}
			<ProductModal
				product={product}
				isOpen={showModal}
				onClose={handleCloseModal}
				isWishlisted={isWishlisted}
				onWishlistToggle={handleWishlistToggle}
				onAddToCart={handleAddToCart}
			/>
		</>
	);
}
