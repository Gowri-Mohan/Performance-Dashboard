'use client'
import React, { useMemo, useRef } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas } from '../../lib/canvasUtils'

export default function Heatmap() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series } = useData()
  const buckets = useMemo(() => {
    const cols = 100
    const rows = 40
    const grid = new Array(rows).fill(0).map(()=>new Array(cols).fill(0))
    const start = Math.max(0, series.length - cols * rows * 3)
    for (let i = start; i < series.length; i++) {
      const idx = i - start
      const c = idx % cols
      const r = Math.floor(idx / cols) % rows
      grid[r][c] += Math.abs(series[i].v)
    }
    return grid
  }, [series])

  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    const { width, height } = ctx.canvas
    const rows = buckets.length
    const cols = buckets[0]?.length ?? 0
    if (!cols) return
    const cw = width / cols
    const ch = height / rows
    const max = Math.max(...buckets.flat())
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const v = buckets[r][c] / (max || 1)
        const alpha = Math.min(1, v)
        ctx.fillStyle = `rgba(96,165,250,${alpha})`
        ctx.fillRect(c * cw, r * ch, cw, ch)
      }
    }
  })

  return <canvas ref={canvasRef} style={{ width: '100%', height: 240, borderRadius: 8 }} />
}
