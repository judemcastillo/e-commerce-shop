import { ShopProvider } from "./components/context/ShopContext.jsx";
import EcommerceHero from "./components/sections/EcommerceHero.jsx";
import Header from "./components/sections/Header.jsx";
import NewArrivals from "./components/sections/NewArrivals.jsx";
import Footer from "./components/sections/Footer.jsx";
import Collection from "./components/sections/Collection.jsx";
import "./App.css";
import { ToastProvider } from "./components/context/ToastContext";

function App() {
	return (
		<ShopProvider>
			<ToastProvider>
				<Header />
				<EcommerceHero />
				<NewArrivals />
				<Collection />
				<Footer />
			</ToastProvider>
		</ShopProvider>
	);
}

export default App;
