'use client'
import React from 'react'
import { useData } from '../../hooks/useDataStream'
import { useVirtualization } from '../../hooks/useVirtualization'

export default function DataTable() {
  const { series } = useData()
  const total = series.length
  const { start, end, setScrollTop } = useVirtualization(total, 28, 320)

  return (
    <div>
      <h4>Data Table (latest {total} pts)</h4>
      <div style={{ height: 320, overflow: 'auto' }} onScroll={(e) => setScrollTop((e.target as Element).scrollTop)}>
        <div style={{ height: total * 28, position: 'relative' }}>
          <div style={{ position: 'absolute', top: start * 28, left: 0, right: 0 }}>
            {series.slice(start, end).map((p, i) => (
              <div key={p.t + '-' + i} style={{ display: 'flex', gap: 12, padding: '4px 8px', borderBottom: '1px solid rgba(255,255,255,0.03)', fontSize: 12 }}>
                <div style={{ width: 150 }}>{new Date(p.t).toLocaleTimeString()}</div>
                <div>{p.v.toFixed(2)}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
