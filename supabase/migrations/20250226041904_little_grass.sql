/*
  # Add phone number field to contact submissions

  1. Changes
    - Add `phone` column to `contact_submissions` table
      - Required field for storing contact phone numbers
      - Text type to accommodate various phone number formats
      - Not null constraint to ensure phone numbers are provided

  2. Security
    - Maintains existing RLS policies
*/

DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'contact_submissions' 
    AND column_name = 'phone'
  ) THEN
    ALTER TABLE contact_submissions 
    ADD COLUMN phone text NOT NULL;
  END IF;
END $$;