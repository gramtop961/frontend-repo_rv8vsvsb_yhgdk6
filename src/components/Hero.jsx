import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section className="relative min-h-[70vh] w-full overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="absolute inset-0 opacity-60">
        <Spline scene="https://prod.spline.design/Nhk4dWoYLj83rV44/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <p className="uppercase tracking-widest text-sky-300/80 text-xs mb-4">World Truffle Index</p>
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">A global, scientific benchmark for truffle markets</h1>
          <p className="mt-6 text-slate-200/90 md:text-lg">Neutral. Authoritative. Data-driven. The WTI tracks prices, quality, seasonality and market dynamics across major regions and truffle types.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#dashboard" className="bg-sky-500 hover:bg-sky-400 text-white px-5 py-2.5 rounded-md transition">Open Dashboard</a>
            <a href="#methodology" className="bg-slate-700/70 hover:bg-slate-700 text-white px-5 py-2.5 rounded-md transition">Methodology</a>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
    </section>
  )
}
