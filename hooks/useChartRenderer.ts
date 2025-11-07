'use client'
import { useEffect, useRef } from 'react'

export default function useChartRenderer(canvasRef: React.RefObject<HTMLCanvasElement>, render: (ctx: CanvasRenderingContext2D, dt: number) => void) {
  const rafRef = useRef<number | null>(null)
  const lastRef = useRef<number | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return              // ✅ safety check
    const ctx = canvas.getContext('2d')
    if (!ctx) return                 // ✅ safety check

    function resize() {
      const rect = canvas.getBoundingClientRect()
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.floor(rect.width * dpr)
      canvas.height = Math.floor(rect.height * dpr)
      ctx.scale(dpr, dpr)
    }
    resize()
    window.addEventListener('resize', resize)

    let raf = 0
    const loop = (ts: number) => {
      render(ctx, ts)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [canvasRef, render])

}
