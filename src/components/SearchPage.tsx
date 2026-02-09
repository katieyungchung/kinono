import { motion } from 'motion/react';
import { Search, X, User, Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNav } from './BottomNav';
import { getConnectionType } from '../utils/connectionTypes';

interface SearchPageProps {
  onBack: () => void;
  onHomeClick: () => void;
  onStartHangout: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  notificationCount?: number;
}

interface SearchUser {
  id: number;
  name: string;
  username: string;
  imageUrl: string;
  mutualFriends: number;
}

interface SearchEvent {
  id: number;
  title: string;
  venue: string;
  date: string;
  imageUrl: string;
  appName: string;
}

const sampleUsers: SearchUser[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    username: '@alexrivera',
    imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDUwNjg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mutualFriends: 12
  },
  {
    id: 2,
    name: 'Sarah Chen',
    username: '@sarahchen',
    imageUrl: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzA0MjE3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mutualFriends: 8
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    username: '@marcusj',
    imageUrl: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBoYXBweXxlbnwxfHx8fDE3NzA1MDY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mutualFriends: 5
  },
  {
    id: 4,
    name: 'Jamie Lee',
    username: '@jamielee',
    imageUrl: 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDQxMDYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mutualFriends: 15
  },
  {
    id: 5,
    name: 'Taylor Kim',
    username: '@taylork',
    imageUrl: 'https://images.unsplash.com/photo-1552334949-51934e5f2d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzA1MDc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    mutualFriends: 20
  }
];

const sampleEvents: SearchEvent[] = [
  {
    id: 1,
    title: 'Warriors vs Lakers',
    venue: 'Chase Center',
    date: 'Fri, Feb 14',
    imageUrl: 'https://images.unsplash.com/photo-1741940513798-4ce04b95ffda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBwdXJwbGUlMjBsaWdodHN8ZW58MXx8fHwxNzcwNTEyMTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appName: 'GameTime'
  },
  {
    id: 2,
    title: 'Indie Rock Night',
    venue: 'The Fillmore',
    date: 'Sat, Feb 15',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBwdXJwbGUlMjBuZW9ufGVufDF8fHx8MTc3MDUxMjE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appName: 'Partiful'
  },
  {
    id: 3,
    title: 'Comedy Night',
    venue: 'Punch Line SF',
    date: 'Sun, Feb 16',
    imageUrl: 'https://images.unsplash.com/photo-1636581563749-6190766872e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBzaG93JTIwcHVycGxlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcwNTEyMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appName: 'Foursquare'
  },
  {
    id: 4,
    title: 'Food & Wine Festival',
    venue: 'Fort Mason',
    date: 'Next Weekend',
    imageUrl: 'https://images.unsplash.com/photo-1762487969268-30f2acb5b704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBldmVuaW5nJTIwbGlnaHRzfGVufDF8fHx8MTc3MDUxMjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appName: 'Meetup'
  }
];

export function SearchPage({ onBack, onHomeClick, onStartHangout, onProfileClick, onInboxClick, notificationCount }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'users' | 'events'>('users');
  const [sentRequests, setSentRequests] = useState<Set<number>>(new Set());

  const handleAddUser = (userId: number) => {
    setSentRequests(prev => new Set(prev).add(userId));
  };

  const filteredUsers = sampleUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEvents = sampleEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.venue.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo and back button */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-white/70 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex-1 flex justify-center">
              <KinonoLogo />
            </div>
            <div className="w-6"></div> {/* Spacer for centering */}
          </div>

          {/* Search bar */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A3D5C]/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for users or events..."
              className="w-full bg-[#D4F4E7]/95 rounded-2xl pl-12 pr-4 py-3.5 text-[#5A3D5C] placeholder:text-[#5A3D5C]/50 outline-none focus:bg-[#D4F4E7] transition-colors"
              autoFocus
            />
          </motion.div>

          {/* Tabs */}
          <motion.div
            className="flex gap-2 mt-4"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
                activeTab === 'users'
                  ? 'bg-[#D4F4E7] text-[#5A3D5C]'
                  : 'bg-white/10 text-white/60 hover:text-white/80'
              }`}
            >
              Users
            </button>
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 py-2.5 rounded-xl font-semibold transition-all ${
                activeTab === 'events'
                  ? 'bg-[#D4F4E7] text-[#5A3D5C]'
                  : 'bg-white/10 text-white/60 hover:text-white/80'
              }`}
            >
              Events
            </button>
          </motion.div>
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-6 pb-4">
          {activeTab === 'users' ? (
            <div className="space-y-3">
              {searchQuery === '' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Search className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/50 text-sm">
                    Search for users to connect with
                  </p>
                </motion.div>
              ) : filteredUsers.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white/50 text-sm">
                    No users found
                  </p>
                </motion.div>
              ) : (
                filteredUsers.map((user, index) => {
                  const connectionInfo = getConnectionType(user.id);
                  return (
                  <motion.button
                    key={user.id}
                    className="w-full bg-[#D4F4E7]/95 rounded-2xl p-4 text-left hover:bg-[#D4F4E7] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 rounded-full bg-[#5A3D5C] overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={user.imageUrl}
                          alt={user.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-[#5A3D5C] font-semibold text-base truncate">
                          {user.name}
                        </h3>
                        <p className="text-[#5A3D5C]/60 text-sm">
                          {user.username}
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <div className="flex items-center gap-1 text-[#5A3D5C]/50 text-xs">
                            <User className="w-3 h-3" />
                            <span>{user.mutualFriends} mutual</span>
                          </div>
                          <span className="text-[#5A3D5C]/30">•</span>
                          <span className="text-[#5A3D5C]/70 text-xs font-medium">
                            {connectionInfo.type}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAddUser(user.id);
                        }}
                        disabled={sentRequests.has(user.id)}
                        className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          sentRequests.has(user.id)
                            ? 'bg-[#D4F4E7] text-[#5A3D5C] cursor-default'
                            : 'bg-[#F59E0B] text-white hover:bg-[#E89450]'
                        }`}
                      >
                        {sentRequests.has(user.id) ? 'Request sent' : 'Add'}
                      </button>
                    </div>
                  </motion.button>
                  );
                })
              )}
            </div>
          ) : (
            <div className="space-y-3">
              {searchQuery === '' ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <Calendar className="w-12 h-12 text-white/30 mx-auto mb-3" />
                  <p className="text-white/50 text-sm">
                    Search for events to attend
                  </p>
                </motion.div>
              ) : filteredEvents.length === 0 ? (
                <motion.div
                  className="text-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <p className="text-white/50 text-sm">
                    No events found
                  </p>
                </motion.div>
              ) : (
                filteredEvents.map((event, index) => (
                  <motion.button
                    key={event.id}
                    className="w-full rounded-2xl overflow-hidden bg-[#D4F4E7]/95 hover:bg-[#D4F4E7] transition-colors"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.05 }}
                  >
                    <div className="flex gap-3 p-3">
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden flex-shrink-0">
                        <ImageWithFallback
                          src={event.imageUrl}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute top-1.5 left-1.5 bg-white/90 backdrop-blur-sm rounded px-1.5 py-0.5">
                          <span className="text-[9px] font-medium text-gray-700">{event.appName}</span>
                        </div>
                      </div>
                      <div className="flex-1 min-w-0 text-left flex flex-col justify-center">
                        <h3 className="text-[#5A3D5C] font-semibold text-base mb-1 truncate">
                          {event.title}
                        </h3>
                        <p className="text-[#5A3D5C]/60 text-sm mb-1 truncate">
                          {event.venue}
                        </p>
                        <div className="flex items-center gap-1 text-[#5A3D5C]/50 text-xs">
                          <Calendar className="w-3 h-3" />
                          <span>{event.date}</span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                ))
              )}
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <BottomNav onHomeClick={onHomeClick} onStartHangout={onStartHangout} onProfileClick={onProfileClick} onInboxClick={onInboxClick} activeTab="search" notificationCount={notificationCount} />
      </motion.div>
    </div>
  );
}