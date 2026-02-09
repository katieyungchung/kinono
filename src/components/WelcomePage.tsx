import { motion } from 'motion/react';
import puzzleLogo from 'figma:asset/9396ee5f76cba453dfc3c47361ae0174ba109340.png';

interface WelcomePageProps {
  onComplete: () => void;
}

export function WelcomePage({ onComplete }: WelcomePageProps) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col items-center justify-center px-8 relative">
        {/* Puzzle Logo Animation */}
        <div className="relative w-full h-64 mb-6 flex items-center justify-center">
          {/* Left puzzle piece (mint/teal) - slides in from left */}
          <motion.div
            className="absolute"
            style={{
              width: '320px',
              height: '240px',
              left: 'calc(50% - 160px)',
              top: 'calc(50% - 120px)',
              clipPath: 'inset(0 50% 0 0)',
            }}
            initial={{ x: -200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.3,
            }}
          >
            <img 
              src={puzzleLogo} 
              alt="Kinono puzzle - left piece" 
              className="w-full h-full object-contain"
            />
          </motion.div>

          {/* Right puzzle piece (orange) - slides in from right */}
          <motion.div
            className="absolute"
            style={{
              width: '320px',
              height: '240px',
              left: 'calc(50% - 160px)',
              top: 'calc(50% - 120px)',
              clipPath: 'inset(0 0 0 50%)',
            }}
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.43, 0.13, 0.23, 0.96],
              delay: 0.3,
            }}
          >
            <img 
              src={puzzleLogo} 
              alt="Kinono puzzle - right piece" 
              className="w-full h-full object-contain"
            />
          </motion.div>
        </div>

        {/* App Name - fades in after puzzle animation */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 1.8,
          }}
        >
          <h1 className="text-7xl font-light text-white tracking-wide">
            kinono
          </h1>
        </motion.div>

        {/* Welcome text - fades in after app name */}
        <motion.div
          className="text-center max-w-xs"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 2.4,
          }}
        >
          <p className="text-lg text-white/90 mb-2">
            Welcome! Turn 'let's hangout' into
          </p>
        </motion.div>

        {/* "real connection" - fades in last, in bold */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: 3.0,
          }}
        >
          <p className="text-xl font-semibold text-white">
            real connection
          </p>
        </motion.div>

        {/* Skip button - appears at the end */}
        <motion.button
          onClick={onComplete}
          className="px-12 py-4 bg-[#F59E0B] text-white rounded-full font-semibold hover:bg-[#E89450] transition-all shadow-lg text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 3.6,
          }}
        >
          Get Started
        </motion.button>
      </div>
    </div>
  );
}