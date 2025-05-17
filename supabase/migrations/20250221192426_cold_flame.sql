/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `created_at` (timestamp)
      - `full_name` (text)
      - `email` (text)
      - `company_name` (text)
      - `service` (text)
      - `challenges` (text)
      - `additional_info` (text, nullable)
      - `recaptcha_token` (text)
      - `processed` (boolean)

  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy for authenticated users to read submissions
    - Add policy for anon users to insert submissions
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  full_name text NOT NULL,
  email text NOT NULL,
  company_name text NOT NULL,
  service text NOT NULL,
  challenges text NOT NULL,
  additional_info text,
  recaptcha_token text NOT NULL,
  processed boolean DEFAULT false
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow anonymous users to insert submissions"
  ON contact_submissions
  FOR INSERT
  TO anon
  WITH CHECK (true);