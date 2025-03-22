import React, { useState } from 'react';
import { BookOpen, FileText, List, PenTool, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

const contentTypes = [
  { id: 'quiz', name: 'Quiz', icon: List, description: 'Generate multiple-choice or short answer quizzes' },
  { id: 'lesson', name: 'Lesson Plan', icon: BookOpen, description: 'Create detailed lesson plans with objectives and activities' },
  { id: 'assignment', name: 'Assignment', icon: PenTool, description: 'Design homework assignments and projects' },
  { id: 'study', name: 'Study Guide', icon: FileText, description: 'Generate comprehensive study materials' },
];

interface GeneratedContent {
  title: string;
  content: string;
}

interface QuizQuestion {
  question: string;
  options: string[];
  userAnswer?: number;
  isCorrect?: boolean;
}

interface QuizContent {
  title: string;
  questions: QuizQuestion[];
}

// Add this predefined Python quiz data
const pythonQuizData: QuizContent = {
  title: "Quiz: Python Programming",
  questions: [
    {
      question: "What is the correct way to declare a variable in Python?",
      options: [
        "var x = 5",
        "x = 5",
        "dim x = 5",
        "let x = 5"
      ],
      correctAnswer: 1
    },
    {
      question: "Which of the following is a correct way to create a list in Python?",
      options: [
        "list = (1, 2, 3)",
        "list = {1, 2, 3}",
        "list = [1, 2, 3]",
        "list = <1, 2, 3>"
      ],
      correctAnswer: 2
    },
    {
      question: "What is the output of: print(type(5.0))?",
      options: [
        "<class 'int'>",
        "<class 'float'>",
        "<class 'number'>",
        "<class 'decimal'>"
      ],
      correctAnswer: 1
    },
    {
      question: "Which method is used to add an element to the end of a list?",
      options: [
        "add()",
        "insert()",
        "extend()",
        "append()"
      ],
      correctAnswer: 3
    },
    {
      question: "What is the correct way to write a multiline comment in Python?",
      options: [
        "// This is a comment",
        "/* This is a comment */",
        "''' This is a comment '''",
        "# This is a comment"
      ],
      correctAnswer: 2
    }
  ]
};

// Add these predefined content objects
const pythonLessonPlan = {
  title: "Lesson Plan: Python Programming Fundamentals",
      content: `
Learning Objectives:
- Understand Python basic syntax and data types
- Learn about variables, operators, and control structures
- Practice writing simple Python programs
- Implement basic algorithms in Python

Materials Needed:
- Python IDE (PyCharm or VS Code)
- Python documentation
- Practice exercises worksheet
- Code examples

Lesson Structure:

1. Introduction (15 minutes)
   - Brief history of Python
   - Why Python is popular
   - Real-world applications
   - Quick survey of student programming experience

2. Core Concepts (30 minutes)
   - Variables and Data Types
     • Numbers (int, float)
     • Strings
     • Lists
     • Dictionaries
   - Basic Operations
     • Arithmetic operators
     • String operations
     • List operations

3. Hands-on Practice (25 minutes)
   - Simple program exercises
   - Debug common errors
   - Pair programming activities
   - Code review and discussion

4. Assessment (20 minutes)
   - Write a basic Python program
   - Debug given code snippets
   - Multiple choice concept check
   - Group discussion of solutions

Homework Assignment:
- Complete 3 programming exercises
- Read Python documentation chapters 1-2
- Prepare questions for next class`
};

const pythonAssignment = {
  title: "Assignment: Python Programming Project",
      content: `
Assignment Overview:
Create a command-line application that demonstrates your understanding of Python fundamentals.

Requirements:
1. Core Programming Concepts (40%)
   - Use variables and multiple data types
   - Implement control structures (if/else, loops)
   - Create at least two functions
   - Handle basic error cases

2. Problem Solving (30%)
   - Design an efficient solution
   - Implement proper program flow
   - Include input validation
   - Add helpful user prompts

3. Code Quality (30%)
   - Write clean, readable code
   - Add appropriate comments
   - Follow Python PEP 8 style guide
   - Include basic documentation

Project Options (choose one):
1. Calculator Application
   - Basic arithmetic operations
   - Memory functions
   - History of calculations
   - Scientific operations

2. Todo List Manager
   - Add/remove tasks
   - Mark tasks complete
   - Save/load from file
   - Priority levels

3. Quiz Game
   - Multiple choice questions
   - Score tracking
   - Different categories
   - Save high scores

Submission Guidelines:
- Due Date: Two weeks from today
- Submit source code (.py files)
- Include README.md with instructions
- Provide test cases

Grading Criteria:
- Functionality (40%)
- Code quality (30%)
- Documentation (15%)
- Creativity (15%)`
};

const pythonStudyGuide = {
  title: "Study Guide: Python Programming",
  content: `
1. Python Basics
   - Syntax and Structure
     • Indentation rules
     • Comments
     • Basic operators
     • Statement termination
   
   - Variables and Data Types
     • Numbers (int, float, complex)
     • Strings and string methods
     • Lists, tuples, sets
     • Dictionaries
     • Type conversion

2. Control Structures
   - Conditional Statements
     • if, elif, else
     • Comparison operators
     • Logical operators
   
   - Loops
     • for loops
     • while loops
     • break and continue
     • range() function

3. Functions
   - Function definition
   - Parameters and arguments
   - Return values
   - Lambda functions
   - Built-in functions

4. Common Operations
   - String Operations
     • Concatenation
     • Slicing
     • Methods (split, join, etc.)
   
   - List Operations
     • Adding/removing elements
     • Sorting
     • List comprehension

5. Practice Problems
   - Basic Programs
     • Calculate factorial
     • Check prime numbers
     • Find fibonacci series
   
   - String Manipulation
     • Reverse a string
     • Check palindrome
     • Count characters

6. Common Pitfalls
   - Indentation errors
   - Type mismatches
   - Scope issues
   - Mutable vs immutable

7. Additional Resources
   - Official Python documentation
   - Online Python tutorials
   - Practice websites
   - Community forums`
};

export function ContentPage() {
  const [selectedType, setSelectedType] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);

  const generateQuiz = async (topic: string) => {
    return pythonQuizData;
  };

  const checkAnswer = async (question: string, selectedOption: string, allOptions: string[]) => {
    try {
      const prompt = `Given the question: "${question}"
      And these options: ${allOptions.join(', ')}
      Is "${selectedOption}" the correct answer? Reply with just "true" or "false"`;

      const response = await fetch('https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer AIzaSyDtapcAPFbTYXkglus_MDLwKfbNzPKoNwY`
        },
        body: JSON.stringify({
          model: "gemini-pro",
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const result = data.candidates[0].content.parts[0].text.toLowerCase().trim();
      return result === 'true';
    } catch (error) {
      console.error('Error checking answer:', error);
      return false;
    }
  };

  const handleAnswerSelect = (questionIndex: number, answerIndex: number) => {
    if (!generatedContent) return;
    
    const quiz = generatedContent as QuizContent;
    const question = quiz.questions[questionIndex];
    
    // Update UI with the selected answer and check if it's correct
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex] = {
      ...question,
      userAnswer: answerIndex,
      isCorrect: answerIndex === question.correctAnswer
    };
    
    setGeneratedContent({
      ...quiz,
      questions: updatedQuestions
    });
  };

  const generateLessonPlan = async (topic: string) => {
    return pythonLessonPlan;
  };

  const generateAssignment = async (topic: string) => {
    return pythonAssignment;
  };

  const generateStudyGuide = async (topic: string) => {
    return pythonStudyGuide;
  };

  const calculateScore = (questions: QuizQuestion[]) => {
    let correct = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correct++;
      }
    });
    return (correct / questions.length) * 100;
  };

  const renderQuiz = (content: QuizContent) => {
    return (
      <div className="mt-8 border-t pt-6">
        <h2 className="text-xl font-semibold mb-4">{content.title}</h2>
        <div className="space-y-6">
          {content.questions.map((question, qIndex) => (
            <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
              <p className="font-medium mb-3">{`${qIndex + 1}. ${question.question}`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {question.options.map((option, oIndex) => (
                  <label
                    key={oIndex}
                    className={`
                      flex items-center p-3 rounded-lg cursor-pointer
                      ${question.userAnswer === oIndex ? 
                        question.userAnswer === question.correctAnswer ?
                          'bg-green-100 border-green-500' :
                          'bg-red-100 border-red-500'
                        : 'bg-white border-gray-200'}
                      border-2 transition-all hover:border-blue-300
                    `}
                  >
                    <input
                      type="radio"
                      name={`question-${qIndex}`}
                      checked={question.userAnswer === oIndex}
                      onChange={() => handleAnswerSelect(qIndex, oIndex)}
                      className="mr-2"
                      disabled={question.userAnswer !== undefined}
                    />
                    <span>{option}</span>
                    {question.userAnswer === oIndex && (
                      <span className="ml-auto">
                        {question.userAnswer === question.correctAnswer ? '✓' : '✗'}
                      </span>
                    )}
                  </label>
                ))}
              </div>
              {question.userAnswer !== undefined && question.userAnswer !== question.correctAnswer && (
                <div className="mt-2 text-sm text-green-600">
                  Correct answer: {question.options[question.correctAnswer]}
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div className="mt-6">
          {content.questions.some(q => q.userAnswer !== undefined) && (
            <div className="text-lg font-medium">
              Score: {content.questions.filter(q => q.userAnswer === q.correctAnswer).length} / {content.questions.length}
            </div>
          )}
        </div>
      </div>
    );
  };

  const handleGenerate = async () => {
    if (!selectedType || !prompt) return;
    
    setGenerating(true);
    try {
      let content;
      
      if (selectedType === 'quiz') {
        content = await generateQuiz(prompt);
        setSelectedAnswers(new Array(content.questions.length).fill(-1));
        setShowResults(false);
      } else {
      switch (selectedType) {
        case 'lesson':
          content = await generateLessonPlan(prompt);
          break;
        case 'assignment':
          content = await generateAssignment(prompt);
          break;
        case 'study':
          content = await generateStudyGuide(prompt);
          break;
        default:
          throw new Error('Invalid content type');
        }
      }

      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from('content_templates').insert([
          {
            teacher_id: userData.user.id,
            type: selectedType,
            title: content.title,
            content: content.content,
          },
        ]);
      }

      setGeneratedContent(content);
    } catch (error) {
      console.error('Error generating content:', error);
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Content Generation</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {contentTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedType(type.id)}
            className={`p-4 rounded-lg border-2 transition-all ${
              selectedType === type.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-blue-200'
            }`}
          >
            <type.icon className="w-8 h-8 text-blue-500 mb-2" />
            <h3 className="font-semibold text-gray-900">{type.name}</h3>
            <p className="text-sm text-gray-500 mt-1">{type.description}</p>
          </button>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-4">
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-700 mb-2">
            What would you like to generate?
          </label>
          <textarea
            id="prompt"
            rows={4}
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to generate. Include subject, grade level, and any specific requirements..."
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={!selectedType || !prompt || generating}
          className={`w-full py-2 px-4 rounded-lg text-white font-medium ${
            !selectedType || !prompt || generating
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {generating ? (
            <span className="flex items-center justify-center">
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Generating...
            </span>
          ) : (
            'Generate Content'
          )}
        </button>

        {generatedContent && (
          <div className="mt-8 border-t pt-6">
            {selectedType === 'quiz' 
              ? renderQuiz(generatedContent as QuizContent)
              : (
                <div>
            <h2 className="text-xl font-semibold mb-4">{generatedContent.title}</h2>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap font-mono text-sm">
              {generatedContent.content}
            </div>
                </div>
              )}
          </div>
        )}
      </div>
    </div>
  );
}