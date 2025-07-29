import { useState, useEffect } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useShop } from "../context/ShopContext";
import CartSidebar from "./CartSidebar";
import WishlistSidebar from "./WishlistSidebar";
import MobileMenu from "./MobileMenu";
import Reveal from "../animations/Reveal.jsx";
import LoginModal from "./LoginModal.jsx";

function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [hoveredLink, setHoveredLink] = useState(null);
	const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

	const { getCartCount, wishlist } = useShop();
	const location = useLocation();

	const cartCount = getCartCount();
	const wishlistCount = wishlist.length;

	// Close mobile menu when clicking outside
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (isMobileMenuOpen && !event.target.closest(".mobile-menu-container")) {
				setIsMobileMenuOpen(false);
			}
		};

		document.addEventListener("click", handleClickOutside);
		return () => document.removeEventListener("click", handleClickOutside);
	}, [isMobileMenuOpen]);

	// Prevent body scroll when mobile menu or sidebars are open
	useEffect(() => {
		if (isMobileMenuOpen || isCartOpen || isWishlistOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isMobileMenuOpen, isCartOpen, isWishlistOpen]);

	// Animation variants
	const headerVariants = {
		initial: { y: -100, opacity: 0 },
		animate: {
			y: 0,
			opacity: 1,
			transition: {
				duration: 0.5,
				ease: "easeOut",
				delay: 0.4,
			},
		},
	};

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Shop", path: "/shop" },
		{ name: "About", path: "/about" },
		{ name: "Contact", path: "/contact" },
	];

	const isActive = (path) => location.pathname === path;

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
						<Reveal direction="fade" delay={0.4} distance={30} className="flex">
							<Link to="/" className="flex items-center group text-white">
								<div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mr-3">
									<span className="text-xs font-bold">FS</span>
								</div>
								<span className="text-xl font-light tracking-wider">FAKE/SHOP</span>
							</Link>
						</Reveal>

						{/* Desktop Navigation */}
						<div className="hidden md:flex items-center space-x-8 lg:space-x-12">
							<div className="flex items-center space-x-6 lg:space-x-8">
								{navLinks.map((link) => (
									<Reveal
										key={link.name}
										direction="fade"
										delay={0.4}
										className="inline-flex"
									>
										<Link
											to={link.path}
											className={`relative transition-colors duration-300 ${
												isActive(link.path)
													? "text-white font-bold"
													: "text-stone-200 hover:text-white font-medium"
											}`}
											onMouseEnter={() => setHoveredLink(link.name)}
											onMouseLeave={() => setHoveredLink(null)}
										>
											{link.name}

											{/* Active underline */}
											{isActive(link.path) && (
												<motion.span
													className="absolute -bottom-1 left-0 w-full h-0.5 bg-white"
													layoutId="activeTab"
													transition={{ type: "spring", stiffness: 300 }}
												/>
											)}

											{/* Hover underline animation */}
											{!isActive(link.path) && (
												<span className="absolute -bottom-1 left-0 right-0 h-0.5 overflow-hidden">
													<motion.span
														className="absolute inset-0 bg-white"
														initial={{ scaleX: 0 }}
														animate={{
															scaleX: hoveredLink === link.name ? 1 : 0,
														}}
														transition={{
															duration: 0.3,
															ease: "easeOut",
														}}
														style={{ originX: 0.5 }}
													/>
												</span>
											)}
										</Link>
									</Reveal>
								))}
							</div>

							{/* Desktop Icons */}
							<div className="flex items-center space-x-4">
								<Reveal
									direction="fade"
									delay={0.4}
									distance={30}
									className="inline-flex"
								>
									<motion.button
										onClick={() => setIsWishlistOpen(true)}
										className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
										whileHover={{ scale: 1.3 }}
										whileTap={{ scale: 0.95 }}
									>
										<Heart className="w-5 h-5" />
										<AnimatePresence>
											{wishlistCount > 0 && (
												<motion.span
													className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold"
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													exit={{ scale: 0 }}
													transition={{ type: "spring", stiffness: 500 }}
												>
													{wishlistCount}
												</motion.span>
											)}
										</AnimatePresence>
									</motion.button>
								</Reveal>

								<Reveal
									direction="fade"
									delay={0.4}
									distance={30}
									className="inline-flex"
								>
									<motion.button
										onClick={() => setIsCartOpen(true)}
										className="relative p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
										whileHover={{ scale: 1.3 }}
										whileTap={{ scale: 0.95 }}
									>
										<ShoppingCart className="w-5 h-5" />
										<AnimatePresence>
											{cartCount > 0 && (
												<motion.span
													className="absolute -top-1 -right-1 w-5 h-5 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold"
													initial={{ scale: 0 }}
													animate={{ scale: 1 }}
													exit={{ scale: 0 }}
													transition={{ type: "spring", stiffness: 500 }}
												>
													{cartCount}
												</motion.span>
											)}
										</AnimatePresence>
									</motion.button>
								</Reveal>

								<Reveal
									direction="fade"
									delay={0.4}
									distance={30}
									className="inline-flex"
								>
									<motion.button
										className="p-2 text-white hover:text-gray-300 transition-colors duration-300 cursor-pointer"
										whileHover={{ scale: 1.3 }}
										whileTap={{ scale: 0.95 }}
										onClick={() => setIsLoginModalOpen(true)}
									>
										<User className="w-5 h-5" />
									</motion.button>
								</Reveal>
							</div>
						</div>

						{/* Mobile Menu Button */}
						<Reveal
							direction="fade"
							delay={0.5}
							className="md:hidden inline-flex"
						>
							<motion.button
								className="p-2 mobile-menu-container text-white"
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
						</Reveal>
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
						currentPath={location.pathname}
					/>
				</div>
			</motion.nav>

			{/* Sidebars */}
			<CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
			<WishlistSidebar
				isOpen={isWishlistOpen}
				onClose={() => setIsWishlistOpen(false)}
			/>
			<LoginModal
				isOpen={isLoginModalOpen}
				onClose={() => setIsLoginModalOpen(false)}
			/>
		</>
	);
}

export default Header;
