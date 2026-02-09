import { motion } from 'motion/react';
import { useEffect } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingCompleteProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onGetStarted: () => void;
}

export function OnboardingComplete({ currentStep, totalSteps, onStepClick, onGetStarted }: OnboardingCompleteProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header with logo and progress */}
        <div className="px-6 pt-6 pb-4 flex-shrink-0">
          <div className="mb-6">
            <KinonoLogo />
          </div>

          {/* Progress bar */}
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </div>

        {/* Center content */}
        <div className="flex-1 flex items-center justify-center px-6">
          <div className="w-full">
            <motion.div
              className="bg-white/10 rounded-3xl p-12 backdrop-blur-sm border border-white/20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {/* Success checkmark */}
              <motion.div
                className="flex justify-center mb-8"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 20,
                  delay: 0.4,
                }}
              >
                <div className="w-32 h-32 bg-[#9DE4CF] rounded-full flex items-center justify-center">
                  <motion.svg
                    className="w-16 h-16 text-[#5A3D5C]"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    <path d="M5 13l4 4L19 7"></path>
                  </motion.svg>
                </div>
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="text-center"
              >
                <h1 className="text-3xl font-semibold text-white mb-4">
                  You're all set!
                </h1>
                <p className="text-white/70 text-base leading-relaxed">
                  Start exploring and connecting with people who share your interests.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bottom button */}
        <div className="px-6 pb-8 w-full">
          <motion.button
            onClick={onGetStarted}
            className="w-full bg-[#F59E0B] text-white rounded-2xl py-4 font-semibold hover:bg-[#E89450] transition-all shadow-lg text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            Get Started
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}