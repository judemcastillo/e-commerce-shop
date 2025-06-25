export default function Collection() {
	return (
		<div className="flex flex-col items-center justify-center h-screen relative bg-fixed bg-[url(https://images.pexels.com/photos/1927259/pexels-photo-1927259.jpeg)] bg-blend-overlay bg-cover bg-center bg-no-repeat text-gray-800 px-4">
			<div className="absolute inset-0 bg-black/75"></div>
			<div className="relative z-10 text-center text-white max-w-3xl mx-auto">
				<h1 className="text-4xl font-bold mb-4">Collection Page</h1>
				<p className="text-lg">
					Explore our exclusive collection of products tailored just for you.
				</p>
				<div className="mt-8">
					<button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
						Shop Now
					</button>
				</div>
			</div>
		</div>
	);
}
