import Header from "../sections/Header";
import { ToastProvider } from "../context/ToastContext";
import { ShopProvider } from "../context/ShopContext";
import { motion } from "framer-motion";
import Footer from "../sections/Footer";

function Contact() {
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
								~Contact~
							</motion.h3>
						</div>
						<div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 relative z-10">
							<h1 className="text-4xl font-bold mb-4">Contact Us</h1>
							<p className="text-lg">
								Feel free to reach out with any questions or feedback!
							</p>
							<form className="mt-6 w-full max-w-md">
								<input
									type="text"
									placeholder="Your Name"
									className="w-full p-2 mb-4 border border-gray-300 rounded"
								/>
								<input
									type="email"
									placeholder="Your Email"
									className="w-full p-2 mb-4 border border-gray-300 rounded"
								/>
								<textarea
									placeholder="Your Message"
									className="w-full p-2 mb-4 border border-gray-300 rounded"
									rows="4"
								></textarea>
								<button
									type="submit"
									className="w-full p-2 bg-blue-500 text-white rounded"
								>
									Send Message
								</button>
							</form>
						</div>
					</div>
				</ToastProvider>
			</ShopProvider>
			<Footer />
		</>
	);
}

export default Contact;
