import { Flame, Trophy, Calendar } from 'lucide-react';

interface StreaksTabProps {
  userName?: string; // If provided, shows this user's name instead of "Your"
}

const mockStreaks = [
  {
    id: '1',
    friendName: 'Alex Chen',
    weeks: 8,
    type: 'active',
    lastMeetup: 'Jan 15, 2026',
  },
  {
    id: '2',
    friendName: 'Sam Parker',
    weeks: 5,
    type: 'active',
    lastMeetup: 'Jan 15, 2026',
  },
  {
    id: '3',
    friendName: 'Riley Morgan',
    weeks: 12,
    type: 'record',
    lastMeetup: 'Jan 10, 2026',
  },
  {
    id: '4',
    friendName: 'The Squad',
    weeks: 3,
    type: 'active',
    lastMeetup: 'Jan 10, 2026',
  },
];

export function StreaksTab({ userName }: StreaksTabProps) {
  const isOwnProfile = !userName;
  const displayName = userName ? userName.split(' ')[0] : 'Your';
  const possessiveName = userName ? `${userName.split(' ')[0]}'s` : 'Your';

  return (
    <div className="p-4 space-y-4">
      {/* Overall Stats */}
      <div className="bg-gradient-to-br from-[#D4F4E7] to-[#9DE4CF] rounded-xl p-5 text-[#5A3D5C] shadow-lg">
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5" />
          <span className="text-base font-semibold">{possessiveName} Longest Streak</span>
        </div>
        <div className="text-3xl font-bold mb-1">12 weeks</div>
        <p className="text-[#5A3D5C]/80 text-xs">With Riley Morgan</p>
      </div>

      {/* Active Streaks */}
      <div>
        <h2 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
          <Flame className="w-4 h-4 text-[#F59E0B]" />
          Active Streaks
        </h2>
        <div className="space-y-3">
          {mockStreaks
            .filter((s) => s.type === 'active')
            .map((streak) => (
              <div
                key={streak.id}
                className="bg-white/10 rounded-lg p-4 border border-white/20"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-sm text-white">{streak.friendName}</h3>
                  <div className="flex items-center gap-1 text-[#F59E0B] font-semibold text-sm">
                    <Flame className="w-4 h-4" />
                    <span>{streak.weeks}</span>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-2">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D4F4E7] rounded-full transition-all"
                      style={{ width: `${Math.min((streak.weeks / 12) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-white/60">
                  <Calendar className="w-3 h-3" />
                  <span>Last hangout: {streak.lastMeetup}</span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Records */}
      <div>
        <h2 className="font-semibold text-white mb-3 text-sm flex items-center gap-2">
          <Trophy className="w-4 h-4 text-[#F59E0B]" />
          Records
        </h2>
        <div className="space-y-3">
          {mockStreaks
            .filter((s) => s.type === 'record')
            .map((streak) => (
              <div
                key={streak.id}
                className="bg-gradient-to-r from-[#F59E0B]/20 to-[#D4F4E7]/10 rounded-lg p-4 border border-[#F59E0B]/40"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-sm text-white">{streak.friendName}</h3>
                    <p className="text-xs text-white/70 mt-1">
                      {streak.weeks} weeks in a row
                    </p>
                  </div>
                  <Trophy className="w-7 h-7 text-[#F59E0B]" />
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}