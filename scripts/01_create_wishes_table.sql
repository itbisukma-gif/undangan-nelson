-- Create the wishes table for wedding RSVP
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Hadir', 'Absen')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on the table
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Policy: Allow public to read all wishes
CREATE POLICY "Allow public read" ON public.wishes
  FOR SELECT
  USING (true);

-- Policy: Allow public to insert new wishes
CREATE POLICY "Allow public insert" ON public.wishes
  FOR INSERT
  WITH CHECK (true);

-- Create index for ordering by created_at
CREATE INDEX IF NOT EXISTS idx_wishes_created_at ON public.wishes(created_at DESC);
