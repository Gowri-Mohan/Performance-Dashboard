# ⚡ Performance-Critical Data Visualization Dashboard

A high-performance **real-time analytics dashboard** built using **Next.js 14 (App Router)**, **React 18**, and **TypeScript**.  
Renders and updates **10,000+ live data points at 60 FPS** using **Canvas** — built completely from scratch (no Chart.js / D3).

---

## 🚀 Live Demo
🔗 **[View on Vercel](https://performance-dashboard-khaki.vercel.app/dashboard)**

---

## 🧠 Overview
This dashboard demonstrates **performance-critical data rendering** and **interactive visualization** with:
- Real-time data streaming every 100 ms
- 4 chart types: **Line**, **Bar**, **Scatter**, and **Heatmap**
- Interactive **Zoom**, **Pan**, and **Time Range Selection**
- **1 min / 5 min / 1 hr / All Data** aggregation filters
- **FPS + Memory monitor**
- **Responsive layout** for desktop, tablet, and mobile
- **Offline caching** via a Service Worker

---

## 🧩 Tech Stack
| Layer | Technology |
|-------|-------------|
| Framework | **Next.js 14 (App Router)** |
| Language | **TypeScript + React 18 Concurrent Mode** |
| Rendering | **Canvas API + requestAnimationFrame** |
| Styling | Custom CSS variables (`globals.css`) |
| Deployment | **Vercel (Edge runtime ready)** |

---

## 📂 Project Structure
app/
├─ layout.tsx → Root layout + Service Worker registration
├─ globals.css → Global theme + responsive layout
└─ dashboard/page.tsx → Main Dashboard UI
components/
├─ charts/LineChart.tsx
├─ charts/BarChart.tsx
├─ charts/ScatterPlot.tsx
├─ charts/Heatmap.tsx
├─ controls/FilterPanel.tsx
├─ controls/TimeRangeSelector.tsx
├─ ui/DataTable.tsx
├─ ui/PerformanceMonitor.tsx
└─ providers/DataProvider.tsx
hooks/
├─ useDataStream.tsx
├─ useChartRenderer.ts
├─ usePerformanceMonitor.ts
└─ useVirtualization.ts
lib/
├─ dataGenerator.ts
├─ canvasUtils.ts
└─ types.ts
public/
└─ sw.js

---

## ⚙️ Setup & Run
```bash
git clone https://github.com/Gowri-Mohan/Performance-Dashboard.git
cd Performance-Dashboard
npm install
npm run dev
# → open http://localhost:3000/dashboard
