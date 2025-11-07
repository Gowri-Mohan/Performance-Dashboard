'use client'
import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { DataPoint, Series } from '../lib/types'
import { generateInitialSeries, nextPoint } from '../lib/dataGenerator'

type DataContextValue = {
  series: Series;
  pushRate: number;
  setPushRate: (r: number) => void;
  timeRange: [number, number] | null;
  setTimeRange: React.Dispatch<React.SetStateAction<[number, number] | null>>;
};


const DataContext = createContext<DataContextValue | null>(null)

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [series, setSeries] = useState<Series>(() => generateInitialSeries(5000))
  const [timeRange, setTimeRange] = useState<[number, number] | null>(null);
  const pushRateRef = useRef(100) // ms
  const [pushRate, setPushRate] = useState(100)

  useEffect(() => {
    pushRateRef.current = pushRate
  }, [pushRate])

  useEffect(() => {
    let mounted = true
    let timer: number | undefined
    const tick = () => {
      setSeries(prev => {
        const last = prev[prev.length - 1]
        const np = nextPoint(last?.t ?? Date.now())
        const next = [...prev, np]
        // keep up to 50k points cap
        if (next.length > 50000) next.splice(0, next.length - 50000)
        return next
      })
      if (!mounted) return
      timer = window.setTimeout(tick, pushRateRef.current)
    }
    timer = window.setTimeout(tick, pushRateRef.current)
    return () => {
      mounted = false
      if (timer) clearTimeout(timer)
    }
  }, [])

  return (
    <DataContext.Provider value={{ series, pushRate, setPushRate, timeRange, setTimeRange }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside DataProvider')
  return ctx
}
