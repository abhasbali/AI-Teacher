import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, Award, Brain, ArrowUp, ArrowDown } from 'lucide-react';

export function Dashboard() {
  // Mock data for dashboard
  const stats = [
    {
      title: "Total Students",
      value: "156",
      icon: <Users className="w-6 h-6" />,
      change: "+12%",
      trend: "up"
    },
    {
      title: "Lessons Created",
      value: "482",
      icon: <BookOpen className="w-6 h-6" />,
      change: "+8%",
      trend: "up"
    },
    {
      title: "Average Score",
      value: "87%",
      icon: <Award className="w-6 h-6" />,
      change: "+5%",
      trend: "up"
    },
    {
      title: "AI Interactions",
      value: "2.4k",
      icon: <Brain className="w-6 h-6" />,
      change: "-3%",
      trend: "down"
    }
  ];

  const recentActivity = [
    {
      id: 1,
      action: "New Assignment Created",
      subject: "Python Basics - Loop Structures",
      timestamp: "2 hours ago"
    },
    {
      id: 2,
      action: "Student Progress Update",
      subject: "Sarah Johnson completed Advanced JavaScript",
      timestamp: "4 hours ago"
    },
    {
      id: 3,
      action: "AI Feedback Generated",
      subject: "Batch grading completed for CS101",
      timestamp: "6 hours ago"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl p-8 border border-white/10"
      >
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, Teacher!</h1>
        <p className="text-slate-400">Here's what's happening with your classes today.</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 p-3 rounded-lg">
                {stat.icon}
              </div>
              <div className={`flex items-center ${
                stat.trend === 'up' ? 'text-emerald-500' : 'text-rose-500'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                <span className="ml-1">{stat.change}</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">{stat.value}</h2>
            <p className="text-slate-400">{stat.title}</p>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white/5 rounded-2xl p-6 border border-white/10"
      >
        <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div>
                <h3 className="text-white font-medium">{activity.action}</h3>
                <p className="text-slate-400 text-sm">{activity.subject}</p>
              </div>
              <span className="text-slate-500 text-sm">{activity.timestamp}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
} 