import { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingCart, Star, X, Plus, Minus, Check } from "lucide-react";
import { useToast } from "../context/ToastContext";

export default function ProductModal({
	product,
	isOpen,
	onClose,
	isWishlisted,
	onWishlistToggle,
	onAddToCart,
}) {
	const [quantity, setQuantity] = useState(1);

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
						className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
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

						<div className="flex flex-col md:flex-row h-full">
							{/* Image Section */}
							<motion.div
								className="md:w-1/2 bg-white p-8 flex items-center justify-center"
								initial={{ opacity: 0, x: -50 }}
								animate={{ opacity: 1, x: 0 }}
								transition={{ delay: 0.2 }}
							>
								<motion.img
									src={product.image}
									alt={product.title}
									className="max-w-full max-h-96 object-contain"
									initial={{ scale: 0.8 }}
									animate={{ scale: 1 }}
									transition={{ delay: 0.3, type: "spring" }}
								/>
							</motion.div>

							{/* Details Section */}
							<motion.div
								className="md:w-1/2 p-8 overflow-y-auto bg-slate-100"
								variants={contentVariants}
								initial="hidden"
								animate="visible"
							>
								{/* Category */}
								<motion.div
									className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2"
									variants={itemVariants}
								>
									{product.category}
								</motion.div>

								{/* Title */}
								<motion.h2
									className="text-2xl font-bold text-gray-900 mb-4"
									variants={itemVariants}
								>
									{product.title}
								</motion.h2>

								{/* Rating */}
								<motion.div className="mb-6" variants={itemVariants}>
									{largeStarRating}
								</motion.div>

								{/* Price */}
								<motion.div
									className="text-3xl font-bold text-gray-900 mb-6"
									variants={itemVariants}
								>
									${product.price}
								</motion.div>

								{/* Description */}
								<motion.div className="mb-6" variants={itemVariants}>
									<h3 className="font-semibold text-gray-900 mb-2">
										Description
									</h3>
									<p className="text-gray-600 leading-relaxed">
										{product.description}
									</p>
								</motion.div>

								{/* Quantity Selector */}
								<motion.div className="mb-6" variants={itemVariants}>
									<h3 className="font-semibold text-gray-900 mb-2">Quantity</h3>
									<div className="flex items-center gap-4">
										<motion.button
											onClick={handleDecreaseQuantity}
											className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors  cursor-pointer"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Minus className="w-4 h-4" />
										</motion.button>
										<motion.span
											className="text-xl font-semibold w-12 text-center"
											key={quantity}
											initial={{ opacity: 0, y: -10 }}
											animate={{ opacity: 1, y: 0 }}
										>
											{quantity}
										</motion.span>
										<motion.button
											onClick={handleIncreaseQuantity}
											className="rounded-full bg-gray-200 p-2 hover:bg-gray-300 transition-colors cursor-pointer"
											whileHover={{ scale: 1.1 }}
											whileTap={{ scale: 0.9 }}
										>
											<Plus className="w-4 h-4" />
										</motion.button>
									</div>
								</motion.div>

								{/* Action Buttons */}
								<motion.div className="flex gap-4" variants={itemVariants}>
									<motion.button
										onClick={handleAddToCart}
										className="flex-1 bg-gray-900 text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
										whileHover={{ scale: 1.02 }}
										whileTap={{ scale: 0.98 }}
									>
										<ShoppingCart className="w-5 h-5" />
										Add to Cart
									</motion.button>
									<motion.button
										onClick={onWishlistToggle}
										className={`p-4 rounded-full  cursor-pointer transition-colors ${
											isWishlisted
												? "bg-red-500 text-white"
												: "bg-gray-100 text-gray-700 hover:bg-red-500 hover:text-white"
										}`}
										whileHover={{ scale: 1.1 }}
										whileTap={{ scale: 0.9 }}
									>
										<Heart
											className={`w-5 h-5 ${
												isWishlisted ? "fill-current" : ""
											}`}
										/>
									</motion.button>
								</motion.div>

								{/* Additional Info */}
								<motion.div
									className="mt-6 pt-6 border-t border-gray-300"
									variants={itemVariants}
								>
									<div className="space-y-2 text-sm text-gray-600">
										<div className="flex justify-between">
											<span className="font-medium">Subtotal:</span>
											<span>${(product.price * quantity).toFixed(2)}</span>
										</div>
									</div>
								</motion.div>
							</motion.div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>,
		document.body
	);
}
