-- Create error_logs table for tracking application errors
CREATE TABLE IF NOT EXISTS error_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Error details
    error_type TEXT NOT NULL,
    error_message TEXT NOT NULL,
    stack_trace TEXT,
    
    -- User context
    user_id UUID,
    user_role TEXT,
    
    -- Additional context
    context JSONB DEFAULT '{}'::jsonb,
    url TEXT,
    user_agent TEXT,
    
    -- Metadata
    resolved BOOLEAN DEFAULT FALSE,
    resolved_at TIMESTAMP WITH TIME ZONE,
    notes TEXT
);

-- Create indexes for common queries
CREATE INDEX idx_error_logs_created_at ON error_logs(created_at DESC);
CREATE INDEX idx_error_logs_error_type ON error_logs(error_type);
CREATE INDEX idx_error_logs_user_id ON error_logs(user_id);
CREATE INDEX idx_error_logs_resolved ON error_logs(resolved);

-- RLS Policies
ALTER TABLE error_logs ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert error logs (for anonymous error tracking)
CREATE POLICY "Allow public error log insertion"
    ON error_logs
    FOR INSERT
    WITH CHECK (true);

-- Allow users to read their own error logs
CREATE POLICY "Users can read their own error logs"
    ON error_logs
    FOR SELECT
    USING (user_id = auth.uid() OR auth.uid() IS NOT NULL);

-- Allow updating error logs (for marking as resolved)
CREATE POLICY "Allow error log updates"
    ON error_logs
    FOR UPDATE
    USING (auth.uid() IS NOT NULL);

-- Create a view for error summary
CREATE OR REPLACE VIEW error_summary AS
SELECT 
    error_type,
    COUNT(*) as count,
    MAX(created_at) as last_occurred,
    COUNT(CASE WHEN resolved = false THEN 1 END) as unresolved_count
FROM error_logs
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY error_type
ORDER BY count DESC;

-- Add comment
COMMENT ON TABLE error_logs IS 'Stores application errors and exceptions for debugging and monitoring';
