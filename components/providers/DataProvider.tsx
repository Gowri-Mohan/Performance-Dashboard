'use client'
import React from 'react'
import { DataProvider as DP } from '../../hooks/useDataStream'

export function DataProvider({ children }: { children: React.ReactNode }) {
  return <DP>{children}</DP>
}
