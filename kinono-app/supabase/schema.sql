-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  location_address TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  search_radius INTEGER DEFAULT 10,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User interests (categories from onboarding)
CREATE TABLE public.user_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  category TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User detailed interests (sub-interests)
CREATE TABLE public.user_detailed_interests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  interest_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Friendships
CREATE TABLE public.friendships (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  friend_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending', -- 'pending', 'accepted', 'blocked'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, friend_id)
);

-- Hangouts
CREATE TABLE public.hangouts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  creator_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location_name TEXT,
  location_address TEXT,
  location_lat NUMERIC,
  location_lng NUMERIC,
  scheduled_date TIMESTAMP WITH TIME ZONE,
  status TEXT DEFAULT 'upcoming', -- 'upcoming', 'completed', 'cancelled'
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hangout participants
CREATE TABLE public.hangout_participants (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  hangout_id UUID REFERENCES public.hangouts(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'invited', -- 'invited', 'accepted', 'declined'
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(hangout_id, user_id)
);

-- Create indexes for better query performance
CREATE INDEX idx_friendships_user_id ON public.friendships(user_id);
CREATE INDEX idx_friendships_friend_id ON public.friendships(friend_id);
CREATE INDEX idx_hangout_participants_user_id ON public.hangout_participants(user_id);
CREATE INDEX idx_hangout_participants_hangout_id ON public.hangout_participants(hangout_id);
CREATE INDEX idx_user_interests_user_id ON public.user_interests(user_id);
CREATE INDEX idx_user_detailed_interests_user_id ON public.user_detailed_interests(user_id);
