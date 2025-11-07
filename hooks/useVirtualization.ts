'use client'
import { useEffect, useState } from 'react'

export function useVirtualization(total: number, rowHeight = 28, containerHeight = 320) {
  const [scrollTop, setScrollTop] = useState(0)
  const visibleCount = Math.ceil(containerHeight / rowHeight)
  const start = Math.max(0, Math.floor(scrollTop / rowHeight) - 10)
  const end = Math.min(total, start + visibleCount + 20)

  // throttle scroll updates for performance
  useEffect(() => {
    let ticking = false
    const onScroll = (e: any) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollTop(e.target.scrollTop)
          ticking = false
        })
        ticking = true
      }
    }
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return { start, end, setScrollTop, visibleCount }
}
