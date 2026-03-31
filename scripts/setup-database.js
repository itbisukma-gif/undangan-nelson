import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('Creating wishes table...');
    
    const { error } = await supabase.rpc('exec_sql', {
      sql: `
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
      `
    });

    if (error) {
      console.error('Database setup error:', error.message);
      process.exit(1);
    }

    console.log('✓ Database setup completed successfully!');
  } catch (error) {
    console.error('Setup error:', error);
    process.exit(1);
  }
}

setupDatabase();
