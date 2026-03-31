# Firebase to Supabase Migration - START HERE

Welcome! Your undangan-nelson project has been prepared for a complete migration from Firebase to Supabase. This document will guide you through the process.

## Quick Start (5 Minutes)

1. **Create Database Schema**
   - Go to https://supabase.com/dashboard
   - Open your project
   - Go to SQL Editor
   - Create new query and copy SQL from `scripts/01_create_schema.sql`
   - Click Run

2. **Verify Environment Variables**
   - Check Vercel project settings
   - Confirm `NEXT_PUBLIC_SUPABASE_URL` is set
   - Confirm `NEXT_PUBLIC_SUPABASE_ANON_KEY` is set

3. **Install and Test**
   ```bash
   npm install
   npm run dev
   ```

4. **Test RSVP Form**
   - Open http://localhost:9002
   - Submit a test RSVP
   - Verify it appears in the list
   - Check Supabase dashboard for the entry

Done! Now proceed with testing using the checklist below.

## Documentation Guide

Read these files in order:

### 1. **MIGRATION_SUMMARY.md** (Overview)
   - High-level overview of changes
   - Architecture comparison
   - What was changed
   - Code examples
   - **Read this first for context**

### 2. **SUPABASE_SETUP.md** (Detailed Setup)
   - Step-by-step setup instructions
   - Complete SQL migration script
   - Environment variable setup
   - Testing procedures
   - Troubleshooting guide
   - **Follow this for setup**

### 3. **MIGRATION_INSTRUCTIONS.md** (Implementation)
   - Detailed migration steps
   - Dependencies added
   - Component migration examples
   - Data migration from Firebase (optional)
   - **Reference this during implementation**

### 4. **MIGRATION_CHECKLIST.md** (Verification)
   - Pre-deployment checklist
   - Testing procedures
   - Deployment steps
   - Rollback procedures
   - Common issues and solutions
   - **Use this to verify everything works**

## New Files Created

### Supabase Configuration
```
src/supabase/
├── client.ts                 # Browser-side Supabase client
├── server.ts                 # Server-side Supabase client
├── auth/
│   └── use-auth.tsx         # Auth context provider & hook
└── hooks/
    └── use-wishes.tsx       # RSVP data management hook
```

### Database Schema
```
scripts/
└── 01_create_schema.sql     # Complete database migration script
```

### Documentation
```
├── MIGRATION_README.md       # This file
├── MIGRATION_SUMMARY.md      # Overview of changes
├── SUPABASE_SETUP.md        # Detailed setup guide
├── MIGRATION_INSTRUCTIONS.md # Implementation guide
└── MIGRATION_CHECKLIST.md   # Verification checklist
```

## Files Modified

- `src/app/layout.tsx` - Updated with AuthProvider
- `src/app/page.tsx` - Updated with useWishes hook
- `package.json` - Added @supabase/supabase-js and @supabase/ssr

## Implementation Timeline

### Phase 1: Database Setup (5-10 minutes)
- [ ] Create Supabase SQL schema
- [ ] Verify environment variables

### Phase 2: Installation (2 minutes)
- [ ] Run `npm install`

### Phase 3: Local Testing (10-15 minutes)
- [ ] Start dev server
- [ ] Test RSVP form
- [ ] Verify real-time updates
- [ ] Check data in Supabase

### Phase 4: Deployment (10 minutes)
- [ ] Commit changes
- [ ] Push to main branch
- [ ] Verify production works

### Phase 5: Optional Cleanup (15 minutes)
- [ ] Remove Firebase files (optional)
- [ ] Remove Firebase dependencies (optional)

**Total Time: ~40-50 minutes**

## Key Points

### What Changed
✅ Database: Firestore → PostgreSQL  
✅ Client Library: firebase → @supabase/supabase-js  
✅ Queries: Firestore queries → SQL + Real-time subscriptions  
✅ Auth: (Preparation only) Firebase Auth → Supabase Auth  

### What Stayed the Same
✅ UI Components (all unchanged)  
✅ Wedding design and content  
✅ User experience  
✅ Deployment process (still Vercel)  

### What You Get
✅ Better performance with PostgreSQL  
✅ Lower costs at scale  
✅ Full SQL query power  
✅ Built-in real-time updates  
✅ Row Level Security for data protection  

## Common Questions

### Q: Do I need to update the design?
**A**: No! All UI components remain unchanged. This is a backend migration only.

### Q: Will the wedding website go down?
**A**: No downtime if you follow the steps. You'll test locally first, then deploy when ready.

### Q: What about existing RSVP data?
**A**: It's optional to migrate. See MIGRATION_INSTRUCTIONS.md for steps if needed.

### Q: Can I rollback to Firebase?
**A**: Yes. Just push the Firebase version. Keep Firebase files for 24 hours as backup.

### Q: Do guests need to do anything?
**A**: No. The RSVP form works exactly the same way.

## Troubleshooting

Having issues? Check these in order:

1. **Env vars not loading?**
   - Restart dev server after updating .env.local
   - Check Vercel project settings
   - Verify variable names are exact

2. **Table doesn't exist?**
   - Run SQL migration in Supabase SQL Editor
   - Verify table appears in Table Editor
   - Check for SQL errors

3. **CORS errors?**
   - Check Supabase CORS settings
   - Verify NEXT_PUBLIC_SUPABASE_URL is correct

4. **Real-time not working?**
   - Check Realtime is enabled in Supabase settings
   - Verify RLS policies exist
   - Check browser console for errors

See MIGRATION_CHECKLIST.md for more troubleshooting.

## Next Steps

1. **Read MIGRATION_SUMMARY.md** for overview
2. **Follow SUPABASE_SETUP.md** for setup steps
3. **Use MIGRATION_CHECKLIST.md** to verify everything
4. **Reference MIGRATION_INSTRUCTIONS.md** as needed

## Support

- **Supabase Help**: https://supabase.com/support
- **Next.js Help**: https://nextjs.org/docs
- **This Project**: Check documentation files above

## Quick Reference

### SQL Schema
See: `scripts/01_create_schema.sql`

### Environment Variables Needed
```
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
```

### Dependencies Added
```
@supabase/supabase-js": "^2.43.0"
@supabase/ssr": "^0.4.0"
```

### Main Hook to Use
```typescript
import { useWishes } from '@/supabase/hooks/use-wishes'

const { wishes, loading, addWish, error } = useWishes()
```

---

## Ready to Start?

Follow this path:
1. `MIGRATION_SUMMARY.md` ← Start here (5 min read)
2. `SUPABASE_SETUP.md` ← Then setup (10 min)
3. `MIGRATION_CHECKLIST.md` ← Then verify (15 min)
4. `MIGRATION_INSTRUCTIONS.md` ← Reference as needed

**Good luck with the migration! Your wedding website will be more scalable and performant with Supabase.**

---

**Last Updated**: March 31, 2026  
**Migration Status**: Code complete, ready for setup  
**Next Action**: Create database schema in Supabase
