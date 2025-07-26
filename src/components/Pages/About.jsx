import Header from "../sections/Header";
import { ToastProvider } from "../context/ToastContext";
import { ShopProvider } from "../context/ShopContext";
import { motion } from "framer-motion";
import Footer from "../sections/Footer";

function About() {
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
						<div className="flex flex-col items-center justify-center h-screen bg-gray-100 relative z-10">

							<p className="text-lg text-center max-w-2xl">
								We are a team of passionate individuals dedicated to providing
								the best shopping experience. Our mission is to offer
								high-quality products and exceptional customer service.
							</p>
						</div>
					</div>
				</ToastProvider>
			</ShopProvider>
			<Footer />
		</>
	);
}
export default About;
