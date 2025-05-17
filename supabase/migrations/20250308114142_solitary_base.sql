/*
  # Update qy_leads service constraint to allow comma-separated values
  
  1. Changes
    - Update the CHECK constraint for selected_service column to allow comma-separated values of predefined options
  
  2. Data Integrity
    - This change allows storing multiple services as comma-separated values in the same field
    - Maintains same service options but allows them to be joined with commas
*/

-- Drop the existing constraint
ALTER TABLE qy_leads 
DROP CONSTRAINT qy_leads_selected_service_check;

-- Add new constraint that allows comma-separated values of the allowable services
ALTER TABLE qy_leads 
ADD CONSTRAINT qy_leads_selected_service_check 
CHECK (
  selected_service ~ '^(Intelligent Chat Agent|A\.I\. Inbound Sales Agent|A\.I\. Outbound Sales Agent|E-mail Automation|UI Website Creation|Content Creation|Media Buying)(,(Intelligent Chat Agent|A\.I\. Inbound Sales Agent|A\.I\. Outbound Sales Agent|E-mail Automation|UI Website Creation|Content Creation|Media Buying))*$'
);

-- Add column comment to explain the format
COMMENT ON COLUMN qy_leads.selected_service IS 'Primary service(s) selected by the user. Multiple selections stored as comma-separated values.';