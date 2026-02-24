import { supabase } from '../lib/supabase';

export const FriendService = {
  async sendFriendRequest(userId: string, friendId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .insert({
        user_id: userId,
        friend_id: friendId,
        status: 'pending',
      })
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async acceptFriendRequest(friendshipId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .update({ status: 'accepted' })
      .eq('id', friendshipId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async removeFriend(userId: string, friendId: string) {
    const { error } = await supabase
      .from('friendships')
      .delete()
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`);
    
    if (error) throw error;
  },

  async getUserFriends(userId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        id,
        status,
        created_at,
        friend:profiles!friend_id(
          id,
          full_name,
          email,
          avatar_url,
          location_address
        )
      `)
      .eq('user_id', userId)
      .eq('status', 'accepted');
    
    if (error) throw error;
    return data;
  },

  async getPendingFriendRequests(userId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .select(`
        id,
        created_at,
        user:profiles!user_id(
          id,
          full_name,
          email,
          avatar_url
        )
      `)
      .eq('friend_id', userId)
      .eq('status', 'pending');
    
    if (error) throw error;
    return data;
  },

  async checkFriendshipStatus(userId: string, friendId: string) {
    const { data, error } = await supabase
      .from('friendships')
      .select('status')
      .or(`and(user_id.eq.${userId},friend_id.eq.${friendId}),and(user_id.eq.${friendId},friend_id.eq.${userId})`)
      .maybeSingle();
    
    if (error) throw error;
    return data?.status || null;
  },
};
