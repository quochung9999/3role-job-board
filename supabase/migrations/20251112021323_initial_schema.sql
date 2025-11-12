-- ============================================
-- 3-Role Job Board - Supabase Database Schema
-- ============================================

-- ============================================
-- TABLES
-- ============================================

-- Users table (Contractors, Employers, Agents)
CREATE TABLE public.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('contractor', 'employer', 'agent')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Deals table
CREATE TABLE public.deals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contractor_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    employer_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    rate DECIMAL(10, 2),
    work_hours TEXT,
    work_days TEXT,
    service_option TEXT,
    status TEXT NOT NULL DEFAULT 'Awaiting Initial Demand',
    agent_notes TEXT,
    risk_level TEXT DEFAULT 'low' CHECK (risk_level IN ('low', 'medium', 'high')),
    priority TEXT DEFAULT 'normal' CHECK (priority IN ('low', 'normal', 'high', 'urgent')),
    estimated_value DECIMAL(10, 2),
    compliance_checked BOOLEAN DEFAULT FALSE,
    background_check_status TEXT DEFAULT 'pending' CHECK (background_check_status IN ('pending', 'passed', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Messages table (Chat)
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    sender_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    sender_role TEXT NOT NULL CHECK (sender_role IN ('contractor', 'employer', 'system')),
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities table (Activity Feed)
CREATE TABLE public.activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
    sender TEXT NOT NULL,
    message TEXT NOT NULL,
    activity_type TEXT NOT NULL CHECK (activity_type IN ('contractor', 'employer', 'agent', 'system')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Agent Actions table (Audit Trail)
CREATE TABLE public.agent_actions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    deal_id UUID REFERENCES public.deals(id) ON DELETE CASCADE,
    agent_id UUID REFERENCES public.users(id) ON DELETE CASCADE,
    action_type TEXT NOT NULL,
    description TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES for Performance
-- ============================================

CREATE INDEX idx_deals_contractor ON public.deals(contractor_id);
CREATE INDEX idx_deals_employer ON public.deals(employer_id);
CREATE INDEX idx_deals_status ON public.deals(status);
CREATE INDEX idx_messages_deal ON public.messages(deal_id);
CREATE INDEX idx_activities_deal ON public.activities(deal_id);
CREATE INDEX idx_agent_actions_deal ON public.agent_actions(deal_id);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Enable RLS on all tables
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_actions ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view all users"
    ON public.users FOR SELECT
    USING (true);

CREATE POLICY "Users can update their own profile"
    ON public.users FOR UPDATE
    USING (auth.uid() = id);

-- Deals policies
CREATE POLICY "Users can view deals they're involved in"
    ON public.deals FOR SELECT
    USING (
        contractor_id = auth.uid() 
        OR employer_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

CREATE POLICY "Contractors can create deals"
    ON public.deals FOR INSERT
    WITH CHECK (
        contractor_id = auth.uid() 
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'contractor'
        )
    );

CREATE POLICY "Employers and Agents can update deals"
    ON public.deals FOR UPDATE
    USING (
        employer_id = auth.uid() 
        OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

-- Messages policies
CREATE POLICY "Users can view messages for their deals"
    ON public.messages FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.deals 
            WHERE id = deal_id 
            AND (contractor_id = auth.uid() OR employer_id = auth.uid())
        )
        OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

CREATE POLICY "Users can insert messages for their deals"
    ON public.messages FOR INSERT
    WITH CHECK (
        sender_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM public.deals 
            WHERE id = deal_id 
            AND (contractor_id = auth.uid() OR employer_id = auth.uid())
        )
    );

-- Activities policies
CREATE POLICY "Users can view activities for their deals"
    ON public.activities FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.deals 
            WHERE id = deal_id 
            AND (contractor_id = auth.uid() OR employer_id = auth.uid())
        )
        OR EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

CREATE POLICY "Anyone can insert activities"
    ON public.activities FOR INSERT
    WITH CHECK (true);

-- Agent Actions policies
CREATE POLICY "Agents can view all actions"
    ON public.agent_actions FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

CREATE POLICY "Agents can insert actions"
    ON public.agent_actions FOR INSERT
    WITH CHECK (
        agent_id = auth.uid()
        AND EXISTS (
            SELECT 1 FROM public.users 
            WHERE id = auth.uid() AND role = 'agent'
        )
    );

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for users table
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON public.users
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger for deals table
CREATE TRIGGER update_deals_updated_at
    BEFORE UPDATE ON public.deals
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- REALTIME CONFIGURATION
-- ============================================

-- Enable realtime for tables that need live updates
ALTER PUBLICATION supabase_realtime ADD TABLE public.deals;
ALTER PUBLICATION supabase_realtime ADD TABLE public.messages;
ALTER PUBLICATION supabase_realtime ADD TABLE public.activities;
