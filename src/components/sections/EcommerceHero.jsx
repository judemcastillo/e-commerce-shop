import React, { useState, useEffect } from "react";
import Reveal from "../animations/Reveal.jsx";

export default function EcommerceHero() {
	return (
		<div className="h-screen relative flex flex-col items-center justify-center overflow-hidden">
			{/* Fixed Background Image */}
			<div
				className="fixed h-screen block inset-0 bg-cover bg-center bg-no-repeat"
				style={{
					backgroundImage: `url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
				}}
			>
				{/* Dark overlay for better text readability */}
				<div className="absolute inset-0 bg-black/75"></div>
			</div>

			{/* Main Hero Content */}
			<div className="relative z-40 flex items-center content-center justify-center px-6">
				<Reveal className="text-center text-white max-w-5xl mx-auto">
					{/* Main Headline */}
					<h1 className="text-4xl font-['Domine'] md:text-6xl lg:text-7xl  leading-tight mb-8 ">
						Discover Your Style Story
						<br />
					</h1>

					{/* Description */}
					<p className="text-lg  md:text-xl leading-relaxed mb-12 max-w-3xl mx-auto opacity-90">
						Curated collections that speak to your unique personality. From
						everyday essentials to standout pieces, find what resonates with
						you.
					</p>

					{/* Call to Action Button */}
					<button className="inline-block px-12 py-4 border-2 border-white cursor-pointer text-white font-medium tracking-wider uppercase hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105">
						SHOP NOW
					</button>
				</Reveal>
			</div>
		</div>
	);
}
