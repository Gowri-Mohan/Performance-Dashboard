'use client';
import React, { useEffect, useState } from 'react';
import { DataProvider } from '../../components/providers/DataProvider';
import LineChart from '../../components/charts/LineChart';
import BarChart from '../../components/charts/BarChart';
import ScatterPlot from '../../components/charts/ScatterPlot';
import Heatmap from '../../components/charts/Heatmap';
import PerformanceMonitor from '../../components/ui/PerformanceMonitor';
import FilterPanel from '../../components/controls/FilterPanel';
import TimeRangeSelector from '../../components/controls/TimeRangeSelector';
import DataTable from '../../components/ui/DataTable';

export default function Page() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null; // ✅ prevents server vs client HTML mismatch

  return (
    <DataProvider>
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{ width: 320 }}>
          <div style={{ marginBottom: 12 }}>
            <h2>Controls</h2>
            <FilterPanel />
            <TimeRangeSelector />
            <PerformanceMonitor />
          </div>
          <DataTable />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <div style={{ minHeight: 240 }}>
              <h3>Line Chart</h3>
              <LineChart />
            </div>
            <div style={{ minHeight: 240 }}>
              <h3>Bar Chart</h3>
              <BarChart />
            </div>
            <div style={{ minHeight: 240 }}>
              <h3>Scatter Plot</h3>
              <ScatterPlot />
            </div>
            <div style={{ minHeight: 240 }}>
              <h3>Heatmap</h3>
              <Heatmap />
            </div>
          </div>
        </div>
      </div>
    </DataProvider>
  );
}
