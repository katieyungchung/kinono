import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Calendar, MapPin, ArrowLeft, Send, X, Check, Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNav } from './BottomNav';

interface StartHangoutProps {
  onBack: () => void;
  onSendInvite: (inviteData: {
    friends: Array<{ id: number; name: string; avatar: string }>;
    location: string;
    date: string;
    time: string;
    message: string;
  }) => void;
  onHomeClick?: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  notificationCount?: number;
  prefilledData?: {
    type: 'event' | 'food' | null;
    name: string;
    location: string;
    time?: string;
    date?: string;
  } | null;
}

interface Friend {
  id: number;
  name: string;
  lastChatted: string;
  imageUrl: string;
}

interface TimeSlot {
  id: number;
  day: string;
  time: string;
  availableFor: string[];
}

interface Location {
  id: number;
  name: string;
  address: string;
}

const allFriends: Friend[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    lastChatted: 'Last chatted 3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDUwNjg1OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    lastChatted: 'Last chatted yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzA0MjE3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    lastChatted: 'Last chatted 5 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBoYXBweXxlbnwxfHx8fDE3NzA1MDY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 4,
    name: 'Jamie Lee',
    lastChatted: 'Last chatted 1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDQxMDYyMHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  },
  {
    id: 5,
    name: 'Taylor Kim',
    lastChatted: 'Last chatted 2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1552334949-51934e5f2d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzA1MDc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  }
];

const availableLocations: Location[] = [
  { id: 1, name: 'Sightglass Coffee', address: '270 7th St, San Francisco' },
  { id: 2, name: 'Blue Bottle Coffee', address: '66 Mint St, San Francisco' },
  { id: 3, name: 'Philz Coffee', address: '201 Berry St, San Francisco' },
  { id: 4, name: 'Tartine Bakery', address: '600 Guerrero St, San Francisco' },
  { id: 5, name: 'The Mill', address: '736 Divisadero St, San Francisco' }
];

export function StartHangout({ onBack, onSendInvite, onHomeClick, onSearchClick, onProfileClick, onInboxClick, notificationCount, prefilledData }: StartHangoutProps) {
  // Initialize with prefilled data if provided
  const getInitialLocation = () => {
    if (prefilledData?.location) {
      // Try to match existing location or create a new one
      const existing = availableLocations.find(loc => 
        loc.name.toLowerCase().includes(prefilledData.location.toLowerCase()) ||
        prefilledData.location.toLowerCase().includes(loc.name.toLowerCase())
      );
      if (existing) return existing;
      // Create a custom location
      return {
        id: 999,
        name: prefilledData.name,
        address: prefilledData.location
      };
    }
    return availableLocations[0];
  };

  const getInitialTime = () => {
    if (prefilledData?.type === 'event' && prefilledData.time && prefilledData.date) {
      // Use the exact time and date from the event
      return { day: prefilledData.date, time: prefilledData.time };
    } else if (prefilledData?.type === 'food') {
      // For food, suggest a default time
      return { day: 'Friday', time: '7pm' };
    }
    return { day: 'Thursday', time: '6pm' };
  };

  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([allFriends[0]]);
  const [selectedTime, setSelectedTime] = useState(getInitialTime());
  const [selectedLocation, setSelectedLocation] = useState(getInitialLocation());
  const [message, setMessage] = useState('');
  const [showInviteSent, setShowInviteSent] = useState(false);
  
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');

  // Generate time slots based on selected friends
  const generateTimeSlots = (): TimeSlot[] => {
    const friendNames = selectedFriends.map(f => f.name);
    return [
      { id: 1, day: 'Thursday', time: '6pm', availableFor: friendNames },
      { id: 2, day: 'Friday', time: '5:30pm', availableFor: friendNames },
      { id: 3, day: 'Friday', time: '7pm', availableFor: friendNames },
      { id: 4, day: 'Saturday', time: '2pm', availableFor: friendNames },
      { id: 5, day: 'Sunday', time: '11am', availableFor: friendNames }
    ];
  };

  const timeSlots = generateTimeSlots();

  // Update message when selections change
  useEffect(() => {
    const friendNames = selectedFriends.length === 1 
      ? selectedFriends[0].name.split(' ')[0]
      : selectedFriends.length === 2
        ? `${selectedFriends[0].name.split(' ')[0]} and ${selectedFriends[1].name.split(' ')[0]}`
        : `${selectedFriends.slice(0, -1).map(f => f.name.split(' ')[0]).join(', ')}, and ${selectedFriends[selectedFriends.length - 1].name.split(' ')[0]}`;
    
    // Generate message based on prefilled data or regular hangout
    if (prefilledData?.type === 'event') {
      setMessage(
        `Hey! I'm going to ${selectedLocation.name} on ${selectedTime.day} at ${selectedTime.time}. Would love for you to join me!`
      );
    } else if (prefilledData?.type === 'food') {
      setMessage(
        `Hey! Want to check out ${selectedLocation.name}? I'm thinking ${selectedTime.day} at ${selectedTime.time}. Let me know if you're free!`
      );
    } else {
      setMessage(
        `Hey! Would love to meet up at ${selectedLocation.name} on ${selectedTime.day} at ${selectedTime.time}. Are you free?`
      );
    }
  }, [selectedFriends, selectedTime, selectedLocation, prefilledData]);

  const handleTryAnother = () => {
    const currentIndex = availableLocations.findIndex(loc => loc.id === selectedLocation.id);
    const nextIndex = (currentIndex + 1) % availableLocations.length;
    setSelectedLocation(availableLocations[nextIndex]);
  };

  const toggleFriend = (friend: Friend) => {
    setSelectedFriends(prev => {
      const isSelected = prev.find(f => f.id === friend.id);
      if (isSelected) {
        // Don't allow deselecting if it's the only one
        if (prev.length === 1) return prev;
        return prev.filter(f => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const filteredLocations = availableLocations.filter(loc =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
    loc.address.toLowerCase().includes(locationSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with back button and logo */}
        <div className="px-6 pt-4 pb-2 flex-shrink-0">
          <div className="flex items-center mb-3">
            <button
              onClick={onBack}
              className="text-white/70 hover:text-white transition-colors mr-auto"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="absolute left-1/2 -translate-x-1/2">
              <KinonoLogo />
            </div>
          </div>
        </div>

        {/* Content area - scrollable if needed */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">
          {/* Header text */}
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Sparkles className="w-4 h-4" />
              <span>We picked a hangout for you</span>
            </div>
          </motion.div>

          {/* WITH section */}
          <motion.button
            onClick={() => setShowFriendPicker(true)}
            className="w-full bg-[#D4F4E7]/95 rounded-2xl p-4 mb-3 text-left hover:bg-[#D4F4E7] transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="text-[#5A3D5C]/60 text-xs font-medium mb-2.5 uppercase tracking-wider">
              With
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {selectedFriends.slice(0, 3).map((friend) => (
                  <div key={friend.id} className="w-14 h-14 rounded-full bg-[#5A3D5C] overflow-hidden flex-shrink-0 border-2 border-[#D4F4E7]">
                    <ImageWithFallback
                      src={friend.imageUrl}
                      alt={friend.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {selectedFriends.length > 3 && (
                  <div className="w-14 h-14 rounded-full bg-[#5A3D5C] flex items-center justify-center border-2 border-[#D4F4E7]">
                    <span className="text-white font-semibold">+{selectedFriends.length - 3}</span>
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-[#5A3D5C] font-semibold text-lg">
                  {selectedFriends.length === 1 
                    ? selectedFriends[0].name
                    : `${selectedFriends.length} friends`}
                </h3>
                <p className="text-[#5A3D5C]/60 text-sm">
                  Tap to change
                </p>
              </div>
            </div>
          </motion.button>

          {/* WHEN section */}
          <motion.button
            onClick={() => prefilledData?.type !== 'event' && setShowTimePicker(true)}
            disabled={prefilledData?.type === 'event'}
            className={`w-full rounded-2xl p-4 mb-3 text-left transition-colors ${
              prefilledData?.type === 'event' 
                ? 'bg-[#D4F4E7]/60 cursor-not-allowed opacity-70' 
                : 'bg-[#D4F4E7]/95 hover:bg-[#D4F4E7]'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-[#5A3D5C]/60 text-xs font-medium mb-2.5 uppercase tracking-wider flex items-center gap-2">
              When
              {prefilledData?.type === 'event' && (
                <span className="text-xs normal-case">(locked)</span>
              )}
            </div>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#5A3D5C]" />
              </div>
              <div>
                <h3 className="text-[#5A3D5C] font-semibold text-base">
                  {selectedTime.day} at {selectedTime.time}
                </h3>
                <p className="text-[#5A3D5C]/60 text-sm">
                  {prefilledData?.type === 'event' ? 'Event time' : prefilledData?.type === 'food' ? 'Tap to change' : "When everyone's free"}
                </p>
              </div>
            </div>
          </motion.button>

          {/* WHERE/WHAT section */}
          <motion.button
            onClick={() => !prefilledData && setShowLocationPicker(true)}
            disabled={!!prefilledData}
            className={`w-full rounded-2xl p-4 mb-3 text-left transition-colors ${
              prefilledData 
                ? 'bg-[#D4F4E7]/60 cursor-not-allowed opacity-70' 
                : 'bg-[#D4F4E7]/95 hover:bg-[#D4F4E7]'
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <div className="text-[#5A3D5C]/60 text-xs font-medium mb-2.5 uppercase tracking-wider flex items-center gap-2">
              Where / What
              {prefilledData && (
                <span className="text-xs normal-case">(locked)</span>
              )}
            </div>
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-5 h-5 text-[#5A3D5C]" />
              </div>
              <div>
                <h3 className="text-[#5A3D5C] font-semibold text-base">
                  {selectedLocation.name}
                </h3>
                <p className="text-[#5A3D5C]/60 text-sm">
                  {selectedLocation.address}
                </p>
              </div>
            </div>
          </motion.button>

          {/* Try another link */}
          <motion.div
            className="text-center mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <button
              onClick={handleTryAnother}
              className="text-white/60 hover:text-white text-sm transition-colors"
            >
              Not feeling this?{' '}
              <span className="underline">Try another idea</span>
            </button>
          </motion.div>

          {/* YOUR MESSAGE section */}
          <motion.div
            className="bg-[#D4F4E7]/95 rounded-2xl p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="text-[#5A3D5C]/60 text-xs font-medium mb-2.5 uppercase tracking-wider">
              Your message
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-transparent text-[#5A3D5C] text-base leading-relaxed resize-none outline-none mb-2"
              rows={3}
              placeholder="Write your message..."
            />
            <p className="text-[#5A3D5C]/50 text-xs">
              You can edit this before sending
            </p>
          </motion.div>
        </div>

        {/* Send button - locked at bottom */}
        <div className="px-6 pb-2 pt-3 flex-shrink-0">
          <motion.button
            onClick={() => setShowInviteSent(true)}
            className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all shadow-lg flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Send className="w-5 h-5" />
            Send invite
          </motion.button>
        </div>

        {/* Bottom Navigation */}
        {onHomeClick && onSearchClick && onProfileClick && (
          <BottomNav 
            onHomeClick={onHomeClick}
            onStartHangout={() => {}}
            onSearchClick={onSearchClick}
            onProfileClick={onProfileClick}
            onInboxClick={onInboxClick}
            activeTab="none"
            notificationCount={notificationCount}
          />
        )}
      </motion.div>

      {/* Friend Picker Modal */}
      <AnimatePresence>
        {showFriendPicker && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowFriendPicker(false)}
          >
            <motion.div
              className="w-full max-w-[375px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[600px] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold text-xl">Select Friends</h2>
                <button
                  onClick={() => setShowFriendPicker(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {allFriends.map((friend) => {
                  const isSelected = selectedFriends.find(f => f.id === friend.id);
                  return (
                    <button
                      key={friend.id}
                      onClick={() => toggleFriend(friend)}
                      className={`w-full rounded-2xl p-4 text-left transition-colors ${
                        isSelected ? 'bg-[#D4F4E7]' : 'bg-[#D4F4E7]/40 hover:bg-[#D4F4E7]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-[#5A3D5C] overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={friend.imageUrl}
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#5A3D5C] font-semibold text-base">
                            {friend.name}
                          </h3>
                          <p className="text-[#5A3D5C]/60 text-sm">
                            {friend.lastChatted}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 text-[#5A3D5C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setShowFriendPicker(false)}
                className="mt-6 w-full bg-[#F59E0B] text-white rounded-2xl py-3 font-semibold hover:bg-[#E89450] transition-colors"
              >
                Done ({selectedFriends.length} selected)
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Time Picker Modal */}
      <AnimatePresence>
        {showTimePicker && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowTimePicker(false)}
          >
            <motion.div
              className="w-full max-w-[375px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[600px] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold text-xl">Select Time</h2>
                <button
                  onClick={() => setShowTimePicker(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <p className="text-white/70 text-sm mb-4">
                When everyone is free:
              </p>

              <div className="flex-1 overflow-y-auto space-y-3">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime.day === slot.day && selectedTime.time === slot.time;
                  return (
                    <button
                      key={slot.id}
                      onClick={() => {
                        setSelectedTime({ day: slot.day, time: slot.time });
                        setShowTimePicker(false);
                      }}
                      className={`w-full rounded-2xl p-4 text-left transition-colors ${
                        isSelected ? 'bg-[#D4F4E7]' : 'bg-[#D4F4E7]/40 hover:bg-[#D4F4E7]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0">
                          <Calendar className="w-5 h-5 text-[#5A3D5C]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#5A3D5C] font-semibold text-base">
                            {slot.day} at {slot.time}
                          </h3>
                          <p className="text-[#5A3D5C]/60 text-sm">
                            Available for all
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 text-[#5A3D5C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Picker Modal */}
      <AnimatePresence>
        {showLocationPicker && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowLocationPicker(false)}
          >
            <motion.div
              className="w-full max-w-[375px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[600px] flex flex-col"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold text-xl">Select Location</h2>
                <button
                  onClick={() => setShowLocationPicker(false)}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Search bar */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A3D5C]/60" />
                <input
                  type="text"
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  placeholder="Search for a place..."
                  className="w-full bg-[#D4F4E7]/95 rounded-xl pl-10 pr-4 py-3 text-[#5A3D5C] placeholder:text-[#5A3D5C]/50 outline-none"
                />
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {filteredLocations.map((location) => {
                  const isSelected = selectedLocation.id === location.id;
                  return (
                    <button
                      key={location.id}
                      onClick={() => {
                        setSelectedLocation(location);
                        setShowLocationPicker(false);
                        setLocationSearch('');
                      }}
                      className={`w-full rounded-2xl p-4 text-left transition-colors ${
                        isSelected ? 'bg-[#D4F4E7]' : 'bg-[#D4F4E7]/40 hover:bg-[#D4F4E7]/60'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/40 flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-5 h-5 text-[#5A3D5C]" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-[#5A3D5C] font-semibold text-base">
                            {location.name}
                          </h3>
                          <p className="text-[#5A3D5C]/60 text-sm">
                            {location.address}
                          </p>
                        </div>
                        {isSelected && (
                          <Check className="w-6 h-6 text-[#5A3D5C]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Invite Sent Confirmation Modal */}
      <AnimatePresence>
        {showInviteSent && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-[340px] bg-white rounded-3xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              {/* Success Icon */}
              <div className="flex justify-center pt-12 pb-6">
                <motion.div
                  className="w-24 h-24 bg-gradient-to-br from-[#9DE4CF] to-[#D4F4E7] rounded-full flex items-center justify-center shadow-lg"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: 'spring',
                    stiffness: 260,
                    damping: 20,
                    delay: 0.2,
                  }}
                >
                  <motion.svg
                    className="w-12 h-12 text-[#5A3D5C]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </motion.svg>
                </motion.div>
              </div>

              {/* Text */}
              <div className="px-8 pb-8 text-center">
                <motion.h2
                  className="text-2xl font-semibold text-gray-900 mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Invite Sent!
                </motion.h2>
                <motion.p
                  className="text-gray-500 text-sm mb-6"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  Your hangout invite has been sent to your friends
                </motion.p>

                {/* Return to Homepage Button */}
                <motion.button
                  onClick={() => onSendInvite({
                    friends: selectedFriends.map(f => ({ id: f.id, name: f.name, avatar: f.imageUrl })),
                    location: selectedLocation.name,
                    date: selectedTime.day,
                    time: selectedTime.time,
                    message: message
                  })}
                  className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  Return to homepage
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}