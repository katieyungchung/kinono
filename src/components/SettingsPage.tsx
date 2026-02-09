import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ChevronDown, ChevronUp, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { BottomNav } from './BottomNav';
import { KinonoLogo } from './KinonoLogo';

interface SettingsPageProps {
  onBack: () => void;
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick: () => void;
  onProfileClick: () => void;
  onInboxClick: () => void;
  notificationCount?: number;
  syncedCalendars?: string[];
  onUpdateSyncedCalendars?: (calendars: string[]) => void;
  userLocation?: string;
  onUpdateLocation?: (location: string) => void;
  previousScreen?: 'home' | 'profile';
}

interface CalendarAccount {
  id: string;
  name: string;
  email?: string;
  icon: string;
  isConnected: boolean;
}

const availableCalendars: CalendarAccount[] = [
  { id: 'google', name: 'Google Calendar', email: '', icon: '📅', isConnected: false },
  { id: 'apple', name: 'Apple Calendar', email: '', icon: '🍎', isConnected: false },
  { id: 'outlook', name: 'Outlook Calendar', email: '', icon: '📧', isConnected: false },
  { id: 'yahoo', name: 'Yahoo Calendar', email: '', icon: '📮', isConnected: false },
];

export function SettingsPage({
  onBack,
  onHomeClick,
  onStartHangout,
  onSearchClick,
  onProfileClick,
  onInboxClick,
  notificationCount,
  syncedCalendars = [],
  onUpdateSyncedCalendars,
  userLocation,
  onUpdateLocation,
  previousScreen = 'home'
}: SettingsPageProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  
  // Toggle states for various settings
  const [calendarSyncPaused, setCalendarSyncPaused] = useState(false);
  const [onlyShowAvailability, setOnlyShowAvailability] = useState(true);
  const [hideSpecificCalendars, setHideSpecificCalendars] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  // Modal states
  const [showCalendarPicker, setShowCalendarPicker] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showHideCalendarsModal, setShowHideCalendarsModal] = useState(false);
  const [showLocationPermission, setShowLocationPermission] = useState(false);
  const [selectedCalendarForLogin, setSelectedCalendarForLogin] = useState<CalendarAccount | null>(null);
  const [calendarsToHide, setCalendarsToHide] = useState<string[]>([]);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Local calendar list with connection status
  const [calendarList, setCalendarList] = useState<CalendarAccount[]>(
    availableCalendars.map(cal => ({
      ...cal,
      isConnected: syncedCalendars.includes(cal.id),
      email: syncedCalendars.includes(cal.id) ? `user@${cal.id}.com` : ''
    }))
  );

  useEffect(() => {
    setCalendarList(
      availableCalendars.map(cal => ({
        ...cal,
        isConnected: syncedCalendars.includes(cal.id),
        email: syncedCalendars.includes(cal.id) ? `user@${cal.id}.com` : ''
      }))
    );
  }, [syncedCalendars]);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleCalendarClick = (calendar: CalendarAccount) => {
    if (calendar.isConnected) {
      // Already connected, do nothing or show disconnect option
      return;
    } else {
      // Show login modal
      setSelectedCalendarForLogin(calendar);
      setShowLoginModal(true);
    }
  };

  const handleLoginSubmit = () => {
    if (selectedCalendarForLogin && loginEmail && loginPassword) {
      // Simulate successful login
      const updatedCalendars = [...syncedCalendars, selectedCalendarForLogin.id];
      onUpdateSyncedCalendars?.(updatedCalendars);
      
      // Reset and close
      setLoginEmail('');
      setLoginPassword('');
      setShowLoginModal(false);
      setSelectedCalendarForLogin(null);
    }
  };

  const handleHideCalendarsToggle = (newValue: boolean) => {
    setHideSpecificCalendars(newValue);
    if (newValue) {
      // Show modal to select which calendars to hide
      setShowHideCalendarsModal(true);
    }
  };

  const toggleCalendarToHide = (calendarId: string) => {
    setCalendarsToHide(prev => 
      prev.includes(calendarId) 
        ? prev.filter(id => id !== calendarId)
        : [...prev, calendarId]
    );
  };

  const handleConfirmHideCalendars = () => {
    // Apply the hidden calendars selection
    setShowHideCalendarsModal(false);
  };

  const handleLocationAllow = () => {
    onUpdateLocation?.('San Francisco, CA');
    setShowLocationPermission(false);
  };

  const connectedCalendars = calendarList.filter(cal => cal.isConnected);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="px-6 pt-8 pb-6">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="text-white/80 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <KinonoLogo />
            <div className="w-6"></div>
          </div>
          
          <div className="text-center">
            <h1 className="text-white text-2xl font-semibold mb-2">
              Permissions & Privacy
            </h1>
            <p className="text-white/70">You're in control</p>
          </div>
        </div>

        {/* Settings List */}
        <div className="flex-1 overflow-y-auto px-6 pb-24">
          <div className="space-y-3">
            {/* Calendar Access */}
            <motion.div
              className="bg-white/95 rounded-2xl overflow-hidden"
              layout
            >
              <button
                onClick={() => toggleSection('calendar')}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                  📅
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#5A3D5C] font-semibold">Calendar Access</h3>
                  <p className="text-[#5A3D5C]/60 text-sm">Find easy times to hang out</p>
                </div>
                {expandedSection === 'calendar' ? (
                  <ChevronUp className="w-5 h-5 text-[#5A3D5C]/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5A3D5C]/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === 'calendar' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-4">
                      <p className="text-[#5A3D5C] text-sm">
                        Calendar access helps kinono spot open time for plans—nothing more.
                      </p>
                      <p className="text-[#5A3D5C]/50 text-sm italic">
                        You can change this anytime.
                      </p>

                      <button 
                        onClick={() => setShowCalendarPicker(true)}
                        className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2"
                      >
                        📅 Choose calendars
                      </button>

                      {/* Toggles */}
                      <div className="space-y-4 pt-2">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-[#5A3D5C] font-medium">Pause calendar sync</h4>
                            <p className="text-[#5A3D5C]/60 text-sm">Temporarily stop syncing your calendar</p>
                          </div>
                          <button
                            onClick={() => setCalendarSyncPaused(!calendarSyncPaused)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              calendarSyncPaused ? 'bg-[#D4F4E7]' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                calendarSyncPaused ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-[#5A3D5C] font-medium">Only show availability</h4>
                            <p className="text-[#5A3D5C]/60 text-sm">Hide event details, just show when you're free</p>
                          </div>
                          <button
                            onClick={() => setOnlyShowAvailability(!onlyShowAvailability)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              onlyShowAvailability ? 'bg-[#D4F4E7]' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                onlyShowAvailability ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-[#5A3D5C] font-medium">Hide specific calendars</h4>
                            <p className="text-[#5A3D5C]/60 text-sm">Choose which calendars kinono can see</p>
                          </div>
                          <button
                            onClick={() => handleHideCalendarsToggle(!hideSpecificCalendars)}
                            className={`w-12 h-6 rounded-full transition-colors ${
                              hideSpecificCalendars ? 'bg-[#D4F4E7]' : 'bg-gray-300'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                                hideSpecificCalendars ? 'translate-x-6' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Location */}
            <motion.div
              className="bg-white/95 rounded-2xl overflow-hidden"
              layout
            >
              <button
                onClick={() => toggleSection('location')}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                  📍
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#5A3D5C] font-semibold">Location</h3>
                  <p className="text-[#5A3D5C]/60 text-sm">
                    {userLocation || 'City-level location already enabled'}
                  </p>
                </div>
                {expandedSection === 'location' ? (
                  <ChevronUp className="w-5 h-5 text-[#5A3D5C]/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5A3D5C]/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === 'location' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-4">
                      <p className="text-[#5A3D5C] text-sm">
                        Precise location helps us suggest places within walking or short-drive distance.
                      </p>
                      <p className="text-[#5A3D5C]/50 text-sm italic">
                        Used only to improve nearby suggestions.
                      </p>

                      <button 
                        onClick={() => setShowLocationPermission(true)}
                        className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2"
                      >
                        📍 Enable precise location
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Notifications */}
            <motion.div
              className="bg-white/95 rounded-2xl overflow-hidden"
              layout
            >
              <button
                onClick={() => toggleSection('notifications')}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                  🔔
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#5A3D5C] font-semibold">Notifications</h3>
                  <p className="text-[#5A3D5C]/60 text-sm">Get helpful reminders</p>
                </div>
                {expandedSection === 'notifications' ? (
                  <ChevronUp className="w-5 h-5 text-[#5A3D5C]/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5A3D5C]/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === 'notifications' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-4">
                      <p className="text-[#5A3D5C] text-sm">
                        We only send reminders that help you connect.
                      </p>

                      <div className="space-y-2 py-2">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-[#5A3D5C] text-sm">"Mahmoud is free tonight"</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="text-[#5A3D5C] text-sm">"You planned a hangout tomorrow"</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div>
                          <h4 className="text-[#5A3D5C] font-medium">Enable notifications</h4>
                          <p className="text-[#5A3D5C]/60 text-sm">Get helpful reminders about your plans</p>
                        </div>
                        <button
                          onClick={() => setNotificationsEnabled(!notificationsEnabled)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            notificationsEnabled ? 'bg-[#D4F4E7]' : 'bg-gray-300'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
                              notificationsEnabled ? 'translate-x-6' : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* End User Agreement */}
            <motion.div
              className="bg-white/95 rounded-2xl overflow-hidden"
              layout
            >
              <button
                onClick={() => toggleSection('terms')}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                  📄
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#5A3D5C] font-semibold">End User Agreement</h3>
                  <p className="text-[#5A3D5C]/60 text-sm">View terms and conditions</p>
                </div>
                {expandedSection === 'terms' ? (
                  <ChevronUp className="w-5 h-5 text-[#5A3D5C]/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5A3D5C]/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === 'terms' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-4">
                      <p className="text-[#5A3D5C] text-sm">
                        Our terms are designed to be clear and fair. We believe in transparency and keeping things simple.
                      </p>

                      <button className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors flex items-center justify-center gap-2">
                        📄 Read full agreement
                      </button>

                      <p className="text-[#5A3D5C]/50 text-sm text-center">
                        Last updated: January 15, 2026
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Privacy Center */}
            <motion.div
              className="bg-white/95 rounded-2xl overflow-hidden"
              layout
            >
              <button
                onClick={() => toggleSection('privacy')}
                className="w-full p-4 flex items-center gap-3 hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center text-2xl">
                  🔒
                </div>
                <div className="flex-1 text-left">
                  <h3 className="text-[#5A3D5C] font-semibold">Privacy Center</h3>
                  <p className="text-[#5A3D5C]/60 text-sm">Manage your data and privacy</p>
                </div>
                {expandedSection === 'privacy' ? (
                  <ChevronUp className="w-5 h-5 text-[#5A3D5C]/60" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-[#5A3D5C]/60" />
                )}
              </button>

              <AnimatePresence>
                {expandedSection === 'privacy' && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="border-t border-gray-100"
                  >
                    <div className="p-4 space-y-3">
                      <p className="text-[#5A3D5C] text-sm mb-4">
                        Your data belongs to you. Access, download, or delete your information anytime.
                      </p>

                      <button className="w-full bg-white border-2 border-[#5A3D5C] text-[#5A3D5C] rounded-xl py-3 font-semibold hover:bg-gray-50 transition-colors">
                        Download my data
                      </button>

                      <button className="w-full bg-white border-2 border-[#5A3D5C] text-[#5A3D5C] rounded-xl py-3 font-semibold hover:bg-gray-50 transition-colors">
                        View privacy policy
                      </button>

                      <button className="w-full bg-white border-2 border-red-500 text-red-500 rounded-xl py-3 font-semibold hover:bg-red-50 transition-colors">
                        Delete my account
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <BottomNav
          onHomeClick={onHomeClick}
          onStartHangout={onStartHangout}
          onSearchClick={onSearchClick}
          onProfileClick={onProfileClick}
          onInboxClick={onInboxClick}
          activeTab={previousScreen}
          notificationCount={notificationCount}
        />
      </motion.div>

      {/* Calendar Picker Modal */}
      <AnimatePresence>
        {showCalendarPicker && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCalendarPicker(false)}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#5A3D5C] text-xl font-semibold">Connected Calendars</h2>
                  <button
                    onClick={() => setShowCalendarPicker(false)}
                    className="text-[#5A3D5C]/60 hover:text-[#5A3D5C]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-2 mb-6">
                  {calendarList.map((calendar) => (
                    <button
                      key={calendar.id}
                      onClick={() => handleCalendarClick(calendar)}
                      className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                        calendar.isConnected
                          ? 'bg-[#D4F4E7] cursor-default'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-2xl">{calendar.icon}</span>
                      <div className="flex-1 text-left">
                        <h3 className="text-[#5A3D5C] font-semibold">{calendar.name}</h3>
                        {calendar.isConnected && calendar.email && (
                          <p className="text-[#5A3D5C]/60 text-sm">{calendar.email}</p>
                        )}
                      </div>
                      {calendar.isConnected && (
                        <Check className="w-5 h-5 text-[#5A3D5C]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && selectedCalendarForLogin && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowLoginModal(false);
              setSelectedCalendarForLogin(null);
              setLoginEmail('');
              setLoginPassword('');
            }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#5A3D5C] text-xl font-semibold">
                    Connect {selectedCalendarForLogin.name}
                  </h2>
                  <button
                    onClick={() => {
                      setShowLoginModal(false);
                      setSelectedCalendarForLogin(null);
                      setLoginEmail('');
                      setLoginPassword('');
                    }}
                    className="text-[#5A3D5C]/60 hover:text-[#5A3D5C]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[#5A3D5C] text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#5A3D5C] outline-none text-[#5A3D5C]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-[#5A3D5C] text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#5A3D5C] outline-none text-[#5A3D5C]"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    onClick={handleLoginSubmit}
                    disabled={!loginEmail || !loginPassword}
                    className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Connect Calendar
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hide Specific Calendars Modal */}
      <AnimatePresence>
        {showHideCalendarsModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setShowHideCalendarsModal(false);
              setHideSpecificCalendars(false);
            }}
          >
            <motion.div
              className="bg-white rounded-3xl w-full max-w-[340px] overflow-hidden"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-[#5A3D5C] text-xl font-semibold">Hide Calendars</h2>
                  <button
                    onClick={() => {
                      setShowHideCalendarsModal(false);
                      setHideSpecificCalendars(false);
                    }}
                    className="text-[#5A3D5C]/60 hover:text-[#5A3D5C]"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-[#5A3D5C]/70 text-sm mb-4">
                  Select which calendars you want to hide from kinono
                </p>

                <div className="space-y-2 mb-6">
                  {connectedCalendars.map((calendar) => (
                    <button
                      key={calendar.id}
                      onClick={() => toggleCalendarToHide(calendar.id)}
                      className={`w-full p-4 rounded-xl flex items-center gap-3 transition-colors ${
                        calendarsToHide.includes(calendar.id)
                          ? 'bg-gray-200'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      <span className="text-2xl">{calendar.icon}</span>
                      <div className="flex-1 text-left">
                        <h3 className="text-[#5A3D5C] font-semibold">{calendar.name}</h3>
                        {calendar.email && (
                          <p className="text-[#5A3D5C]/60 text-sm">{calendar.email}</p>
                        )}
                      </div>
                      {calendarsToHide.includes(calendar.id) && (
                        <Check className="w-5 h-5 text-[#5A3D5C]" />
                      )}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleConfirmHideCalendars}
                  className="w-full bg-[#F59E0B] text-white rounded-xl py-3 font-semibold hover:bg-[#E89450] transition-colors"
                >
                  Confirm
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Location Permission Modal (Apple Style) */}
      <AnimatePresence>
        {showLocationPermission && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl w-full max-w-[280px] overflow-hidden shadow-2xl"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
            >
              <div className="p-6 text-center">
                <div className="mb-4">
                  <div className="w-16 h-16 bg-[#5A3D5C] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-3xl">📍</span>
                  </div>
                  <h2 className="text-[#1d1d1f] text-lg font-semibold mb-2">
                    Allow "Kinono" to access your location?
                  </h2>
                  <p className="text-[#1d1d1f]/60 text-sm">
                    This helps us suggest nearby places for your hangouts.
                  </p>
                </div>

                <div className="space-y-2">
                  <button
                    onClick={handleLocationAllow}
                    className="w-full bg-[#007AFF] text-white rounded-xl py-3 font-semibold hover:bg-[#0051D5] transition-colors"
                  >
                    Allow
                  </button>
                  <button
                    onClick={() => setShowLocationPermission(false)}
                    className="w-full bg-gray-100 text-[#1d1d1f] rounded-xl py-3 font-semibold hover:bg-gray-200 transition-colors"
                  >
                    Don't Allow
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
