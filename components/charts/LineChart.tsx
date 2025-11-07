'use client'
import React, { useMemo, useRef, useState } from 'react'
import useChartRenderer from '../../hooks/useChartRenderer'
import { useData } from '../../hooks/useDataStream'
import { clearCanvas, drawLine } from '../../lib/canvasUtils'

export default function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { series, timeRange, setTimeRange } = useData()

  const [dragging, setDragging] = useState(false)
  const [startX, setStartX] = useState<number | null>(null)

  // filter based on timeRange (zoomed section)
  const points = useMemo(() => {
    if (!series.length) return []
    const visible = timeRange
      ? series.filter((p) => p.t >= timeRange[0] && p.t <= timeRange[1])
      : series.slice(-10000)
    return visible
  }, [series, timeRange])

  useChartRenderer(canvasRef, (ctx) => {
    clearCanvas(ctx)
    drawLine(ctx, points)
  })

  // handle zoom with scroll
  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault()
    if (!series.length) return
    const [start, end] = timeRange || [series[0].t, series[series.length - 1].t]
    const zoomFactor = e.deltaY > 0 ? 1.2 : 0.8
    const mid = (start + end) / 2
    const range = (end - start) * zoomFactor
    setTimeRange([mid - range / 2, mid + range / 2])
  }

  // handle pan with drag
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true)
    setStartX(e.clientX)
  }

  const handleMouseUp = () => setDragging(false)
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging || !startX) return
    const dx = e.clientX - startX
    setStartX(e.clientX)
    if (timeRange && series.length > 0) {
      const shift = dx * 100 // pixel-to-time shift factor
      const minT = series[0].t
      const maxT = series[series.length - 1].t
      let newStart = timeRange[0] - shift
      let newEnd = timeRange[1] - shift

      // Prevent going beyond data range
      const span = newEnd - newStart
      if (newStart < minT) {
        newStart = minT
        newEnd = minT + span
      }
      if (newEnd > maxT) {
        newEnd = maxT
        newStart = maxT - span
      }

      setTimeRange([newStart, newEnd])
    }

  }

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: 240, borderRadius: 8 }}
      onWheel={handleWheel}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    />
  )
}
