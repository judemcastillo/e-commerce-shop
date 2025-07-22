import { useState, useCallback, useMemo, memo } from "react";
import { motion } from "framer-motion";
import { Heart, Eye, ShoppingCart, Star } from "lucide-react";
import PropTypes from "prop-types";
import ProductModal from "./ProductModal";
import { useShop } from "../context/ShopContext";
import { useToast } from "../context/ToastContext";

const ProductCard = ({ product }) => {
	const [showModal, setShowModal] = useState(false);
	const [imageError, setImageError] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const { showToast } = useToast();

	// Use the shop context
	const { addToCart, isInWishlist, toggleWishlist } = useShop();

	// Check if product is in wishlist
	const isWishlisted = isInWishlist(product.id);

	const handleWishlistToggle = useCallback(
		(e) => {
			e?.stopPropagation();
			toggleWishlist(product);
			showToast(
				isWishlisted
					? `${product.title} removed from wishlist`
					: `${product.title} added to wishlist`,
				isWishlisted ? "error" : "success"
			);
		},
		[product, toggleWishlist, isWishlisted, showToast]
	);

	const handleAddToCart = useCallback(
		(e, quantity = 1) => {
			e?.stopPropagation();

			addToCart(product, quantity);

			if (quantity > 1) {
				showToast(`Added ${quantity} × ${product.title} to cart!`, "success");
			} else {
				showToast(`${product.title} added to cart!`, "success");
			}
		},
		[product, addToCart, showToast]
	);

	const handleOpenModal = useCallback((e) => {
		e?.stopPropagation();
		setShowModal(true);
	}, []);

	const handleCloseModal = useCallback(() => {
		setShowModal(false);
	}, []);

	// Format price
	const formattedPrice = useMemo(() => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		}).format(product.price);
	}, [product.price]);

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
			<motion.div
				className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-lg transition-all duration-500 overflow-hidden border border-gray-200 hover:border-gray-300 hover:shadow-xl h-full"
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.4 }}
			>
				{/* Product Image Container */}
				<div className="group relative overflow-hidden bg-white">
					<div className="aspect-square flex items-center justify-center p-8 relative">
						{/* Loading Spinner */}
						{isLoading && (
							<div className="absolute inset-0 flex items-center justify-center bg-gray-50">
								<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
							</div>
						)}

						<img
							src={imageError ? "/placeholder-image.png" : product.image}
							alt={product.title}
							className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700 cursor-pointer"
							loading="lazy"
							onLoad={() => setIsLoading(false)}
							onError={() => {
								setImageError(true);
								setIsLoading(false);
							}}
							onClick={handleOpenModal}
						/>
					</div>

					{/* Overlay with action buttons */}
					<div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300 pointer-events-none">
						{/* Action Buttons */}
						<div className="absolute top-4 right-4 flex flex-col gap-2 pointer-events-auto">
							<motion.button
								onClick={handleWishlistToggle}
								className={`rounded-full p-2.5 backdrop-blur-sm cursor-pointer transition-colors duration-200 ${
									isWishlisted
										? "bg-red-500 text-white"
										: "bg-white/90 text-gray-700 hover:bg-red-500 hover:text-white"
								}`}
								aria-label={
									isWishlisted
										? `Remove ${product.title} from wishlist`
										: `Add ${product.title} to wishlist`
								}
								aria-pressed={isWishlisted}
								whileHover={{ scale: 1.1 }}
								whileTap={{ scale: 0.9 }}
								transition={{ duration: 0.2 }}
							>
								<Heart
									className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`}
								/>
							</motion.button>

							{/* Hidden buttons that appear on hover */}
							<div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
								<motion.button
									onClick={handleOpenModal}
									className="rounded-full bg-white/90 backdrop-blur-sm p-2.5 shadow-lg text-gray-700 hover:bg-blue-500 cursor-pointer hover:text-white transition-colors duration-200"
									aria-label={`Quick view ${product.title}`}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									transition={{ duration: 0.2 }}
								>
									<Eye className="w-4 h-4" />
								</motion.button>
								<motion.button
									onClick={(e) => handleAddToCart(e, 1)}
									className="rounded-full bg-gray-900/90 backdrop-blur-sm p-2.5 shadow-lg text-white hover:bg-gray-800 cursor-pointer transition-colors duration-200"
									aria-label={`Add ${product.title} to cart`}
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.9 }}
									transition={{ duration: 0.2 }}
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
					{product.rating && starRating}

					{/* Title - Fixed overflow issue */}
					<div className="min-h-[3.5rem] overflow-hidden">
						<h3 className="font-semibold text-gray-900 text-lg leading-tight line-clamp-2">
							{product.title}
						</h3>
					</div>

					{/* Price and Add to Cart */}
					<div className="flex items-center justify-between pt-2 mt-auto">
						<span className="text-2xl font-bold text-gray-900">
							{formattedPrice}
						</span>
						<motion.button
							onClick={(e) => handleAddToCart(e, 1)}
							className="bg-gray-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 cursor-pointer transition-colors duration-200"
							aria-label={`Add ${product.title} to cart`}
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
							transition={{ duration: 0.2 }}
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
				onAddToCart={(quantity) => handleAddToCart(null, quantity)}
			/>
		</>
	);
};

// PropTypes for type checking
ProductCard.propTypes = {
	product: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
		title: PropTypes.string.isRequired,
		price: PropTypes.number.isRequired,
		image: PropTypes.string.isRequired,
		category: PropTypes.string.isRequired,
		rating: PropTypes.shape({
			rate: PropTypes.number,
			count: PropTypes.number,
		}),
	}).isRequired,
};

// Memoize component for performance with large product lists
export default memo(ProductCard, (prevProps, nextProps) => {
	return prevProps.product.id === nextProps.product.id;
});
