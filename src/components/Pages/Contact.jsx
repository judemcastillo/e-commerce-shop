import Header from "../sections/Header";
import { ToastProvider } from "../context/ToastContext";
import { ShopProvider } from "../context/ShopContext";
import { motion } from "framer-motion";
import Footer from "../sections/Footer";
import {
	Mail,
	Phone,
	MapPin,
	Clock,
	Send,
	MessageSquare,
	Facebook,
	Twitter,
	Instagram,
	Linkedin,
} from "lucide-react";
import { useState } from "react";
import Reveal from "../animations/Reveal";

function Contact() {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		subject: "",
		message: "",
	});

	const [isSubmitting, setIsSubmitting] = useState(false);

	const handleChange = (e) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitting(true);

		// Simulate form submission
		setTimeout(() => {
			alert("Thank you for your message! We'll get back to you soon.");
			setFormData({ name: "", email: "", subject: "", message: "" });
			setIsSubmitting(false);
		}, 2000);
	};

	const contactInfo = [
		{
			icon: <Phone className="w-6 h-6" />,
			title: "Phone",
			details: "+1 (555) 123-4567",
			subDetails: "Mon-Fri 9am-6pm",
		},
		{
			icon: <Mail className="w-6 h-6" />,
			title: "Email",
			details: "support@example.com",
			subDetails: "24/7 online support",
		},
		{
			icon: <MapPin className="w-6 h-6" />,
			title: "Address",
			details: "123 Commerce Street",
			subDetails: "New York, NY 10001",
		},
		{
			icon: <Clock className="w-6 h-6" />,
			title: "Business Hours",
			details: "Monday - Friday",
			subDetails: "9:00 AM - 6:00 PM EST",
		},
	];

	const socialLinks = [
		{ icon: <Facebook className="w-5 h-5" />, href: "#", name: "Facebook" },
		{ icon: <Twitter className="w-5 h-5" />, href: "#", name: "Twitter" },
		{ icon: <Instagram className="w-5 h-5" />, href: "#", name: "Instagram" },
		{ icon: <Linkedin className="w-5 h-5" />, href: "#", name: "LinkedIn" },
	];

	return (
		<>
			<ShopProvider>
				<ToastProvider>
					<Header />
					<div
						className="fixed inset-0 bg-cover bg-center bg-no-repeat"
						style={{
							backgroundImage: `url('https://images.pexels.com/photos/207456/pexels-photo-207456.jpeg?_gl=1*qczp56*_ga*MTg1Mjk5MDI5NC4xNzQ1ODI5MjY0*_ga_8JE65Q40S6*czE3NTM2MDQ5ODIkbzEyJGcxJHQxNzUzNjA1MDA3JGozNSRsMCRoMA..')`,
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

						{/* Contact Section */}
						<div className="bg-gray-100 relative z-10 py-16">
							<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
								{/* Intro Text */}
								<Reveal>
									<div className="text-center mb-16">
										<h2 className="text-3xl md:text-4xl font-['Domine'] mb-4 text-gray-900">
											Get In Touch
										</h2>
										<p className="text-gray-600 text-lg max-w-2xl mx-auto">
											Have a question or need assistance? We're here to help.
											Send us a message and we'll respond as soon as possible.
										</p>
									</div>
								</Reveal>

								{/* Contact Info Cards */}
								<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
									{contactInfo.map((info, index) => (
										<Reveal
											key={index}
											stagger={true}
											index={index}
											staggerDelay={0.2}
										>
											<div className="bg-white p-6 rounded-lg shadow-lg text-center hover:shadow-xl hover:translate-y-[-10px] transition-all duration-300">
												<div className="inline-flex items-center justify-center w-12 h-12 bg-black text-white rounded-full mb-4">
													{info.icon}
												</div>
												<h3 className="text-lg font-semibold text-gray-900 mb-2">
													{info.title}
												</h3>
												<p className="text-gray-700">{info.details}</p>
												<p className="text-sm text-gray-500 mt-1">
													{info.subDetails}
												</p>
											</div>
										</Reveal>
									))}
								</div>

								{/* Contact Form and Map Section */}
								<div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
									{/* Contact Form */}
									<Reveal direction="left">
										<div className="bg-white p-8 rounded-lg shadow-lg">
											<h3 className="text-2xl font-['Domine'] mb-6 text-gray-900">
												Send Us a Message
											</h3>
											<form onSubmit={handleSubmit} className="space-y-6">
												<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Your Name
														</label>
														<input
															type="text"
															name="name"
															value={formData.name}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
															placeholder="John Doe"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700 mb-2">
															Email Address
														</label>
														<input
															type="email"
															name="email"
															value={formData.email}
															onChange={handleChange}
															required
															className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
															placeholder="john@example.com"
														/>
													</div>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Subject
													</label>
													<input
														type="text"
														name="subject"
														value={formData.subject}
														onChange={handleChange}
														required
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition"
														placeholder="How can we help?"
													/>
												</div>

												<div>
													<label className="block text-sm font-medium text-gray-700 mb-2">
														Message
													</label>
													<textarea
														name="message"
														value={formData.message}
														onChange={handleChange}
														required
														rows={5}
														className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-black focus:border-transparent transition resize-none"
														placeholder="Tell us more about your inquiry..."
													/>
												</div>

												<motion.button
													type="submit"
													disabled={isSubmitting}
													className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
													whileHover={{ scale: 1.02 }}
													whileTap={{ scale: 0.98 }}
												>
													{isSubmitting ? (
														<>Sending...</>
													) : (
														<>
															Send Message
															<Send className="w-4 h-4" />
														</>
													)}
												</motion.button>
											</form>
										</div>
									</Reveal>

									{/* Map/FAQ Section */}
									<Reveal direction="right">
										<div className="bg-white p-8 rounded-lg shadow-lg h-full">
											<h3 className="text-2xl font-['Domine'] mb-6 text-gray-900">
												Find Us Here
											</h3>

											{/* Placeholder Map */}
											<div className="w-full h-64 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
												<iframe
													src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387190.2799160891!2d-74.25987368715491!3d40.697670064237676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQxJzUxLjYiTiA3NMKwMTUnMzUuNCJX!5e0!3m2!1sen!2sus!4v1635959040992!5m2!1sen!2sus"
													width="100%"
													height="100%"
													style={{ border: 0 }}
													allowFullScreen=""
													loading="lazy"
													className="rounded-lg"
												></iframe>
											</div>

											{/* Social Links */}
											<div>
												<h4 className="text-lg font-semibold mb-4 text-gray-900">
													Connect With Us
												</h4>
												<div className="flex gap-4">
													{socialLinks.map((social, index) => (
														<motion.a
															key={index}
															href={social.href}
															className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center hover:bg-black hover:text-white transition-colors"
															whileHover={{ scale: 1.1 }}
															whileTap={{ scale: 0.95 }}
															aria-label={social.name}
														>
															{social.icon}
														</motion.a>
													))}
												</div>
											</div>

											{/* Quick Contact */}
											<div className="mt-6 p-4 bg-gray-50 rounded-lg">
												<div className="flex items-center gap-3 text-gray-700">
													<MessageSquare className="w-5 h-5" />
													<div>
														<p className="font-semibold">Live Chat Available</p>
														<p className="text-sm text-gray-600">
															Average response time: 2 minutes
														</p>
													</div>
												</div>
											</div>
										</div>
									</Reveal>
								</div>
							</div>
						</div>
					</div>
				</ToastProvider>
			</ShopProvider>
			<Footer />
		</>
	);
}

export default Contact;
