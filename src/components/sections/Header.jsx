import { useState, useEffect } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../context/ShopContext";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import MobileMenu from "./MobileMenu";

function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	
	const { getCartCount, wishlist } = useShop();
	
	const cartCount = getCartCount();
	const wishlistCount = wishlist.length;

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isMobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside);
		return () => document.removeEventListener('click', handleClickOutside);
	}, [isMobileMenuOpen]);

	// Prevent body scroll when mobile menu or sidebars are open
	useEffect(() => {
		if (isMobileMenuOpen || isCartOpen || isWishlistOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isMobileMenuOpen, isCartOpen, isWishlistOpen]);

	// Animation variants
	const headerVariants = {
		initial: { y: -100, opacity: 0 },
		animate: { 
			y: 0, 
			opacity: 1,
			transition: {
				duration: 0.6,
				ease: "easeOut",
				delay: 0.4
			}
		}
	};

	const linkVariants = {
		initial: { y: -20, opacity: 0 },
		animate: (i) => ({
			y: 0,
			opacity: 1,
			transition: {
				delay: 0.1 * i,
				duration: 0.5,
				ease: "easeOut"
			}
		})
	};

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Shop", path: "/shop" },
		{ name: "About", path: "/about" },
		{ name: "Contact", path: "/contact" }
	];

	return (
		<>
			<motion.nav 
				className="absolute top-0 z-50 w-full bg-transparent backdrop-blur-sm border-b border-white/20"
				variants={headerVariants}
				initial="initial"
				animate="animate"
			>
				<div className="container mx-auto px-4 sm:px-6 lg:px-8">
					<div className="flex items-center justify-between h-16 md:h-20">
						{/* Logo */}
						<motion.div 
							className="text-white"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.5 }}
						>
							<Link to="/" className="flex items-center">
								<h1 className="font-bold text-xl sm:text-2xl">
									<span className="font-['Domine']">Fake</span>
									<span className="text-blue-400">/</span>
									<span className="font-sans">Shop</span>
								</h1>
							</Link>
						</motion.div>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8 lg:space-x-12">
							<div className="flex items-center space-x-6 lg:space-x-8">
								{navLinks.map((link, index) => (
									<motion.div
										key={link.name}
										custom={index}
										variants={linkVariants}
										initial="initial"
										animate="animate"
									>
										<Link
											to={link.path}
											className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
										>
											{link.name}
										</Link>
									</motion.div>
								))}
							</div>

							{/* Desktop Icons */}
							<div className="flex items-center space-x-4">
								<motion.button 
									onClick={() => setIsWishlistOpen(true)}
									className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<Heart className="w-5 h-5" />
									{wishlistCount > 0 && (
										<motion.span 
											className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring", stiffness: 500 }}
										>
											{wishlistCount}
										</motion.span>
									)}
								</motion.button>

								<motion.button 
									onClick={() => setIsCartOpen(true)}
									className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<ShoppingCart className="w-5 h-5" />
									{cartCount > 0 && (
										<motion.span 
											className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold"
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											transition={{ type: "spring", stiffness: 500 }}
										>
											{cartCount}
										</motion.span>
									)}
								</motion.button>

								<motion.button 
									className="p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
									whileHover={{ scale: 1.1 }}
									whileTap={{ scale: 0.95 }}
								>
									<User className="w-5 h-5" />
								</motion.button>
							</div>
						</div>

						{/* Mobile Menu Button */}
						<motion.button
							className="md:hidden p-2 mobile-menu-container text-white"
							onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
							whileTap={{ scale: 0.9 }}
						>
							<AnimatePresence mode="wait">
								{isMobileMenuOpen ? (
									<motion.div
										key="close"
										initial={{ rotate: -90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: 90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<X className="w-6 h-6" />
									</motion.div>
								) : (
									<motion.div
										key="menu"
										initial={{ rotate: 90, opacity: 0 }}
										animate={{ rotate: 0, opacity: 1 }}
										exit={{ rotate: -90, opacity: 0 }}
										transition={{ duration: 0.2 }}
									>
										<Menu className="w-6 h-6" />
									</motion.div>
								)}
							</AnimatePresence>
						</motion.button>
					</div>

					{/* Mobile Menu */}
					<MobileMenu 
						isOpen={isMobileMenuOpen}
						onClose={() => setIsMobileMenuOpen(false)}
						navLinks={navLinks}
						onOpenCart={() => setIsCartOpen(true)}
						onOpenWishlist={() => setIsWishlistOpen(true)}
						cartCount={cartCount}
						wishlistCount={wishlistCount}
					/>
				</div>
			</motion.nav>

			{/* Sidebars */}
			<CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			<WishlistSidebar isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
		</>
	);
}

export default Header;