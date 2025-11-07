'use client';

import './globals.css'
import React from 'react'


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main style={{ padding: 12, fontFamily: 'Inter, system-ui, Arial' }}>
          <header style={{ marginBottom: 12 }}>
            <h1>Performance Dashboard — 10k+ points @ 60fps (Demo)</h1>
          </header>
          {children}
        </main>
      </body>
    </html>
  )
}
