export default function Methodology() {
  return (
    <section id="methodology" className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">Methodology</h2>
        <div className="grid md:grid-cols-2 gap-6 text-slate-700">
          <div className="p-4 bg-slate-50 border rounded-lg">
            <h3 className="font-semibold mb-2">Quality Scoring System</h3>
            <p className="text-sm">We standardize evaluation across seven dimensions: size, aroma, freshness, color, texture, origin and handling. Raw inputs are normalized to a 0–100 scale and weighted to produce a composite quality score used in price weighting.</p>
            <ul className="mt-2 text-sm list-disc pl-5">
              <li>Freshness uses exponential decay: score = 100·e^{-k·days}</li>
              <li>Size normalized at 60mm = 100</li>
              <li>Certified origin floors at 60</li>
            </ul>
          </div>
          <div className="p-4 bg-slate-50 border rounded-lg">
            <h3 className="font-semibold mb-2">Seasonality Model</h3>
            <p className="text-sm">Harvest windows per truffle type reflect known biological and regional calendars. Seasonal impact adjusts expected supply pressure and is visible in trend analysis.</p>
          </div>
          <div className="p-4 bg-slate-50 border rounded-lg">
            <h3 className="font-semibold mb-2">Market Data Model</h3>
            <p className="text-sm">We track supply, demand and volatility signals from field submissions and market sources. Weekly medians reduce outliers; momentum with volatility damping informs one-week forecasts.</p>
          </div>
          <div className="p-4 bg-slate-50 border rounded-lg">
            <h3 className="font-semibold mb-2">Governance & Attribution</h3>
            <p className="text-sm">Neutral, scientific, global. Powered by insights from House of Tartufo – The Italian Truffle Hub, while remaining independent and non-proprietary in its methodology.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
