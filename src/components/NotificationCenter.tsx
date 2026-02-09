import { motion, AnimatePresence } from 'motion/react';
import { X, Check, XIcon, Edit2, Calendar, MapPin, Users, ChevronRight, Search, UserMinus, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNav } from './BottomNav';

interface NotificationCenterProps {
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
  onAcceptInvite?: (invite: HangoutInvite) => void;
  onUpdateReceivedInvitesCount?: (count: number) => void;
  invites: HangoutInvite[];
  onUpdateInvites: (invites: HangoutInvite[]) => void;
  onOpenReview?: (meetupId: string) => void;
}

interface Friend {
  id: number;
  name: string;
  avatar: string;
  status?: 'accepted' | 'pending' | 'declined';
}

interface HangoutInvite {
  id: string;
  type: 'sent' | 'received' | 'review';
  friends: Friend[];
  location: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
  meetupId?: string;
}

const allFriends = [
  { id: 1, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200' },
  { id: 2, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?w=200' },
  { id: 3, name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?w=200' },
  { id: 4, name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?w=200' },
  { id: 5, name: 'Taylor Kim', avatar: 'https://images.unsplash.com/photo-1552334949-51934e5f2d38?w=200' },
];

const suggestedLocations = [
  'Blue Bottle Coffee',
  'Sightglass Coffee',
  'Tartine Bakery',
  'Philz Coffee',
  'The Mill',
  'Golden Gate Park',
  'Dolores Park'
];

const suggestedTimes = [
  { day: 'Thursday', time: '6pm' },
  { day: 'Friday', time: '5:30pm' },
  { day: 'Friday', time: '7pm' },
  { day: 'Saturday', time: '2pm' },
  { day: 'Sunday', time: '11am' }
];

export function NotificationCenter({ onHomeClick, onStartHangout, onSearchClick, onProfileClick, onAcceptInvite, onUpdateReceivedInvitesCount, invites, onUpdateInvites, onOpenReview }: NotificationCenterProps) {
  const [activeTab, setActiveTab] = useState<'sent' | 'received'>('sent');
  const [selectedInvite, setSelectedInvite] = useState<HangoutInvite | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedInvite, setEditedInvite] = useState<HangoutInvite | null>(null);
  
  // Modals
  const [showConfirmation, setShowConfirmation] = useState<'accept' | 'decline' | 'edits-sent' | null>(null);
  const [confirmationName, setConfirmationName] = useState('');
  const [showFriendSearch, setShowFriendSearch] = useState(false);
  const [showLocationSearch, setShowLocationSearch] = useState(false);
  const [showTimeSelector, setShowTimeSelector] = useState(false);
  
  // Search
  const [friendSearchQuery, setFriendSearchQuery] = useState('');
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  const sentInvites = invites.filter(i => i.type === 'sent');
  const receivedInvites = invites.filter(i => i.type === 'received' || i.type === 'review');
  const displayInvites = activeTab === 'sent' ? sentInvites : receivedInvites;

  // Update parent component whenever received invites count changes
  useEffect(() => {
    if (onUpdateReceivedInvitesCount) {
      onUpdateReceivedInvitesCount(receivedInvites.length);
    }
  }, [receivedInvites.length, onUpdateReceivedInvitesCount]);

  const generateUpdatedMessage = (invite: HangoutInvite) => {
    const location = invite.location;
    const time = `${invite.date} at ${invite.time}`;
    
    // Generate a dynamic message based on the updated details
    if (invite.type === 'received') {
      return `How about ${location} on ${time} instead?`;
    } else {
      return `Updated: Let's meet at ${location} on ${time}!`;
    }
  };

  const handleEditInvite = (invite: HangoutInvite) => {
    setEditedInvite({ ...invite });
    setIsEditing(true);
  };

  const handleSaveEdit = () => {
    if (!editedInvite || !selectedInvite) return;

    if (selectedInvite.type === 'received') {
      // Sending counter proposal
      setConfirmationName(selectedInvite.friends[0].name);
      setShowConfirmation('edits-sent');
      
      // Update the message with new details
      const updatedMessage = generateUpdatedMessage(editedInvite);
      const updatedInvite = { ...editedInvite, message: updatedMessage };
      
      // Update the invite in the list
      onUpdateInvites(invites.map(inv => 
        inv.id === selectedInvite.id ? updatedInvite : inv
      ));
      
      setTimeout(() => {
        setShowConfirmation(null);
        setIsEditing(false);
        setSelectedInvite(null);
        setEditedInvite(null);
      }, 3000);
    } else {
      // Saving sent invite edits
      const updatedMessage = generateUpdatedMessage(editedInvite);
      const updatedInvite = { ...editedInvite, message: updatedMessage };
      
      // Update the invite in the list
      onUpdateInvites(invites.map(inv => 
        inv.id === selectedInvite.id ? updatedInvite : inv
      ));
      
      setIsEditing(false);
      setSelectedInvite(null);
      setEditedInvite(null);
    }
  };

  const handleAccept = (invite: HangoutInvite) => {
    setShowConfirmation('accept');
    setConfirmationName(invite.friends[0].name);
    
    setTimeout(() => {
      if (onAcceptInvite) {
        onAcceptInvite(invite);
      }
      // Remove invite from list
      onUpdateInvites(invites.filter(i => i.id !== invite.id));
      setShowConfirmation(null);
      setSelectedInvite(null);
    }, 3000);
  };

  const handleDecline = (invite: HangoutInvite) => {
    setShowConfirmation('decline');
    setConfirmationName(invite.friends[0].name);
    
    setTimeout(() => {
      // Remove invite from list
      onUpdateInvites(invites.filter(i => i.id !== invite.id));
      setShowConfirmation(null);
      setSelectedInvite(null);
    }, 3000);
  };

  const handleRemoveFriend = (friendId: number) => {
    if (editedInvite) {
      setEditedInvite({
        ...editedInvite,
        friends: editedInvite.friends.filter(f => f.id !== friendId)
      });
    }
  };

  const handleAddFriend = (friend: Friend) => {
    if (editedInvite) {
      const alreadyAdded = editedInvite.friends.some(f => f.id === friend.id);
      if (!alreadyAdded) {
        setEditedInvite({
          ...editedInvite,
          friends: [...editedInvite.friends, { ...friend, status: 'pending' }]
        });
      }
    }
    setShowFriendSearch(false);
    setFriendSearchQuery('');
  };

  const handleSelectLocation = (location: string) => {
    if (editedInvite) {
      setEditedInvite({
        ...editedInvite,
        location
      });
    }
    setShowLocationSearch(false);
    setLocationSearchQuery('');
  };

  const handleSelectTime = (time: { day: string; time: string }) => {
    if (editedInvite) {
      setEditedInvite({
        ...editedInvite,
        date: time.day,
        time: time.time
      });
    }
    setShowTimeSelector(false);
  };

  const filteredFriends = allFriends.filter(f => 
    f.name.toLowerCase().includes(friendSearchQuery.toLowerCase()) &&
    !editedInvite?.friends.some(ef => ef.id === f.id)
  );

  const filteredLocations = suggestedLocations.filter(loc =>
    loc.toLowerCase().includes(locationSearchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-white font-semibold text-2xl">Inbox</h1>
            <button
              onClick={onHomeClick}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('sent')}
              className={`flex-1 text-center pb-2 text-sm font-medium transition-colors ${
                activeTab === 'sent'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 border-b-2 border-transparent'
              }`}
            >
              Sent ({sentInvites.length})
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`flex-1 text-center pb-2 text-sm font-medium transition-colors ${
                activeTab === 'received'
                  ? 'text-white border-b-2 border-[#F59E0B]'
                  : 'text-white/50 border-b-2 border-transparent'
              }`}
            >
              Received ({receivedInvites.length})
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-3">
            {displayInvites.map((invite) => (
              <motion.button
                key={invite.id}
                onClick={() => {
                  if (invite.type === 'review' && invite.meetupId && onOpenReview) {
                    onOpenReview(invite.meetupId);
                  } else {
                    setSelectedInvite(invite);
                  }
                }}
                className="w-full bg-white/10 rounded-2xl p-4 text-left hover:bg-white/15 transition-all border border-white/20"
                whileHover={{ scale: 1.02 }}
              >
                <div className="flex items-start gap-3">
                  {/* Friend avatars */}
                  <div className="flex -space-x-2 flex-shrink-0">
                    {invite.friends.slice(0, 2).map((friend, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#5A3D5C]">
                        <ImageWithFallback
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                    {invite.friends.length > 2 && (
                      <div className="w-12 h-12 rounded-full bg-white/20 border-2 border-[#5A3D5C] flex items-center justify-center">
                        <span className="text-white text-xs font-semibold">+{invite.friends.length - 2}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <div>
                        <p className="text-white font-medium text-sm">
                          {invite.type === 'review' 
                            ? 'How did it go?' 
                            : invite.type === 'sent' 
                            ? 'Sent to ' 
                            : 'From '}
                          {invite.type !== 'review' && (invite.friends.length === 1 
                            ? invite.friends[0].name.split(' ')[0]
                            : `${invite.friends.length} friends`)}
                        </p>
                        <p className="text-white/50 text-xs">{invite.createdAt}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-white/40 flex-shrink-0" />
                    </div>

                    <div className="flex items-center gap-2 text-xs text-white/70 mb-2">
                      <Calendar className="w-3 h-3" />
                      <span>{invite.date} at {invite.time}</span>
                      <span>•</span>
                      <span className="truncate">{invite.location}</span>
                    </div>

                    {/* Status indicators for sent invites */}
                    {invite.type === 'sent' && (
                      <div className="flex gap-2 flex-wrap">
                        {invite.friends.map((friend, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              friend.status === 'accepted'
                                ? 'bg-[#D4F4E7]/30 text-[#D4F4E7]'
                                : friend.status === 'declined'
                                ? 'bg-red-500/20 text-red-300'
                                : 'bg-white/10 text-white/60'
                            }`}
                          >
                            {friend.name.split(' ')[0]}: {friend.status || 'pending'}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Detail Modal */}
        <AnimatePresence>
          {selectedInvite && !showConfirmation && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedInvite(null);
                setIsEditing(false);
                setEditedInvite(null);
              }}
            >
              <motion.div
                className="w-full max-w-[340px] bg-[#5A3D5C] rounded-3xl overflow-hidden shadow-2xl max-h-[600px] overflow-y-auto"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-1">
                        {selectedInvite.type === 'sent' ? 'Sent Invite' : 'Received Invite'}
                      </h3>
                      <p className="text-white/60 text-sm">{selectedInvite.createdAt}</p>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedInvite(null);
                        setIsEditing(false);
                        setEditedInvite(null);
                      }}
                      className="p-1 hover:bg-white/10 rounded-full transition-colors"
                    >
                      <X className="w-5 h-5 text-white/60" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  {/* Friends - only editable for sent invites */}
                  {selectedInvite.type === 'sent' && (
                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2 text-[#D4F4E7] text-sm">
                          <Users className="w-4 h-4" />
                          <span className="font-medium">Who</span>
                        </div>
                        {isEditing && (
                          <button
                            onClick={() => setShowFriendSearch(true)}
                            className="text-[#F59E0B] hover:text-[#E89450] text-sm font-medium flex items-center gap-1"
                          >
                            <Plus className="w-4 h-4" />
                            Add
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {(isEditing ? editedInvite?.friends : selectedInvite.friends)?.map((friend) => (
                          <div key={friend.id} className="flex items-center justify-between bg-white/5 rounded-lg p-2">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full overflow-hidden">
                                <ImageWithFallback
                                  src={friend.avatar}
                                  alt={friend.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <span className="text-white text-sm">{friend.name}</span>
                            </div>
                            {isEditing ? (
                              <button
                                onClick={() => handleRemoveFriend(friend.id)}
                                className="text-red-400 hover:text-red-300"
                              >
                                <UserMinus className="w-4 h-4" />
                              </button>
                            ) : (
                              <span
                                className={`text-xs px-2 py-1 rounded-full ${
                                  friend.status === 'accepted'
                                    ? 'bg-[#D4F4E7]/30 text-[#D4F4E7]'
                                    : friend.status === 'declined'
                                    ? 'bg-red-500/20 text-red-300'
                                    : 'bg-white/10 text-white/60'
                                }`}
                              >
                                {friend.status || 'pending'}
                              </span>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Friends display only for received invites */}
                  {selectedInvite.type === 'received' && !isEditing && (
                    <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                      <div className="flex items-center gap-2 text-[#D4F4E7] mb-2 text-sm">
                        <Users className="w-4 h-4" />
                        <span className="font-medium">From</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={selectedInvite.friends[0].avatar}
                            alt={selectedInvite.friends[0].name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white text-sm">{selectedInvite.friends[0].name}</span>
                      </div>
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-[#D4F4E7] text-sm">
                        <Calendar className="w-4 h-4" />
                        <span className="font-medium">When</span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => setShowTimeSelector(true)}
                          className="text-[#F59E0B] hover:text-[#E89450] text-sm font-medium"
                        >
                          Change
                        </button>
                      )}
                    </div>
                    <p className="text-white text-sm">
                      {isEditing ? `${editedInvite?.date} at ${editedInvite?.time}` : `${selectedInvite.date} at ${selectedInvite.time}`}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2 text-[#D4F4E7] text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">Where</span>
                      </div>
                      {isEditing && (
                        <button
                          onClick={() => setShowLocationSearch(true)}
                          className="text-[#F59E0B] hover:text-[#E89450] text-sm font-medium"
                        >
                          Change
                        </button>
                      )}
                    </div>
                    <p className="text-white text-sm">
                      {isEditing ? editedInvite?.location : selectedInvite.location}
                    </p>
                  </div>

                  {/* Message */}
                  <div className="bg-white/10 rounded-xl p-3 border border-white/20">
                    <p className="text-white/90 text-sm leading-relaxed">{selectedInvite.message}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-6 pt-2 space-y-2">
                  {selectedInvite.type === 'sent' ? (
                    <>
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors"
                          >
                            Save Changes
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditedInvite(null);
                            }}
                            className="w-full bg-white/10 text-white rounded-xl py-3 font-semibold hover:bg-white/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => handleEditInvite(selectedInvite)}
                          className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2"
                        >
                          <Edit2 className="w-4 h-4" />
                          Edit Details
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSaveEdit}
                            className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors"
                          >
                            Send Counter Proposal
                          </button>
                          <button
                            onClick={() => {
                              setIsEditing(false);
                              setEditedInvite(null);
                            }}
                            className="w-full bg-white/10 text-white rounded-xl py-3 font-semibold hover:bg-white/20 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={() => handleAccept(selectedInvite)}
                            className="w-full bg-[#D4F4E7] text-[#5A3D5C] rounded-xl py-3 font-semibold hover:bg-[#B8E8D5] transition-colors flex items-center justify-center gap-2"
                          >
                            <Check className="w-5 h-5" />
                            Accept
                          </button>
                          <button
                            onClick={() => handleEditInvite(selectedInvite)}
                            className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2"
                          >
                            <Edit2 className="w-4 h-4" />
                            Suggest Changes
                          </button>
                          <button
                            onClick={() => handleDecline(selectedInvite)}
                            className="w-full bg-white/10 text-white/80 rounded-xl py-3 font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
                          >
                            <XIcon className="w-4 h-4" />
                            Decline
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Friend Search Modal */}
        <AnimatePresence>
          {showFriendSearch && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFriendSearch(false)}
            >
              <motion.div
                className="w-full max-w-[340px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[500px] flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Add Friend</h3>
                  <button
                    onClick={() => setShowFriendSearch(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A3D5C]/60" />
                  <input
                    type="text"
                    value={friendSearchQuery}
                    onChange={(e) => setFriendSearchQuery(e.target.value)}
                    placeholder="Search friends..."
                    className="w-full bg-[#D4F4E7]/95 rounded-xl pl-10 pr-4 py-3 text-[#5A3D5C] placeholder:text-[#5A3D5C]/50 outline-none"
                  />
                </div>

                <div className="flex-1 overflow-y-auto space-y-2">
                  {filteredFriends.map((friend) => (
                    <button
                      key={friend.id}
                      onClick={() => handleAddFriend(friend)}
                      className="w-full bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <ImageWithFallback
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-white font-medium">{friend.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Location Search Modal */}
        <AnimatePresence>
          {showLocationSearch && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowLocationSearch(false)}
            >
              <motion.div
                className="w-full max-w-[340px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[500px] flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Select Location</h3>
                  <button
                    onClick={() => setShowLocationSearch(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#5A3D5C]/60" />
                  <input
                    type="text"
                    value={locationSearchQuery}
                    onChange={(e) => setLocationSearchQuery(e.target.value)}
                    placeholder="Search locations..."
                    className="w-full bg-[#D4F4E7]/95 rounded-xl pl-10 pr-4 py-3 text-[#5A3D5C] placeholder:text-[#5A3D5C]/50 outline-none"
                  />
                </div>

                <p className="text-white/60 text-sm mb-3">Suggested for you</p>

                <div className="flex-1 overflow-y-auto space-y-2">
                  {filteredLocations.map((location, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectLocation(location)}
                      className="w-full bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#D4F4E7]/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-[#D4F4E7]" />
                      </div>
                      <span className="text-white font-medium">{location}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Time Selector Modal */}
        <AnimatePresence>
          {showTimeSelector && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTimeSelector(false)}
            >
              <motion.div
                className="w-full max-w-[340px] bg-[#5A3D5C] rounded-3xl p-6 max-h-[500px] flex flex-col"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-lg">Select Time</h3>
                  <button
                    onClick={() => setShowTimeSelector(false)}
                    className="text-white/60 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-white/60 text-sm mb-3">When you're both free</p>

                <div className="flex-1 overflow-y-auto space-y-2">
                  {suggestedTimes.map((time, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectTime(time)}
                      className="w-full bg-white/10 rounded-xl p-3 flex items-center gap-3 hover:bg-white/20 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#D4F4E7]/20 flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#D4F4E7]" />
                      </div>
                      <div className="text-left">
                        <p className="text-white font-medium">{time.day}</p>
                        <p className="text-white/60 text-sm">{time.time}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Confirmation Popups */}
        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              className="absolute inset-0 bg-black/50 flex items-center justify-center p-4 z-[70]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setShowConfirmation(null);
                setSelectedInvite(null);
              }}
            >
              <motion.div
                className="w-full max-w-[300px] bg-white rounded-3xl overflow-hidden shadow-2xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex justify-center pt-12 pb-6">
                  <motion.div
                    className={`w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${
                      showConfirmation === 'accept'
                        ? 'bg-gradient-to-br from-[#9DE4CF] to-[#D4F4E7]'
                        : showConfirmation === 'edits-sent'
                        ? 'bg-gradient-to-br from-[#F59E0B] to-[#FFC107]'
                        : 'bg-gradient-to-br from-red-300 to-red-400'
                    }`}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 20,
                      delay: 0.1,
                    }}
                  >
                    {showConfirmation === 'accept' ? (
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
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <path d="M5 13l4 4L19 7"></path>
                      </motion.svg>
                    ) : showConfirmation === 'edits-sent' ? (
                      <motion.svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </motion.svg>
                    ) : (
                      <motion.svg
                        className="w-12 h-12 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                      >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                      </motion.svg>
                    )}
                  </motion.div>
                </div>

                <div className="px-8 pb-8 text-center">
                  <motion.h2
                    className="text-2xl font-semibold text-gray-900 mb-2"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    {showConfirmation === 'accept' 
                      ? 'Invite Accepted!' 
                      : showConfirmation === 'edits-sent'
                      ? 'Edits Sent!'
                      : 'Invite Declined'}
                  </motion.h2>
                  <motion.p
                    className="text-gray-500 text-sm"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    {showConfirmation === 'accept' 
                      ? 'This event has been added to your upcoming events' 
                      : showConfirmation === 'edits-sent'
                      ? `Edits sent to ${confirmationName}`
                      : 'The organizer has been notified'}
                  </motion.p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation */}
        <BottomNav
          onHomeClick={onHomeClick}
          onStartHangout={onStartHangout}
          onSearchClick={onSearchClick}
          onProfileClick={onProfileClick}
          activeTab="inbox"
          notificationCount={receivedInvites.length}
        />
      </motion.div>
    </div>
  );
}