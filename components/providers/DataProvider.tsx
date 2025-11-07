'use client'
import React from 'react'
import { DataProvider as DataStreamProvider } from '../../hooks/useDataStream'

export function DataProvider({ children }: { children: React.ReactNode }) {
  return <DataStreamProvider>{children}</DataStreamProvider>
}
