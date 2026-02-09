import { motion } from 'motion/react';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function OnboardingProgressBar({ currentStep, totalSteps, onStepClick }: OnboardingProgressBarProps) {
  return (
    <div className="flex gap-2 justify-center">
      {[...Array(totalSteps)].map((_, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isPrevious = stepNumber < currentStep;
        const isClickable = isPrevious;

        return (
          <button
            key={i}
            onClick={() => isClickable && onStepClick(stepNumber)}
            disabled={!isClickable}
            className={`h-1.5 rounded-full transition-all ${
              isActive 
                ? 'w-8 bg-[#F59E0B]' 
                : isPrevious
                  ? 'w-1.5 bg-white/50 hover:bg-white/70 cursor-pointer'
                  : 'w-1.5 bg-white/30 cursor-default'
            }`}
          />
        );
      })}
    </div>
  );
}
