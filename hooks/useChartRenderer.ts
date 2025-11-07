'use client'
import { useEffect, useRef } from 'react'

/**
 * A reusable hook for efficient canvas rendering.
 * Handles resize scaling, cleanup, and smooth 60 fps redraws
 * using requestAnimationFrame().
 */
export default function useChartRenderer(
  canvasRef: React.RefObject<HTMLCanvasElement>,
  render: (ctx: CanvasRenderingContext2D, dt: number) => void
) {
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      const c = canvasRef.current
      if (!c) return
      const rect = c.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      c.width = Math.floor(rect.width * dpr)
      c.height = Math.floor(rect.height * dpr)
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform before scaling
      ctx.scale(dpr, dpr)
    }

    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const loop = (ts: number) => {
      if (lastRef.current == null) lastRef.current = ts
      const dt = ts - lastRef.current
      lastRef.current = ts
      render(ctx, dt)
      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)

    return () => {
      if (raf) cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, render])
}
