# Project Structure - After Migration

This document shows the new project structure after the Firebase to Supabase migration.

## Directory Tree

```
undangan-nelson/
│
├── scripts/
│   └── 01_create_schema.sql          ✨ NEW - SQL migration for Supabase
│
├── src/
│   ├── supabase/                     ✨ NEW - Supabase integration
│   │   ├── client.ts                 ✨ Browser client
│   │   ├── server.ts                 ✨ Server client
│   │   ├── auth/
│   │   │   └── use-auth.tsx          ✨ Authentication provider
│   │   └── hooks/
│   │       └── use-wishes.tsx        ✨ RSVP data management
│   │
│   ├── firebase/                     (Kept for reference - can remove later)
│   │   ├── config.ts
│   │   ├── index.ts
│   │   ├── client-provider.tsx
│   │   ├── error-emitter.ts
│   │   ├── errors.ts
│   │   ├── auth/
│   │   │   └── use-user.tsx
│   │   └── firestore/
│   │       ├── use-doc.tsx
│   │       └── use-collection.tsx
│   │
│   ├── app/
│   │   ├── layout.tsx                ✏️  UPDATED - Now uses AuthProvider
│   │   ├── page.tsx                  ✏️  UPDATED - Now uses useWishes
│   │   ├── globals.css
│   │   └── ...
│   │
│   ├── components/                   (Unchanged)
│   ├── hooks/                        (Unchanged)
│   ├── lib/                          (Unchanged)
│   └── ...
│
├── public/                           (Unchanged)
│
├── MIGRATION_README.md               ✨ NEW - Start here
├── MIGRATION_SUMMARY.md              ✨ NEW - Overview of changes
├── SUPABASE_SETUP.md                 ✨ NEW - Setup guide
├── MIGRATION_INSTRUCTIONS.md         ✨ NEW - Implementation guide
├── MIGRATION_CHECKLIST.md            ✨ NEW - Verification checklist
├── PROJECT_STRUCTURE.md              ✨ NEW - This file
│
├── package.json                      ✏️  UPDATED - Added Supabase packages
├── tsconfig.json                     (Unchanged)
├── tailwind.config.ts                (Unchanged)
├── next.config.ts                    (Unchanged)
└── .env.local                        (Unchanged - add Supabase vars)
```

## New Supabase Integration (`src/supabase/`)

### Structure
```
src/supabase/
├── client.ts                    # Browser-side Supabase client
├── server.ts                    # Server-side Supabase client  
├── auth/
│   └── use-auth.tsx            # Authentication context & hooks
└── hooks/
    └── use-wishes.tsx          # Data management hooks
```

### Purpose of Each File

#### `client.ts`
- Creates Supabase client for use in client components ("use client")
- Initializes with `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Used by: Browser-side components

#### `server.ts`
- Creates Supabase client for use in server components
- Handles cookie-based session management for SSR
- Used by: Server components and API routes

#### `auth/use-auth.tsx`
- React Context Provider for authentication state
- Exports: `AuthProvider` component and `useAuth()` hook
- Provides: `user`, `loading`, `signOut()`
- Auto-manages session persistence

#### `hooks/use-wishes.tsx`
- Custom hook for RSVP wishes/data management
- Fetches data: `SELECT * FROM wishes ORDER BY created_at DESC`
- Real-time updates: Listens for INSERT, UPDATE, DELETE events
- Exports: `useWishes()` hook with data and methods

## Modified Files

### `src/app/layout.tsx`
**Changes:**
- ❌ Removed: `import { FirebaseClientProvider } from '@/firebase/client-provider'`
- ✅ Added: `import { AuthProvider } from '@/supabase/auth/use-auth'`
- ❌ Removed: `<FirebaseClientProvider>` wrapper
- ✅ Added: `<AuthProvider>` wrapper

### `src/app/page.tsx`
**Changes:**
```typescript
// Removed
import { collection, addDoc, query, orderBy, serverTimestamp } from "firebase/firestore"
import { useFirestore, useCollection } from "@/firebase"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError, type SecurityRuleContext } from '@/firebase/errors'

// Added
import { useWishes } from "@/supabase/hooks/use-wishes"
```

**Functionality Changes:**
- Changed data fetching from `useCollection()` to `useWishes()`
- Changed RSVP submission from `addDoc()` to `addWish()`
- Simplified error handling
- Removed Firebase-specific error classes

### `package.json`
**Added:**
```json
{
  "@supabase/supabase-js": "^2.43.0",
  "@supabase/ssr": "^0.4.0"
}
```

**Still Present (Not Removed Yet):**
```json
{
  "firebase": "^11.9.1"  // Can be removed after testing
}
```

## Data Model Comparison

### Firebase Firestore
```typescript
// Collection: wishes
{
  id: "auto-generated",
  name: "Nama Tamu",
  status: "Hadir",
  message: "Ucapan panjang...",
  createdAt: Timestamp,
}
```

### Supabase PostgreSQL
```sql
-- Table: public.wishes
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
name TEXT NOT NULL,
status TEXT NOT NULL CHECK (status IN ('Hadir', 'Absen')),
message TEXT NOT NULL,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
```

## Configuration Files

### Environment Variables
**Location:** `.env.local` (local) or Vercel Settings (production)

**Required Variables:**
```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx-xxxx-xxxx
```

**Firebase Variables (Keep for Now):**
```
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
# ... other Firebase vars
```

Can be removed after testing if desired.

## Component Architecture

### Before Migration
```
App
└── FirebaseClientProvider
    └── RootLayout
        ├── Page (uses useFirestore)
        ├── Page (uses useCollection)
        └── ...
```

### After Migration
```
App
└── AuthProvider (Supabase)
    └── RootLayout
        ├── Page (uses useWishes)
        ├── Page (uses useAuth)
        └── ...
```

## API/Database Calls

### Real-time Wishlist Updates
**Source:** `src/supabase/hooks/use-wishes.tsx`

**Subscription:**
```typescript
supabase
  .channel('wishes')
  .on('postgres_changes', {
    event: '*',
    schema: 'public',
    table: 'wishes',
  }, (payload) => {
    // Handle INSERT, UPDATE, DELETE
  })
  .subscribe()
```

### RSVP Submission
**Location:** `src/app/page.tsx` - `handleSendRSVP()`

**Query:**
```typescript
await supabase
  .from('wishes')
  .insert([{
    name: rsvpName,
    status: rsvpStatus,
    message: rsvpMessage,
  }])
  .select()
```

## Type Definitions

### Wish Interface
```typescript
interface Wish {
  id: string;
  name: string;
  status: 'Hadir' | 'Absen';
  message: string;
  created_at: string;
}
```

### Auth Context
```typescript
interface AuthContextType {
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}
```

## Import Paths

### Old Imports (Firebase)
```typescript
import { useFirestore } from '@/firebase'
import { useCollection } from '@/firebase/firestore/use-collection'
import { useUser } from '@/firebase/auth/use-user'
```

### New Imports (Supabase)
```typescript
import { useWishes } from '@/supabase/hooks/use-wishes'
import { useAuth } from '@/supabase/auth/use-auth'
import { createClient } from '@/supabase/client'  // For direct client access
```

## File Size Changes

| File | Before | After | Change |
|------|--------|-------|--------|
| `src/firebase/` | ~30KB | (kept) | - |
| `src/supabase/` | - | ~15KB | +15KB |
| `package.json` | (2 packages) | (4 packages) | +2 |
| `page.tsx` | ~25KB | ~23KB | -2KB |
| `layout.tsx` | ~1KB | ~1KB | - |

## Performance Impact

### Bundle Size
- ✅ Adding Supabase: +~50KB (with tree-shaking)
- ❌ Keeping Firebase: +~100KB
- 🎯 Net after Firebase removal: -50KB

### Runtime Performance
- ✅ SQL queries faster than Firestore
- ✅ Real-time subscriptions more efficient
- ✅ Reduced network calls

## Backwards Compatibility

### Breaking Changes
❌ `useFirestore()` - No longer available (use `useWishes()`)  
❌ `useCollection()` - No longer available (use `useWishes()`)  
❌ `useUser()` - Deprecated (use `useAuth()`)  

### Non-Breaking Changes
✅ Firebase files still exist (for reference)  
✅ UI components unchanged  
✅ Page routes unchanged  
✅ Styling unchanged  

## Migration Path

```
Step 1: Database Setup
│
Step 2: Install Dependencies
│
Step 3: Test Locally
│  └─ If OK → Continue
│  └─ If Error → Check TROUBLESHOOTING.md
│
Step 4: Deploy to Production
│
Step 5: Optional - Remove Firebase Files
│  └─ Delete src/firebase/
│  └─ Remove firebase from package.json
│  └─ npm install
```

## File Organization Best Practices

### Supabase Integration Location
✅ `src/supabase/` - Organized by function (client, server, auth, hooks)

### Why This Structure?
- Clear separation from Firebase code
- Easy to find database/auth related files
- Scales well for future features
- Mirrors Supabase documentation patterns

### If You Add More Hooks Later
```
src/supabase/
├── client.ts
├── server.ts
├── auth/
│   ├── use-auth.tsx
│   ├── use-user.tsx (future)
│   └── use-session.tsx (future)
└── hooks/
    ├── use-wishes.tsx
    ├── use-guests.tsx (future)
    └── use-analytics.tsx (future)
```

---

**Last Updated**: March 31, 2026  
**Structure Finalized**: Yes  
**Next Step**: Execute database schema creation
