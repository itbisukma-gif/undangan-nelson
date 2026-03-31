# Supabase Setup Guide

## Completed Changes

### 1. New Files Created

#### Supabase Configuration
- **`src/supabase/client.ts`** - Browser-side Supabase client for client components
- **`src/supabase/server.ts`** - Server-side Supabase client for server components and middleware

#### Authentication
- **`src/supabase/auth/use-auth.tsx`** - Auth context provider and hook for managing user sessions

#### Data Management
- **`src/supabase/hooks/use-wishes.tsx`** - Custom hook for managing wishes/RSVP data with real-time updates

### 2. Modified Files

#### Layout Configuration
- **`src/app/layout.tsx`** - Replaced `FirebaseClientProvider` with `AuthProvider` from Supabase

#### Main Page Component
- **`src/app/page.tsx`** - Updated to use Supabase hooks instead of Firebase:
  - Replaced Firebase imports with Supabase imports
  - Changed from `useFirestore()` and `useCollection()` to `useWishes()`
  - Simplified RSVP handler to use `addWish()` from the hook
  - Removed Firebase error handling in favor of simpler Supabase error handling

### 3. Dependencies Added to package.json

```json
{
  "@supabase/supabase-js": "^2.43.0",
  "@supabase/ssr": "^0.4.0"
}
```

## Next Steps

### Step 1: Create Database Schema

You need to create the `wishes` table in your Supabase database. Follow these steps:

1. Go to your Supabase project dashboard: https://supabase.com/dashboard
2. Select your project
3. Navigate to **SQL Editor**
4. Click **New Query**
5. Copy and paste the following SQL:

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

6. Click **Run**

### Step 2: Verify Environment Variables

Make sure your Supabase credentials are set. In your Vercel project settings:

1. Go to **Settings** → **Environment Variables**
2. Verify these variables are set:
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key

You can get these values from your Supabase project:
- Go to **Settings** → **API**
- Copy the **Project URL** and **anon/public** key

### Step 3: Install Dependencies

If you haven't already, install the new Supabase dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Step 4: Test the Application

1. Start your development server:
```bash
npm run dev
```

2. Open http://localhost:9002 in your browser

3. Test the RSVP functionality:
   - Open an invitation
   - Fill in the RSVP form
   - Submit
   - You should see the wish appear in the list
   - Check that real-time updates work by opening the page in another browser window

4. Verify data is saved in Supabase:
   - Go to Supabase Dashboard
   - Navigate to **Table Editor**
   - Select the `wishes` table
   - You should see your submitted wishes

### Step 5: Deploy to Vercel

Once everything is working locally:

1. Commit your changes:
```bash
git add .
git commit -m "Migrate from Firebase to Supabase"
```

2. Push to your repository:
```bash
git push origin main
```

3. Vercel will automatically deploy your changes

## API Reference

### useWishes Hook

```typescript
const { 
  wishes,          // Array of Wish objects
  loading,         // Boolean indicating if data is being fetched
  error,           // Error object if something went wrong
  addWish,         // Function to add a new wish
  updateWish,      // Function to update an existing wish
  deleteWish,      // Function to delete a wish
  refetch          // Function to manually refetch wishes
} = useWishes()
```

### useAuth Hook

```typescript
const { 
  user,     // Current user object or null
  loading,  // Boolean indicating auth state is loading
  signOut   // Function to sign out the current user
} = useAuth()
```

## Troubleshooting

### Issue: "NEXT_PUBLIC_SUPABASE_URL is not defined"
**Solution**: Make sure environment variables are set in Vercel project settings and restart your dev server.

### Issue: "RLS policy denies public insert"
**Solution**: Verify that the RLS policies were created correctly in the SQL query above.

### Issue: Real-time updates not working
**Solution**: 
1. Check that Realtime is enabled in your Supabase project
2. Go to Supabase Dashboard → **Realtime** settings
3. Ensure the `wishes` table has Realtime enabled

### Issue: CORS errors in browser console
**Solution**: 
1. Go to Supabase Dashboard → **Settings** → **API**
2. Update your CORS settings to allow your domain

## Migration Cleanup (Optional)

Once you've verified everything works, you can remove Firebase files:

```bash
# Remove Firebase directory
rm -rf src/firebase/

# Or manually delete:
# - src/firebase/
# - Remove "firebase" from package.json dependencies
```

Then reinstall dependencies:
```bash
npm install
```

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Realtime](https://supabase.com/docs/guides/realtime)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

## Support

If you encounter any issues:

1. Check the Supabase Dashboard for error messages
2. Review the browser console for JavaScript errors
3. Verify environment variables are correctly set
4. Check that the database table exists and has correct schema

For more help, visit: https://supabase.com/support
