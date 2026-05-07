import './App.css'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import FeatureBanner from './components/sections/FeatureBanner'
import Stats from './components/sections/Stats'
import About from './components/sections/About'
import KulinInfo from './components/sections/KulinInfo'
import Media from './components/sections/Media'
import Contact from './components/sections/Contact'
import CathedralDivider from './components/ui/CathedralDivider'

function App() {
  return (
    <>
      <Header />
      <main>
        <div style={{ position: 'relative' }}>
          <Hero />
          <FeatureBanner />
        </div>
        <Stats />
        <About />
        <KulinInfo />
        <Media />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default App
