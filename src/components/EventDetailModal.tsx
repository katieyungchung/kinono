import { X, Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TrendingEvent {
  id: number;
  title: string;
  venue: string;
  date: string;
  time: string;
  imageUrl: string;
  appLogo: string;
  appName: string;
}

interface EventDetailModalProps {
  event: TrendingEvent | null;
  isOpen: boolean;
  onClose: () => void;
  onStartHangout: () => void;
}

export function EventDetailModal({ event, isOpen, onClose, onStartHangout }: EventDetailModalProps) {
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
                alt={event.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#5A3D5C] to-transparent"></div>
              
              {/* App Badge */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2">
                <span className="text-lg">{event.appLogo}</span>
                <span className="text-sm font-medium text-gray-700">{event.appName}</span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                {event.title}
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#D4F4E7]/20 rounded-lg">
                    <Calendar className="w-5 h-5 text-[#D4F4E7]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">When</p>
                    <p className="text-white font-medium">{event.date} at {event.time}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-[#D4F4E7]/20 rounded-lg">
                    <MapPin className="w-5 h-5 text-[#D4F4E7]" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 text-sm">Where</p>
                    <p className="text-white font-medium">{event.venue}</p>
                  </div>
                </div>
              </div>

              {/* Start Hangout Button */}
              <button
                onClick={onStartHangout}
                className="w-full bg-[#F59E0B] hover:bg-[#E89450] text-white font-semibold py-3.5 rounded-2xl transition-colors"
              >
                Start Hangout
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}