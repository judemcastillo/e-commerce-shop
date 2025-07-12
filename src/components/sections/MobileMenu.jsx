import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, User } from "lucide-react";

function MobileMenu({ isOpen, onClose, navLinks, onOpenCart, onOpenWishlist, cartCount, wishlistCount }) {
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        },
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                duration: 0.3,
                ease: "easeInOut"
            }
        }
    };

    const mobileMenuItemVariants = {
        closed: { x: -20, opacity: 0 },
        open: (i) => ({
            x: 0,
            opacity: 1,
            transition: {
                delay: i * 0.1,
                duration: 0.3
            }
        })
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="md:hidden mobile-menu-container"
                    variants={mobileMenuVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                >
                    <motion.div className="bg-black/20 backdrop-blur-md rounded-lg mt-2 py-4 space-y-1">
                        {navLinks.map((link, index) => (
                            <motion.div
                                key={link.name}
                                custom={index}
                                variants={mobileMenuItemVariants}
                                initial="closed"
                                animate="open"
                                exit="closed"
                            >
                                <Link
                                    to={link.path}
                                    className="block px-4 py-3 text-white hover:text-gray-300 hover:bg-white/10 font-medium transition-colors"
                                    onClick={onClose}
                                >
                                    {link.name}
                                </Link>
                            </motion.div>
                        ))}

                        <motion.div 
                            className="flex items-center justify-center gap-6 pt-4 mt-4 border-t border-white/20"
                            custom={navLinks.length}
                            variants={mobileMenuItemVariants}
                            initial="closed"
                            animate="open"
                            exit="closed"
                        >
                            <button 
                                onClick={() => {
                                    onOpenWishlist();
                                    onClose();
                                }}
                                className="relative p-2 text-white"
                            >
                                <Heart className="w-5 h-5" />
                                {wishlistCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {wishlistCount}
                                    </span>
                                )}
                            </button>
                            <button 
                                onClick={() => {
                                    onOpenCart();
                                    onClose();
                                }}
                                className="relative p-2 text-white"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                            <button className="p-2 text-white">
                                <User className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

export default MobileMenu;