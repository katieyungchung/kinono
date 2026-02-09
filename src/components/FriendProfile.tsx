import { ArrowLeft, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { StreaksTab } from './StreaksTab';
import { InterestsTab } from './InterestsTab';

interface Friend {
  id: string;
  name: string;
  username: string;
  avatar: string;
}

interface FriendProfileProps {
  friend: Friend;
  onBack: () => void;
}

type Tab = 'streaks' | 'interests';

export function FriendProfile({ friend, onBack }: FriendProfileProps) {
  const [activeTab, setActiveTab] = useState<Tab>('streaks');
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);

  // Mock friend groups
  const friendGroups = [
    { id: '1', name: 'Coffee Crew', emoji: '☕' },
    { id: '2', name: 'Hiking Squad', emoji: '🥾' },
    { id: '3', name: 'Game Night', emoji: '🎮' },
    { id: '4', name: 'Foodies', emoji: '🍕' },
    { id: '5', name: 'Workout Buddies', emoji: '💪' },
  ];

  const toggleGroup = (groupId: string) => {
    if (selectedGroups.includes(groupId)) {
      setSelectedGroups(selectedGroups.filter(id => id !== groupId));
    } else {
      setSelectedGroups([...selectedGroups, groupId]);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#9B8BA8]">
      {/* Header */}
      <div className="bg-[#8A7A96] sticky top-0 z-10 shadow-sm flex-shrink-0">
        {/* Top Bar */}
        <div className="flex items-center px-4 pt-3">
          <button 
            onClick={onBack}
            className="p-1.5 hover:bg-[#9B8BA8] rounded-full transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Profile Picture */}
        <div className="flex justify-center py-3">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#B5D4C8] to-[#F4A460] p-1">
            <div className="w-full h-full rounded-full overflow-hidden bg-gray-200">
              <img 
                src={friend.avatar}
                alt={friend.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center pb-3">
          <h1 className="font-semibold text-base text-white">{friend.name}</h1>
          <p className="text-[#D1C4E0] text-xs">{friend.username}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-[#9B8BA8]">
          <button
            onClick={() => setActiveTab('streaks')}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors relative ${
              activeTab === 'streaks'
                ? 'text-white'
                : 'text-[#D1C4E0] hover:text-white'
            }`}
          >
            Streaks
            {activeTab === 'streaks' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B5D4C8] to-[#F4A460]"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab('interests')}
            className={`flex-1 py-2.5 text-xs font-medium transition-colors relative ${
              activeTab === 'interests'
                ? 'text-white'
                : 'text-[#D1C4E0] hover:text-white'
            }`}
          >
            Interests
            {activeTab === 'interests' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#B5D4C8] to-[#F4A460]"></div>
            )}
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === 'streaks' && <StreaksTab userName={friend.name} />}
        {activeTab === 'interests' && <InterestsTab userName={friend.name} isReadOnly={true} />}
      </div>

      {/* Add to Group Modal */}
      {showGroupModal && (
        <div 
          className="absolute inset-0 bg-black/50 z-50 flex items-end rounded-3xl overflow-hidden"
          onClick={() => setShowGroupModal(false)}
        >
          <div 
            className="bg-white w-full max-h-[70%] rounded-t-3xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-cyan-500 p-6 text-white">
              <h2 className="text-xl font-bold mb-1">Add to Friend Group</h2>
              <p className="text-purple-100 text-sm">Select groups to add {friend.name.split(' ')[0]}</p>
            </div>

            {/* Groups List */}
            <div className="p-4 space-y-2 overflow-y-auto" style={{ maxHeight: 'calc(70vh - 140px)' }}>
              {friendGroups.map((group) => (
                <button
                  key={group.id}
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    selectedGroups.includes(group.id)
                      ? 'border-purple-500 bg-purple-100'
                      : 'border-purple-200 bg-purple-50 hover:bg-purple-100/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{group.emoji}</span>
                      <span className="font-medium text-purple-900">{group.name}</span>
                    </div>
                    {selectedGroups.includes(group.id) && (
                      <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="p-4 border-t border-purple-200 bg-purple-50">
              <button
                onClick={() => {
                  setShowGroupModal(false);
                  setSelectedGroups([]);
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded-lg py-3 font-medium hover:from-purple-700 hover:to-cyan-600 transition-all shadow-md"
              >
                Add to {selectedGroups.length} Group{selectedGroups.length !== 1 ? 's' : ''}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}