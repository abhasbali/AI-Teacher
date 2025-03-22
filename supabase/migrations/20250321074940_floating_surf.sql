/*
  # Teaching Assistant SaaS - Complete DB Setup with INTEGER KEYS
  - Creates Tables
  - Enables RLS
  - Adds Policies
  - Inserts Sample Data
*/

-- Students Table
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  grade TEXT NOT NULL,
  performance NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assignments Table
CREATE TABLE IF NOT EXISTS assignments (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Messages Table
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  receiver_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Content Templates Table
CREATE TABLE IF NOT EXISTS content_templates (
  id SERIAL PRIMARY KEY,
  teacher_id INTEGER NOT NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

------------------------------------------------------
-- Row Level Security (RLS)
------------------------------------------------------

ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_templates ENABLE ROW LEVEL SECURITY;

------------------------------------------------------
-- Policies
------------------------------------------------------

-- NOTE: auth.uid() returns UUID, but we’re using integers here.
-- If you are NOT using Supabase auth, these are dummy policies.
-- You will need to manage auth via application logic or modify policies.
CREATE POLICY "Teachers can manage their students"
  ON students
  FOR ALL
  TO PUBLIC
  USING (true);

CREATE POLICY "Teachers can manage their assignments"
  ON assignments
  FOR ALL
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can manage their messages"
  ON messages
  FOR ALL
  TO PUBLIC
  USING (true);

CREATE POLICY "Teachers can manage their content templates"
  ON content_templates
  FOR ALL
  TO PUBLIC
  USING (true);

------------------------------------------------------
-- Indexes (optional since we use SERIAL PKs)
------------------------------------------------------

CREATE INDEX IF NOT EXISTS idx_students_teacher ON students(teacher_id);
CREATE INDEX IF NOT EXISTS idx_assignments_teacher ON assignments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
CREATE INDEX IF NOT EXISTS idx_content_templates_teacher ON content_templates(teacher_id);

------------------------------------------------------
-- Insert Sample Data
------------------------------------------------------

-- Example Teachers (You can add a `teachers` table too if needed)
-- Assuming teacher_id = 1

------------------------------------------------------
-- Students
------------------------------------------------------
INSERT INTO students (teacher_id, name, email, grade, performance) VALUES
  (1, 'Abhas Bali', 'abhasmlb@gmail.com', '10th', 87.5),
  (1, 'Aarav Sharma', 'aarav.sharma@gmail.com', '9th', 92.3),
  (1, 'Priya Verma', 'priya.verma@gmail.com', '11th', 79.0),
  (1, 'Rohan Mehta', 'rohan.mehta@gmail.com', '12th', 88.2),
  (1, 'Simran Kaur', 'simran.kaur@gmail.com', '10th', 91.4);

------------------------------------------------------
-- Assignments
------------------------------------------------------
INSERT INTO assignments (teacher_id, title, description, due_date) VALUES
  (1, 'Math Homework', 'Complete Algebra Worksheet', '2025-03-25'),
  (1, 'Science Project', 'Prepare Chemistry Lab Report', '2025-03-30');

------------------------------------------------------
-- Messages
------------------------------------------------------
INSERT INTO messages (sender_id, receiver_id, content, read) VALUES
  (1, 2, 'Please submit your assignment by tomorrow.', false),
  (2, 1, 'Sure, I will submit it.', true);

------------------------------------------------------
-- Content Templates
------------------------------------------------------
INSERT INTO content_templates (teacher_id, type, title, content) VALUES
  (1, 'Assignment', 'Physics Quiz', 'Chapter 5: Laws of Motion Quiz'),
  (1, 'Message', 'Assignment Reminder', 'Kindly complete your pending assignments.');

------------------------------------------------------
-- Done!
