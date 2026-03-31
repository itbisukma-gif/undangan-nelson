-- ============================================================================
-- Supabase Migration: Firebase to Supabase
-- Purpose: Create the wedding RSVP wishes table with RLS policies
-- Status: Run this in Supabase SQL Editor
-- Date: 2026-03-31
-- ============================================================================

-- Step 1: Create the wishes table
-- This table stores all RSVP wishes/responses from guests
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Hadir', 'Absen')),
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add comment to table
COMMENT ON TABLE public.wishes IS 'Stores wedding RSVP wishes from guests';
COMMENT ON COLUMN public.wishes.id IS 'Unique identifier for each wish';
COMMENT ON COLUMN public.wishes.name IS 'Name of the guest who submitted the wish';
COMMENT ON COLUMN public.wishes.status IS 'Attendance status: Hadir (Attending) or Absen (Not Attending)';
COMMENT ON COLUMN public.wishes.message IS 'The wish/message from the guest';
COMMENT ON COLUMN public.wishes.created_at IS 'Timestamp when the wish was created';

-- Step 2: Enable Row Level Security (RLS)
-- RLS ensures data access is controlled by policies
ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

-- Step 3: Create RLS Policies
-- Policy 1: Allow anyone to read all wishes (public read)
CREATE POLICY "Allow public read" ON public.wishes
  FOR SELECT
  USING (true);

COMMENT ON POLICY "Allow public read" ON public.wishes 
  IS 'Anyone can read all wishes on the wedding website';

-- Policy 2: Allow anyone to insert new wishes (public insert)
CREATE POLICY "Allow public insert" ON public.wishes
  FOR INSERT
  WITH CHECK (true);

COMMENT ON POLICY "Allow public insert" ON public.wishes 
  IS 'Anyone can submit a new wish without authentication';

-- Policy 3: No one can update wishes (prevent tampering)
CREATE POLICY "No updates allowed" ON public.wishes
  FOR UPDATE
  USING (false);

COMMENT ON POLICY "No updates allowed" ON public.wishes 
  IS 'Wishes cannot be modified after submission';

-- Policy 4: No one can delete wishes (preserve data)
CREATE POLICY "No deletes allowed" ON public.wishes
  FOR DELETE
  USING (false);

COMMENT ON POLICY "No deletes allowed" ON public.wishes 
  IS 'Wishes cannot be deleted (immutable record)';

-- Step 4: Create Indexes for Performance
-- Index for faster ordering by creation date (used in queries)
CREATE INDEX IF NOT EXISTS idx_wishes_created_at 
  ON public.wishes(created_at DESC);

COMMENT ON INDEX idx_wishes_created_at IS 'Index for ordering wishes by most recent first';

-- Index for faster search by status (useful for future analytics)
CREATE INDEX IF NOT EXISTS idx_wishes_status 
  ON public.wishes(status);

COMMENT ON INDEX idx_wishes_status IS 'Index for filtering wishes by attendance status';

-- Step 5: Verify the migration
-- Run this to check everything was created successfully:
-- SELECT * FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'wishes';

-- ============================================================================
-- Migration Complete!
-- Next steps:
-- 1. Verify the wishes table appears in Supabase Table Editor
-- 2. Check that RLS is enabled (padlock icon visible)
-- 3. Verify RLS policies appear in the Policies section
-- 4. Set environment variables in Vercel
-- 5. Run npm install to install @supabase/supabase-js and @supabase/ssr
-- 6. Test locally with npm run dev
-- ============================================================================

-- Optional: View table structure
-- SELECT * FROM information_schema.columns 
-- WHERE table_schema = 'public' AND table_name = 'wishes';

-- Optional: View RLS policies
-- SELECT * FROM pg_policies 
-- WHERE tablename = 'wishes';

-- Optional: View indexes
-- SELECT * FROM pg_indexes 
-- WHERE tablename = 'wishes';
