import * as WebBrowser from 'expo-web-browser';
import { makeRedirectUri } from 'expo-auth-session';
import { supabase } from '../lib/supabase';

/**
 * SUPABASE REDIRECT URL SETUP (required for Google OAuth):
 * 1. Go to Supabase Dashboard → Authentication → URL Configuration
 * 2. Under Redirect URLs, add: kinonoapp://**
 * 3. For Expo Go: also add your dev URL (see console log when signing in)
 *    Run the app and tap "Continue with Google" to see the exact URL in the terminal
 */
// Required for web browser auth session
WebBrowser.maybeCompleteAuthSession();

const createSessionFromUrl = async (url: string) => {
  // Supabase redirects with hash: #access_token=xxx&refresh_token=xxx
  const hashIndex = url.indexOf('#');
  const hashParams = hashIndex >= 0 ? url.substring(hashIndex + 1) : '';
  const params = new URLSearchParams(hashParams);
  const access_token = params.get('access_token');
  const refresh_token = params.get('refresh_token');
  if (!access_token) throw new Error('Could not extract tokens from redirect');
  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token: refresh_token ?? '',
  });
  if (error) throw error;
  return data;
};

export const GoogleAuthService = {
  async signInWithGoogle() {
    try {
      const redirectTo = makeRedirectUri();
      if (__DEV__) {
        console.log('[Google OAuth] Add this URL to Supabase → Auth → URL Config → Redirect URLs:', redirectTo);
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo,
          skipBrowserRedirect: true,
        },
      });

      if (error) throw error;
      if (!data?.url) throw new Error('No OAuth URL returned');

      const result = await WebBrowser.openAuthSessionAsync(
        data.url,
        redirectTo,
        { showInRecents: true }
      );

      if (result.type !== 'success') {
        throw new Error('Auth session was cancelled or failed');
      }

      return await createSessionFromUrl(result.url);
    } catch (error: any) {
      console.error('Google sign in error:', error);
      throw error;
    }
  },

  async signOut() {
    await supabase.auth.signOut();
  },

  async getCurrentUser() {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  },

  async isSignedIn() {
    const { data: { session } } = await supabase.auth.getSession();
    return !!session;
  },
};
