-- Create the rsvps table for the wedding RSVP system
CREATE TABLE IF NOT EXISTS rsvps (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  attending BOOLEAN NOT NULL,
  guests INT NOT NULL DEFAULT 1,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous inserts" ON rsvps;
DROP POLICY IF EXISTS "Allow all reads" ON rsvps;

-- Allow anonymous inserts (so the website can submit RSVPs without auth)
-- WARNING: In production, consider using a Supabase service role key server-side
-- instead of allowing anonymous inserts with unrestricted access.
CREATE POLICY "Allow anonymous inserts"
  ON rsvps
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Allow reading all RSVPs (for admin display purposes)
CREATE POLICY "Allow all reads"
  ON rsvps
  FOR SELECT
  TO anon
  USING (true);

-- ============================================================================
-- SECURITY RECOMMENDATION:
-- For production-grade security, replace the anonymous INSERT policy above
-- with a Supabase service role (server-side only). The API route already
-- sanitizes all inputs before inserting, but defense-in-depth is recommended.
-- ============================================================================


