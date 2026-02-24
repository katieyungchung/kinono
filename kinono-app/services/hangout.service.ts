import { supabase } from '../lib/supabase';

export const HangoutService = {
  async createHangout(hangoutData: {
    creator_id: string;
    title: string;
    location_name: string;
    location_address?: string;
    location_lat?: number;
    location_lng?: number;
    scheduled_date: string;
    message?: string;
    participant_ids: string[];
  }) {
    // Create hangout
    const { data: hangout, error: hangoutError } = await supabase
      .from('hangouts')
      .insert({
        creator_id: hangoutData.creator_id,
        title: hangoutData.title,
        location_name: hangoutData.location_name,
        location_address: hangoutData.location_address,
        location_lat: hangoutData.location_lat,
        location_lng: hangoutData.location_lng,
        scheduled_date: hangoutData.scheduled_date,
        message: hangoutData.message,
        status: 'upcoming',
      })
      .select()
      .single();

    if (hangoutError) throw hangoutError;

    // Add creator as participant (auto-accepted)
    const creatorParticipant = {
      hangout_id: hangout.id,
      user_id: hangoutData.creator_id,
      status: 'accepted',
    };

    // Add other participants as invited
    const otherParticipants = hangoutData.participant_ids
      .filter(id => id !== hangoutData.creator_id)
      .map(userId => ({
        hangout_id: hangout.id,
        user_id: userId,
        status: 'invited',
      }));

    const allParticipants = [creatorParticipant, ...otherParticipants];

    const { error: participantsError } = await supabase
      .from('hangout_participants')
      .insert(allParticipants);

    if (participantsError) throw participantsError;

    return hangout;
  },

  async getUserHangouts(userId: string) {
    const { data, error } = await supabase
      .from('hangouts')
      .select(`
        *,
        creator:profiles!creator_id(
          id,
          full_name,
          avatar_url
        ),
        participants:hangout_participants(
          id,
          status,
          user:profiles(
            id,
            full_name,
            avatar_url
          )
        )
      `)
      .or(`creator_id.eq.${userId},hangout_participants.user_id.eq.${userId}`)
      .order('scheduled_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getUpcomingHangouts(userId: string) {
    const { data, error } = await supabase
      .from('hangouts')
      .select(`
        *,
        creator:profiles!creator_id(
          id,
          full_name,
          avatar_url
        ),
        participants:hangout_participants(
          id,
          status,
          user:profiles(
            id,
            full_name,
            avatar_url
          )
        )
      `)
      .or(`creator_id.eq.${userId},hangout_participants.user_id.eq.${userId}`)
      .eq('status', 'upcoming')
      .gte('scheduled_date', new Date().toISOString())
      .order('scheduled_date', { ascending: true });

    if (error) throw error;
    return data;
  },

  async respondToHangout(hangoutId: string, userId: string, status: 'accepted' | 'declined') {
    const { data, error } = await supabase
      .from('hangout_participants')
      .update({ 
        status,
        responded_at: new Date().toISOString(),
      })
      .eq('hangout_id', hangoutId)
      .eq('user_id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async updateHangout(hangoutId: string, updates: {
    title?: string;
    location_name?: string;
    location_address?: string;
    scheduled_date?: string;
    message?: string;
    status?: 'upcoming' | 'completed' | 'cancelled';
  }) {
    const { data, error } = await supabase
      .from('hangouts')
      .update(updates)
      .eq('id', hangoutId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteHangout(hangoutId: string) {
    const { error } = await supabase
      .from('hangouts')
      .delete()
      .eq('id', hangoutId);

    if (error) throw error;
  },

  async getHangoutDetails(hangoutId: string) {
    const { data, error } = await supabase
      .from('hangouts')
      .select(`
        *,
        creator:profiles!creator_id(
          id,
          full_name,
          avatar_url,
          email
        ),
        participants:hangout_participants(
          id,
          status,
          responded_at,
          user:profiles(
            id,
            full_name,
            avatar_url,
            email
          )
        )
      `)
      .eq('id', hangoutId)
      .single();

    if (error) throw error;
    return data;
  },
};
