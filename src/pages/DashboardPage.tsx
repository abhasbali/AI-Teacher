import React from 'react';
import { DashboardLayout } from '../components/DashboardLayout';

export function DashboardPage() {
  return (
    <DashboardLayout>
      {/* Your dashboard content here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Example Dashboard Cards */}
        <div className="bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Total Students</h3>
          <p className="text-4xl font-bold">156</p>
        </div>
        
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Active Courses</h3>
          <p className="text-4xl font-bold">12</p>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
          <h3 className="text-2xl font-bold mb-2">Average Score</h3>
          <p className="text-4xl font-bold">85%</p>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6">
          {/* Add your activity content here */}
        </div>
      </div>
    </DashboardLayout>
  );
} 