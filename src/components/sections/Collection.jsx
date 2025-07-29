import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import Reveal from "../animations/Reveal.jsx";

export default function Collection() {
	const [email, setEmail] = useState("");
	const [isSubscribed, setIsSubscribed] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		if (email) {
			// Handle subscription logic here
			console.log("Subscribing:", email);
			setIsSubscribed(true);
			setTimeout(() => {
				setIsSubscribed(false);
				setEmail("");
			}, 3000);
		}
	};

	return (
		<div className="min-h-screen bg-black text-white ">
			{/* Hero Section with Background */}
			<div className="relative h-screen ">
				<div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg')] bg-cover bg-center bg-fixed">
					<div className="absolute inset-0 bg-black/75"></div>
				</div>

				{/* Hero Content */}
				<div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
					<Reveal direction="up" delay={0.2}>
						<div className="flex items-center justify-center mb-4">
							<Sparkles className="w-8 h-8 text-white/60 mr-2" />
							<h2 className="text-5xl md:text-6xl font-light">
								Jewelry Collection
							</h2>
							<Sparkles className="w-8 h-8 text-white/60 ml-2" />
						</div>
					</Reveal>
					<Reveal direction="up" delay={0.4}>
						<p className="text-lg text-white/70 max-w-2xl">
							Discover our exquisite selection of fine jewelry. Each piece is
							carefully curated to add elegance and sophistication to your
							style.
						</p>
					</Reveal>
					{/* Category Features */}
					<Reveal direction="fade" delay={0.6}>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-5xl mx-auto">
							{[
								{
									title: "Premium Quality",
									description: "Authentic materials and expert craftsmanship",
									icon: "✨",
								},
								{
									title: "Secure Shipping",
									description: "Insured delivery with tracking",
									icon: "🔒",
								},
								{
									title: "Certificate of Authenticity",
									description: "Guaranteed genuine products",
									icon: "📜",
								},
							].map((feature, index) => (
								<Reveal
									key={index}
									direction="up"
									delay={0.2}
									stagger={true}
									index={index}
									className="text-center bg-black/50 p-3 py-8 rounded-lg border-black/50 border-2 shadow-lg hover:bg-white/10 transition-colors"
								>
									<div className="text-4xl mb-4">{feature.icon}</div>
									<h4 className="text-xl font-light mb-2">{feature.title}</h4>
									<p className="text-white/60 text-sm">{feature.description}</p>
								</Reveal>
							))}
						</div>
					</Reveal>

					{/* Call to Action */}
					<Reveal direction="up" delay={0.8}>
						<div className="text-center mt-20">
							<motion.button
								whileHover={{ scale: 1.05 }}
								whileTap={{ scale: 0.95 }}
								className="px-8 py-3 border border-white text-white uppercase tracking-wider hover:bg-white hover:text-black transition-all duration-300 inline-flex items-center"
							>
								View All Jewelry
								<ArrowRight size={16} className="ml-2" />
							</motion.button>
						</div>
					</Reveal>
				</div>
			</div>

			{/* Luxury Banner */}
			<div className="relative h-[50vh]  overflow-hidden">
				<img
					src="https://images.pexels.com/photos/2735970/pexels-photo-2735970.jpeg"
					alt="Luxury Jewelry"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"></div>

				<div className="absolute inset-0 flex items-center">
					<div className="container mx-auto px-4">
						<div className="max-w-xl">
							<Reveal direction="right" delay={0.2}>
								<h3 className="text-4xl font-light mb-4">Timeless Elegance</h3>
							</Reveal>
							<Reveal direction="right" delay={0.4}>
								<p className="text-lg text-white/70 mb-6">
									Each piece in our collection is selected for its exceptional
									beauty and craftsmanship. Find the perfect accessory to
									complement your style.
								</p>
							</Reveal>
							<Reveal direction="right" delay={0.6}>
								<Link to="/shop/jewelry">
									<motion.button
										whileHover={{ x: 10 }}
										className="text-white uppercase tracking-wider inline-flex items-center group"
									>
										Explore Collection
										<ArrowRight
											size={16}
											className="ml-2 transform group-hover:translate-x-2 transition-transform"
										/>
									</motion.button>
								</Link>
							</Reveal>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
