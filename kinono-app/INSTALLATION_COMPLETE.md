# ✅ Supabase Backend Installation Complete!

I've successfully set up the Supabase backend infrastructure for your Kinono app. Here's what was done:

## 📦 Packages Installed

```bash
- @supabase/supabase-js
- @react-native-async-storage/async-storage
- react-native-url-polyfill
```

## 📁 Files Created

### Core Setup
- **`lib/supabase.ts`** - Supabase client configuration
- **`contexts/AuthContext.tsx`** - Authentication context provider
- **`app/_layout.tsx`** - Updated to wrap app with AuthProvider

### Service Layer (API abstraction)
- **`services/auth.service.ts`** - Authentication operations
- **`services/user.service.ts`** - User profile and interests
- **`services/friend.service.ts`** - Friend management
- **`services/hangout.service.ts`** - Hangout creation and management

### Database Setup Scripts
- **`supabase/schema.sql`** - Database table definitions
- **`supabase/rls_policies.sql`** - Row Level Security policies
- **`supabase/triggers.sql`** - Auto-profile creation trigger

### Configuration
- **`.env.example`** - Environment variable template
- **`types/database.types.ts`** - TypeScript type definitions
- **`SUPABASE_SETUP.md`** - Comprehensive setup guide

## 🚀 What You Need to Do Next

### 1. Create Supabase Project (5 minutes)

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in:
   - Name: kinono
   - Database Password: (save it securely!)
   - Region: Choose closest to your users
4. Wait for project creation (~2 minutes)

### 2. Get Your API Credentials

1. Go to **Settings** → **API** in your Supabase dashboard
2. Copy:
   - Project URL (e.g., `https://xxxxx.supabase.co`)
   - Anon/Public Key

### 3. Configure Environment Variables

1. Create a `.env` file:
   ```bash
   cd kinono-app
   cp .env.example .env
   ```

2. Add your credentials to `.env`:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

### 4. Set Up Database

In your Supabase dashboard, go to **SQL Editor** and run these files in order:

1. **`supabase/schema.sql`** - Creates all tables
2. **`supabase/rls_policies.sql`** - Sets up security policies
3. **`supabase/triggers.sql`** - Creates auto-profile trigger

### 5. Restart Your Dev Server

```bash
npx expo start -c
```

The `-c` flag clears the cache and ensures environment variables are loaded.

### 6. Test Authentication

Try signing up with a test account. You should see:
- User created in **Authentication** → **Users**
- Profile auto-created in **Table Editor** → **profiles**

## 📚 Database Structure

Your database now has these tables:

### `profiles`
User account information, location, and preferences

### `user_interests`
High-level interest categories (outdoor, food, wellness, etc.)

### `user_detailed_interests`
Specific interests (Hiking, Restaurants, Yoga, etc.)

### `friendships`
Friend connections with status (pending, accepted, blocked)

### `hangouts`
Hangout events with location and date

### `hangout_participants`
Users invited to hangouts with response status

## 🔧 Using the Services

All backend operations are abstracted into easy-to-use services:

### Example: Sign Up
```typescript
import { AuthService } from './services/auth.service';

const handleSignUp = async () => {
  try {
    await AuthService.signUp(email, password, fullName);
    // User signed up!
  } catch (error) {
    console.error('Sign up error:', error);
  }
};
```

### Example: Save User Interests
```typescript
import { UserService } from './services/user.service';

const saveOnboardingData = async (userId: string) => {
  await UserService.saveInterests(userId, ['outdoor', 'food']);
  await UserService.saveDetailedInterests(userId, ['Hiking', 'Coffee']);
};
```

### Example: Create Hangout
```typescript
import { HangoutService } from './services/hangout.service';

const createHangout = async () => {
  const hangout = await HangoutService.createHangout({
    creator_id: userId,
    title: 'Coffee meetup',
    location_name: 'Blue Bottle Coffee',
    scheduled_date: '2024-03-20T14:00:00Z',
    participant_ids: [friend1Id, friend2Id],
  });
};
```

## 🔐 Authentication Context

Access the current user anywhere in your app:

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { user, session, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>Please sign in</Text>;

  return <Text>Welcome, {user.email}!</Text>;
}
```

## 📝 Next Steps to Connect Your UI

1. **Update SignUpPage.tsx** to use `AuthService.signUp()`
2. **Update SignInPage.tsx** to use `AuthService.signIn()`
3. **Update OnboardingLocation** to save location with `UserService.updateProfile()`
4. **Update OnboardingInterests** to save interests with `UserService.saveInterests()`
5. **Update OnboardingDetailedInterests** to save with `UserService.saveDetailedInterests()`
6. **Update StartHangout** to create real hangouts with `HangoutService.createHangout()`
7. **Update FullHomeScreen** to load hangouts with `HangoutService.getUpcomingHangouts()`

## ⚠️ Important Notes

- **Don't commit `.env`** - It's already in `.gitignore`
- **RLS is enabled** - Users can only access their own data
- **Only use the anon key** - Never use service_role key in your app
- **Restart Expo after changing `.env`** - Use `npx expo start -c`

## 🐛 Troubleshooting

### TypeScript Error in _layout.tsx
If you see a TypeScript error about AuthProvider, restart your development server:
```bash
# Stop the server (Ctrl+C)
npx expo start -c
```

This is a TypeScript server caching issue and will resolve after restart.

### Can't Connect to Supabase
- Check `.env` has correct values
- Restart Expo dev server
- Verify Supabase project is running in dashboard

### Users Not Showing in Profiles Table
- Make sure `triggers.sql` was run
- Check **SQL Editor** → **Logs** for errors

## 📖 Documentation

For more details, see:
- **`SUPABASE_SETUP.md`** - Complete setup guide
- **`supabase/`** - All SQL scripts
- **`services/`** - API documentation in comments

## 🎉 You're All Set!

Your backend infrastructure is ready. Once you complete the Supabase dashboard setup and add your credentials to `.env`, you can start connecting your UI components to the backend!

Need help? Check `SUPABASE_SETUP.md` for detailed documentation.
