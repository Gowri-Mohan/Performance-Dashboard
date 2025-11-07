'use client'
import React from 'react'
import { useData } from '../../hooks/useDataStream'

export default function FilterPanel() {
  const { pushRate, setPushRate } = useData()
  return (
    <div>
      <div className="small">Update interval (ms)</div>
      <input type="range" min={10} max={1000} value={pushRate} onChange={(e)=>setPushRate(Number(e.target.value))} />
      <div className="small">Current: {pushRate} ms</div>
    </div>
  )
}
