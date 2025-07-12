import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext.jsx";

function WishlistSidebar({ isOpen, onClose }) {
    const { wishlist = [], removeFromWishlist, addToCart } = useShop();

    // Animation variants
    const sidebarVariants = {
        closed: {
            x: "100%",
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            x: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 40
            }
        }
    };

    const overlayVariants = {
        closed: {
            opacity: 0,
            transition: { duration: 0.3 }
        },
        open: {
            opacity: 1,
            transition: { duration: 0.3 }
        }
    };

    const itemVariants = {
        closed: { x: 20, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.05,
                duration: 0.3
            }
        })
    };

    const handleMoveToCart = (product) => {
        addToCart(product);
        removeFromWishlist(product.id);
    };

    const handleRemoveFromWishlist = (productId) => {
        removeFromWishlist(productId);
    };

    // Calculate total value of wishlist items
    const wishlistTotal = wishlist.reduce((total, item) => total + (item.price || 0), 0);

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={onClose}
                    />

                    {/* Sidebar */}
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70]"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b bg-white">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">Wishlist</h2>
                                    <p className="text-sm text-gray-500 mt-1">
                                        {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'}
                                    </p>
                                </div>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-6 h-6 text-gray-600" />
                                </motion.button>
                            </div>

                            {/* Wishlist Items */}
                            <div className="flex-1 overflow-y-auto">
                                {wishlist.length === 0 ? (
                                    /* Empty State */
                                    <div className="flex flex-col items-center justify-center h-full px-6 py-12">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ type: "spring", duration: 0.5 }}
                                        >
                                            <Heart className="w-24 h-24 text-gray-200 mb-4" />
                                        </motion.div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                            Your wishlist is empty
                                        </h3>
                                        <p className="text-gray-500 text-center mb-6">
                                            Save your favorite items here to buy them later
                                        </p>
                                        <Link
                                            to="/shop"
                                            onClick={onClose}
                                            className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                                        >
                                            Start Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    /* Wishlist Items List */
                                    <div className="p-6 space-y-4">
                                        {wishlist.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="closed"
                                                animate="open"
                                                exit="closed"
                                                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                            >
                                                <div className="flex gap-4">
                                                    {/* Product Image */}
                                                    <div className="w-24 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                                        <img
                                                            src={item.image}
                                                            alt={item.title}
                                                            className="w-full h-full object-contain p-2"
                                                        />
                                                    </div>

                                                    {/* Product Details */}
                                                    <div className="flex-1 min-w-0">
                                                        <h3 className="font-medium text-gray-900 line-clamp-2 mb-1">
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-sm text-gray-500 mb-2">
                                                            {item.category}
                                                        </p>
                                                        <p className="text-lg font-bold text-gray-900">
                                                            ${item.price?.toFixed(2) || '0.00'}
                                                        </p>
                                                    </div>
                                                </div>

                                                {/* Action Buttons */}
                                                <div className="flex gap-2 mt-4">
                                                    <motion.button
                                                        onClick={() => handleMoveToCart(item)}
                                                        className="flex-1 flex items-center justify-center gap-2 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                                                        whileHover={{ scale: 1.02 }}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <ShoppingCart className="w-4 h-4" />
                                                        Add to Cart
                                                    </motion.button>
                                                    <motion.button
                                                        onClick={() => handleRemoveFromWishlist(item.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </motion.button>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {wishlist.length > 0 && (
                                <div className="border-t bg-gray-50 p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-gray-600">Total value:</span>
                                        <span className="text-xl font-bold text-gray-900">
                                            ${wishlistTotal.toFixed(2)}
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <motion.button
                                            onClick={() => {
                                                // Add all items to cart
                                                wishlist.forEach(item => addToCart(item));
                                                // Clear wishlist
                                                wishlist.forEach(item => removeFromWishlist(item.id));
                                                onClose();
                                            }}
                                            className="w-full bg-black text-white py-3 rounded-full font-medium hover:bg-gray-800 transition-colors"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            Add All to Cart
                                        </motion.button>
                                        <button
                                            onClick={onClose}
                                            className="w-full bg-white text-gray-900 border border-gray-300 py-3 rounded-full font-medium hover:bg-gray-50 transition-colors"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default WishlistSidebar;