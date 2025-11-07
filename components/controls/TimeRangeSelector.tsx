'use client'
import React from 'react'
import { useData } from '../../hooks/useDataStream'

export default function TimeRangeSelector() {
  const { series, setTimeRange } = useData()

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const choice = e.target.value
    if (!series.length) return
    const end = series[series.length - 1].t
    let start = end - 60_000
    if (choice === '5min') start = end - 5 * 60_000
    if (choice === '1hr') start = end - 60 * 60_000
    setTimeRange([start, end])
  }

  return (
    <div style={{ marginTop: 8 }}>
      <div className="small">Time range</div>
      <select onChange={handleChange}>
        <option value="1min">Last 1 minute</option>
        <option value="5min">Last 5 minutes</option>
        <option value="1hr">Last 1 hour</option>
        <option value="all">All data</option>
      </select>
    </div>
  )
}
