import { X, Calendar, MapPin, Users } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import type { UpcomingEvent } from '../App';

interface UpcomingEventDetailModalProps {
  event: UpcomingEvent | null;
  isOpen: boolean;
  onClose: () => void;
}

export function UpcomingEventDetailModal({ event, isOpen, onClose }: UpcomingEventDetailModalProps) {
  if (!event) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-sm bg-gradient-to-br from-[#5A3D5C] to-[#7A5D7C] rounded-3xl overflow-hidden shadow-2xl relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5 text-white" />
            </button>

            {/* Event Image */}
            <div className="relative h-48 w-full">
              <ImageWithFallback
                src={event.imageUrl}
                alt={event.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A3D5C] to-transparent"></div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {event.name}
              </h2>

              <div className="space-y-3 mb-6">
                {/* Who's going */}
                {event.friends && event.friends.length > 0 && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#D4F4E7]/20 rounded-lg">
                      <Users className="w-5 h-5 text-[#D4F4E7]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm">Who's going</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex -space-x-2">
                          {event.friends.slice(0, 3).map((friend, idx) => (
                            <div 
                              key={idx} 
                              className="w-8 h-8 rounded-full border-2 border-[#5A3D5C] overflow-hidden"
                            >
                              <ImageWithFallback
                                src={friend.avatar}
                                alt={friend.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ))}
                          {event.friends.length > 3 && (
                            <div className="w-8 h-8 rounded-full bg-[#D4F4E7]/20 border-2 border-[#5A3D5C] flex items-center justify-center">
                              <span className="text-white text-xs font-semibold">+{event.friends.length - 3}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-white font-medium text-sm">
                          {event.friends.length === 1 
                            ? event.friends[0].name 
                            : `${event.friends[0].name.split(' ')[0]} ${event.friends.length > 1 ? `+${event.friends.length - 1}` : ''}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* When */}
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#D4F4E7]/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#D4F4E7]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">When</p>
                    <p className="text-white font-medium">{event.date} at {event.time}</p>
                  </div>
                </div>

                {/* Where */}
                {event.location && (
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-[#D4F4E7]/20 rounded-lg">
                      <MapPin className="w-5 h-5 text-[#D4F4E7]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-white/60 text-sm">Where</p>
                      <p className="text-white font-medium">{event.location}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
