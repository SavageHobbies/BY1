-- First, show ALL databases with 'by1' in the name
SELECT SCHEMA_NAME AS 'All BY1-related databases'
FROM INFORMATION_SCHEMA.SCHEMATA 
WHERE SCHEMA_NAME LIKE '%by1%'
ORDER BY SCHEMA_NAME;

-- Then show which databases would be affected
SELECT 'These databases will be dropped:' as 'Action';
SELECT SCHEMA_NAME AS 'To be dropped'
FROM INFORMATION_SCHEMA.SCHEMATA 
WHERE SCHEMA_NAME IN ('by1', 'by1_net');

-- Show which databases will be preserved
SELECT 'These databases will be preserved:' as 'Action';
SELECT SCHEMA_NAME AS 'Will be preserved'
FROM INFORMATION_SCHEMA.SCHEMATA 
WHERE SCHEMA_NAME LIKE '%by1%'
AND SCHEMA_NAME NOT IN ('by1', 'by1_net')
ORDER BY SCHEMA_NAME;

-- Only proceed if you're sure about the above results
-- Remove the /* and */ to enable these commands

/*
-- Drop only the main by1.net databases
DROP DATABASE IF EXISTS `by1`;
DROP DATABASE IF EXISTS `by1_net`;
*/

-- Create empty databases for by1.net
CREATE DATABASE IF NOT EXISTS `by1`;
CREATE DATABASE IF NOT EXISTS `by1_net`;
