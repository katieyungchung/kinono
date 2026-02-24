-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_detailed_interests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.friendships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hangouts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hangout_participants ENABLE ROW LEVEL SECURITY;

-- Profiles: Users can read all profiles, but only update their own
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- User interests: Users can manage their own interests
CREATE POLICY "Users can view their own interests"
  ON public.user_interests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own interests"
  ON public.user_interests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own interests"
  ON public.user_interests FOR DELETE
  USING (auth.uid() = user_id);

-- User detailed interests: Users can manage their own detailed interests
CREATE POLICY "Users can view their own detailed interests"
  ON public.user_detailed_interests FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own detailed interests"
  ON public.user_detailed_interests FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own detailed interests"
  ON public.user_detailed_interests FOR DELETE
  USING (auth.uid() = user_id);

-- Friendships: Users can see their friendships
CREATE POLICY "Users can view their friendships"
  ON public.friendships FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can create friendships"
  ON public.friendships FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their friendships"
  ON public.friendships FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

CREATE POLICY "Users can delete their friendships"
  ON public.friendships FOR DELETE
  USING (auth.uid() = user_id OR auth.uid() = friend_id);

-- Hangouts: Users can see hangouts they're invited to
CREATE POLICY "Users can view their hangouts"
  ON public.hangouts FOR SELECT
  USING (
    auth.uid() = creator_id OR
    EXISTS (
      SELECT 1 FROM public.hangout_participants
      WHERE hangout_id = id AND user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create hangouts"
  ON public.hangouts FOR INSERT
  WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their hangouts"
  ON public.hangouts FOR UPDATE
  USING (auth.uid() = creator_id);

CREATE POLICY "Creators can delete their hangouts"
  ON public.hangouts FOR DELETE
  USING (auth.uid() = creator_id);

-- Hangout participants
CREATE POLICY "Users can view participants of their hangouts"
  ON public.hangout_participants FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.hangouts
      WHERE id = hangout_id AND (
        creator_id = auth.uid() OR
        EXISTS (
          SELECT 1 FROM public.hangout_participants hp
          WHERE hp.hangout_id = id AND hp.user_id = auth.uid()
        )
      )
    )
  );

CREATE POLICY "Hangout creators can add participants"
  ON public.hangout_participants FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.hangouts
      WHERE id = hangout_id AND creator_id = auth.uid()
    )
  );

CREATE POLICY "Participants can update their own status"
  ON public.hangout_participants FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Creators can delete participants"
  ON public.hangout_participants FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.hangouts
      WHERE id = hangout_id AND creator_id = auth.uid()
    )
  );
