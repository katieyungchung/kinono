import { motion } from 'motion/react';
import { Settings } from 'lucide-react';
import { useState } from 'react';
import { BottomNav } from './BottomNav';
import { StatsTab } from './StatsTab';
import { MeetupsTab } from './MeetupsTab';
import { FriendsTab, type Friend } from './FriendsTab';
import { StreaksTab } from './StreaksTab';
import { InterestsTab } from './InterestsTab';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { PublicProfilePage } from './PublicProfilePage';
import { ConnectionTypeModal } from './ConnectionTypeModal';
import { getConnectionType } from '../utils/connectionTypes';
import type { UpcomingEvent } from '../App';
import type { MeetupReview } from './MeetupReview';

interface ProfilePageProps {
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick: () => void;
  onInboxClick?: () => void;
  onSettingsClick?: () => void;
  notificationCount?: number;
  upcomingEvents?: UpcomingEvent[];
  meetupReviews?: Record<string, MeetupReview>;
}

type Tab = 'stats' | 'meetups' | 'friends' | 'streaks' | 'interests';

export function ProfilePage({ onHomeClick, onStartHangout, onSearchClick, onInboxClick, onSettingsClick, notificationCount, upcomingEvents, meetupReviews }: ProfilePageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('stats');
  const [selectedFriend, setSelectedFriend] = useState<Friend | null>(null);
  const [isConnectionTypeModalOpen, setIsConnectionTypeModalOpen] = useState(false);

  // Get connection type for current user
  const connectionInfo = getConnectionType('jordand');

  const handleFriendClick = (friend: Friend) => {
    setSelectedFriend(friend);
  };

  const handleBackFromPublicProfile = () => {
    setSelectedFriend(null);
  };

  // Show public profile if a friend is selected
  if (selectedFriend) {
    return <PublicProfilePage friend={selectedFriend} onBack={handleBackFromPublicProfile} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col relative"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with profile info */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          {/* Top icons */}
          <div className="flex justify-end items-center gap-3 mb-6">
            <button 
              onClick={onSettingsClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <Settings className="w-5 h-5 text-white/80" />
            </button>
          </div>

          {/* Profile picture */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#D4F4E7] via-[#F59E0B] to-[#9DE4CF]">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc3MDUyMzgwN3ww&ixlib=rb-4.1.0&q=80&w=1080"
                    alt="Jordan Davis"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name and username */}
          <div className="text-center mb-3">
            <h1 className="text-white font-semibold text-xl mb-1">Jordan Davis</h1>
            <p className="text-white/60 text-sm mb-2">@jordand</p>
            
            {/* Connection Type Badge */}
            <button
              onClick={() => setIsConnectionTypeModalOpen(true)}
              className="inline-block bg-[#D4F4E7]/20 border border-[#D4F4E7]/50 rounded-full px-4 py-1.5 hover:bg-[#D4F4E7]/30 transition-all"
            >
              <span className="text-[#D4F4E7] text-xs font-medium">
                {connectionInfo.type}
              </span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 border-b border-white/20">
            <button
              onClick={() => setActiveTab('stats')}
              className={`flex-1 pb-2 text-sm font-medium transition-all ${
                activeTab === 'stats'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Stats
            </button>
            <button
              onClick={() => setActiveTab('meetups')}
              className={`flex-1 pb-2 text-sm font-medium transition-all ${
                activeTab === 'meetups'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Meetups
            </button>
            <button
              onClick={() => setActiveTab('friends')}
              className={`flex-1 pb-2 text-sm font-medium transition-all ${
                activeTab === 'friends'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Friends
            </button>
            <button
              onClick={() => setActiveTab('streaks')}
              className={`flex-1 pb-2 text-sm font-medium transition-all ${
                activeTab === 'streaks'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Streaks
            </button>
            <button
              onClick={() => setActiveTab('interests')}
              className={`flex-1 pb-2 text-sm font-medium transition-all ${
                activeTab === 'interests'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 hover:text-white/70'
              }`}
            >
              Interests
            </button>
          </div>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'stats' && <StatsTab />}
          {activeTab === 'meetups' && <MeetupsTab upcomingEvents={upcomingEvents} meetupReviews={meetupReviews} />}
          {activeTab === 'friends' && <FriendsTab onFriendClick={handleFriendClick} />}
          {activeTab === 'streaks' && <StreaksTab />}
          {activeTab === 'interests' && <InterestsTab />}
        </div>

        {/* Bottom Navigation */}
        <BottomNav 
          onHomeClick={onHomeClick} 
          onStartHangout={onStartHangout} 
          onSearchClick={onSearchClick}
          onInboxClick={onInboxClick}
          onProfileClick={() => {}}
          activeTab="profile"
          notificationCount={notificationCount} 
        />

        {/* Connection Type Modal */}
        <ConnectionTypeModal
          connectionInfo={connectionInfo}
          isOpen={isConnectionTypeModalOpen}
          onClose={() => setIsConnectionTypeModalOpen(false)}
        />
      </motion.div>
    </div>
  );
}