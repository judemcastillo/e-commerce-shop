import { useCallback, useMemo, useRef } from "react";
import Reveal from "../animations/Reveal.jsx";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard.jsx";
import useFetchProducts from "../hooks/useFetchProducts.js";

export default function NewArrivals() {
	const { products, loading, error } = useFetchProducts(8);
	const sliderRef = useRef(null);

	// React Slick settings
	const sliderSettings = useMemo(
		() => ({
			dots: false,
			infinite: true,
			speed: 500,
			slidesToShow: 4,
			slidesToScroll: 1,
			arrows: false,
			autoplay: false,
			responsive: [
				{
					breakpoint: 1200,
					settings: {
						slidesToShow: 3,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 768,
					settings: {
						slidesToShow: 2,
						slidesToScroll: 1,
					},
				},
				{
					breakpoint: 480,
					settings: {
						slidesToShow: 1,
						slidesToScroll: 1,
					},
				},
			],
		}),
		[]
	);

	// Memoized navigation handlers
	const handlePrev = useCallback(() => {
		sliderRef.current?.slickPrev();
	}, []);

	const handleNext = useCallback(() => {
		sliderRef.current?.slickNext();
	}, []);

	if (loading) {
		return (
			<section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
				<div className="max-w-7xl mx-auto px-4">
					<div className="text-center mb-12">
						<div className="w-64 h-8 bg-gray-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
						<div className="w-48 h-4 bg-gray-200 rounded mx-auto animate-pulse"></div>
					</div>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="bg-white rounded-2xl shadow-lg p-6 animate-pulse"
							>
								<div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>
								<div className="w-3/4 h-4 bg-gray-200 rounded mb-2"></div>
								<div className="w-1/2 h-4 bg-gray-200 rounded"></div>
							</div>
						))}
					</div>
				</div>
			</section>
		);
	}

	// Error state
	if (error) {
		return (
			<section className="py-20">
				<div className="max-w-7xl mx-auto px-4 text-center">
					<div className="bg-red-50 border border-red-200 rounded-xl p-8">
						<h2 className="text-2xl font-bold text-red-800 mb-2">
							Oops! Something went wrong
						</h2>
						<p className="text-red-600">
							Failed to load products. Please try again later.
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="relative bg-gradient-to-br from-gray-50 to-white py-20">
			<div className="max-w-7xl mx-auto px-4">
				{/* Enhanced Header */}
				<div className="text-center mb-16">
					<Reveal>
						<h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
							New Arrivals
						</h2>
						<p className="text-lg text-gray-600 max-w-2xl mx-auto">
							Discover our latest collection of premium products, carefully
							curated just for you
						</p>
					</Reveal>
				</div>

				{/* Enhanced Carousel */}
				<div className="relative">
					{/* Navigation Buttons */}
					<button
						className="absolute -left-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-full p-3 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
						onClick={handlePrev}
						aria-label="Previous products"
					>
						<ChevronLeft className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
					</button>

					<button
						className="absolute -right-6 top-1/2 -translate-y-1/2 z-30 bg-white/90 backdrop-blur-sm shadow-xl border border-gray-200 rounded-full p-3 hover:bg-white hover:shadow-2xl transition-all duration-300 hover:scale-110 group"
						onClick={handleNext}
						aria-label="Next products"
					>
						<ChevronRight className="w-6 h-6 text-gray-700 group-hover:text-gray-900 transition-colors" />
					</button>

					{/* Product Slider */}
					<Reveal>
						<div className="px-3">
							<Slider ref={sliderRef} {...sliderSettings}>
								{products.map((product) => (
									<div key={product.id} className="px-3">
										<ProductCard product={product} />
									</div>
								))}
							</Slider>
						</div>
					</Reveal>
				</div>
			</div>

			{/* Custom Slick Carousel Styles */}
			<style jsx>{`
				:global(.slick-slide) {
					height: auto;
				}
				:global(.slick-track) {
					display: flex;
					align-items: stretch;
				}
				:global(.slick-slide > div) {
					height: 100%;
				}
			`}</style>
		</section>
	);
}
