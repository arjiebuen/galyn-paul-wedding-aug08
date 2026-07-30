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

-- Enable Row Level Security (optional, can be disabled for this use case)
ALTER TABLE rsvps ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (so the website can submit RSVPs without auth)
CREATE POLICY "Allow anonymous inserts" 
  ON rsvps 
  FOR INSERT 
  TO anon 
  WITH CHECK (true);

-- Allow reading own data (optional, for admin purposes)
CREATE POLICY "Allow all reads" 
  ON rsvps 
  FOR SELECT 
  TO anon 
  USING (true);

