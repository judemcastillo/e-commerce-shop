import Header from "../sections/Header";
import { ToastProvider } from "../context/ToastContext";
import { ShopProvider } from "../context/ShopContext";
import { motion } from "framer-motion";
import Footer from "../sections/Footer";
import { Heart, Truck, Shield, Award } from "lucide-react";
import Reveal from "../animations/Reveal";

function About() {
	const stats = [
		{ number: "10K+", label: "Happy Customers" },
		{ number: "500+", label: "Products" },
		{ number: "50+", label: "Brands" },
		{ number: "4.9", label: "Average Rating" },
	];

	const values = [
		{
			icon: <Heart className="w-8 h-8" />,
			title: "Customer First",
			description:
				"We prioritize your satisfaction above all else, ensuring every purchase exceeds expectations.",
		},
		{
			icon: <Shield className="w-8 h-8" />,
			title: "Secure Shopping",
			description:
				"Shop with confidence knowing your data is protected with industry-leading security.",
		},
		{
			icon: <Truck className="w-8 h-8" />,
			title: "Fast Delivery",
			description:
				"Get your orders delivered quickly with our efficient shipping network worldwide.",
		},
		{
			icon: <Award className="w-8 h-8" />,
			title: "Premium Quality",
			description:
				"We curate only the finest products from trusted brands and manufacturers.",
		},
	];

	return (
		<>
			<ShopProvider>
				<ToastProvider>
					<Header />
					<div
						className="fixed inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url('https://images.pexels.com/photos/891059/pexels-photo-891059.jpeg?_gl=1*1r1cs6q*_ga*MTg1Mjk5MDI5NC4xNzQ1ODI5MjY0*_ga_8JE65Q40S6*czE3NTMxNzgxMDYkbzEwJGcxJHQxNzUzMTc4MTM2JGozMCRsMCRoMA..')`,
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
								~About~
							</motion.h3>
						</div>

						{/* About Section */}
						<div
							className="bg-gray-100 relative z-10 py-16
						 "
						>
							{/* Our Story Section */}
							<motion.section
								className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20 h-[50vh]"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6 }}
							>
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
									<div>
										<h2 className="text-3xl md:text-4xl font-['Domine'] mb-6 text-gray-900">
											Our Story
										</h2>
										<p className="text-gray-600 mb-4 leading-relaxed">
											Lorem ipsum dolor sit amet, consectetur adipiscing elit.
											Sed do eiusmod tempor incididunt ut labore et dolore magna
											aliqua. Ut enim ad minim veniam, quis nostrud exercitation
											ullamco laboris nisi ut aliquip
										</p>
										<p className="text-gray-600 mb-4 leading-relaxed">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Repellendus, nisi accusamus iusto sint possimus quae
											aspernatur distinctio esse, incidunt dolore laboriosam vel
											aliquam? Quo cum eaque deleniti eum quos iusto?
										</p>
										<p className="text-gray-600 leading-relaxed">
											Lorem ipsum dolor sit amet consectetur adipisicing elit.
											Eum voluptates distinctio ab et ad quo blanditiis
											dignissimos voluptate dolores, doloremque illo voluptas
											non, id quidem sunt, quis repudiandae cum placeat!
										</p>
									</div>
									<div className="relative">
										<img
											src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800"
											alt="Our store"
											className="rounded-lg shadow-xl w-full h-[400px] object-cover"
										/>
										<div className="absolute -bottom-6 -right-6 bg-black text-white p-6 rounded-lg">
											<p className="text-2xl font-bold">4+ Years</p>
											<p className="text-sm">Of Excellence</p>
										</div>
									</div>
								</div>
							</motion.section>

							{/* Stats Section */}
							<section className="bg-black text-white py-16 mb-20">
								<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
									<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
										{stats.map((stat, index) => (
											<Reveal
												key={index}
												stagger={true}
												index={index}
												staggerDelay={0.1}
											>
												<p className="text-4xl font-bold mb-2">{stat.number}</p>
												<p className="text-gray-400">{stat.label}</p>
											</Reveal>
										))}
									</div>
								</div>
							</section>

							{/* Our Values Section */}
							<section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
								<h2 className="text-3xl md:text-4xl font-['Domine'] text-center mb-12 text-gray-900">
									Our Values
								</h2>
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
									{values.map((value, index) => (
										<Reveal
											key={index}
											className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl "
											stagger={true}
											index={index}
											staggerDelay={0.1}
											direction="right"
											hover={true}
											hoverType="lift"
										>
											<div className="text-black mb-4">{value.icon}</div>
											<h3 className="text-xl font-semibold mb-2 text-gray-900">
												{value.title}
											</h3>
											<p className="text-gray-600">{value.description}</p>
										</Reveal>
									))}
								</div>
							</section>

							{/* CTA Section */}
							<section
								className="bg-black text-white py-16 rounded-lg mx-4 md:mx-8 lg:mx-16"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ duration: 0.6, delay: 0.5 }}
							>
								<div className="max-w-4xl mx-auto text-center px-4">
									<Reveal
										className="text-3xl md:text-4xl font-['Domine'] mb-6"
										direction="left"
									>
										Ready to Start Shopping?
									</Reveal>
									<Reveal
										className="text-gray-300 mb-8 text-lg"
										direction="right"
									>
										Join thousands of satisfied customers and experience the
										difference.
									</Reveal>
									<Reveal>
										<button
											className="bg-gray-100 text-black px-8 py-3 rounded-full font-semibold hover:bg-white transition-all hover:scale-105 duration-300 cursor-pointer"
											onClick={() => (window.location.href = "/shop")}
										>
											Explore Our Collection
										</button>
									</Reveal>
								</div>
							</section>
						</div>
					</div>
				</ToastProvider>
			</ShopProvider>
			<Footer />
		</>
	);
}

export default About;
