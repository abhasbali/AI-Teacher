import React, { useState, useEffect } from 'react';
import { PlusCircle, Search, UserPlus, X } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  performance: number;
  last_feedback?: string;
  last_submission_date?: string;
}

// Enhanced demo data with more 12th grade students
const demoStudents: Student[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@school.com',
    grade: '12th',
    performance: 88,
    last_feedback: 'Strong analytical skills, needs to improve problem-solving speed'
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane.smith@school.com',
    grade: '12th',
    performance: 92,
    last_feedback: 'Excellent work, consistently high performer'
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike.j@school.com',
    grade: '12th',
    performance: 85,
    last_feedback: 'Good theoretical understanding, needs more practice'
  },
  {
    id: '4',
    name: 'Sarah Williams',
    email: 'sarah.w@school.com',
    grade: '12th',
    performance: 95,
    last_feedback: 'Outstanding performance in all areas'
  },
  {
    id: '5',
    name: 'Alex Chen',
    email: 'alex.c@school.com',
    grade: '12th',
    performance: 89,
    last_feedback: 'Strong problem-solving skills, good progress'
  },
  {
    id: '6',
    name: 'Emily Brown',
    email: 'emily.b@school.com',
    grade: '12th',
    performance: 87,
    last_feedback: 'Consistent performer, good understanding'
  },
  {
    id: '7',
    name: 'David Kim',
    email: 'david.k@school.com',
    grade: '12th',
    performance: 91,
    last_feedback: 'Excellent analytical abilities'
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.g@school.com',
    grade: '12th',
    performance: 86,
    last_feedback: 'Good progress, needs more attention to detail'
  },
  {
    id: '9',
    name: 'James Wilson',
    email: 'james.w@school.com',
    grade: '12th',
    performance: 83,
    last_feedback: 'Showing improvement, needs more practice'
  },
  {
    id: '10',
    name: 'Lisa Anderson',
    email: 'lisa.a@school.com',
    grade: '12th',
    performance: 90,
    last_feedback: 'Very consistent, strong understanding'
  }
];

// Helper functions
const calculateConsistencyFactor = (performance: number, lastSubmissionDate?: string): number => {
  if (!lastSubmissionDate) return 1;
  
  const daysSinceLastSubmission = Math.floor(
    (new Date().getTime() - new Date(lastSubmissionDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  
  const recencyFactor = Math.max(1 - (daysSinceLastSubmission / 30), 0.5);
  const performanceFactor = performance / 100;
  
  return (recencyFactor + performanceFactor) / 2;
};

const calculateNewPerformance = (
  currentPerformance: number,
  submissionQuality: number,
  consistencyFactor: number
): number => {
  const previousWeight = 0.7;
  const newWeight = 0.3;
  
  let newPerformance = (currentPerformance * previousWeight) + (submissionQuality * newWeight);
  newPerformance *= (1 + (consistencyFactor * 0.1));
  
  return Math.min(Math.max(Math.round(newPerformance), 0), 100);
};

export function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(demoStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .order('performance', { ascending: false });

      if (error) {
        throw error;
      }

      if (data && data.length > 0) {
        setStudents(data);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      setError('Failed to fetch students data');
    } finally {
      setLoading(false);
    }
  }

  const filteredStudents = students
    .sort((a, b) => b.performance - a.performance)
    .filter(student =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Students</h1>
        {loading && <span className="text-sm text-gray-500">Loading...</span>}
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <div className="mb-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold text-gray-700">Class Performance Overview</h2>
          <div className="text-sm text-gray-500">
            Total Students: {filteredStudents.length}
          </div>
        </div>
        <div className="mt-2 grid grid-cols-3 gap-4">
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-green-700 font-medium">Top Performers (90%+)</div>
            <div className="text-2xl font-bold text-green-800">
              {filteredStudents.filter(s => s.performance >= 90).length}
            </div>
          </div>
          <div className="bg-yellow-50 p-3 rounded-lg">
            <div className="text-yellow-700 font-medium">Average (70-89%)</div>
            <div className="text-2xl font-bold text-yellow-800">
              {filteredStudents.filter(s => s.performance >= 70 && s.performance < 90).length}
            </div>
          </div>
          <div className="bg-red-50 p-3 rounded-lg">
            <div className="text-red-700 font-medium">Needs Improvement (&lt;70%)</div>
            <div className="text-2xl font-bold text-red-800">
              {filteredStudents.filter(s => s.performance < 70).length}
            </div>
          </div>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search students..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Grade</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Feedback</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <tr 
                key={student.id} 
                className={`${index < 3 ? 'bg-yellow-50' : ''} hover:bg-gray-50 transition-colors`}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {index + 1}
                    {index < 3 && (
                      <span className="ml-2">
                        {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{student.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500">{student.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{student.grade}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full ${
                          index < 3 ? 'bg-yellow-400' : 'bg-blue-600'
                        }`}
                        style={{ width: `${student.performance}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm text-gray-500">{student.performance}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-500 max-w-xs truncate">
                    {student.last_feedback || 'No feedback yet'}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
