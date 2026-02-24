# AsyncStorage Error Fix

## The Problem
You're seeing: `AsyncStorageError: Native module is null, cannot access legacy storage`

This happens because AsyncStorage needs to be properly initialized after installation.

## The Fix

### Step 1: Stop Your Current Dev Server
Press `Ctrl+C` in the terminal running Expo

### Step 2: Clear Cache and Restart
```bash
cd kinono-app
npx expo start -c
```

The `-c` flag clears the cache and ensures the native module is properly loaded.

### Step 3: Reload Your App
- **iOS**: Press `Cmd+R` in Expo Go
- **Android**: Press `R` twice quickly in Expo Go

## Why This Happens

AsyncStorage is a native module that needs to be:
1. Installed (✅ Done)
2. Linked/loaded by the bundler (needs restart)
3. Properly initialized in the app (needs cache clear)

## If It Still Doesn't Work

### Option 1: Force Clean Restart
```bash
# Stop the server
# Then run:
npx expo start -c --clear

# Or even more aggressive:
rm -rf node_modules/.cache
npx expo start -c
```

### Option 2: Check Expo Go Version
Make sure you're using the latest Expo Go app:
- iOS: Update from App Store
- Android: Update from Google Play Store

### Option 3: Temporary Workaround (Testing Only)
If you just want to test the app without Supabase auth persistence, you can temporarily disable AsyncStorage in the Supabase config:

Edit `lib/supabase.ts`:
```typescript
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // storage: AsyncStorage, // Comment this out temporarily
    autoRefreshToken: true,
    persistSession: false, // Set to false
    detectSessionInUrl: false,
  },
});
```

**Note**: This means users will be logged out when the app restarts.

## Expected Result

After restarting with cache clear, you should see:
- No AsyncStorage errors
- App loads normally
- Authentication works (but users need to sign in each time if persistence is disabled)

## Next Steps

Once this is working:
1. Set up your Supabase project
2. Add credentials to `.env`
3. Run the database scripts
4. Start connecting your UI to the backend!
