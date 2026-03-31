# Firebase to Supabase Migration Checklist

## Pre-Deployment Checklist

### Database Setup
- [ ] Login to Supabase Dashboard
- [ ] Navigate to your project
- [ ] Go to SQL Editor
- [ ] Create and execute the SQL migration script (see SUPABASE_SETUP.md)
- [ ] Verify the `wishes` table exists in Table Editor
- [ ] Check RLS policies are in place

### Environment Variables
- [ ] `NEXT_PUBLIC_SUPABASE_URL` is set in Vercel project settings
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set in Vercel project settings
- [ ] Variables are also set in local `.env.local` file for development
- [ ] No Firebase credentials remain in environment variables

### Code Changes
- [ ] `src/supabase/client.ts` - Supabase client created
- [ ] `src/supabase/server.ts` - Server client created
- [ ] `src/supabase/auth/use-auth.tsx` - Auth provider created
- [ ] `src/supabase/hooks/use-wishes.tsx` - Wishes hook created
- [ ] `src/app/layout.tsx` - Updated with AuthProvider
- [ ] `src/app/page.tsx` - Updated to use useWishes hook
- [ ] All Firebase imports removed from updated files
- [ ] Dependencies added: `@supabase/supabase-js`, `@supabase/ssr`

### Local Development Testing
- [ ] Run `npm install` to install new dependencies
- [ ] Start dev server: `npm run dev`
- [ ] Open http://localhost:9002 in browser
- [ ] No console errors about missing env variables
- [ ] RSVP form loads and renders correctly

### Functional Testing
- [ ] Open an invitation link
- [ ] Fill out RSVP form with test data
- [ ] Submit RSVP form
- [ ] See success toast message
- [ ] Verify data appears in wishes list
- [ ] Open Supabase Dashboard and verify entry in `wishes` table

### Real-Time Testing
- [ ] Open invitation in two different browser windows
- [ ] Submit RSVP in one window
- [ ] Verify it appears in real-time in the other window
- [ ] Duplicate check works (trying to submit same message shows error)

### Verification in Supabase Dashboard
- [ ] Go to Table Editor
- [ ] Select `wishes` table
- [ ] Confirm entries are appearing with correct structure:
  - `id` - UUID
  - `name` - Text
  - `status` - 'Hadir' or 'Absen'
  - `message` - Text
  - `created_at` - Timestamp

### Performance Check
- [ ] Page loads quickly
- [ ] No unusual console errors
- [ ] Network requests show Supabase API calls
- [ ] Real-time subscriptions are active

## Optional - Data Migration from Firebase

If you want to migrate existing data from Firebase:

- [ ] Export Firestore data as JSON
- [ ] Transform data to match Supabase schema
- [ ] Use Supabase Data Editor to import
- [ ] Verify all data migrated correctly
- [ ] Compare row counts between Firebase and Supabase

## Deployment to Vercel

- [ ] All local tests pass
- [ ] Commit changes: `git add . && git commit -m "Migrate Firebase to Supabase"`
- [ ] Push to main branch: `git push origin main`
- [ ] Vercel deployment completes successfully
- [ ] Test production URL works
- [ ] RSVP submissions work in production
- [ ] Real-time updates work in production

## Post-Migration (Optional Cleanup)

Once everything is working in production for at least a few days:

- [ ] Backup Firebase data if needed
- [ ] Remove Firebase directory: `rm -rf src/firebase/`
- [ ] Remove `firebase` from `package.json` dependencies
- [ ] Run `npm install` to update lock file
- [ ] Commit and deploy cleanup changes
- [ ] Keep Firebase project for reference (optional)

## Rollback Plan (Just in Case)

If something goes wrong:

1. Switch back to main branch with Firebase code
2. Revert environment variables to Firebase
3. Redeploy to Vercel

Note: If you need to keep Firebase running parallel, update layout.tsx to use FirebaseClientProvider temporarily.

## Common Issues and Solutions

### Issue: "Table 'wishes' does not exist"
**Solution**: Make sure to run the SQL migration in Supabase SQL Editor

### Issue: RLS policies blocking inserts
**Solution**: Verify the exact SQL policies from SUPABASE_SETUP.md were created

### Issue: Real-time not working
**Solution**: 
1. Check Realtime is enabled in Supabase settings
2. Check table has Realtime enabled
3. Verify subscription in use-wishes.tsx hook

### Issue: CORS errors
**Solution**: Update CORS settings in Supabase project settings

### Issue: Environment variables not loading
**Solution**: 
1. Restart dev server after updating .env.local
2. Check Vercel project settings for correct variable names
3. Clear browser cache

## Migration Success Criteria

- [ ] No Firebase code in src/app/page.tsx
- [ ] No Firebase imports anywhere in active components
- [ ] RSVP form works end-to-end
- [ ] Data persists in Supabase
- [ ] Real-time updates work
- [ ] No console errors related to authentication or data
- [ ] Production deployment works
- [ ] At least 24 hours of production stability

## Completion

Once all items are checked, you have successfully migrated from Firebase to Supabase!

Date Completed: __________
