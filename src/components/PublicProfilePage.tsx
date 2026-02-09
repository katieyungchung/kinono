import { motion } from 'motion/react';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { StreaksTab } from './StreaksTab';
import { InterestsTab } from './InterestsTab';
import { ConnectionTypeModal } from './ConnectionTypeModal';
import { getConnectionType } from '../utils/connectionTypes';

interface PublicProfilePageProps {
  friend: {
    id: string;
    name: string;
    username: string;
    avatar: string;
  };
  onBack: () => void;
}

type Tab = 'streaks' | 'interests';

export function PublicProfilePage({ friend, onBack }: PublicProfilePageProps) {
  const [activeTab, setActiveTab] = useState<Tab>('streaks');
  const [isConnectionTypeModalOpen, setIsConnectionTypeModalOpen] = useState(false);

  // Get connection type for this friend
  const connectionInfo = getConnectionType(friend.id);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col relative"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with profile info */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          {/* Back Button */}
          <button 
            onClick={onBack}
            className="mb-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-white/80" />
          </button>

          {/* Profile picture */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-24 h-24 rounded-full p-1 bg-gradient-to-br from-[#D4F4E7] via-[#F59E0B] to-[#9DE4CF]">
                <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
                  <img
                    src={friend.avatar}
                    alt={friend.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Name and username */}
          <div className="text-center mb-3">
            <h1 className="text-white font-semibold text-xl mb-1">{friend.name}</h1>
            <p className="text-white/60 text-sm mb-2">{friend.username}</p>
            
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
          {activeTab === 'streaks' && <StreaksTab userName={friend.name} />}
          {activeTab === 'interests' && <InterestsTab userName={friend.name} isReadOnly={true} />}
        </div>

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