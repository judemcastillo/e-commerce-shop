import { useState } from "react";
import { ShoppingCart, Heart, User, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

function Header() {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	return (
		<nav className="absolute z-50 bg-transparent w-full backdrop-blur-sm border-b border-white/20">
			<div className="md:container mx-auto px-10 py-5 flex items-center justify-center w-full">
				<div className="flex items-center justify-between gap-3 w-full ">
					{/* Left Navigation */}
					<div className="text-white">
						<h1 className="font-bold text-2xl ">
							<Link to="/"><span className="font-['Domine']">Fake</span>/<span className="font-sans">Shop</span></Link>
						</h1>
					</div>
					<div className="flex gap-20">
						<div className="hidden md:flex items-center justify-between gap-8">
							<a
								href="#"
								className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
							>
								Home
							</a>
							<Link
								to="Shop"
								className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
							>
								Shop
							</Link>
							<a
								href="#"
								className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
							>
								About
							</a>
							<a
								href="#"
								className="text-white hover:text-gray-300 font-medium transition-colors duration-300"
							>
								Contact
							</a>
						</div>

						{/* Right Icons */}
						<div className="sm:hidden md:flex items-center gap-4">
							<button className="text-white hover:text-gray-300 transition-colors duration-300 p-2 relative">
								<Heart className="w-5 h-5" />
							</button>

							<button className="text-white hover:text-gray-300 transition-colors duration-300 p-2 relative">
								<ShoppingCart className="w-5 h-5" />
								<span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
									0
								</span>
							</button>

							<button className="text-white hover:text-gray-300 transition-colors duration-300 p-2">
								<User className="w-5 h-5" />
							</button>
						</div>
					</div>

					{/* Mobile Menu Button */}
					<button
						className="md:hidden text-white p-2"
						onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
					>
						{isMobileMenuOpen ? (
							<X className="w-6 h-6" />
						) : (
							<Menu className="w-6 h-6" />
						)}
					</button>
				</div>

				{/* Mobile Menu */}
				<div
					className={`md:hidden mt-4 transition-all duration-300 ${
						isMobileMenuOpen
							? "max-h-64 opacity-100"
							: "max-h-0 opacity-0 overflow-hidden"
					}`}
				>
					<div className="bg-black/20 backdrop-blur-sm rounded-lg p-4 space-y-4">
						<a
							href="#"
							className="block text-white hover:text-gray-300 font-medium"
						>
							Home
						</a>
						<a
							href="#"
							className="block text-white hover:text-gray-300 font-medium"
						>
							Shop
						</a>
						<a
							href="#"
							className="block text-white hover:text-gray-300 font-medium"
						>
							About
						</a>
						<a
							href="#"
							className="block text-white hover:text-gray-300 font-medium"
						>
							Contact
						</a>

						<div className="flex items-center gap-4 pt-2 border-t border-white/20">
							<button className="text-white p-2">
								<Heart className="w-5 h-5" />
							</button>
							<button className="text-white p-2 relative">
								<ShoppingCart className="w-5 h-5" />
								<span className="absolute -top-1 -right-1 w-4 h-4 bg-white text-black text-xs rounded-full flex items-center justify-center font-bold">
									0
								</span>
							</button>
							<button className="text-white p-2">
								<User className="w-5 h-5" />
							</button>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
export default Header;
