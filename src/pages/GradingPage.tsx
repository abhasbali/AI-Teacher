import React, { useState, useRef } from 'react';
import { FileText, Upload, CheckCircle, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface FileWithPreview extends File {
  preview?: string;
}

interface GradingResult {
  score: number;
  feedback: string;
}

export function GradingPage() {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [grading, setGrading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      handleFiles(selectedFiles);
    }
  };

  const handleFiles = (newFiles: File[]) => {
    const validFiles = newFiles.filter(file => {
      const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      return validTypes.includes(file.type) && file.size <= 10 * 1024 * 1024; // 10MB limit
    });

    setFiles(prev => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const analyzeWithGemini = async (fileContent: string): Promise<GradingResult> => {
    try {
      const prompt = `
        Analyze this student submission and provide a score out of 100 and feedback.
        Format the response as JSON:
        {
          "score": number,
          "feedback": "detailed feedback"
        }
        
        Submission:
        ${fileContent}
      `;

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
      const result = JSON.parse(data.candidates[0].content.parts[0].text);
      return result;
    } catch (error) {
      console.error('Error analyzing submission:', error);
      return {
        score: 0,
        feedback: 'Error analyzing submission'
      };
    }
  };

  const handleGrade = async () => {
    if (files.length === 0) return;
    
    setGrading(true);
    try {
      for (const file of files) {
        const fileContent = await file.text();
        const gradingResult = await analyzeWithGemini(fileContent);
        
        const { data: userData } = await supabase.auth.getUser();
        if (!userData.user) continue;

        // Get current student data
        const studentId = file.name.split('_')[0];
        const { data: studentData } = await supabase
          .from('students')
          .select('*')
          .eq('id', studentId)
          .single();

        if (!studentData) continue;

        // Calculate new strategic performance
        const consistencyFactor = calculateConsistencyFactor(
          studentData.performance,
          studentData.last_submission_date
        );
        
        const newPerformance = calculateNewPerformance(
          studentData.performance,
          gradingResult.score,
          consistencyFactor
        );

        // Update student performance
        const { error: updateError } = await supabase
          .from('students')
          .update({ 
            performance: newPerformance,
            last_feedback: gradingResult.feedback,
            last_submission_date: new Date().toISOString()
          })
          .eq('id', studentId);

        if (updateError) {
          console.error('Error updating student performance:', updateError);
        }
      }

      navigate('/students');
    } finally {
      setGrading(false);
      setFiles([]);
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Automated Grading</h1>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload Assignments
          </label>
          <div
            className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
              dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 border-dashed'
            } rounded-lg`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor="file-upload"
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
                  <span>Upload files</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    multiple
                    className="sr-only"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 10MB each</p>
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Selected Files</h3>
            <ul className="divide-y divide-gray-200">
              {files.map((file, index) => (
                <li key={index} className="py-3 flex items-center justify-between">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-900">{file.name}</span>
                    <span className="ml-2 text-sm text-gray-500">
                      ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </span>
                  </div>
                  <button
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          onClick={handleGrade}
          disabled={files.length === 0 || grading}
          className={`w-full flex items-center justify-center py-2 px-4 border border-transparent rounded-lg text-white font-medium ${
            files.length === 0 || grading
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {grading ? (
            <>
              <span className="animate-spin mr-2">⌛</span>
              Grading...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 mr-2" />
              Start Grading
            </>
          )}
        </button>
      </div>
    </div>
  );
}