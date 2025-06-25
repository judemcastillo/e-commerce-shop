export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8 relative bottom-0 w-full">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-semibold">Stay Connected</h2>
            <p className="text-sm">Subscribe to our newsletter for updates</p>
          </div>
          <form className="flex flex-col md:flex-row items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-sm">
          &copy; {new Date().getFullYear()} J Systems. All rights reserved.
        </div>
      </div>
    </footer>
  );
}