import { motion } from 'motion/react';
import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface SuccessPageProps {
  onContinue: () => void;
}

export function SuccessPage({ onContinue }: SuccessPageProps) {
  useEffect(() => {
    // Initial burst
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { 
      startVelocity: 30, 
      spread: 360, 
      ticks: 60, 
      zIndex: 0,
      colors: ['#5A3D5C', '#9DE4CF', '#F59E0B', '#E89450', '#FFFFFF']
    };

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      
      // Launch confetti from two sides
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
      });
    }, 250);

    // Big celebration burst at the beginning
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5A3D5C', '#9DE4CF', '#F59E0B', '#E89450', '#FFFFFF']
      });
    }, 300);

    // Auto-advance to onboarding after confetti
    const autoAdvance = setTimeout(() => {
      onContinue();
    }, 3500);

    return () => {
      clearInterval(interval);
      clearTimeout(autoAdvance);
    };
  }, [onContinue]);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div 
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex items-center justify-center"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center text-white px-8 flex flex-col items-center justify-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20,
              delay: 0.2 
            }}
          >
            <div className="w-24 h-24 bg-[#9DE4CF] rounded-full flex items-center justify-center mb-8">
              <svg 
                className="w-12 h-12 text-[#5A3D5C]" 
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
          </motion.div>

          <motion.h1 
            className="text-4xl font-semibold"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Welcome to Kinono!
          </motion.h1>
          
          <motion.p
            className="text-white/80 mt-4 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            One step closer to stress-free hangouts 🎉
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
}