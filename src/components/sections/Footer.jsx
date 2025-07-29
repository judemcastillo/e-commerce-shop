import Reveal from "../animations/Reveal";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

export default function Footer() {
	const currentYear = new Date().getFullYear();

	const navLinks = [
		{ name: "Home", path: "/" },
		{ name: "Shop", path: "/shop" },
		{ name: "About", path: "/about" },
		{ name: "Contact", path: "/contact" }
	];

	const socialLinks = [
		{ icon: Facebook, href: "https://facebook.com", label: "Facebook" },
		{ icon: Instagram, href: "https://instagram.com", label: "Instagram" },
		{ icon: Youtube, href: "https://youtube.com", label: "YouTube" },
		{ icon: Twitter, href: "https://twitter.com", label: "Twitter" }
	];

	return (
		<footer className="bg-white/5 backdrop-blur-sm text-white relative w-full border-t border-white/10">
			<div className="max-w-7xl mx-auto px-4">
				{/* Main Footer Content */}
				<Reveal direction="fade" delay={0.2}>
					<div className="py-8 flex flex-col md:flex-row items-center justify-between">
						{/* Logo */}
						<div className="mb-6 md:mb-0">
							<Link to="/" className="flex items-center">
								<div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mr-3">
									<span className="text-xs font-bold">FS</span>
								</div>
								<span className="text-xl font-light tracking-wider">FAKE/SHOP</span>
							</Link>
						</div>

						{/* Navigation Links */}
						<nav className="mb-6 md:mb-0">
							<ul className="flex space-x-8">
								{navLinks.map((link, index) => (
									<Reveal
										key={link.name}
										direction="up"
										delay={0.1}
										stagger={true}
										index={index}
									>
										<li>
											<Link
												to={link.path}
												className="text-white/80 hover:text-white transition-colors duration-300 text-sm uppercase tracking-wider"
											>
												{link.name}
											</Link>
										</li>
									</Reveal>
								))}
							</ul>
						</nav>

						{/* Social Links */}
						<div className="flex space-x-4">
							{socialLinks.map((social, index) => (
								<Reveal
									key={social.label}
									direction="up"
									delay={0.2}
									stagger={true}
									index={index}
								>
									<a
										href={social.href}
										target="_blank"
										rel="noopener noreferrer"
										className="text-white/80 hover:text-white transition-colors duration-300"
										aria-label={social.label}
									>
										<social.icon size={20} />
									</a>
								</Reveal>
							))}
						</div>
					</div>
				</Reveal>

				{/* Divider */}
				<div className="border-t border-white/10"></div>

				{/* Copyright */}
				<Reveal direction="fade" delay={0.4}>
					<div className="py-4 text-center text-sm text-white/60">
						Copyright © {currentYear} Fake/Shop. All rights reserved.
					</div>
				</Reveal>
			</div>

			
		</footer>
	);
}