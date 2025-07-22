import Header from "../sections/Header";

function Contact() {
	return (
		<>
			<Header />
			<div className="flex flex-col items-center justify-center min-h-screen">
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
		</>
	);
}

export default Contact;
