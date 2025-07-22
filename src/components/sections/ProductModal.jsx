import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, X, Plus, Minus, Check } from "lucide-react";
import { useShop } from "../context/ShopContext";

export default function ProductModal({
	product,
	isOpen,
	onClose,
	isWishlisted,
	onWishlistToggle,
	onAddToCart,
}) {
	const [quantity, setQuantity] = useState(1);
	const { cart } = useShop();

	// Get current quantity in cart for this product
	const cartItem = cart.find((item) => item.id === product?.id);
	const quantityInCart = cartItem?.quantity || 0;

	useEffect(() => {
		// Handle body scroll and escape key
		if (isOpen) {
			document.body.style.overflow = "hidden";

			const handleEscape = (e) => {
				if (e.key === "Escape") {
					onClose();
				}
			};

			document.addEventListener("keydown", handleEscape);

			return () => {
				document.removeEventListener("keydown", handleEscape);
			};
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen, onClose]);

	// Reset quantity when modal closes
	useEffect(() => {
		if (!isOpen) {
			setQuantity(1);
		}
	}, [isOpen]);

	const handleIncreaseQuantity = () => {
		setQuantity((prev) => prev + 1);
	};

	const handleDecreaseQuantity = () => {
		setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
	};

	const handleAddToCart = () => {
    if (onAddToCart) {
        onAddToCart(quantity); 
    }
};

	// Large star rating for modal
	const largeStarRating = useMemo(() => {
		// Add null checks for product and rating
		if (!product || !product.rating) {
			return (
				<div className="flex items-center gap-2">
					{[...Array(5)].map((_, i) => (
						<Star key={i} className="w-6 h-6 text-gray-300" />
					))}
					<span className="text-gray-600 ml-2">No ratings yet</span>
				</div>
			);
		}

		const rating = product.rating.rate || 0;
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
					{rating.toFixed(1)} ({product.rating.count || 0} reviews)
				</span>
			</div>
		);
	}, [product]);

	// Animation variants
	const backdropVariants = {
		hidden: { opacity: 0 },
		visible: { opacity: 1 },
		exit: { opacity: 0 },
	};

	const modalVariants = {
		hidden: {
			opacity: 0,
			scale: 0.8,
			y: 20,
		},
		visible: {
			opacity: 1,
			scale: 1,
			y: 0,
			transition: {
				duration: 0.5,
			},
		},
		exit: {
			opacity: 0,
			scale: 0.8,
			y: 20,
			transition: {
				duration: 0.3,
			},
		},
	};

	const contentVariants = {
		hidden: { opacity: 0 },
		visible: {
			opacity: 1,
			transition: {
				delay: 0.2,
				staggerChildren: 0.1,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: 0.3,
			},
		},
	};

	return createPortal(
		<AnimatePresence mode="wait">
			{isOpen && (
				<div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
					{/* Backdrop */}
					<motion.div
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
						onClick={onClose}
						variants={backdropVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					/>

					{/* Modal Content */}
					<motion.div
						className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full h-[90vh] overflow-hidden flex flex-col"
						variants={modalVariants}
						initial="hidden"
						animate="visible"
						exit="exit"
					>
						{/* Close Button */}
						<motion.button
							onClick={onClose}
							className="absolute top-4 right-4 z-10 rounded-full bg-white/90 backdrop-blur-sm p-2 shadow-lg hover:bg-red-500 cursor-pointer hover:text-gray-100 transition-colors"
							whileHover={{ scale: 1.1 }}
							whileTap={{ scale: 0.9 }}
						>
							<X className="w-5 h-5" />
						</motion.button>

						<div className="flex flex-col md:flex-row h-full overflow-hidden">
							{/* Image Section */}
							<div className="md:w-1/2 bg-white p-8 flex items-center justify-center flex-shrink-0">
								<img
									src={product.image}
									alt={product.title}
									className="max-w-full max-h-96 object-contain"
								/>
							</div>

							{/* Details Section - Fixed height and overflow */}
							<div className="md:w-1/2 bg-slate-100 flex flex-col h-full overflow-hidden">
								<div className="p-8 overflow-y-auto">
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

									{/* Cart Status */}
									{quantityInCart > 0 && (
										<div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
											<div className="flex-shrink-0">
												<div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
													<Check className="w-5 h-5 text-white" />
												</div>
											</div>
											<div className="flex-1">
												<p className="text-sm font-medium text-green-800">
													Already in cart
												</p>
												<p className="text-sm text-green-600">
													{quantityInCart}{" "}
													{quantityInCart === 1 ? "item" : "items"} in your cart
												</p>
											</div>
										</div>
									)}

									{/* Description */}
									<div className="mb-6">
										<h3 className="font-semibold text-gray-900 mb-2">
											Description
										</h3>
										<p className="text-gray-600 leading-relaxed">
											{product.description}
										</p>
									</div>

									{/* Quantity Selector */}
									<div className="mb-6">
										<h3 className="font-semibold text-gray-900 mb-2">
											{quantityInCart > 0 ? "Add More" : "Quantity"}
										</h3>
										<div className="flex items-center gap-4">
											<button
												onClick={handleDecreaseQuantity}
												className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
												disabled={quantity <= 1}
											>
												<Minus className="w-4 h-4" />
											</button>
											<span className="text-xl font-semibold w-12 text-center">
												{quantity}
											</span>
											<button
												onClick={handleIncreaseQuantity}
												className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors cursor-pointer"
											>
												<Plus className="w-4 h-4" />
											</button>
										</div>
										{quantityInCart > 0 && (
											<p className="text-sm text-gray-500 mt-2">
												Total after adding: {quantityInCart + quantity} items
											</p>
										)}
									</div>

									{/* Action Buttons */}
									<div className="flex gap-4">
										<button
											onClick={handleAddToCart}
											className="flex-1 bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
										>
											<ShoppingCart className="w-5 h-5" />
											{quantityInCart > 0
												? `Add ${quantity} More`
												: "Add to Cart"}
										</button>
										<button
											onClick={onWishlistToggle}
											className={`p-4 rounded-full cursor-pointer transition-colors ${
												isWishlisted
													? "bg-red-500 text-white"
													: "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
											}`}
										>
											<Heart
												className={`w-5 h-5 ${
													isWishlisted ? "fill-current" : ""
												}`}
											/>
										</button>
									</div>

									{/* Additional Info */}
									<div className="mt-6 pt-6 border-t border-gray-300">
										<div className="space-y-2 text-sm text-gray-600">
											<div className="flex justify-between">
												<span className="font-medium">Subtotal:</span>
												<span>${(product.price * quantity).toFixed(2)}</span>
											</div>
											{quantityInCart > 0 && (
												<div className="flex justify-between text-green-600">
													<span className="font-medium">Already in cart:</span>
													<span>
														${(product.price * quantityInCart).toFixed(2)}
													</span>
												</div>
											)}
										</div>
									</div>
								</div>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body
	);
}
