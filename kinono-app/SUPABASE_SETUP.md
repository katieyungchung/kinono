# Supabase Backend Setup Guide

This guide will help you set up the Supabase backend for the Kinono app.

## Prerequisites

- A Supabase account (sign up at [supabase.com](https://supabase.com))
- Node.js and npm installed
- Expo CLI installed

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign in
2. Click "New Project"
3. Fill in the following:
   - **Name**: kinono (or your preferred name)
   - **Database Password**: Choose a strong password and save it securely
   - **Region**: Choose the region closest to your target users
4. Click "Create new project"
5. Wait ~2 minutes for the project to be created

## Step 2: Get Your API Credentials

1. Once your project is ready, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., https://xxxxx.supabase.co)
   - **Anon/Public Key** (the `anon` `public` key)

## Step 3: Configure Environment Variables

1. Create a `.env` file in the `kinono-app` directory:
   ```bash
   cp .env.example .env
   ```

2. Open `.env` and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 4: Set Up Database Schema

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Run the SQL files in this order:

### 4.1 Create Tables (schema.sql)
Copy and paste the contents of `supabase/schema.sql` into the SQL Editor and click **Run**

This creates:
- `profiles` - User profiles
- `user_interests` - User interest categories
- `user_detailed_interests` - Specific interests
- `friendships` - Friend connections
- `hangouts` - Hangout events
- `hangout_participants` - Participants in hangouts

### 4.2 Set Up Row Level Security (rls_policies.sql)
Copy and paste the contents of `supabase/rls_policies.sql` into the SQL Editor and click **Run**

This enables RLS and creates policies to ensure:
- Users can only see their own data
- Users can only modify their own content
- Friends can see each other's relevant information
- Hangout participants can see hangout details

### 4.3 Create Triggers (triggers.sql)
Copy and paste the contents of `supabase/triggers.sql` into the SQL Editor and click **Run**

This creates:
- Auto-profile creation when a user signs up
- Auto-update of `updated_at` timestamps

## Step 5: Verify Setup

1. Go to **Table Editor** in your Supabase dashboard
2. You should see all the tables created:
   - profiles
   - user_interests
   - user_detailed_interests
   - friendships
   - hangouts
   - hangout_participants

## Step 6: Test the Integration

1. Start your Expo development server:
   ```bash
   npx expo start
   ```

2. Try signing up with a test account
3. Check the **Authentication** → **Users** tab in Supabase to see if the user was created
4. Check the **Table Editor** → **profiles** to see if a profile was auto-created

## Database Structure

### profiles
- User account information
- Location data
- Search radius preferences

### user_interests
- High-level interest categories (e.g., "outdoor", "food")

### user_detailed_interests
- Specific interests (e.g., "Hiking", "Restaurants")

### friendships
- Friend connections between users
- Status: pending, accepted, blocked

### hangouts
- Hangout events with location and date
- Status: upcoming, completed, cancelled

### hangout_participants
- Users invited to hangouts
- Response status: invited, accepted, declined

## Using the Services

All backend operations are abstracted into service files:

### AuthService (`services/auth.service.ts`)
```typescript
import { AuthService } from '../services/auth.service';

// Sign up
await AuthService.signUp(email, password, fullName);

// Sign in
await AuthService.signIn(email, password);

// Sign out
await AuthService.signOut();
```

### UserService (`services/user.service.ts`)
```typescript
import { UserService } from '../services/user.service';

// Update profile
await UserService.updateProfile(userId, {
  location_address: 'San Francisco, CA',
  search_radius: 10,
});

// Save interests
await UserService.saveInterests(userId, ['outdoor', 'food']);
await UserService.saveDetailedInterests(userId, ['Hiking', 'Restaurants']);

// Search users
const users = await UserService.searchUsers('john');
```

### FriendService (`services/friend.service.ts`)
```typescript
import { FriendService } from '../services/friend.service';

// Send friend request
await FriendService.sendFriendRequest(userId, friendId);

// Accept friend request
await FriendService.acceptFriendRequest(friendshipId);

// Get friends
const friends = await FriendService.getUserFriends(userId);
```

### HangoutService (`services/hangout.service.ts`)
```typescript
import { HangoutService } from '../services/hangout.service';

// Create hangout
const hangout = await HangoutService.createHangout({
  creator_id: userId,
  title: 'Coffee meetup',
  location_name: 'Blue Bottle Coffee',
  scheduled_date: '2024-03-20T14:00:00Z',
  participant_ids: [friend1Id, friend2Id],
});

// Get upcoming hangouts
const hangouts = await HangoutService.getUpcomingHangouts(userId);

// Respond to hangout
await HangoutService.respondToHangout(hangoutId, userId, 'accepted');
```

## Authentication Context

Use the `useAuth` hook to access the current user:

```typescript
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, session, loading } = useAuth();

  if (loading) return <Text>Loading...</Text>;
  if (!user) return <Text>Please sign in</Text>;

  return <Text>Welcome, {user.email}!</Text>;
}
```

## Security Notes

1. **Never commit `.env` file** - It contains your API keys
2. **Row Level Security is enabled** - Users can only access their own data
3. **Use the anon key in your app** - Never use the service_role key
4. **RLS policies protect your data** - Even if someone gets your anon key

## Troubleshooting

### Error: "Invalid API key"
- Check that your `.env` file has the correct values
- Make sure to restart your Expo server after changing `.env`

### Error: "Row Level Security policy violation"
- Check that RLS policies are set up correctly
- Run the `rls_policies.sql` script again

### Users not showing up in profiles table
- Check that the trigger is set up correctly
- Run the `triggers.sql` script again

### Can't connect to Supabase
- Check your internet connection
- Verify the SUPABASE_URL is correct
- Check Supabase dashboard for any service issues

## Next Steps

1. Update your signup/signin pages to use the AuthService
2. Update onboarding screens to save data using UserService
3. Implement friends feature using FriendService
4. Connect hangout creation to HangoutService
5. Add real-time subscriptions for live updates

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase React Native Guide](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
