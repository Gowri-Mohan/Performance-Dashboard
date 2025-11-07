'use client'
import { useEffect, useState } from 'react'

export function useVirtualization(total: number, rowHeight = 32, containerHeight = 320) {
  const [scrollTop, setScrollTop] = useState(0)
  const visibleCount = Math.ceil(containerHeight / rowHeight)
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 5)
  const end = Math.min(total, start + visibleCount + 10)
  return { start, end, setScrollTop, visibleCount }
}
