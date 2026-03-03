-- ============================================
-- Profile Table for About Me Section
-- Single-row table (only 1 portfolio owner)
-- ============================================

CREATE TABLE IF NOT EXISTS profile (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    display_name TEXT NOT NULL DEFAULT 'Tran Huu Giang',
    bio TEXT NOT NULL DEFAULT 'Hi, I''m Tran Huu Giang. I turn ideas into interactive digital realities.',
    core_strengths TEXT NOT NULL DEFAULT 'My expertise lies at the intersection of Frontend, Backend, and Artificial Intelligence.',
    beyond_coding TEXT NOT NULL DEFAULT 'When I''m not debugging, you''ll find me drawing, listening to music, or immersing myself in anime & movies.',
    future_vision TEXT NOT NULL DEFAULT 'I am aiming for Fullstack Developer or AI Application Engineer roles.',
    portrait_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert a default row so the profile always exists
INSERT INTO profile (display_name, bio, core_strengths, beyond_coding, future_vision)
VALUES (
    'Tran Huu Giang',
    'Hi, I''m Tran Huu Giang. I turn ideas into interactive digital realities.',
    'My expertise lies at the intersection of **Frontend**, **Backend**, and **Artificial Intelligence**. I enjoy building scalable systems and integrating smart AI solutions into seamless user interfaces.',
    'When I''m not debugging, you''ll find me **drawing**, **listening to music**, or immersing myself in **anime & movies**. I''m also an avid **gamer**, always appreciating the art and logic behind great games.',
    'I am aiming for **Fullstack Developer** or **AI Application Engineer** roles. My long-term goal is to lead innovative projects that combine aesthetic design with powerful backend logic, pushing the boundaries of what''s possible on the web.'
);

-- Enable RLS
ALTER TABLE profile ENABLE ROW LEVEL SECURITY;

-- Public read access (anyone can view portfolio)
CREATE POLICY "Public can read profile"
    ON profile FOR SELECT
    USING (true);

-- Only authenticated users can update
CREATE POLICY "Authenticated users can update profile"
    ON profile FOR UPDATE
    USING (auth.role() = 'authenticated');
