import { supabase } from '../lib/supabase';

export const UserService = {
  async updateProfile(userId: string, updates: {
    full_name?: string;
    location_address?: string;
    location_lat?: number;
    location_lng?: number;
    search_radius?: number;
  }) {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },

  async getProfile(userId: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();
    
    if (error) throw error;
    return data;
  },

  async saveInterests(userId: string, categories: string[]) {
    // Delete existing
    await supabase
      .from('user_interests')
      .delete()
      .eq('user_id', userId);

    // Insert new
    const interests = categories.map(category => ({
      user_id: userId,
      category,
    }));

    const { error } = await supabase
      .from('user_interests')
      .insert(interests);

    if (error) throw error;
  },

  async saveDetailedInterests(userId: string, interests: string[]) {
    // Delete existing
    await supabase
      .from('user_detailed_interests')
      .delete()
      .eq('user_id', userId);

    // Insert new
    const detailedInterests = interests.map(interest => ({
      user_id: userId,
      interest_name: interest,
    }));

    const { error } = await supabase
      .from('user_detailed_interests')
      .insert(detailedInterests);

    if (error) throw error;
  },

  async getUserInterests(userId: string) {
    const { data, error } = await supabase
      .from('user_interests')
      .select('category')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data.map(item => item.category);
  },

  async getUserDetailedInterests(userId: string) {
    const { data, error } = await supabase
      .from('user_detailed_interests')
      .select('interest_name')
      .eq('user_id', userId);
    
    if (error) throw error;
    return data.map(item => item.interest_name);
  },

  async searchUsers(query: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, full_name, email, avatar_url, location_address')
      .ilike('full_name', `%${query}%`)
      .limit(20);
    
    if (error) throw error;
    return data;
  },
};
