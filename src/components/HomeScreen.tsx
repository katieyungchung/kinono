import { motion } from 'motion/react';
import { Sparkles, Clock, Home, User, Mail, Search, MapPin, Calendar, Lightbulb, Settings } from 'lucide-react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { BottomNav } from './BottomNav';
import { EventDetailModal } from './EventDetailModal';
import { FoodDetailModal } from './FoodDetailModal';
import { UpcomingEventDetailModal } from './UpcomingEventDetailModal';
import type { UpcomingEvent } from '../App';

export interface TrendingEvent {
  id: number;
  title: string;
  venue: string;
  date: string;
  time: string;
  imageUrl: string;
  appLogo: string;
  appName: string;
}

export interface TrendingFood {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  imageUrl: string;
  appLogo: string;
  appName: string;
}

interface HomeScreenProps {
  onStartHangout: () => void;
  hasSeentFirstInvite?: boolean;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  onSettingsClick?: () => void;
  notificationCount?: number;
  upcomingEvents?: UpcomingEvent[];
  onStartHangoutWithEvent?: (event: TrendingEvent) => void;
  onStartHangoutWithFood?: (food: TrendingFood) => void;
}

const trendingEvents: TrendingEvent[] = [
  {
    id: 1,
    title: 'Warriors vs Lakers',
    venue: 'Chase Center',
    date: 'Fri, Feb 14',
    time: '7:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1741940513798-4ce04b95ffda?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwY291cnQlMjBwdXJwbGUlMjBsaWdodHN8ZW58MXx8fHwxNzcwNTEyMTc5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '🎟️',
    appName: 'GameTime'
  },
  {
    id: 2,
    title: 'Indie Rock Night',
    venue: 'The Fillmore',
    date: 'Sat, Feb 15',
    time: '8:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwc3RhZ2UlMjBwdXJwbGUlMjBuZW9ufGVufDF8fHx8MTc3MDUxMjE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '🎫',
    appName: 'Partiful'
  },
  {
    id: 3,
    title: 'Comedy Night',
    venue: 'Punch Line SF',
    date: 'Sun, Feb 16',
    time: '9:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1636581563749-6190766872e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBzaG93JTIwcHVycGxlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcwNTEyMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '📍',
    appName: 'Foursquare'
  },
  {
    id: 4,
    title: 'Food & Wine Festival',
    venue: 'Fort Mason',
    date: 'Next Weekend',
    time: '12:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1762487969268-30f2acb5b704?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb29kJTIwZmVzdGl2YWwlMjBldmVuaW5nJTIwbGlnaHRzfGVufDF8fHx8MTc3MDUxMjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '📅',
    appName: 'Meetup'
  }
];

const trendingFood: TrendingFood[] = [
  {
    id: 1,
    name: 'Omakase by the Bay',
    cuisine: 'Japanese',
    location: 'Embarcadero',
    imageUrl: 'https://images.unsplash.com/photo-1767627942878-4b566b84fdac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMHJlc3RhdXJhbnQlMjBhbWJpZW50JTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcwNTEyMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '🍽️',
    appName: 'OpenTable'
  },
  {
    id: 2,
    name: 'Trattoria Bella',
    cuisine: 'Italian',
    location: 'North Beach',
    imageUrl: 'https://images.unsplash.com/photo-1659698361660-0af7de6376ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXN0YSUyMGRpc2glMjBkYXJrJTIwYmFja2dyb3VuZHxlbnwxfHx8fDE3NzA1MTIxODF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '⭐',
    appName: 'Yelp'
  },
  {
    id: 3,
    name: 'The French Laundry',
    cuisine: 'Fine Dining',
    location: 'Yountville',
    imageUrl: 'https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwZGFyayUyMGVsZWdhbnR8ZW58MXx8fHwxNzcwNTEyMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '🍽️',
    appName: 'OpenTable'
  },
  {
    id: 4,
    name: 'Brunch Spot',
    cuisine: 'American',
    location: 'Mission',
    imageUrl: 'https://images.unsplash.com/photo-1710795878156-4e18c8d6a330?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxicnVuY2glMjBmb29kJTIwbW9vZHl8ZW58MXx8fHwxNzcwNTEyMTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    appLogo: '⭐',
    appName: 'Yelp'
  }
];

// Default upcoming events if none are provided
const upcomingEventsDefault: UpcomingEvent[] = [
  {
    id: '1',
    name: 'Coffee Break',
    friendName: 'Alice',
    date: 'Today',
    time: '10:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1514933651471-334841a1098d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBicmVha2UlMjBwcm9kdWN0JTIwbGlnaHRzfGVufDF8fHx8MTc3MDUxMjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Blue Bottle Coffee',
    friends: [
      { name: 'Alice Rivera', avatar: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?w=200' }
    ]
  },
  {
    id: '2',
    name: 'Lunch Meeting',
    friendName: 'Bob',
    date: 'Tomorrow',
    time: '12:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1514933651471-334841a1098d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBicmVha2UlMjBwcm9kdWN0JTIwbGlnaHRzfGVufDF8fHx8MTc3MDUxMjE4MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    location: 'Tartine Bakery',
    friends: [
      { name: 'Bob Chen', avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200' },
      { name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?w=200' }
    ]
  }
];

export function HomeScreen({ onStartHangout, hasSeentFirstInvite, onSearchClick, onProfileClick, onInboxClick, onSettingsClick, notificationCount, upcomingEvents, onStartHangoutWithEvent, onStartHangoutWithFood }: HomeScreenProps) {
  // Use the shared upcomingEvents from App
  const eventsToDisplay = upcomingEvents || upcomingEventsDefault;

  // State to manage modal visibility
  const [selectedEvent, setSelectedEvent] = useState<TrendingEvent | null>(null);
  const [selectedFood, setSelectedFood] = useState<TrendingFood | null>(null);
  const [selectedUpcomingEvent, setSelectedUpcomingEvent] = useState<UpcomingEvent | null>(null);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo */}
        <div className="px-6 pt-8 pb-4">
          <div className="flex items-center justify-between">
            <div className="w-8"></div>
            <KinonoLogo />
            <button
              onClick={onSettingsClick}
              className="text-white/80 hover:text-white transition-colors"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-2">
          {/* Tagline */}
          <motion.div
            className="text-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-white/90 text-lg">
              Turn "we should hang out" into real plans
            </p>
          </motion.div>

          {/* Start a hangout button */}
          <motion.button
            onClick={onStartHangout}
            className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all shadow-lg mb-3 flex items-center justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Sparkles className="w-5 h-5" />
            Start a hangout
          </motion.button>

          {/* Help text */}
          <motion.p
            className="text-center text-white/60 text-sm mb-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            We'll help you make it easy.
          </motion.p>

          {/* Info card - only show if user hasn't sent first invite */}
          {!hasSeentFirstInvite && (
            <motion.div
              className="bg-[#D4F4E7]/95 rounded-2xl p-5 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-start gap-3">
                <Lightbulb className="w-5 h-5 text-[#5A3D5C] flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-[#5A3D5C] font-semibold text-sm mb-2">
                    What happens next:
                  </h3>
                  <p className="text-[#5A3D5C]/80 text-sm leading-relaxed">
                    We'll suggest a friend, a flexible time, and a casual place. 
                    Then we'll draft a friendly message you can send right away.
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Upcoming section */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: hasSeentFirstInvite ? 0.5 : 0.6 }}
          >
            <h2 className="text-white font-semibold text-lg mb-3">Upcoming</h2>
            
            {/* Horizontal scrollable tiles */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {eventsToDisplay.map((event, index) => (
                <motion.button
                  key={event.id}
                  className="relative flex-shrink-0 w-48 h-32 rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (hasSeentFirstInvite ? 0.6 : 0.7) + index * 0.1 }}
                  onClick={() => setSelectedUpcomingEvent(event)}
                >
                  {/* Background image */}
                  <ImageWithFallback
                    src={event.imageUrl}
                    alt={event.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-sm mb-0.5">
                      {event.name}
                    </h3>
                    <p className="text-white/80 text-xs mb-1">
                      {event.friendName}
                    </p>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <Clock className="w-3 h-3" />
                      <span>{event.date}, {event.time}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trending Events */}
          <motion.div
            className="mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: hasSeentFirstInvite ? 0.7 : 0.8 }}
          >
            <h2 className="text-white font-semibold text-lg mb-3">Trending Events</h2>
            
            {/* Horizontal scrollable tiles */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {trendingEvents.map((event, index) => (
                <motion.button
                  key={event.id}
                  className="relative flex-shrink-0 w-48 h-32 rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (hasSeentFirstInvite ? 0.8 : 0.9) + index * 0.1 }}
                  onClick={() => setSelectedEvent(event)}
                >
                  {/* Background image */}
                  <ImageWithFallback
                    src={event.imageUrl}
                    alt={event.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* App logo in top left */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-0.5">
                    <span className="text-[10px]">{event.appLogo}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-sm mb-0.5">
                      {event.title}
                    </h3>
                    <p className="text-white/80 text-xs mb-1">
                      {event.venue}
                    </p>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <Calendar className="w-3 h-3" />
                      <span>{event.date}, {event.time}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trending Food */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: hasSeentFirstInvite ? 0.9 : 1.0 }}
          >
            <h2 className="text-white font-semibold text-lg mb-3">Trending Food</h2>
            
            {/* Horizontal scrollable tiles */}
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {trendingFood.map((food, index) => (
                <motion.button
                  key={food.id}
                  className="relative flex-shrink-0 w-48 h-32 rounded-2xl overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: (hasSeentFirstInvite ? 1.0 : 1.1) + index * 0.1 }}
                  onClick={() => setSelectedFood(food)}
                >
                  {/* Background image */}
                  <ImageWithFallback
                    src={food.imageUrl}
                    alt={food.name}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                  
                  {/* App logo in top left */}
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm rounded px-1.5 py-0.5 flex items-center gap-0.5">
                    <span className="text-[10px]">{food.appLogo}</span>
                  </div>
                  
                  {/* Content */}
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <h3 className="text-white font-semibold text-sm mb-0.5">
                      {food.name}
                    </h3>
                    <p className="text-white/80 text-xs mb-1">
                      {food.cuisine}
                    </p>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{food.location}</span>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Navigation Bar */}
        <BottomNav onHomeClick={() => {}} onStartHangout={onStartHangout} onSearchClick={onSearchClick} onProfileClick={onProfileClick} onInboxClick={onInboxClick} activeTab="home" notificationCount={notificationCount} />
      </motion.div>

      {/* Event Detail Modal */}
      {selectedEvent && (
        <EventDetailModal
          event={selectedEvent}
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onStartHangout={() => {
            onStartHangoutWithEvent && onStartHangoutWithEvent(selectedEvent);
            setSelectedEvent(null);
          }}
        />
      )}

      {/* Food Detail Modal */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          isOpen={!!selectedFood}
          onClose={() => setSelectedFood(null)}
          onStartHangout={() => {
            onStartHangoutWithFood && onStartHangoutWithFood(selectedFood);
            setSelectedFood(null);
          }}
        />
      )}

      {/* Upcoming Event Detail Modal */}
      {selectedUpcomingEvent && (
        <UpcomingEventDetailModal
          event={selectedUpcomingEvent}
          isOpen={!!selectedUpcomingEvent}
          onClose={() => setSelectedUpcomingEvent(null)}
          onStartHangout={() => {
            onStartHangoutWithEvent && onStartHangoutWithEvent(selectedUpcomingEvent);
            setSelectedUpcomingEvent(null);
          }}
        />
      )}
    </div>
  );
}