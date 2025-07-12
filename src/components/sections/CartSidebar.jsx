import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useShop } from "../context/ShopContext";

function CartSidebar({ isOpen, onClose }) {
    const { cart, getCartCount, getCartTotal, removeFromCart, updateCartQuantity } = useShop();
    const cartCount = getCartCount();
    const cartTotal = getCartTotal();

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

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                        variants={overlayVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                        onClick={onClose}
                    />
                    <motion.div
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[70]"
                        variants={sidebarVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b">
                                <h2 className="text-2xl font-bold">Shopping Cart ({cartCount})</h2>
                                <motion.button
                                    onClick={onClose}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    <X className="w-6 h-6" />
                                </motion.button>
                            </div>

                            {/* Cart Items */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cart.length === 0 ? (
                                    <div className="text-center py-12">
                                        <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                        <p className="text-gray-500">Your cart is empty</p>
                                        <Link
                                            to="/shop"
                                            className="inline-block mt-4 text-blue-600 hover:text-blue-700 font-medium"
                                            onClick={onClose}
                                        >
                                            Continue Shopping
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {cart.map((item, index) => (
                                            <motion.div
                                                key={item.id}
                                                custom={index}
                                                variants={itemVariants}
                                                initial="closed"
                                                animate="open"
                                                className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                                            >
                                                <img
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="w-20 h-20 object-contain bg-white rounded"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-medium text-sm line-clamp-2">{item.title}</h3>
                                                    <p className="text-gray-600 mt-1">${item.price}</p>
                                                    <div className="flex items-center gap-3 mt-2">
                                                        <div className="flex items-center gap-2">
                                                            <motion.button
                                                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                                                className="p-1 hover:bg-gray-200 rounded"
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <Minus className="w-4 h-4" />
                                                            </motion.button>
                                                            <span className="w-8 text-center">{item.quantity}</span>
                                                            <motion.button
                                                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                                                className="p-1 hover:bg-gray-200 rounded"
                                                                whileTap={{ scale: 0.9 }}
                                                            >
                                                                <Plus className="w-4 h-4" />
                                                            </motion.button>
                                                        </div>
                                                        <motion.button
                                                            onClick={() => removeFromCart(item.id)}
                                                            className="p-1 hover:bg-red-100 hover:text-red-600 rounded ml-auto"
                                                            whileHover={{ scale: 1.1 }}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </motion.button>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            {cart.length > 0 && (
                                <div className="border-t p-6 space-y-4">
                                    <div className="flex items-center justify-between text-xl font-bold">
                                        <span>Total:</span>
                                        <span>${cartTotal.toFixed(2)}</span>
                                    </div>
                                    <div className="space-y-3">
                                        <Link
                                            
                                            className="block w-full bg-black text-white text-center py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                                            onClick={onClose}
                                        >
                                            Checkout
                                        </Link>
                                        <button
                                            onClick={onClose}
                                            className="block w-full bg-white text-black border border-gray-300 text-center py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
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

export default CartSidebar;