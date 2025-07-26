import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Filter, X } from "lucide-react";
import Header from "../../sections/Header.jsx";
import ProductCard from "../../sections/ProductCard.jsx";
import { ShopProvider } from "../../context/ShopContext.jsx";
import useFetchProducts from "../../hooks/useFetchProducts.js";
import { ToastProvider } from "../../context/ToastContext";
import Footer from "../../sections/Footer.jsx";

function Shop() {
	// Fetch all products by not passing a limit or passing a high number
	const { products, loading, error } = useFetchProducts(20); // or remove the limit
	const [filteredProducts, setFilteredProducts] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("all");
	const [sortBy, setSortBy] = useState("featured");
	const [showMobileFilters, setShowMobileFilters] = useState(false);

	// Get unique categories
	const categories = [
		"all",
		...new Set(products.map((product) => product.category)),
	];

	// Filter and sort products
	useEffect(() => {
		let filtered = [...products];

		// Category filter
		if (selectedCategory !== "all") {
			filtered = filtered.filter(
				(product) => product.category === selectedCategory
			);
		}

		// Sorting
		switch (sortBy) {
			case "price-low":
				filtered.sort((a, b) => a.price - b.price);
				break;
			case "price-high":
				filtered.sort((a, b) => b.price - a.price);
				break;
			case "rating":
				filtered.sort((a, b) => (b.rating?.rate || 0) - (a.rating?.rate || 0));
				break;
			case "name":
				filtered.sort((a, b) => a.title.localeCompare(b.title));
				break;
			default:
				// featured - keep original order
				break;
		}

		setFilteredProducts(filtered);
	}, [products, selectedCategory, sortBy]);

	return (
		<>
			<ShopProvider>
				<ToastProvider>
					<Header />
					<div
						className="fixed inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url('https://images.pexels.com/photos/346752/pexels-photo-346752.jpeg?_gl=1*d545p3*_ga*MTg1Mjk5MDI5NC4xNzQ1ODI5MjY0*_ga_8JE65Q40S6*czE3NTI5MDA2NTgkbzckZzEkdDE3NTI5MDA3MTQkajQkbDAkaDA.')`,
							zIndex: -1,
						}}
					>
						{/* Dark overlay */}
						<div className="absolute inset-0 bg-black/75"></div>
					</div>
					<div className="flex flex-col min-h-screen">
						{/* Hero Section */}

						<div className="relative h-[40vh] flex items-center justify-center">
							<motion.h3
								className="font-['Domine'] text-4xl md:text-5xl lg:text-6xl leading-tight text-center text-white relative z-10 flex items-center justify-center h-full"
								initial={{ opacity: 0, y: 40 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{
									duration: 0.8,
									ease: "easeOut",
								}}
							>
								~Shop~
							</motion.h3>
						</div>

						{/* Filter and Products Section */}
						<div className="flex-1 bg-gray-50 pb-3">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20">
								{/* Filter Bar */}
								<div className="mb-8">
									<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
										{/* Results count */}
										<p className="text-gray-600">
											Showing {filteredProducts.length} of {products.length}{" "}
											products
										</p>

										{/* Desktop Filters */}
										<div className="hidden sm:flex gap-4 items-center">
											{/* Category Filter */}
											<div className="relative">
												<select
													value={selectedCategory}
													onChange={(e) => setSelectedCategory(e.target.value)}
													className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
												>
													{categories.map((category) => (
														<option key={category} value={category}>
															{category === "all"
																? "All Categories"
																: category.charAt(0).toUpperCase() +
																  category.slice(1)}
														</option>
													))}
												</select>
												<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
											</div>

											{/* Sort Filter */}
											<div className="relative">
												<select
													value={sortBy}
													onChange={(e) => setSortBy(e.target.value)}
													className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
												>
													<option value="featured">Featured</option>
													<option value="price-low">Price: Low to High</option>
													<option value="price-high">Price: High to Low</option>
													<option value="rating">Highest Rated</option>
													<option value="name">Alphabetical</option>
												</select>
												<ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
											</div>
										</div>

										{/* Mobile Filter Button */}
										<button
											onClick={() => setShowMobileFilters(true)}
											className="sm:hidden flex items-center gap-2 bg-white border border-gray-300 rounded-lg px-4 py-2 hover:bg-gray-50"
										>
											<Filter className="w-4 h-4" />
											Filters
										</button>
									</div>
								</div>

								{/* Mobile Filter Modal */}
								<AnimatePresence>
									{showMobileFilters && (
										<motion.div
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											className="fixed inset-0 z-50 sm:hidden"
										>
											<div
												className="absolute inset-0 bg-black/50"
												onClick={() => setShowMobileFilters(false)}
											/>
											<motion.div
												initial={{ x: "100%" }}
												animate={{ x: 0 }}
												exit={{ x: "100%" }}
												transition={{ type: "tween", duration: 0.3 }}
												className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl"
											>
												<div className="p-4 border-b">
													<div className="flex justify-between items-center">
														<h3 className="text-lg font-semibold">Filters</h3>
														<button onClick={() => setShowMobileFilters(false)}>
															<X className="w-5 h-5" />
														</button>
													</div>
												</div>
												<div className="p-4 space-y-6">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Category
														</label>
														<select
															value={selectedCategory}
															onChange={(e) =>
																setSelectedCategory(e.target.value)
															}
															className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
														>
															{categories.map((category) => (
																<option key={category} value={category}>
																	{category === "all"
																		? "All Categories"
																		: category.charAt(0).toUpperCase() +
																		  category.slice(1)}
																</option>
															))}
														</select>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Sort By
														</label>
														<select
															value={sortBy}
															onChange={(e) => setSortBy(e.target.value)}
															className="w-full appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
														>
															<option value="featured">Featured</option>
															<option value="price-low">
																Price: Low to High
															</option>
															<option value="price-high">
																Price: High to Low
															</option>
															<option value="rating">Highest Rated</option>
															<option value="name">Alphabetical</option>
														</select>
													</div>
												</div>
											</motion.div>
										</motion.div>
									)}
								</AnimatePresence>

								{/* Loading State */}
								{loading && (
									<div className="flex justify-center items-center h-64">
										<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
									</div>
								)}

								{/* Error State */}
								{error && (
									<div className="text-center py-12">
										<p className="text-red-600">
											Error loading products: {error}
										</p>
									</div>
								)}

								{/* Products Grid */}
								{!loading && !error && (
									<motion.div
										className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ duration: 0.5 }}
									>
										<AnimatePresence>
											{filteredProducts.map((product, index) => (
												<motion.div
													key={product.id}
													initial={{ opacity: 0, y: 20 }}
													animate={{ opacity: 1, y: 0 }}
													exit={{ opacity: 0, scale: 0.9 }}
													transition={{
														duration: 0.3,
														delay: index * 0.05, // Stagger animation
													}}
												>
													<ProductCard product={product} />
												</motion.div>
											))}
										</AnimatePresence>
									</motion.div>
								)}

								{/* No Products Message */}
								{!loading && !error && filteredProducts.length === 0 && (
									<div className="text-center py-12">
										<p className="text-gray-600 text-lg">
											No products found matching your filters.
										</p>
										<button
											onClick={() => {
												setSelectedCategory("all");
												setSortBy("featured");
											}}
											className="mt-4 text-blue-600 hover:text-blue-700 underline"
										>
											Clear filters
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</ToastProvider>
			</ShopProvider>
			<Footer />
		</>
	);
}

export default Shop;
