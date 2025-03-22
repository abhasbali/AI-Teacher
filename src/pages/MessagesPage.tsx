import React, { useState, useEffect } from 'react';
import { Search, MessageCircle, User } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  read: boolean;
  studentId?: string;
  performance?: number;
  type: 'feedback' | 'general';
}

// Function to generate personalized feedback based on performance
const generateAutomatedFeedback = (performance: number, studentName: string): string => {
  if (performance >= 90) {
    return `Excellent work, ${studentName}! Your score of ${performance}% demonstrates outstanding understanding. Keep up the great work! Some tips to maintain your performance:
    • Continue your consistent study habits
    • Consider helping peers to reinforce your knowledge
    • Challenge yourself with advanced topics`;
  } else if (performance >= 80) {
    return `Great job, ${studentName}! Your score of ${performance}% shows strong comprehension. To improve further:
    • Review the few questions you missed
    • Focus on strengthening problem-solving speed
    • Practice more complex examples`;
  } else if (performance >= 70) {
    return `Good effort, ${studentName}. Your score of ${performance}% shows you're on the right track. Here's how you can improve:
    • Schedule regular review sessions
    • Focus on understanding core concepts
    • Practice with more examples
    • Don't hesitate to ask questions`;
  } else {
    return `${studentName}, your score of ${performance}% indicates you might need some additional support. Let's work together to improve:
    • Schedule a one-on-one session
    • Review fundamental concepts
    • Create a structured study plan
    • Use additional learning resources`;
  }
};

// Add mock messages for demonstration
const mockMessages: Message[] = [
  {
    id: 'msg-1',
    sender: 'John Doe',
    content: 'Question about the Python assignment',
    timestamp: new Date().toISOString(),
    read: false,
    type: 'general'
  },
  {
    id: 'msg-2',
    sender: 'Jane Smith',
    content: 'Need help with the latest quiz',
    timestamp: new Date().toISOString(),
    read: true,
    type: 'general'
  }
];

export function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      // Fetch students with their latest performance
      const { data: students } = await supabase
        .from('students')
        .select('*');

      if (students) {
        // Generate feedback messages for each student
        const feedbackMessages: Message[] = students.map(student => ({
          id: `feedback-${student.id}`,
          sender: student.name,
          content: generateAutomatedFeedback(student.performance, student.name),
          timestamp: new Date().toISOString(),
          read: false,
          studentId: student.id,
          performance: student.performance,
          type: 'feedback'
        }));

        // Combine feedback messages with regular messages
        setMessages([...feedbackMessages, ...mockMessages]);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages(mockMessages); // Fallback to mock messages
    } finally {
      setLoading(false);
    }
  };

  const filteredMessages = messages.filter(message =>
    message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
    message.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAsRead = async (messageId: string) => {
    setMessages(messages.map(msg => 
      msg.id === messageId ? { ...msg, read: true } : msg
    ));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages & Feedback</h1>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="grid grid-cols-3 h-[calc(100vh-200px)]">
          {/* Messages List */}
          <div className="col-span-1 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="overflow-y-auto h-[calc(100%-73px)]">
              {loading ? (
                <div className="p-4 text-center text-gray-500">Loading messages...</div>
              ) : (
                filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message.id);
                    }}
                    className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 ${
                      selectedMessage?.id === message.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {message.type === 'feedback' ? (
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            message.performance && message.performance >= 90 ? 'bg-green-100 text-green-600' :
                            message.performance && message.performance >= 70 ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {message.performance}%
                          </div>
                        ) : (
                          <User className="w-8 h-8 text-gray-400 bg-gray-100 rounded-full p-1" />
                        )}
                        <div className="ml-3">
                          <p className="text-sm font-medium text-gray-900">
                            {message.type === 'feedback' ? `Feedback for ${message.sender}` : message.sender}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {message.type === 'feedback' ? 'Performance Feedback' : message.content}
                          </p>
                          <p className="text-xs text-gray-400">
                            {new Date(message.timestamp).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      {!message.read && (
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      )}
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Content */}
          <div className="col-span-2 flex flex-col">
            {selectedMessage ? (
              <>
                <div className="p-4 border-b border-gray-200">
                  <div className="flex items-center">
                    {selectedMessage.type === 'feedback' ? (
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        selectedMessage.performance && selectedMessage.performance >= 90 ? 'bg-green-100 text-green-600' :
                        selectedMessage.performance && selectedMessage.performance >= 70 ? 'bg-yellow-100 text-yellow-600' :
                        'bg-red-100 text-red-600'
                      }`}>
                        {selectedMessage.performance}%
                      </div>
                    ) : (
                      <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
                    )}
                    <div className="ml-3">
                      <h2 className="text-lg font-medium text-gray-900">
                        {selectedMessage.type === 'feedback' ? `Feedback for ${selectedMessage.sender}` : selectedMessage.sender}
                      </h2>
                      <p className="text-sm text-gray-500">
                        {new Date(selectedMessage.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-y-auto">
                  <div className="prose max-w-none">
                    <p className="text-gray-800 whitespace-pre-line">
                      {selectedMessage.content}
                    </p>
                  </div>
                </div>
                {selectedMessage.type === 'general' && (
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center">
                      <input
                        type="text"
                        placeholder="Type your reply..."
                        className="flex-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <button className="ml-2 p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500">
                Select a message to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}