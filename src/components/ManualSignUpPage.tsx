import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';

interface ManualSignUpPageProps {
  onBack: () => void;
  onComplete: () => void;
  onGoToSignIn: () => void;
}

export function ManualSignUpPage({ onBack, onComplete, onGoToSignIn }: ManualSignUpPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      name: '',
      username: '',
      email: '',
      password: '',
    };

    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required.';
      isValid = false;
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required.';
      isValid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 8) {
      newErrors.password = 'Your password must be at least 8 characters long.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onComplete();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex flex-col"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="flex-1 flex flex-col">
          <div className="px-8 py-6 flex-1 flex flex-col">
            {/* Back Button */}
            <button
              onClick={onBack}
              className="mb-4 p-2 -ml-2 hover:bg-white/10 rounded-full transition-colors self-start"
            >
              <ArrowLeft className="w-6 h-6 text-white" />
            </button>

            {/* Header */}
            <div className="text-center mb-6">
              <h1 className="text-3xl font-semibold text-white mb-2">
                Sign up
              </h1>
              <p className="text-white/70 text-sm">
                Create a free account to get started
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 flex-1 flex flex-col">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-white/80 text-sm mb-2 font-medium">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className={`w-full bg-white/10 border ${
                    errors.name ? 'border-red-400' : 'border-white/20'
                  } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1.5 text-red-300 text-sm flex items-center gap-1">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center text-xs">!</span>
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Username Field */}
              <div>
                <label htmlFor="username" className="block text-white/80 text-sm mb-2 font-medium">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={(e) => handleInputChange('username', e.target.value)}
                  className={`w-full bg-white/10 border ${
                    errors.username ? 'border-red-400' : 'border-white/20'
                  } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all`}
                  placeholder="Choose a username"
                />
                {errors.username && (
                  <p className="mt-1.5 text-red-300 text-sm flex items-center gap-1">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center text-xs">!</span>
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-white/80 text-sm mb-2 font-medium">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full bg-white/10 border ${
                    errors.email ? 'border-red-400' : 'border-white/20'
                  } rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all`}
                  placeholder="Enter your email"
                />
                {errors.email && (
                  <p className="mt-1.5 text-red-300 text-sm flex items-center gap-1">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center text-xs">!</span>
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-white/80 text-sm mb-2 font-medium">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className={`w-full bg-white/10 border ${
                      errors.password ? 'border-red-400' : 'border-white/20'
                    } rounded-xl px-4 py-3 pr-12 text-white placeholder-white/40 focus:outline-none focus:border-[#9DE4CF] focus:bg-white/15 transition-all`}
                    placeholder="Create a password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9DE4CF] hover:text-[#8DD4BF] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 text-red-300 text-sm flex items-center gap-1">
                    <span className="inline-block w-4 h-4 rounded-full border-2 border-red-300 flex items-center justify-center text-xs">!</span>
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Spacer to push button to bottom */}
              <div className="flex-1"></div>

              {/* Terms */}
              <div className="text-center text-xs text-white/60">
                By signing up, you agree with our{' '}
                <button type="button" className="text-[#9DE4CF] hover:underline">
                  Terms & conditions
                </button>{' '}
                and{' '}
                <button type="button" className="text-[#9DE4CF] hover:underline">
                  Privacy statement
                </button>
                .
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-[#F59E0B] text-white rounded-2xl py-3.5 font-semibold hover:bg-[#E89450] transition-all shadow-lg"
              >
                Sign up
              </button>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-4 pb-2">
              <p className="text-white/70 text-sm">
                Already have an account?{' '}
                <button className="text-[#9DE4CF] font-medium hover:underline" onClick={onGoToSignIn}>
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}