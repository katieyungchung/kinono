import { motion } from 'motion/react';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingInterestsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  initialInterests?: string[];
  onContinue: (interests: string[]) => void;
  onSkip: () => void;
}

const interestCategories = [
  {
    id: 'outdoor',
    title: 'Outdoor Activities',
    subtitle: 'walks, hikes, beach, parks',
  },
  {
    id: 'indoor',
    title: 'Indoor Activities',
    subtitle: 'coffee, movies, games, reading',
  },
  {
    id: 'food',
    title: 'Food & Drink',
    subtitle: 'restaurants, bars, cafes, cooking',
  },
  {
    id: 'wellness',
    title: 'Wellness',
    subtitle: 'yoga, meditation, spa',
  },
  {
    id: 'arts',
    title: 'Arts & Culture',
    subtitle: 'museums, galleries, concerts, theater',
  },
  {
    id: 'nightlife',
    title: 'Music & Nightlife',
    subtitle: 'concerts, clubs, bars, live shows',
  },
  {
    id: 'fitness',
    title: 'Fitness',
    subtitle: 'gym, running, cycling, sports',
  },
  {
    id: 'social',
    title: 'Social & Events',
    subtitle: 'parties, meetups, events, networking',
  },
];

export function OnboardingInterests({ currentStep, totalSteps, onStepClick, initialInterests, onContinue, onSkip }: OnboardingInterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests || []);

  const toggleInterest = (id: string) => {
    if (selectedInterests.includes(id)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== id));
    } else if (selectedInterests.length < 5) {
      setSelectedInterests([...selectedInterests, id]);
    }
  };

  const handleContinue = () => {
    onContinue(selectedInterests);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo and progress */}
        <div className="px-6 pt-6 pb-4">
          <div className="mb-6">
            <KinonoLogo />
          </div>

          {/* Progress bar */}
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-4 flex flex-col overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <h1 className="text-3xl font-semibold text-white text-center mb-3">
              What do you like to do in your free time?
            </h1>
            <p className="text-white/70 text-center text-sm">
              Choose up to 5.
            </p>
          </motion.div>

          {/* Interest grid */}
          <div className="grid grid-cols-2 gap-3 mb-6 flex-1">
            {interestCategories.map((category, index) => (
              <motion.button
                key={category.id}
                onClick={() => toggleInterest(category.id)}
                className={`p-4 rounded-2xl border-2 transition-all text-left relative ${
                  selectedInterests.includes(category.id)
                    ? 'bg-[#9DE4CF]/20 border-[#9DE4CF]'
                    : 'bg-white/5 border-white/20 hover:border-white/40'
                }`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                <h3 className="text-white font-medium text-sm mb-1">
                  {category.title}
                </h3>
                <p className="text-white/60 text-xs leading-snug">
                  {category.subtitle}
                </p>
                {selectedInterests.includes(category.id) && (
                  <div className="absolute bottom-3 right-3 w-5 h-5 bg-[#9DE4CF] rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-[#5A3D5C]"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="3"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                )}
              </motion.button>
            ))}
          </div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="space-y-3 pb-2"
          >
            <button
              onClick={handleContinue}
              className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all shadow-lg"
            >
              Continue
            </button>
            <button
              onClick={onSkip}
              className="w-full text-white/70 hover:text-white transition-colors py-2 text-sm"
            >
              Skip for now
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}