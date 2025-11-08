'use client';
import '../globals.css'
export const dynamic = 'force-static';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="container">
      {children}
    </div>
  );
}
