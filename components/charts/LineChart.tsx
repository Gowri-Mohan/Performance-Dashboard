'use client'
import React, { useMemo, useRef } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas, drawLine } from '../../lib/canvasUtils'

export default function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series } = useData()

  // keep last N points to render
  const points = useMemo(() => series.slice(Math.max(0, series.length - 10000)), [series])

  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    drawLine(ctx, points)
  })

  return <canvas ref={canvasRef} style={{ width: '100%', height: 240, borderRadius: 8 }} />
}
