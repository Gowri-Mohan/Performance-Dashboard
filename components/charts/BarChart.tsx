'use client'
import React, { useMemo, useRef } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas } from '../../lib/canvasUtils'

export default function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series, timeRange } = useData()

  const bars = useMemo(() => {
    if (!series.length) return []
    const filtered = timeRange
      ? series.filter((p) => p.t >= timeRange[0] && p.t <= timeRange[1])
      : series.slice(-10000)

    const start = filtered[0]?.t ?? 0
    const end = filtered[filtered.length - 1]?.t ?? start
    const interval = (end - start) / 50 // 50 bars max

    const buckets = new Array(50).fill(0)
    for (const p of filtered) {
      const idx = Math.min(49, Math.floor((p.t - start) / interval))
      buckets[idx] += Math.abs(p.v)
    }
    return buckets
  }, [series, timeRange])

  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    const { width, height } = ctx.canvas
    const w = width / bars.length
    const max = Math.max(...bars)
    for (let i = 0; i < bars.length; i++) {
      const h = (bars[i] / max) * height
      ctx.fillStyle = 'rgba(96,165,250,0.6)'
      ctx.fillRect(i * w, height - h, w - 1, h)
    }
  })

  return <canvas ref={canvasRef} style={{ width: '100%', height: 240, borderRadius: 8 }} />
}
