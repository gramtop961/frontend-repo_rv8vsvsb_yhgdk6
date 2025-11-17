import Hero from './components/Hero'
import IndexCards from './components/IndexCards'
import Methodology from './components/Methodology'

function App() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Hero />
      <IndexCards />
      <Methodology />
      <footer className="py-10 text-center text-slate-500 text-sm">
        World Truffle Index (WTI) — neutral, scientific, authoritative, global. Powered by insights from House of Tartufo – The Italian Truffle Hub.
      </footer>
    </div>
  )
}

export default App
