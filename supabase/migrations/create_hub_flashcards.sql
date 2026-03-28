-- Migration to create the hub_flashcards table

CREATE TABLE IF NOT EXISTS public.hub_flashcards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    front TEXT NOT NULL,
    back TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new', -- 'new', 'learning', 'known'
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.hub_flashcards ENABLE ROW LEVEL SECURITY;

-- Create policies (modify or add user_id later if you authenticate users, for now allowing all if you use anon key with full access or service role)
-- Assuming the admin accesses this and it's a personal portfolio, allowing anon/authenticated depending on your current setup.
CREATE POLICY "Allow read access to everyone" ON public.hub_flashcards FOR SELECT USING (true);
CREATE POLICY "Allow insert access to everyone" ON public.hub_flashcards FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow update access to everyone" ON public.hub_flashcards FOR UPDATE USING (true);
CREATE POLICY "Allow delete access to everyone" ON public.hub_flashcards FOR DELETE USING (true);
