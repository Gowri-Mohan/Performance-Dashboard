'use client'
import React from 'react'
import { usePerformanceMonitor } from '../../hooks/usePerformanceMonitor'

export default function PerformanceMonitor() {
  const { fps, memory } = usePerformanceMonitor()
  return (
    <div style={{ marginTop: 8 }}>
      <h4>Performance</h4>
      <div className="small">FPS: <strong>{fps}</strong></div>
      <div className="small">Memory: <strong>{memory}</strong></div>
    </div>
  )
}
