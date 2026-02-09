import { motion } from 'motion/react';
import { Search, Mail, Home, User, Sparkles } from 'lucide-react';

interface BottomNavProps {
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  activeTab?: 'home' | 'search' | 'start' | 'inbox' | 'profile';
  notificationCount?: number;
}

export function BottomNav({ onHomeClick, onStartHangout, onSearchClick, onProfileClick, onInboxClick, activeTab = 'home', notificationCount = 0 }: BottomNavProps) {
  return (
    <motion.div
      className="flex-shrink-0 bg-[#4A2D4C] border-t border-white/10 px-6 py-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <div className="flex items-center justify-between">
        {/* Search */}
        <button 
          onClick={onSearchClick}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'search' ? 'text-[#F59E0B]' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Search className="w-6 h-6" />
        </button>

        {/* Inbox */}
        <button 
          onClick={onInboxClick}
          className={`flex flex-col items-center gap-1 transition-colors relative ${
            activeTab === 'inbox' ? 'text-[#F59E0B]' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Mail className="w-6 h-6" />
          {notificationCount > 0 && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
              {notificationCount}
            </div>
          )}
        </button>

        {/* Home (standout) */}
        <button 
          onClick={onHomeClick}
          className="flex flex-col items-center gap-1 -mt-2"
        >
          <div className={`rounded-2xl p-3 shadow-lg ${
            activeTab === 'home' ? 'bg-[#F59E0B]' : 'bg-[#F59E0B]'
          }`}>
            <Home className="w-6 h-6 text-white" />
          </div>
        </button>

        {/* Profile */}
        <button 
          onClick={onProfileClick}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'profile' ? 'text-[#F59E0B]' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <User className="w-6 h-6" />
        </button>

        {/* Start hangout */}
        <button 
          onClick={onStartHangout}
          className={`flex flex-col items-center gap-1 transition-colors ${
            activeTab === 'start' ? 'text-[#F59E0B]' : 'text-white/60 hover:text-white/90'
          }`}
        >
          <Sparkles className="w-6 h-6" />
        </button>
      </div>
    </motion.div>
  );
}