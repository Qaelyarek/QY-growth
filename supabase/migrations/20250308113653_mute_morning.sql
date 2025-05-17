/*
  # Add selected_service column to qy_leads table
  
  1. Changes
    - Add `selected_service` column to the `qy_leads` table between phone_number and company_name
    - Column type: VARCHAR(50) to store the service selection
    - Not nullable with appropriate constraint for predefined options
  
  2. Data Integrity
    - This change adds a required field which will apply to new records
    - A constraint ensures only valid service options can be inserted
*/

-- Add the selected_service column between phone_number and company_name
ALTER TABLE qy_leads 
ADD COLUMN selected_service VARCHAR(50) NOT NULL;

-- Create the check constraint to limit values to predefined options
ALTER TABLE qy_leads 
ADD CONSTRAINT qy_leads_selected_service_check 
CHECK (selected_service IN (
  'AI Agent', 
  'AI Phone Agent', 
  'Email Automation', 
  'Social Media Automation', 
  'Content Creation', 
  'Media Buying (Ads)',
  'UI Website Creation'
));

-- Add column comment to explain the purpose
COMMENT ON COLUMN qy_leads.selected_service IS 'Primary service selected by the user from contact form dropdown';