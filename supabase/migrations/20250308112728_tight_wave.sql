/*
  # Create QY_Leads table for lead management

  1. New Tables
    - `QY_Leads`
      - `id` (int8, primary key, auto-increment)
      - `first_name` (varchar, not null)
      - `last_name` (varchar, not null)
      - `email` (varchar, not null) with email format validation
      - `phone_number` (varchar) with phone format validation
      - `company_name` (varchar)
      - `message` (text)
      - `preferred_contact_method` (varchar)
      - `created_at` (timestamp with time zone, default: now())
      - `status` (varchar, default: 'new') with value constraints
  
  2. Security
    - Enable RLS on `QY_Leads` table
    - Add policies for both authenticated and anonymous users
*/

-- Create the QY_Leads table
CREATE TABLE IF NOT EXISTS QY_Leads (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  phone_number VARCHAR(50) CHECK (phone_number ~* '^\+?[0-9\s\(\)\-\.]{7,20}$'),
  company_name VARCHAR(255),
  message TEXT,
  preferred_contact_method VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT now(),
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed'))
);

-- Create index on email for faster lookups and uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS QY_Leads_email_idx ON QY_Leads (email);

-- Create index on status for filtering and reporting
CREATE INDEX IF NOT EXISTS QY_Leads_status_idx ON QY_Leads (status);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS QY_Leads_created_at_idx ON QY_Leads (created_at);

-- Enable Row Level Security
ALTER TABLE QY_Leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies
-- Policy for authenticated users to read all leads
CREATE POLICY "Authenticated users can read all leads"
  ON QY_Leads
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy for authenticated users to insert leads
CREATE POLICY "Authenticated users can insert leads"
  ON QY_Leads
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy for authenticated users to update leads
CREATE POLICY "Authenticated users can update leads"
  ON QY_Leads
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow anonymous users to insert leads (for public form submissions)
CREATE POLICY "Allow anonymous insertions"
  ON QY_Leads
  FOR INSERT
  TO anon
  WITH CHECK (true);