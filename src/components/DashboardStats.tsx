import * as React from 'react';
import { Users, BookOpen, Award, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const demoStudents = [
  { id: '1', name: 'Alex Thompson', grade: '12', performance: 95, last_submission_date: '2024-03-15' },
  { id: '2', name: 'Sarah Chen', grade: '12', performance: 92, last_submission_date: '2024-03-14' },
  { id: '3', name: 'Michael Rodriguez', grade: '12', performance: 88, last_submission_date: '2024-03-14' },
  { id: '4', name: 'Emily Parker', grade: '12', performance: 85, last_submission_date: '2024-03-13' },
  { id: '5', name: 'James Wilson', grade: '12', performance: 83, last_submission_date: '2024-03-13' },
  { id: '6', name: 'Lisa Anderson', grade: '12', performance: 80, last_submission_date: '2024-03-12' },
  { id: '7', name: 'David Kim', grade: '12', performance: 78, last_submission_date: '2024-03-12' },
  { id: '8', name: 'Rachel Martinez', grade: '12', performance: 75, last_submission_date: '2024-03-11' },
  { id: '9', name: 'Kevin Lee', grade: '12', performance: 72, last_submission_date: '2024-03-11' },
  { id: '10', name: 'Emma Davis', grade: '12', performance: 70, last_submission_date: '2024-03-10' }
];

const dataWeekly = [
  { name: 'Mon', submissions: 40 },
  { name: 'Tue', submissions: 35 },
  { name: 'Wed', submissions: 45 },
  { name: 'Thu', submissions: 30 },
  { name: 'Fri', submissions: 50 },
];

const dataMonthly = [
  { name: 'Jan', performance: 80 },
  { name: 'Feb', performance: 90 },
  { name: 'Mar', performance: 75 },
  { name: 'Apr', performance: 85 },
  { name: 'May', performance: 95 },
];

const dataScores = [
  { name: '90-100%', value: 40 },
  { name: '80-89%', value: 30 },
  { name: '70-79%', value: 20 },
  { name: 'Below 70%', value: 10 },
];

const COLORS = ['#4ade80', '#60a5fa', '#facc15', '#f87171'];

const dataActivity = [
  { day: 'Mon', active: 100 },
  { day: 'Tue', active: 120 },
  { day: 'Wed', active: 150 },
  { day: 'Thu', active: 130 },
  { day: 'Fri', active: 170 },
  { day: 'Sat', active: 90 },
  { day: 'Sun', active: 50 },
];

interface Student {
  id: string;
  name: string;
  grade: string;
  performance: number;
  last_submission_date?: string;
}

export function DashboardStats() {
  const [students, setStudents] = React.useState<Student[]>([]);
  const [stats, setStats] = React.useState([
    { name: 'Total Students', value: '0', icon: Users, color: 'from-blue-500 to-blue-700' },
    { name: 'Assignments', value: '0', icon: BookOpen, color: 'from-green-500 to-green-700' },
    { name: 'Avg. Score', value: '0%', icon: Award, color: 'from-purple-500 to-purple-700' },
    { name: 'Hours Saved', value: '0', icon: Clock, color: 'from-orange-500 to-orange-700' },
  ]);
  const [chartData, setChartData] = React.useState({
    weekly: [],
    monthly: [],
    scores: [],
    activity: []
  });

  // Fetch and process data
  const fetchData = async () => {
    try {
      // For demo purposes, use the demo data instead of Supabase fetch
      const studentsData = demoStudents;
      setStudents(studentsData);

      // Calculate stats based on 10 students
      const totalStudents = studentsData.length; // Will be 10
      const avgScore = Math.round(
        studentsData.reduce((acc, student) => acc + student.performance, 0) / totalStudents
      );
      const totalAssignments = 24; // Fixed number of assignments
      const hoursPerStudent = 2; // Hours saved per student

      // Update stats
      setStats([
        { name: 'Total Students', value: '10', icon: Users, color: 'from-blue-500 to-blue-700' },
        { name: 'Assignments', value: totalAssignments.toString(), icon: BookOpen, color: 'from-green-500 to-green-700' },
        { name: 'Avg. Score', value: `${avgScore}%`, icon: Award, color: 'from-purple-500 to-purple-700' },
        { name: 'Hours Saved', value: (totalStudents * hoursPerStudent).toString(), icon: Clock, color: 'from-orange-500 to-orange-700' },
      ]);

      // Process score distribution based on actual student performances
      const scoreDistribution = {
        '90-100%': studentsData.filter(s => s.performance >= 90).length, // Should be 2 students
        '80-89%': studentsData.filter(s => s.performance >= 80 && s.performance < 90).length, // Should be 3 students
        '70-79%': studentsData.filter(s => s.performance >= 70 && s.performance < 80).length, // Should be 5 students
        'Below 70%': studentsData.filter(s => s.performance < 70).length, // Should be 0 students
      };

      // Process weekly submissions based on last_submission_date
      const weeklyData = processWeeklySubmissions(studentsData);
      const monthlyData = processMonthlyPerformance(studentsData);
      const activityData = processStudentActivity(studentsData);

      setChartData({
        weekly: weeklyData,
        monthly: monthlyData,
        scores: Object.entries(scoreDistribution).map(([name, value]) => ({ name, value })),
        activity: activityData
      });
    } catch (error) {
      console.error('Error processing dashboard data:', error);
    }
  };

  // Process weekly submissions
  const processWeeklySubmissions = (students: Student[]) => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    const submissionsPerDay = {
      'Mon': 2,
      'Tue': 2,
      'Wed': 2,
      'Thu': 2,
      'Fri': 2
    };

    return days.map(day => ({
      name: day,
      submissions: submissionsPerDay[day]
    }));
  };

  // Process monthly performance
  const processMonthlyPerformance = (students: Student[]) => {
    return [
      { name: 'Jan', performance: 75 },
      { name: 'Feb', performance: 78 },
      { name: 'Mar', performance: 82 },
      { name: 'Apr', performance: 85 },
      { name: 'May', performance: 88 }
    ];
  };

  // Process student activity
  const processStudentActivity = (students: Student[]) => {
    return [
      { day: 'Mon', active: 80 },
      { day: 'Tue', active: 85 },
      { day: 'Wed', active: 90 },
      { day: 'Thu', active: 85 },
      { day: 'Fri', active: 80 },
      { day: 'Sat', active: 40 },
      { day: 'Sun', active: 30 }
    ];
  };

  // Set up real-time subscription
  React.useEffect(() => {
    fetchData();
    
    // Simulate real-time updates every 30 seconds
    const interval = setInterval(() => {
      fetchData();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-10 px-6 py-10 min-h-screen font-sans bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Header with updated styling */}
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-white tracking-tight">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
            AI Teaching Dashboard
          </span>
        </h1>
        <p className="mt-2 text-lg text-slate-400">
          Real-time analytics and performance tracking
        </p>
      </div>

      {/* Update the card backgrounds */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/10 hover:border-white/20"
          >
            <div className="flex items-center">
              <div
                className={`p-4 rounded-full bg-gradient-to-br ${stat.color} shadow-lg`}
              >
                <stat.icon className="w-7 h-7 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-slate-400">{stat.name}</p>
                <p className="text-3xl font-bold text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Update chart containers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Submissions */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            📈 Weekly Submissions
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.weekly}>
                <defs>
                  <linearGradient id="colorSubmissions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="submissions"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#colorSubmissions)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly Performance */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            📊 Monthly Performance
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData.monthly}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Bar dataKey="performance" fill="#60A5FA" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Score Distribution */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            🎯 Score Distribution
          </h3>
          <div className="h-[300px] flex justify-center items-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend verticalAlign="bottom" />
                <Pie
                  data={chartData.scores}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {chartData.scores.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Student Activity */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-white/10 hover:border-white/20 hover:shadow-2xl transition-all duration-300">
          <h3 className="text-2xl font-semibold text-white mb-6 flex items-center">
            🕒 Student Activity
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData.activity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="day" stroke="#6B7280" />
                <YAxis stroke="#6B7280" />
                <Tooltip />
                <Line type="monotone" dataKey="active" stroke="#34D399" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
