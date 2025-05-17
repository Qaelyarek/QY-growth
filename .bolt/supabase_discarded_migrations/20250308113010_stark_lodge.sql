/*
  # Add selected_services column to contact_submissions table

  1. Changes
    - Add `selected_services` column to the `contact_submissions` table
    - Column type: TEXT[] (array of text) to store multiple service selections
    - Not nullable with default empty array
  
  2. Data Integrity
    - This change preserves existing data
    - Existing records will have an empty array as the default value
*/

-- Add selected_services column with not null constraint and default empty array
ALTER TABLE contact_submissions ADD COLUMN IF NOT EXISTS selected_services TEXT[] NOT NULL DEFAULT '{}';

-- Add comment to explain the column purpose
COMMENT ON COLUMN contact_submissions.selected_services IS 'Array of selected services chosen by the user';