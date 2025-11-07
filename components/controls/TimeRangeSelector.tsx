'use client'
import React from 'react'

export default function TimeRangeSelector() {
  return (
    <div style={{ marginTop: 8 }}>
      <div className="small">Time range</div>
      <select>
        <option>Last 1 minute</option>
        <option>Last 5 minutes</option>
        <option>Last 1 hour</option>
      </select>
    </div>
  )
}
