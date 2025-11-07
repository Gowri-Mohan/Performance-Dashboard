import { NextResponse } from 'next/server'
import { generateInitialSeries } from '../../../lib/dataGenerator'

export async function GET() {
  const data = generateInitialSeries(2000)
  return NextResponse.json({ data })
}
