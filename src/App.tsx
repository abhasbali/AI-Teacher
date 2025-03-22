import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { DashboardLayout } from './components/DashboardLayout';
import { DashboardStats } from './components/DashboardStats';
import { StudentsPage } from './pages/StudentsPage';
import { ContentPage } from './pages/ContentPage';
import { GradingPage } from './pages/GradingPage';
import { MessagesPage } from './pages/MessagesPage';
import { SettingsPage } from './pages/SettingsPage';
import { Layout } from './components/Layout';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Landing page route */}
          <Route path="/" element={<LandingPage />} />

          {/* Dashboard routes wrapped in DashboardLayout */}
          <Route path="/dashboard" element={
            <DashboardLayout>
              <DashboardStats />
            </DashboardLayout>
          } />
          <Route path="/students" element={
            <DashboardLayout>
              <StudentsPage />
            </DashboardLayout>
          } />
          <Route path="/content" element={
            <DashboardLayout>
              <ContentPage />
            </DashboardLayout>
          } />
          <Route path="/grading" element={
            <DashboardLayout>
              <GradingPage />
            </DashboardLayout>
          } />
          <Route path="/messages" element={
            <DashboardLayout>
              <MessagesPage />
            </DashboardLayout>
          } />
          <Route path="/settings" element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          } />

          {/* Redirect /dashboard to /dashboard if accessed directly */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;