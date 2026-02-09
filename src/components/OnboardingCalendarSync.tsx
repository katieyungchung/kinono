import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Mail, X, Check } from 'lucide-react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingCalendarSyncProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onContinue: (syncedCalendar?: string) => void;
  onSkip: () => void;
}

type SyncProvider = 'gmail' | 'outlook' | 'manual' | null;

export function OnboardingCalendarSync({ currentStep, totalSteps, onStepClick, onContinue, onSkip }: OnboardingCalendarSyncProps) {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SyncProvider>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [syncedProvider, setSyncedProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProviderClick = (provider: SyncProvider) => {
    setSelectedProvider(provider);
    setShowSyncModal(true);
    setEmail('');
    setPassword('');
  };

  const handleSync = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    // Simulate sync process
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSynced(true);
    setSyncedProvider(selectedProvider);
    setShowSyncModal(false);
  };

  const getProviderName = () => {
    if (selectedProvider === 'gmail') return 'Gmail';
    if (selectedProvider === 'outlook') return 'Outlook';
    return 'Email';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo */}
        <div className="px-6 pt-8 pb-4 flex-shrink-0">
          <div className="flex justify-center mb-6">
            <KinonoLogo />
          </div>
          
          {/* Progress indicator */}
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <h1 className="text-white text-2xl font-semibold mb-3">
              Sync your calendar
            </h1>
            <p className="text-white/70 text-base leading-relaxed">
              We'll use your calendar to find times when you're free to hang out
            </p>
          </motion.div>

          {/* Success Message */}
          <AnimatePresence>
            {isSynced && (
              <motion.div
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="mb-6"
              >
                <div className="bg-[#D4F4E7] rounded-2xl p-4 flex items-start gap-3">
                  <div className="w-10 h-10 bg-[#5A3D5C] rounded-full flex items-center justify-center flex-shrink-0">
                    <Check className="w-5 h-5 text-[#9DE4CF]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[#5A3D5C] font-semibold text-base mb-1">
                      Calendar synced! 🎉
                    </h3>
                    <p className="text-[#5A3D5C]/70 text-sm">
                      We'll now be able to suggest hangout times when you're actually free
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sync options */}
          <div className="space-y-4 mb-8">
            {/* Gmail option */}
            <motion.button
              onClick={() => handleProviderClick('gmail')}
              disabled={isSynced}
              className={`w-full bg-white/10 rounded-2xl p-5 text-left transition-all ${
                isSynced 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white/15 active:scale-[0.98]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7" viewBox="0 0 48 48">
                    <path fill="#4285F4" d="M45,16.2l-5,2.75l-5,4.75L35,40h7c1.657,0,3-1.343,3-3V16.2z"/>
                    <path fill="#34A853" d="M3,16.2l3.614,1.71L13,23.7V40H6c-1.657,0-3-1.343-3-3V16.2z"/>
                    <polygon fill="#FBBC05" points="35,11.2 24,19.45 13,11.2 12,17 13,23.7 24,31.95 35,23.7 36,17"/>
                    <path fill="#EA4335" d="M3,12.298V16.2l10,7.5V11.2L9.876,8.859C9.132,8.301,8.228,8,7.298,8h0C4.924,8,3,9.924,3,12.298z"/>
                    <path fill="#C5221F" d="M45,12.298V16.2l-10,7.5V11.2l3.124-2.341C38.868,8.301,39.772,8,40.702,8h0 C43.076,8,45,9.924,45,12.298z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    Sync with Gmail
                  </h3>
                  <p className="text-white/60 text-sm">
                    Connect your Google Calendar
                  </p>
                </div>
                {isSynced && selectedProvider === 'gmail' && (
                  <Check className="w-6 h-6 text-[#9DE4CF]" />
                )}
              </div>
            </motion.button>

            {/* Outlook option */}
            <motion.button
              onClick={() => handleProviderClick('outlook')}
              disabled={isSynced}
              className={`w-full bg-white/10 rounded-2xl p-5 text-left transition-all ${
                isSynced 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white/15 active:scale-[0.98]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-7 h-7" viewBox="0 0 48 48">
                    <path fill="#0078D4" d="M24,4C13.5,4,5,12.5,5,23s8.5,19,19,19s19-8.5,19-19S34.5,4,24,4z"/>
                    <path fill="#FFF" d="M18.7,28.5c-1.5,0-2.7-1.2-2.7-2.7v-5.6c0-1.5,1.2-2.7,2.7-2.7h10.6c1.5,0,2.7,1.2,2.7,2.7v5.6 c0,1.5-1.2,2.7-2.7,2.7H18.7z"/>
                    <path fill="#0078D4" d="M27.5,23.5c0,1.933-1.567,3.5-3.5,3.5s-3.5-1.567-3.5-3.5S22.067,20,24,20S27.5,21.567,27.5,23.5z"/>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    Sync with Outlook
                  </h3>
                  <p className="text-white/60 text-sm">
                    Connect your Outlook Calendar
                  </p>
                </div>
                {isSynced && selectedProvider === 'outlook' && (
                  <Check className="w-6 h-6 text-[#9DE4CF]" />
                )}
              </div>
            </motion.button>

            {/* Manual email option */}
            <motion.button
              onClick={() => handleProviderClick('manual')}
              disabled={isSynced}
              className={`w-full bg-white/10 rounded-2xl p-5 text-left transition-all ${
                isSynced 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-white/15 active:scale-[0.98]'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#9DE4CF] rounded-xl flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-6 h-6 text-[#5A3D5C]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-base mb-1">
                    Enter email manually
                  </h3>
                  <p className="text-white/60 text-sm">
                    Use any calendar provider
                  </p>
                </div>
                {isSynced && selectedProvider === 'manual' && (
                  <Check className="w-6 h-6 text-[#9DE4CF]" />
                )}
              </div>
            </motion.button>
          </div>

          {/* Privacy note */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-white/5 rounded-2xl p-4 mb-6"
          >
            <p className="text-white/60 text-sm leading-relaxed">
              🔒 We only read when you're busy or free. We never see event titles, 
              attendees, or other details.
            </p>
          </motion.div>
        </div>

        {/* Footer buttons */}
        <div className="px-6 pb-8 flex-shrink-0 space-y-3">
          <motion.button
            onClick={() => onContinue(syncedProvider)}
            className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            Continue
          </motion.button>

          <motion.button
            onClick={onSkip}
            className="w-full text-white/60 hover:text-white py-2 text-sm transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Skip for now
          </motion.button>
        </div>
      </motion.div>

      {/* Sync Modal */}
      <AnimatePresence>
        {showSyncModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isLoading && setShowSyncModal(false)}
          >
            <motion.div
              className="w-full max-w-[375px] bg-[#5A3D5C] rounded-3xl p-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-semibold text-xl">
                  Connect {getProviderName()}
                </h2>
                {!isLoading && (
                  <button
                    onClick={() => setShowSyncModal(false)}
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {/* Email input */}
                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    disabled={isLoading}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#9DE4CF] transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Password input */}
                <div>
                  <label className="text-white/80 text-sm mb-2 block">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    disabled={isLoading}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 outline-none focus:border-[#9DE4CF] transition-colors disabled:opacity-50"
                  />
                </div>

                {/* Sync button */}
                <button
                  onClick={handleSync}
                  disabled={!email || !password || isLoading}
                  className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-6"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Syncing...
                    </div>
                  ) : (
                    'Sync Calendar'
                  )}
                </button>

                <p className="text-white/50 text-xs text-center mt-4">
                  Your credentials are encrypted and never stored
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}