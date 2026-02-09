import { Calendar, Users, MapPin, X, Clock, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import type { UpcomingEvent } from '../App';
import type { MeetupReview } from './MeetupReview';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Meetup {
  id: string;
  name: string;
  date: string;
  time: string;
  participants: number;
  friends: Array<{ name: string; avatar: string }>;
  status: 'past' | 'upcoming';
  location: string;
  description?: string;
}

interface MeetupsTabProps {
  upcomingEvents?: UpcomingEvent[];
  meetupReviews?: Record<string, MeetupReview>;
}

const mockPastMeetups: Meetup[] = [
  {
    id: '3',
    name: 'Game Night',
    date: 'Jan 15, 2026',
    time: '7:00 PM',
    participants: 5,
    friends: [
      { name: 'Sam', avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzY4Nzc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Riley', avatar: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Pat', avatar: 'https://images.unsplash.com/photo-1719997794654-a1e744ac83a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBvdXRkb29yfGVufDF8fHx8MTc2ODc3NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbnxlbnwxfHx8fDE3Njg3NzYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    status: 'past',
    location: "Jordan's Apartment",
    description: 'Epic board game marathon with Catan and Ticket to Ride',
  },
  {
    id: '4',
    name: 'Lunch at Bistro',
    date: 'Jan 10, 2026',
    time: '12:30 PM',
    participants: 3,
    friends: [
      { name: 'Casey', avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBoZWFkc2hvdHxlbnwxfHx8fDE3Njg3NzYxOTd8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Morgan', avatar: 'https://images.unsplash.com/photo-1768406091147-a13e758393e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFkdWx0JTIwcG9ydHJhaXR8ZW58MXx8fHwxNzY4Nzc2MTk4fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbnxlbnwxfHx8fDE3Njg3NzYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    status: 'past',
    location: 'The Garden Bistro',
    description: 'Casual lunch and work chat',
  },
  {
    id: '5',
    name: 'Movie Night',
    date: 'Jan 5, 2026',
    time: '8:00 PM',
    participants: 7,
    friends: [
      { name: 'Taylor', avatar: 'https://images.unsplash.com/photo-1545479620-9fa10b267ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYXN1YWwlMjBwb3J0cmFpdHxlbnwxfHx8fDE3Njg3MTA4MjB8MA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Sam', avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzY4Nzc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Riley', avatar: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1597117752855-72fe20be3b39?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRseSUyMGZhY2V8ZW58MXx8fHwxNzY4Nzc2MTk5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Pat', avatar: 'https://images.unsplash.com/photo-1719997794654-a1e744ac83a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBvdXRkb29yfGVufDF8fHx8MTc2ODc3NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080' },
      { name: 'Avery', avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbnxlbnwxfHx8fDE3Njg3NzYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
    ],
    status: 'past',
    location: 'Century Cinema 16',
    description: 'Watched the new sci-fi blockbuster with popcorn!',
  },
];

// Default reviews for past meetups that haven't been reviewed yet
const defaultReviews: Record<string, MeetupReview> = {
  '4': {
    meetupId: '4',
    comment: 'Great food and even better conversation! The garden patio was perfect.',
    emoji: '😊',
    photos: ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400']
  },
  '5': {
    meetupId: '5',
    comment: 'Epic movie! The popcorn was endless and we had the best seats in the house 🍿',
    emoji: '🎉',
    photos: ['https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400']
  }
};

export function MeetupsTab({ upcomingEvents, meetupReviews = {} }: MeetupsTabProps) {
  const [selectedMeetup, setSelectedMeetup] = useState<Meetup | UpcomingEvent | null>(null);

  // Convert UpcomingEvent to Meetup format for display
  const upcomingMeetups = upcomingEvents?.map(event => {
    // Properly extract friends data
    const friends = event.friends && event.friends.length > 0
      ? event.friends
      : [{ name: event.friendName, avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200' }];
    
    return {
      id: event.id,
      name: event.name,
      date: event.date,
      time: event.time,
      participants: friends.length,
      friends: friends,
      status: 'upcoming' as const,
      location: event.location || '',
    };
  }) || [];

  return (
    <>
      <div>
        {/* Upcoming Section */}
        {upcomingMeetups.length > 0 && (
          <div>
            <div className="bg-[#D4F4E7]/30 px-4 py-2 border-b border-[#D4F4E7]/50">
              <h3 className="text-xs font-semibold text-white flex items-center gap-2">
                <Clock className="w-3 h-3" />
                Upcoming
              </h3>
            </div>
            <div className="divide-y divide-white/10">
              {upcomingMeetups.map((meetup) => (
                <button
                  key={meetup.id}
                  onClick={() => setSelectedMeetup(meetup)}
                  className="w-full bg-white/10 p-4 hover:bg-white/15 transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm text-white">{meetup.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/70 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{meetup.date}</span>
                    </div>
                    <span className="text-white/40">•</span>
                    <span>{meetup.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-white/70">
                      <Users className="w-3 h-3" />
                      <span>{meetup.participants}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {meetup.friends.slice(0, 3).map((friend, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] overflow-hidden bg-gray-200"
                        >
                          <img 
                            src={friend.avatar} 
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {meetup.friends.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] bg-[#F59E0B] flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            +{meetup.friends.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Past Section */}
        {mockPastMeetups.length > 0 && (
          <div>
            <div className="bg-white/5 px-4 py-2 border-b border-white/10">
              <h3 className="text-xs font-semibold text-white/70">Past Meetups</h3>
            </div>
            <div className="divide-y divide-white/5">
              {mockPastMeetups.map((meetup) => (
                <button
                  key={meetup.id}
                  onClick={() => setSelectedMeetup(meetup)}
                  className="w-full bg-white/5 p-4 hover:bg-white/10 transition-colors text-left"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-sm text-white/70">{meetup.name}</h3>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-white/50 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>{meetup.date}</span>
                    </div>
                    <span className="text-white/30">•</span>
                    <span>{meetup.time}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 text-xs text-white/50">
                      <Users className="w-3 h-3" />
                      <span>{meetup.participants}</span>
                    </div>
                    <div className="flex -space-x-2">
                      {meetup.friends.slice(0, 3).map((friend, idx) => (
                        <div
                          key={idx}
                          className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] overflow-hidden bg-gray-200 opacity-70"
                        >
                          <img 
                            src={friend.avatar} 
                            alt={friend.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                      {meetup.friends.length > 3 && (
                        <div className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] bg-[#F59E0B]/70 flex items-center justify-center">
                          <span className="text-xs font-medium text-white">
                            +{meetup.friends.length - 3}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMeetup && (
        <div className="absolute inset-0 bg-black/50 z-50 flex items-end rounded-3xl overflow-hidden">
          <div className="bg-[#5A3D5C] w-full max-h-[80%] rounded-t-3xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5A3D5C] to-[#7A5D7C] p-6 text-white relative border-b border-white/10 flex-shrink-0">
              <button
                onClick={() => setSelectedMeetup(null)}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-2xl font-bold mb-2">{selectedMeetup.name}</h2>
              <div className="flex items-center gap-2 text-white/80">
                {selectedMeetup.status === 'upcoming' ? (
                  <span className="text-sm bg-[#D4F4E7]/20 text-[#D4F4E7] px-3 py-1 rounded-full">Upcoming</span>
                ) : (
                  <span className="text-sm bg-white/10 text-white/70 px-3 py-1 rounded-full">Completed</span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              {selectedMeetup.status === 'past' ? (
                <>
                  {/* People - First for past events */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Who Attended</span>
                      <span className="text-sm">({selectedMeetup.participants})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-7">
                      {selectedMeetup.friends.map((friend, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <img 
                              src={friend.avatar} 
                              alt={friend.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-white">{friend.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review section - always show for past events */}
                  {(meetupReviews[selectedMeetup.id] || defaultReviews[selectedMeetup.id]) ? (
                    <div className="bg-gradient-to-br from-[#D4F4E7]/20 to-[#F59E0B]/10 rounded-2xl p-5 mb-4 border border-[#D4F4E7]/30">
                      <div className="flex items-start gap-3 mb-3">
                        <div className="text-5xl leading-none">
                          {meetupReviews[selectedMeetup.id]?.emoji || defaultReviews[selectedMeetup.id]?.emoji}
                        </div>
                        <div className="flex-1">
                          <div className="text-[#D4F4E7] font-semibold text-sm mb-2">Your Review</div>
                          <p className="text-white leading-relaxed">
                            {meetupReviews[selectedMeetup.id]?.comment || defaultReviews[selectedMeetup.id]?.comment}
                          </p>
                        </div>
                      </div>
                      
                      {/* Photos */}
                      {(meetupReviews[selectedMeetup.id]?.photos || defaultReviews[selectedMeetup.id]?.photos) && (
                        <div className="flex gap-2 overflow-x-auto">
                          {(meetupReviews[selectedMeetup.id]?.photos || defaultReviews[selectedMeetup.id]?.photos)?.map((photo, idx) => (
                            <div key={idx} className="flex-shrink-0">
                              <ImageWithFallback 
                                src={photo} 
                                alt="Meetup Photo" 
                                className="w-24 h-24 rounded-xl object-cover border-2 border-white/20" 
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-white/10 rounded-2xl p-5 mb-4 border border-white/20">
                      <div className="text-[#D4F4E7] font-semibold text-sm mb-2">Your Review</div>
                      <p className="text-white/60 italic">No review yet</p>
                    </div>
                  )}

                  {/* Date & Time */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">When</span>
                    </div>
                    <p className="text-white ml-7">{selectedMeetup.date} at {selectedMeetup.time}</p>
                  </div>

                  {/* Location */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">Where</span>
                    </div>
                    <p className="text-white ml-7">{selectedMeetup.location}</p>
                  </div>

                  {/* Description */}
                  {selectedMeetup.description && (
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                        <span className="font-semibold">Details</span>
                      </div>
                      <p className="text-white/90">{selectedMeetup.description}</p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  {/* For upcoming events, keep the original order */}
                  {/* Date & Time */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                      <Calendar className="w-5 h-5" />
                      <span className="font-semibold">When</span>
                    </div>
                    <p className="text-white ml-7">{selectedMeetup.date} at {selectedMeetup.time}</p>
                  </div>

                  {/* Location */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                      <MapPin className="w-5 h-5" />
                      <span className="font-semibold">Where</span>
                    </div>
                    <p className="text-white ml-7">{selectedMeetup.location}</p>
                  </div>

                  {/* People */}
                  <div className="bg-white/10 rounded-lg p-4 mb-4 border border-white/20">
                    <div className="flex items-center gap-2 text-[#D4F4E7] mb-3">
                      <Users className="w-5 h-5" />
                      <span className="font-semibold">Who's Coming</span>
                      <span className="text-sm">({selectedMeetup.participants})</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 ml-7">
                      {selectedMeetup.friends.map((friend, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-200">
                            <img 
                              src={friend.avatar} 
                              alt={friend.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <span className="text-sm text-white">{friend.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Description */}
                  {selectedMeetup.description && (
                    <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                      <div className="flex items-center gap-2 text-[#D4F4E7] mb-2">
                        <span className="font-semibold">Details</span>
                      </div>
                      <p className="text-white/90">{selectedMeetup.description}</p>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}