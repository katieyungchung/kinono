import { motion } from 'motion/react';
import { Calendar, Users, TrendingUp, Flame, Sparkles, Clock } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HangoutStat {
  totalHangouts: number;
  longestStreak: {
    count: number;
    description: string;
  };
  topPartners: Array<{
    name: string;
    avatar: string;
    hangoutCount: number;
  }>;
  newPeopleMet: number;
  topCategories: Array<{
    category: string;
    count: number;
    emoji: string;
  }>;
  daysSinceLastHangout: number;
}

// Mock data for stats
const mockStats: HangoutStat = {
  totalHangouts: 47,
  longestStreak: {
    count: 3,
    description: '3 weekends in a row'
  },
  topPartners: [
    {
      name: 'Alex Rivera',
      avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200',
      hangoutCount: 12
    },
    {
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?w=200',
      hangoutCount: 9
    },
    {
      name: 'Marcus Johnson',
      avatar: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?w=200',
      hangoutCount: 7
    }
  ],
  newPeopleMet: 8,
  topCategories: [
    { category: 'Food & Drinks', count: 18, emoji: '🍽️' },
    { category: 'Sports', count: 12, emoji: '⚽' },
    { category: 'Music & Events', count: 9, emoji: '🎵' },
    { category: 'Outdoor Activities', count: 5, emoji: '🏞️' },
    { category: 'Coffee Chats', count: 3, emoji: '☕' }
  ],
  daysSinceLastHangout: 2
};

export function StatsTab() {
  const stats = mockStats;

  return (
    <motion.div
      className="px-6 pb-6 space-y-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header */}
      <div className="text-center pt-4 pb-1">
        <h2 className="text-white text-lg font-semibold mb-0.5">Your 2026 so far!</h2>
        <p className="text-white/60 text-xs">Here's how you've been connecting</p>
      </div>

      {/* Total Hangouts - Big Hero Card */}
      <motion.div
        className="bg-gradient-to-br from-[#F59E0B] to-[#E89450] rounded-3xl p-6 text-center shadow-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Calendar className="w-8 h-8 text-white/80 mx-auto mb-2" />
        <div className="text-6xl font-bold text-white mb-2">{stats.totalHangouts}</div>
        <p className="text-white/90 font-medium text-lg">Total Hangouts This Year</p>
        <p className="text-white/70 text-sm mt-1">That's almost one per week! 🎉</p>
      </motion.div>

      {/* Longest Streak */}
      <motion.div
        className="bg-[#D4F4E7]/10 backdrop-blur-sm border border-[#D4F4E7]/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 bg-[#F59E0B]/20 rounded-xl">
            <Flame className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Longest Streak</h3>
            <p className="text-white/60 text-sm">Keep the momentum going!</p>
          </div>
        </div>
        <div className="text-center py-2">
          <div className="text-4xl font-bold text-[#D4F4E7] mb-1">
            {stats.longestStreak.description}
          </div>
          <p className="text-white/60 text-sm">You were on fire! 🔥</p>
        </div>
      </motion.div>

      {/* Top 3 Hangout Partners */}
      <motion.div
        className="bg-[#D4F4E7]/10 backdrop-blur-sm border border-[#D4F4E7]/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-[#D4F4E7]/20 rounded-xl">
            <Users className="w-6 h-6 text-[#D4F4E7]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Top Hangout Partners</h3>
            <p className="text-white/60 text-sm">Your core crew</p>
          </div>
        </div>
        <div className="space-y-3">
          {stats.topPartners.map((partner, index) => (
            <div key={index} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#F59E0B]/50">
                  <ImageWithFallback
                    src={partner.avatar}
                    alt={partner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Position badge */}
                <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center text-white text-xs font-bold border-2 border-[#5A3D5C]">
                  {index + 1}
                </div>
              </div>
              <div className="flex-1">
                <p className="text-white font-medium">{partner.name}</p>
                <p className="text-white/60 text-sm">{partner.hangoutCount} hangouts together</p>
              </div>
              {index === 0 && <span className="text-2xl">👑</span>}
            </div>
          ))}
        </div>
      </motion.div>

      {/* New People Met */}
      <motion.div
        className="bg-[#D4F4E7]/10 backdrop-blur-sm border border-[#D4F4E7]/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-[#D4F4E7]/20 rounded-xl">
            <TrendingUp className="w-6 h-6 text-[#D4F4E7]" />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">New Connections</h3>
            <p className="text-white/60 text-sm">Fresh faces this year</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-[#D4F4E7]">{stats.newPeopleMet}</div>
            <p className="text-white/60 text-xs">new people</p>
          </div>
        </div>
      </motion.div>

      {/* Top Categories */}
      <motion.div
        className="bg-[#D4F4E7]/10 backdrop-blur-sm border border-[#D4F4E7]/20 rounded-2xl p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 bg-[#F59E0B]/20 rounded-xl">
            <Sparkles className="w-6 h-6 text-[#F59E0B]" />
          </div>
          <div>
            <h3 className="text-white font-semibold text-lg">Favorite Activities</h3>
            <p className="text-white/60 text-sm">What you love doing most</p>
          </div>
        </div>
        <div className="space-y-2">
          {stats.topCategories.map((category, index) => {
            const percentage = (category.count / stats.totalHangouts) * 100;
            return (
              <div key={index}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.emoji}</span>
                    <span className="text-white text-sm font-medium">{category.category}</span>
                  </div>
                  <span className="text-white/60 text-sm">{category.count}</span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D4F4E7] rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Time Since Last Hangout */}
      <motion.div
        className="bg-gradient-to-br from-[#7A5D7C] to-[#5A3D5C] border border-white/10 rounded-2xl p-5 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Clock className="w-8 h-8 text-white/80 mx-auto mb-3" />
        <h3 className="text-white font-semibold text-lg mb-1">Time Since Last Hangout</h3>
        <div className="text-4xl font-bold text-[#D4F4E7] mb-2">
          {stats.daysSinceLastHangout} {stats.daysSinceLastHangout === 1 ? 'day' : 'days'}
        </div>
        <p className="text-white/60 text-sm">
          {stats.daysSinceLastHangout <= 3 
            ? "You're keeping the connections strong! 💪" 
            : "Time to plan your next hangout! 📅"}
        </p>
      </motion.div>
    </motion.div>
  );
}