import React from 'react';
import { Sidebar } from './Sidebar'; // Your existing sidebar component

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 