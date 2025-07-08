import { ShopProvider } from './components/context/ShopContext.jsx'
import EcommerceHero from './components/sections/EcommerceHero.jsx'
import Header from './components/sections/Header.jsx'
import NewArrivals from './components/sections/NewArrivals.jsx'
import Footer from './components/sections/Footer.jsx'
import Collection from './components/sections/Collection.jsx'
import './App.css'

function App() {
  return (
    <ShopProvider>
      <Header />
      <EcommerceHero />
      <NewArrivals />
      <Collection />
      <Footer />
    </ShopProvider>
  )
}

export default App