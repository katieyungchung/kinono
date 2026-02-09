import { motion, AnimatePresence } from 'motion/react';
import { X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SocialAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: 'google' | 'facebook' | 'instagram';
  onComplete: () => void;
}

export function SocialAuthModal({ isOpen, onClose, provider, onComplete }: SocialAuthModalProps) {
  const [step, setStep] = useState<'loading' | 'permissions' | 'completing'>('loading');
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (isOpen) {
      setStep('loading');
      setSelectedPermissions(new Set());
      
      // Simulate initial loading
      const timer = setTimeout(() => {
        setStep('permissions');
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleContinue = () => {
    setStep('completing');
    
    // Simulate completing the auth
    setTimeout(() => {
      onComplete();
    }, 1500);
  };

  const providerConfig = {
    google: {
      name: 'Google',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
      ),
      color: '#4285F4',
      buttonColor: '#4285F4',
      permissions: [
        'View your email address',
        'View your basic profile info',
        'Associate you with your personal info on Kinono'
      ],
      account: 'user@gmail.com'
    },
    facebook: {
      name: 'Facebook',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="#1877F2">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: '#1877F2',
      buttonColor: '#1877F2',
      permissions: [
        'Access your public profile',
        'Access your email address',
        'Allow Kinono to post on your behalf'
      ],
      account: 'user@facebook.com'
    },
    instagram: {
      name: 'Instagram',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24">
          <defs>
            <linearGradient id="instagram-gradient" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FD5949" />
              <stop offset="50%" stopColor="#D6249F" />
              <stop offset="100%" stopColor="#285AEB" />
            </linearGradient>
          </defs>
          <path
            fill="url(#instagram-gradient)"
            d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"
          />
        </svg>
      ),
      color: '#E4405F',
      buttonColor: 'linear-gradient(45deg, #FD5949, #D6249F, #285AEB)',
      permissions: [
        'Access your profile information',
        'Allow Kinono to access your account'
      ],
      account: '@username'
    }
  };

  const config = providerConfig[provider];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0">
                  {config.logo}
                </div>
                <div>
                  <h2 className="font-semibold text-gray-900">
                    Sign in with {config.name}
                  </h2>
                  <p className="text-sm text-gray-500">Continue to Kinono</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="px-6 py-8">
              {step === 'loading' && (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="relative w-16 h-16 mb-6">
                    <motion.div
                      className="absolute inset-0 border-4 border-gray-200 rounded-full"
                    />
                    <motion.div
                      className="absolute inset-0 border-4 border-t-transparent rounded-full"
                      style={{ borderColor: config.color }}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <p className="text-gray-600 text-center">
                    Connecting to {config.name}...
                  </p>
                </motion.div>
              )}

              {step === 'permissions' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Account Selection */}
                  <div className="mb-6">
                    <p className="text-sm text-gray-600 mb-3">Choose an account</p>
                    <button className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-2xl hover:border-gray-300 transition-all bg-gray-50">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium"
                        style={{ 
                          background: typeof config.buttonColor === 'string' && config.buttonColor.startsWith('linear-gradient')
                            ? config.buttonColor
                            : config.buttonColor
                        }}
                      >
                        {config.account[0].toUpperCase()}
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium text-gray-900">{config.account}</p>
                        <p className="text-sm text-gray-500">Personal account</p>
                      </div>
                      <Check className="w-5 h-5 text-green-600" />
                    </button>
                  </div>

                  {/* Permissions */}
                  <div className="mb-6">
                    <p className="text-sm font-medium text-gray-900 mb-3">
                      Kinono wants to:
                    </p>
                    <div className="space-y-2">
                      {config.permissions.map((permission, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div
                            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                            style={{ backgroundColor: config.color }}
                          >
                            <Check className="w-3 h-3 text-white" />
                          </div>
                          <p className="text-sm text-gray-700">{permission}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Privacy Notice */}
                  <div className="mb-6 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                    <p className="text-xs text-gray-600 leading-relaxed">
                      By continuing, you allow Kinono to receive your {config.name} profile information. 
                      {' '}Learn more about our privacy policy.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <button
                      onClick={onClose}
                      className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-all font-medium"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleContinue}
                      className="flex-1 px-6 py-3 text-white rounded-2xl hover:opacity-90 transition-all font-semibold shadow-lg"
                      style={{ 
                        background: typeof config.buttonColor === 'string' && config.buttonColor.startsWith('linear-gradient')
                          ? config.buttonColor
                          : config.buttonColor
                      }}
                    >
                      Continue
                    </button>
                  </div>
                </motion.div>
              )}

              {step === 'completing' && (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ backgroundColor: config.color }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 300 }}
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ delay: 0.2, type: "spring", damping: 15 }}
                    >
                      <Check className="w-10 h-10 text-white" />
                    </motion.div>
                  </motion.div>
                  <p className="font-semibold text-gray-900 text-lg mb-2">
                    Successfully connected!
                  </p>
                  <p className="text-gray-600 text-center">
                    Creating your Kinono account...
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}