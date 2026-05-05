import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeatureBanner from './components/sections/FeatureBanner'
import About from './components/sections/About'
import Products from './components/sections/Products'
import Contact from './components/sections/Contact'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <FeatureBanner />
        <About />
        <Products />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
