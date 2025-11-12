-- Fix RLS policies for error_logs to allow anonymous access
-- This is needed for error logging to work without authentication

-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Users can read their own error logs" ON error_logs;
DROP POLICY IF EXISTS "Allow error log updates" ON error_logs;

-- Allow anyone to read error logs (for debugging and monitoring)
CREATE POLICY "Allow public error log reading"
    ON error_logs
    FOR SELECT
    USING (true);

-- Allow anyone to update error logs (for marking as resolved)
CREATE POLICY "Allow public error log updates"
    ON error_logs
    FOR UPDATE
    USING (true);

-- Note: "Allow public error log insertion" policy already exists and works correctly
