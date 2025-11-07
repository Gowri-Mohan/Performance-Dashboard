'use client'
import React, { useMemo, useRef } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas } from '../../lib/canvasUtils'

export default function ScatterPlot() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series, timeRange } = useData()

  const points = useMemo(() => {
    if (!series.length) return []
    if (!timeRange) return series.slice(Math.max(0, series.length - 20000))
    return series.filter((p) => p.t >= timeRange[0] && p.t <= timeRange[1])
  }, [series, timeRange])


  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    const cw = ctx.canvas.width
    const ch = ctx.canvas.height
    if (!points.length) return
    const minT = points[0].t
    const maxT = points[points.length - 1].t
    const minV = Math.min(...points.map(p => p.v))
    const maxV = Math.max(...points.map(p => p.v))
    for (let i = 0; i < points.length; i+=2) { // skip some for performance
      const p = points[i]
      const x = ((p.t - minT) / (maxT - minT)) * cw
      const y = ch - ((p.v - minV) / (maxV - minV)) * ch
      ctx.fillStyle = 'rgba(96,165,250,0.65)'
      ctx.fillRect(x, y, 2, 2)
    }
  })

  return <canvas ref={canvasRef} style={{ width: '100%', height: 240, borderRadius: 8 }} />
}
