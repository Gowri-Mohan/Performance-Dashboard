'use client'
import React, { useMemo, useRef } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas } from '../../lib/canvasUtils'

export default function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series } = useData()

  const buckets = useMemo(() => {
    const size = 100
    const arr = new Array(size).fill(0)
    const start = Math.max(0, series.length - 5000)
    for (let i = start; i < series.length; i++) {
      const idx = Math.floor(((i - start) / Math.max(1, series.length - start)) * size)
      arr[idx] += Math.abs(series[i].v)
    }
    return arr
  }, [series])

  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    const { width, height } = ctx.canvas
    const w = width / buckets.length
    for (let i = 0; i < buckets.length; i++) {
      const h = Math.min(height, (buckets[i] / Math.max(...buckets)) * height)
      ctx.fillStyle = 'rgba(96,165,250,0.6)'
      ctx.fillRect(i * w, height - h, w - 1, h)
    }
  })

  return <canvas ref={canvasRef} style={{ width: '100%', height: 240, borderRadius: 8 }} />
}
