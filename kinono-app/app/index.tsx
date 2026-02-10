import React, { useState } from 'react';
import { WelcomePage } from '../components/WelcomePage';
import { SignUpPage } from '../components/SignUpPage';
import { ManualSignUpPage } from '../components/ManualSignUpPage';
import { SignInPage } from '../components/SignInPage';
import { SuccessPage } from '../components/SuccessPage';
import { OnboardingLocation } from '../components/OnboardingLocation';
import { OnboardingInterests } from '../components/OnboardingInterests';
import { OnboardingAddFriends } from '../components/OnboardingAddFriends';
import { OnboardingCalendarSync } from '../components/OnboardingCalendarSync';
import { OnboardingComplete } from '../components/OnboardingComplete';
import { FullHomeScreen } from '../components/FullHomeScreen';
import { SearchPage } from '../components/SearchPage';
import { ProfilePage } from '../components/ProfilePage';
import { NotificationCenter } from '../components/NotificationCenter';
import { SettingsPage } from '../components/SettingsPage';

type Screen =
  | 'welcome'
  | 'signup'
  | 'manual-signup'
  | 'signin'
  | 'success'
  | 'onboarding-location'
  | 'onboarding-interests'
  | 'onboarding-friends'
  | 'onboarding-calendar'
  | 'onboarding-complete'
  | 'home'
  | 'search'
  | 'profile'
  | 'notifications'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState<string[]>([]);

  // Welcome -> Sign Up flow
  const handleWelcomeComplete = () => setCurrentScreen('signup');

  // Sign Up handlers
  const handleManualSignUp = () => setCurrentScreen('manual-signup');
  const handleSocialSignUp = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    setCurrentScreen('success');
  };
  const handleBackToSignUp = () => setCurrentScreen('signup');
  const handleSignUpComplete = () => setCurrentScreen('success');
  const handleGoToSignIn = () => setCurrentScreen('signin');

  // Sign In handler
  const handleSignIn = () => setCurrentScreen('success');

  // Success -> Onboarding
  const handleSuccessComplete = () => {
    setOnboardingStep(1);
    setCurrentScreen('onboarding-location');
  };

  // Onboarding handlers
  const handleOnboardingStepClick = (step: number) => {
    setOnboardingStep(step);
    if (step === 1) setCurrentScreen('onboarding-location');
    else if (step === 2) setCurrentScreen('onboarding-interests');
    else if (step === 3) setCurrentScreen('onboarding-friends');
    else if (step === 4) setCurrentScreen('onboarding-calendar');
  };

  const handleLocationContinue = (loc: string) => {
    setLocation(loc);
    setOnboardingStep(2);
    setCurrentScreen('onboarding-interests');
  };

  const handleInterestsContinue = (selectedInterests: string[]) => {
    setInterests(selectedInterests);
    setOnboardingStep(3);
    setCurrentScreen('onboarding-friends');
  };

  const handleFriendsContinue = () => {
    setOnboardingStep(4);
    setCurrentScreen('onboarding-calendar');
  };

  const handleCalendarContinue = () => {
    setOnboardingStep(5);
    setCurrentScreen('onboarding-complete');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('home');
  };

  const handleSkip = () => {
    // Skip to next step or complete onboarding
    if (onboardingStep < 4) {
      setOnboardingStep(onboardingStep + 1);
      if (onboardingStep === 1) setCurrentScreen('onboarding-interests');
      else if (onboardingStep === 2) setCurrentScreen('onboarding-friends');
      else if (onboardingStep === 3) setCurrentScreen('onboarding-calendar');
    } else {
      setCurrentScreen('onboarding-complete');
    }
  };

  // Home screen navigation
  const handleStartHangout = () => {
    console.log('Starting hangout...');
  };

  const handleSearchClick = () => setCurrentScreen('search');
  const handleProfileClick = () => setCurrentScreen('profile');
  const handleInboxClick = () => setCurrentScreen('notifications');
  const handleSettingsClick = () => setCurrentScreen('settings');
  const handleHomeClick = () => setCurrentScreen('home');

  // Render appropriate screen
  if (currentScreen === 'welcome') {
    return <WelcomePage onComplete={handleWelcomeComplete} />;
  }

  if (currentScreen === 'signup') {
    return (
      <SignUpPage
        onManualSignUp={handleManualSignUp}
        onSocialSignUp={handleSocialSignUp}
        onGoToSignIn={handleGoToSignIn}
      />
    );
  }

  if (currentScreen === 'manual-signup') {
    return (
      <ManualSignUpPage
        onBack={handleBackToSignUp}
        onComplete={handleSignUpComplete}
        onGoToSignIn={handleGoToSignIn}
      />
    );
  }

  if (currentScreen === 'signin') {
    return (
      <SignInPage
        onBack={handleBackToSignUp}
        onSignIn={handleSignIn}
      />
    );
  }

  if (currentScreen === 'success') {
    return (
      <SuccessPage onContinue={handleSuccessComplete} />
    );
  }

  if (currentScreen === 'onboarding-location') {
    return (
      <OnboardingLocation
        currentStep={1}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        initialLocation={location}
        onContinue={handleLocationContinue}
        onSkip={handleSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-interests') {
    return (
      <OnboardingInterests
        currentStep={2}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        initialInterests={interests}
        onContinue={handleInterestsContinue}
        onSkip={handleSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-friends') {
    return (
      <OnboardingAddFriends
        currentStep={3}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onContinue={handleFriendsContinue}
        onSkip={handleSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-calendar') {
    return (
      <OnboardingCalendarSync
        currentStep={4}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onContinue={handleCalendarContinue}
        onSkip={handleSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-complete') {
    return (
      <OnboardingComplete
        currentStep={5}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onGetStarted={handleOnboardingComplete}
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <FullHomeScreen
        onStartHangout={handleStartHangout}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
        onInboxClick={handleInboxClick}
        onSettingsClick={handleSettingsClick}
        notificationCount={3}
      />
    );
  }

  if (currentScreen === 'search') {
    return (
      <SearchPage
        onBack={handleHomeClick}
        onHomeClick={handleHomeClick}
        onStartHangout={handleStartHangout}
        onProfileClick={handleProfileClick}
        onInboxClick={handleInboxClick}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfilePage
        onBack={handleHomeClick}
        onHomeClick={handleHomeClick}
        onStartHangout={handleStartHangout}
        onSearchClick={handleSearchClick}
        onInboxClick={handleInboxClick}
      />
    );
  }

  if (currentScreen === 'notifications') {
    return (
      <NotificationCenter
        onBack={handleHomeClick}
        onHomeClick={handleHomeClick}
        onStartHangout={handleStartHangout}
        onSearchClick={handleSearchClick}
        onProfileClick={handleProfileClick}
      />
    );
  }

  if (currentScreen === 'settings') {
    return (
      <SettingsPage onBack={handleHomeClick} />
    );
  }

  return null;
}
