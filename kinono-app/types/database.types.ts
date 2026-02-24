// Database type definitions for Supabase tables
// These types can be auto-generated using: npx supabase gen types typescript

export type Profile = {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  location_address: string | null;
  location_lat: number | null;
  location_lng: number | null;
  search_radius: number | null;
  created_at: string;
  updated_at: string;
};

export type UserInterest = {
  id: string;
  user_id: string;
  category: string;
  created_at: string;
};

export type UserDetailedInterest = {
  id: string;
  user_id: string;
  interest_name: string;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  status: 'pending' | 'accepted' | 'blocked';
  created_at: string;
};

export type Hangout = {
  id: string;
  creator_id: string;
  title: string;
  location_name: string | null;
  location_address: string | null;
  location_lat: number | null;
  location_lng: number | null;
  scheduled_date: string | null;
  status: 'upcoming' | 'completed' | 'cancelled';
  message: string | null;
  created_at: string;
};

export type HangoutParticipant = {
  id: string;
  hangout_id: string;
  user_id: string;
  status: 'invited' | 'accepted' | 'declined';
  responded_at: string | null;
  created_at: string;
};

// Extended types with relationships
export type FriendshipWithProfile = Friendship & {
  friend: Profile;
};

export type HangoutWithDetails = Hangout & {
  creator: Profile;
  participants: Array<HangoutParticipant & { user: Profile }>;
};

export type HangoutParticipantWithUser = HangoutParticipant & {
  user: Profile;
};
