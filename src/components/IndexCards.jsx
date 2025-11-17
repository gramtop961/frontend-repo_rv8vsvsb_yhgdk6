import { useEffect, useState } from 'react'

const TYPES = ['white', 'black', 'summer', 'uncinatum', 'bianchetto', 'others']
const REGIONS = ['italy', 'france', 'spain', 'australia', 'us', 'middle_east']

function Stat({ label, value, unit }) {
  return (
    <div className="p-4 bg-white/70 backdrop-blur rounded-lg shadow border border-slate-200">
      <p className="text-xs uppercase tracking-wider text-slate-500">{label}</p>
      <p className="text-2xl font-semibold text-slate-900">{value}{unit || ''}</p>
    </div>
  )
}

export default function IndexCards() {
  const [week, setWeek] = useState('')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const now = new Date()
    const y = now.getFullYear()
    const w = getWeekNumber(now)
    const wk = `${y}-W${String(w).padStart(2, '0')}`
    setWeek(wk)
    fetchIndex(wk)
  }, [])

  const fetchIndex = async (wk) => {
    setLoading(true)
    setError('')
    try {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/index/${wk}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="dashboard" className="bg-slate-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">WTI Price Index</h2>
            <p className="text-slate-500 text-sm">Week: {week}</p>
          </div>
          <button onClick={() => fetchIndex(week)} className="px-4 py-2 bg-slate-900 text-white rounded-md">Refresh</button>
        </div>

        {loading && <p className="text-slate-600">Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {data && (
          <div className="grid md:grid-cols-3 gap-4">
            <Stat label="Global index" value={formatNum(data.global_index)} unit=" €" />
            <div className="p-4 bg-white rounded-lg shadow border">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">By Type</p>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map(t => (
                  <div key={t} className="text-sm flex items-center justify-between">
                    <span className="capitalize text-slate-700">{t}</span>
                    <span className="font-medium">{formatNum(data.by_type?.[t] || 0)} €</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow border">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Forecast next week</p>
              <div className="grid grid-cols-2 gap-2">
                {TYPES.map(t => (
                  <div key={t} className="text-sm flex items-center justify-between">
                    <span className="capitalize text-slate-700">{t}</span>
                    <span className={"font-medium " + ((data.forecast_next_week?.[t]||0) >= 0 ? 'text-emerald-600' : 'text-red-600')}>
                      {(data.forecast_next_week?.[t] || 0)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {data && (
          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-white rounded-lg shadow border">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Regional Indexes</p>
              <div className="space-y-2">
                {REGIONS.map(r => (
                  <div key={r} className="flex items-center justify-between text-sm">
                    <span className="capitalize text-slate-700">{r.replace('_',' ')}</span>
                    <span className="font-medium">{formatNum(data.by_region?.[r] || 0)} €</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-4 bg-white rounded-lg shadow border">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Market Signals</p>
              <Signals data={data} />
            </div>
            <div className="p-4 bg-white rounded-lg shadow border">
              <p className="text-xs uppercase tracking-wider text-slate-500 mb-2">Weekly Report</p>
              <Weekly week={week} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

function Signals({ data }) {
  const TYPES = ['white','black','summer','uncinatum','bianchetto','others']
  return (
    <div className="space-y-2">
      {TYPES.map(t => (
        <div key={t} className="flex items-center justify-between text-sm">
          <span className="capitalize text-slate-700">{t}</span>
          <span className="text-slate-500">S {Math.round(data.supply_signal?.[t]||0)} / D {Math.round(data.demand_signal?.[t]||0)} / V {Math.round(data.volatility?.[t]||0)}</span>
        </div>
      ))}
    </div>
  )
}

function Weekly({ week }) {
  const [report, setReport] = useState(null)
  useEffect(() => {
    const fetchReport = async () => {
      const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
      const res = await fetch(`${baseUrl}/weekly-report/${week}`)
      const json = await res.json()
      setReport(json)
    }
    if (week) fetchReport()
  }, [week])

  if (!report) return <p className="text-slate-600">Loading...</p>

  return (
    <div className="space-y-2 text-sm">
      <ul className="list-disc pl-5 text-slate-700">
        {report.highlights?.map((h, i) => (<li key={i}>{h}</li>))}
      </ul>
      {report.commentary && <p className="text-slate-500 italic text-xs">{report.commentary}</p>}
    </div>
  )
}

function getWeekNumber(d) {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1))
  const weekNo = Math.ceil((((d - yearStart) / 86400000) + 1)/7)
  return weekNo
}

function formatNum(n){
  if (!n) return 0
  return new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 }).format(n)
}
