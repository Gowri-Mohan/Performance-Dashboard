import { DataPoint } from './types'

export function clearCanvas(ctx: CanvasRenderingContext2D) {
  const { width, height } = ctx.canvas
  ctx.clearRect(0, 0, width, height)
}

export function drawLine(ctx: CanvasRenderingContext2D, points: DataPoint[], color = '#60a5fa') {
  if (!points.length) return
  const cw = ctx.canvas.width
  const ch = ctx.canvas.height

  // transform time to x
  const minT = points[0].t
  const maxT = points[points.length - 1].t || minT + 1
  const range = Math.max(1, maxT - minT)

  // precompute scale
  ctx.beginPath()
  for (let i = 0; i < points.length; i++) {
    const p = points[i]
    const x = ((p.t - minT) / range) * cw
    const y = ch - ((p.v + 100) / 200) * ch // crude normalize
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.lineWidth = 1.2
  ctx.strokeStyle = color
  ctx.stroke()
}
