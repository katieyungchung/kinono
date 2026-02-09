import { motion } from 'motion/react';
import { Search, MapPin } from 'lucide-react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingLocationProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  initialLocation?: string;
  initialDistance?: number;
  onContinue: (location: string) => void;
  onSkip: () => void;
}

export function OnboardingLocation({ currentStep, totalSteps, onStepClick, initialLocation = '', initialDistance = 10, onContinue, onSkip }: OnboardingLocationProps) {
  const [location, setLocation] = useState(initialLocation);
  const [distance, setDistance] = useState(initialDistance);
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocation(value);
  };

  const handleUseCurrentLocation = () => {
    setShowLocationDialog(true);
  };

  const handleAllowLocation = () => {
    // Simulate getting actual location - in production this would use geolocation API
    setLocation('Los Angeles, CA');
    setShowLocationDialog(false);
  };

  const handleDenyLocation = () => {
    setShowLocationDialog(false);
  };

  const handleContinue = () => {
    if (location) {
      onContinue(location);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col relative"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Location Permission Dialog */}
        {showLocationDialog && (
          <div className="absolute inset-0 bg-black/50 z-50 flex items-center justify-center px-6">
            <motion.div
              className="bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl max-w-[280px] w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="p-6 text-center">
                <div className="mb-4">
                  <MapPin className="w-16 h-16 text-[#5A3D5C] mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Allow "Kinono" to access your location?
                </h3>
                <p className="text-sm text-gray-600 mb-6">
                  This helps us find hangouts and activities near you.
                </p>
              </div>
              <div className="border-t border-gray-300">
                <button
                  onClick={handleDenyLocation}
                  className="w-full py-3 text-blue-600 font-medium border-b border-gray-300 hover:bg-gray-50 transition-colors"
                >
                  Don't Allow
                </button>
                <button
                  onClick={handleAllowLocation}
                  className="w-full py-3 text-blue-600 font-semibold hover:bg-gray-50 transition-colors"
                >
                  Allow
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {/* Header with logo and progress */}
        <div className="px-6 pt-6 pb-3 flex-shrink-0">
          <div className="mb-4">
            <KinonoLogo />
          </div>

          {/* Progress bar */}
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-3 flex flex-col min-h-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4"
          >
            <h1 className="text-2xl font-semibold text-white text-center mb-2">
              Where should Kinono look for you?
            </h1>
            <p className="text-white/70 text-center text-xs leading-relaxed px-2">
              Sharing your location helps Kinono find hangouts near you. Don't worry, your data is private and never shared.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-3"
          >
            {/* Search input */}
            <div className="relative mb-3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={location}
                onChange={handleLocationChange}
                placeholder="City, area, or post code"
                className="w-full bg-white/10 border border-white/20 rounded-2xl pl-12 pr-4 py-3 text-white placeholder-white/40 text-sm focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all"
              />
            </div>

            {/* Use current location */}
            <button 
              onClick={handleUseCurrentLocation}
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-3"
            >
              <MapPin className="w-5 h-5" />
              <span className="text-sm">Use my current location</span>
            </button>

            {/* Distance slider */}
            <div className="mb-3">
              <label className="block text-white text-sm font-medium mb-2">
                How far are you willing to go for a hangout?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={distance}
                  onChange={(e) => setDistance(Number(e.target.value))}
                  className="flex-1 h-2 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#9DE4CF] [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#9DE4CF] [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:cursor-pointer"
                />
                <span className="text-white font-semibold text-sm min-w-[60px] text-right">
                  {distance} miles
                </span>
              </div>
            </div>
          </motion.div>

          {/* Map placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex-1 bg-white/10 rounded-2xl border border-white/20 overflow-hidden mb-3 min-h-[140px]"
          >
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '140px' }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={location 
                ? `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(location)}&zoom=12`
                : `https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=34.0522,-118.2437&zoom=10`
              }
            ></iframe>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex-shrink-0 pb-2"
          >
            <button
              onClick={handleContinue}
              disabled={!location}
              className={`w-full rounded-2xl py-3.5 font-semibold transition-all shadow-lg ${
                location
                  ? 'bg-[#F59E0B] text-white hover:bg-[#E89450]'
                  : 'bg-white/20 text-white/40 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}