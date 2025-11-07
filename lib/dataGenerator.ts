import { DataPoint, Series } from './types'

export function generateInitialSeries(n = 10000): Series {
  const now = Date.now()
  const s: Series = new Array(n).fill(0).map((_, i) => ({
    t: now - (n - i) * 100,
    v: Math.sin(i / 50) * 50 + Math.random() * 20
  }))
  return s
}

export function nextPoint(lastT: number): DataPoint {
  const t = lastT + 100
  const v = Math.sin(t / 1000) * 50 + Math.random() * 30
  return { t, v }
}
