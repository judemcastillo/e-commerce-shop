import Header from "../../sections/Header.jsx";
import { ShopProvider } from "../../context/ShopContext.jsx";

function Shop() {
	return (
		<>
		<ShopProvider>
            <Header />
            {/* Main Shop Content */}
			<div className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white px-4">
				<h1 className="text-4xl font-bold mb-4">Shop Page</h1>
				<p className="text-lg">
					Welcome to the shop! Here you can find various products.
				</p>
			</div>
			</ShopProvider>
		</>
	);
}
export default Shop;
