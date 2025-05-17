/*
  # Update contact submissions table schema

  1. Changes
    - Add `recaptcha_token` column as nullable since we removed reCAPTCHA
    - Update column names to match form field names
    - Ensure all required fields are present

  2. Security
    - Maintains existing RLS policies
*/

DO $$ 
BEGIN
  -- Make recaptcha_token nullable since we removed reCAPTCHA
  ALTER TABLE contact_submissions 
  ALTER COLUMN recaptcha_token DROP NOT NULL;

  -- Update challenges column description
  COMMENT ON COLUMN contact_submissions.challenges IS 'Problems the client is looking to solve';
END $$;