import { useState } from 'react'
import EcommerceHero from './components/sections/EcommerceHero.jsx'
import Header from './components/sections/Header.jsx'
import NewArrivals from './components/sections/NewArrivals.jsx'

import './App.css'

function App() {

  return (
    <>
    <Header />
    <EcommerceHero />
    <NewArrivals />

    </>
  )
}

export default App
