# Firebase to Supabase Migration Instructions

## Overview
This document provides step-by-step instructions to complete the migration from Firebase to Supabase.

## Step 1: Create the Database Schema in Supabase

1. Go to your Supabase project dashboard
2. Navigate to the **SQL Editor** section
3. Create a new query and paste the following SQL:

```sql
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
```

4. Click **Run** to execute the query

## Step 2: Verify Environment Variables

Make sure you have these environment variables set in your `.env.local` file:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

These should already be configured in your Vercel project settings.

## Step 3: Dependencies

The following dependencies have been added to your `package.json`:
- `@supabase/supabase-js` - Core Supabase client
- `@supabase/ssr` - Supabase SSR helper for Next.js

Run `npm install` or your package manager equivalent to install these.

## Step 4: Verify Application Code

The following changes have been made:
- Created `/src/supabase/client.ts` - Browser client for Supabase
- Created `/src/supabase/server.ts` - Server-side client for Supabase
- Created `/src/supabase/auth/use-auth.tsx` - Auth provider and hook
- Created `/src/supabase/hooks/use-wishes.tsx` - Hook for managing wishes/RSVP data
- Updated `/src/app/layout.tsx` - Now uses AuthProvider instead of FirebaseClientProvider

## Step 5: Migrate Existing Data (Optional)

If you have existing wishes in Firebase Firestore, you'll need to export and import them to Supabase:

1. Export your Firestore data from Firebase Console
2. Transform the data to match the Supabase schema
3. Import into the `wishes` table using Supabase's Data Editor or SQL

## Step 6: Update Component Usage

Replace Firebase hooks with Supabase hooks in your components:

**Old (Firebase):**
```typescript
import { useDoc } from '@/firebase/firestore/use-doc';
import { useCollection } from '@/firebase/firestore/use-collection';
```

**New (Supabase):**
```typescript
import { useWishes } from '@/supabase/hooks/use-wishes';
import { useAuth } from '@/supabase/auth/use-auth';
```

## Step 7: Test the Application

1. Start your dev server: `npm run dev`
2. Test the RSVP form submission
3. Verify that data is saved to Supabase
4. Check real-time updates by opening multiple browser windows

## Migration Checklist

- [ ] Supabase database schema created
- [ ] Environment variables verified
- [ ] Dependencies installed (`npm install`)
- [ ] Application code updated
- [ ] Components updated with new hooks
- [ ] Testing completed
- [ ] Data migrated from Firebase (if applicable)
- [ ] Firebase dependencies removed (if desired)

## Troubleshooting

### CORS Issues
If you encounter CORS errors, make sure your Supabase project allows requests from your domain.

### Auth State Not Persisting
Ensure cookies are properly configured in your browser and that the SSR client is working correctly.

### Real-time Updates Not Working
Verify that RLS policies are properly configured and that the Realtime feature is enabled in your Supabase project.

## Next Steps

1. Remove Firebase files when comfortable (optional):
   - `/src/firebase/` directory
   - Remove `firebase` from `package.json` dependencies

2. Update any remaining components that still use Firebase imports

3. Consider adding user authentication if needed for data protection

---

For more information on Supabase, visit: https://supabase.com/docs
