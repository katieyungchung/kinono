import { useState } from 'react';
import { WelcomePage } from './components/WelcomePage';
import { SignUpPage } from './components/SignUpPage';
import { ManualSignUpPage } from './components/ManualSignUpPage';
import { SignInPage } from './components/SignInPage';
import { SuccessPage } from './components/SuccessPage';
import { OnboardingLocation } from './components/OnboardingLocation';
import { OnboardingInterests } from './components/OnboardingInterests';
import { OnboardingAddFriends } from './components/OnboardingAddFriends';
import { OnboardingCalendarSync } from './components/OnboardingCalendarSync';
import { OnboardingComplete } from './components/OnboardingComplete';
import { HomeScreen, type TrendingEvent, type TrendingFood } from './components/HomeScreen';
import { StartHangout } from './components/StartHangout';
import { SearchPage } from './components/SearchPage';
import { ProfilePage } from './components/ProfilePage';
import { NotificationCenter } from './components/NotificationCenter';
import { SettingsPage } from './components/SettingsPage';
import { MeetupReview as MeetupReviewComponent, MeetupReview as MeetupReviewType } from './components/MeetupReview';

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
  | 'start-hangout'
  | 'search'
  | 'profile'
  | 'notifications'
  | 'settings'
  | 'meetup-review';

export interface UpcomingEvent {
  id: string;
  name: string;
  friendName: string;
  date: string;
  time: string;
  imageUrl: string;
  location?: string;
  friends?: Array<{ name: string; avatar: string }>;
}

export interface Friend {
  id: number;
  name: string;
  avatar: string;
  status?: 'accepted' | 'pending' | 'declined';
}

export interface HangoutInvite {
  id: string;
  type: 'sent' | 'received' | 'review';
  friends: Friend[];
  location: string;
  date: string;
  time: string;
  message: string;
  createdAt: string;
  meetupId?: string; // For review type messages
}

const mockInvites: HangoutInvite[] = [
  {
    id: 'review-1',
    type: 'review',
    friends: [
      { id: 6, name: 'Sam', avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzY4Nzc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 7, name: 'Riley', avatar: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
      { id: 8, name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080' }
    ],
    location: "Jordan's Apartment",
    date: 'Jan 15, 2026',
    time: '7:00 PM',
    message: 'How did it go with Sam, Riley, and Alex?',
    createdAt: '1 hour ago',
    meetupId: '3' // Links to Game Night in past meetups
  },
  {
    id: '1',
    type: 'sent',
    friends: [
      { id: 1, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200', status: 'accepted' },
      { id: 2, name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?w=200', status: 'pending' }
    ],
    location: 'Blue Bottle Coffee',
    date: 'Thursday',
    time: '6pm',
    message: 'Hey! Would love to grab coffee sometime this week if you\'re around.',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    type: 'received',
    friends: [
      { id: 3, name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?w=200' }
    ],
    location: 'Tartine Bakery',
    date: 'Friday',
    time: '5:30pm',
    message: 'Want to check out that new bakery? I heard the pastries are amazing!',
    createdAt: '5 hours ago'
  },
  {
    id: '3',
    type: 'sent',
    friends: [
      { id: 4, name: 'Jamie Lee', avatar: 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?w=200', status: 'accepted' },
      { id: 5, name: 'Taylor Kim', avatar: 'https://images.unsplash.com/photo-1552334949-51934e5f2d38?w=200', status: 'accepted' }
    ],
    location: 'Golden Gate Park',
    date: 'Saturday',
    time: '2pm',
    message: 'Anyone up for a hike this weekend?',
    createdAt: 'Yesterday'
  },
  {
    id: '4',
    type: 'received',
    friends: [
      { id: 1, name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?w=200' }
    ],
    location: 'Philz Coffee',
    date: 'Sunday',
    time: '11am',
    message: 'Brunch this weekend?',
    createdAt: '1 day ago'
  }
];

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('welcome');
  const [previousScreen, setPreviousScreen] = useState<Screen | null>(null);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [hasSeentFirstInvite, setHasSeentFirstInvite] = useState(false);
  
  // Calendar and location state
  const [syncedCalendars, setSyncedCalendars] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');
  
  // Shared state for invites
  const [invites, setInvites] = useState<HangoutInvite[]>(mockInvites);
  
  // Shared state for upcoming events and notification count
  const [upcomingEvents, setUpcomingEvents] = useState<UpcomingEvent[]>([
    {
      id: 'initial-1',
      name: 'Coffee at Blue Bottle',
      friendName: 'Sarah Chen',
      date: 'Tomorrow',
      time: '6pm',
      imageUrl: 'https://images.unsplash.com/photo-1747712222828-d361033fd4de?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBsYXR0ZSUyMGFydCUyMGRhcmt8ZW58MXx8fHwxNzcwNTEyMTgxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      location: 'Blue Bottle Coffee'
    },
    {
      id: 'initial-2',
      name: 'Weekend hike',
      friendName: 'Marcus Johnson',
      date: 'Saturday',
      time: '9am',
      imageUrl: 'https://images.unsplash.com/photo-1702327605740-2f7036b6c2b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnQlMjBnYWxsZXJ5JTIwcHVycGxlfGVufDF8fHx8MTc3MDUxMjE4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      location: 'Golden Gate Park'
    }
  ]);
  const [receivedInvitesCount, setReceivedInvitesCount] = useState(3); // review-1, invite 2, and invite 4
  
  // Store onboarding data
  const [onboardingData, setOnboardingData] = useState({
    location: '',
    distance: 10,
    interests: [] as string[],
  });

  // Prefilled hangout data from trending events/food
  const [prefilledHangoutData, setPrefilledHangoutData] = useState<{
    type: 'event' | 'food' | null;
    name: string;
    location: string;
    time?: string;
    date?: string;
  } | null>(null);
  
  // Meetup review state
  const [currentReviewMeetup, setCurrentReviewMeetup] = useState<{
    id: string;
    name: string;
    date: string;
    time: string;
    location: string;
    friends: Array<{ name: string; avatar: string }>;
  } | null>(null);
  
  const [meetupReviews, setMeetupReviews] = useState<Record<string, MeetupReviewType>>({});
  
  const handleAcceptInvite = (invite: any) => {
    // Determine appropriate image and name based on location
    let imageUrl = 'https://images.unsplash.com/photo-1766094402419-67f87149efa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwcHVycGxlfGVufDF8fHx8MTc3MDU5NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
    let eventName = invite.location;
    
    const locationLower = invite.location.toLowerCase();
    if (locationLower.includes('coffee') || locationLower.includes('cafe')) {
      imageUrl = 'https://images.unsplash.com/photo-1766094402419-67f87149efa8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwYWVzdGhldGljJTIwcHVycGxlfGVufDF8fHx8MTc3MDU5NTcwM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      eventName = `Coffee at ${invite.location}`;
    } else if (locationLower.includes('bakery') || locationLower.includes('pastry')) {
      imageUrl = 'https://images.unsplash.com/photo-1583339522870-0d9f28cef33f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYWtlcnklMjBwYXN0cmllcyUyMHB1cnBsZSUyMHRvbmVzfGVufDF8fHx8MTc3MDU5NTcwNHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      eventName = `Treats at ${invite.location}`;
    } else if (locationLower.includes('park')) {
      imageUrl = 'https://images.unsplash.com/photo-1669232781852-5e87b9f0c8d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJrJTIwbmF0dXJlJTIwcHVycGxlJTIwc3Vuc2V0fGVufDF8fHx8MTc3MDU5NTcwNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      eventName = `Hangout at ${invite.location}`;
    } else if (locationLower.includes('restaurant') || locationLower.includes('dinner') || locationLower.includes('brunch') || locationLower.includes('lunch')) {
      imageUrl = 'https://images.unsplash.com/photo-1661331564911-6ba9d3d31b7f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwZGlubmVyJTIwcHVycGxlJTIwbGlnaHRpbmd8ZW58MXx8fHwxNzcwNTk1NzA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral';
      eventName = `Meal at ${invite.location}`;
    }
    
    // Add the accepted invite to upcoming events
    const newEvent: UpcomingEvent = {
      id: invite.id,
      name: eventName,
      friendName: invite.friends[0]?.name || 'Friend',
      date: invite.date,
      time: invite.time,
      imageUrl: imageUrl,
      location: invite.location,
      friends: invite.friends
    };
    
    setUpcomingEvents(prev => [...prev, newEvent]);
  };

  const handleUpdateReceivedInvitesCount = (count: number) => {
    setReceivedInvitesCount(count);
  };

  const handleWelcomeComplete = () => {
    setCurrentScreen('signup');
  };

  const handleManualSignUp = () => {
    setCurrentScreen('manual-signup');
  };

  const handleSocialSignUp = (provider: string) => {
    console.log(`Signing up with ${provider}`);
    // Here you would handle the social login flow
    setCurrentScreen('success');
  };

  const handleBackToSignUp = () => {
    setCurrentScreen('signup');
  };

  const handleSignUpComplete = () => {
    console.log('Sign up complete');
    setCurrentScreen('success');
  };

  const handleGoToSignIn = () => {
    setCurrentScreen('signin');
  };

  const handleSignIn = () => {
    console.log('Sign in complete');
    setCurrentScreen('home');
  };

  const handleSuccessComplete = () => {
    setOnboardingStep(1);
    setCurrentScreen('onboarding-location');
  };

  const handleOnboardingLocationContinue = (location: string) => {
    console.log('Location:', location);
    setOnboardingData(prev => ({ ...prev, location }));
    setOnboardingStep(2);
    setCurrentScreen('onboarding-interests');
  };

  const handleOnboardingLocationSkip = () => {
    setOnboardingStep(2);
    setCurrentScreen('onboarding-interests');
  };

  const handleOnboardingInterestsContinue = (interests: string[]) => {
    console.log('Interests:', interests);
    setOnboardingData(prev => ({ ...prev, interests }));
    setOnboardingStep(3);
    setCurrentScreen('onboarding-friends');
  };

  const handleOnboardingInterestsSkip = () => {
    setOnboardingStep(3);
    setCurrentScreen('onboarding-friends');
  };

  const handleOnboardingAddFriendsContinue = () => {
    setOnboardingStep(4);
    setCurrentScreen('onboarding-calendar');
  };

  const handleOnboardingAddFriendsSkip = () => {
    setOnboardingStep(4);
    setCurrentScreen('onboarding-calendar');
  };

  const handleOnboardingCalendarSyncContinue = (syncedCalendar?: string) => {
    if (syncedCalendar) {
      // Map the provider to the calendar ID
      const calendarMap: { [key: string]: string } = {
        'gmail': 'google',
        'outlook': 'outlook',
        'manual': 'google' // default to google for manual
      };
      const calendarId = calendarMap[syncedCalendar] || syncedCalendar;
      setSyncedCalendars([calendarId]);
    }
    setOnboardingStep(5);
    setCurrentScreen('onboarding-complete');
  };

  const handleOnboardingCalendarSyncSkip = () => {
    setOnboardingStep(5);
    setCurrentScreen('onboarding-complete');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('home');
  };

  const handleOnboardingStepClick = (step: number) => {
    setOnboardingStep(step);
    if (step === 1) {
      setCurrentScreen('onboarding-location');
    } else if (step === 2) {
      setCurrentScreen('onboarding-interests');
    } else if (step === 3) {
      setCurrentScreen('onboarding-friends');
    } else if (step === 4) {
      setCurrentScreen('onboarding-calendar');
    } else if (step === 5) {
      setCurrentScreen('onboarding-complete');
    }
  };

  const handleStartHangout = () => {
    setPrefilledHangoutData(null); // Clear any prefilled data
    setCurrentScreen('start-hangout');
  };

  const handleStartHangoutWithEvent = (event: TrendingEvent) => {
    setPrefilledHangoutData({
      type: 'event',
      name: event.title,
      location: event.venue,
      time: event.time,
      date: event.date
    });
    setCurrentScreen('start-hangout');
  };

  const handleStartHangoutWithFood = (food: TrendingFood) => {
    setPrefilledHangoutData({
      type: 'food',
      name: food.name,
      location: food.location,
    });
    setCurrentScreen('start-hangout');
  };

  const handleBackToHome = () => {
    setCurrentScreen('home');
  };

  const handleGoToSearch = () => {
    setCurrentScreen('search');
  };

  const handleSendInvite = (inviteData: {
    friends: Array<{ id: number; name: string; avatar: string }>;
    location: string;
    date: string;
    time: string;
    message: string;
  }) => {
    console.log('Invite sent!', inviteData);
    
    // Create a new sent invite
    const newInvite: HangoutInvite = {
      id: `sent-${Date.now()}`,
      type: 'sent',
      friends: inviteData.friends.map(f => ({ ...f, status: 'pending' as const })),
      location: inviteData.location,
      date: inviteData.date,
      time: inviteData.time,
      message: inviteData.message,
      createdAt: 'Just now'
    };
    
    // Add the new invite to the beginning of the invites list
    setInvites(prev => [newInvite, ...prev]);
    
    setHasSeentFirstInvite(true);
    setCurrentScreen('home');
  };

  const handleGoToProfile = () => {
    setCurrentScreen('profile');
  };

  const handleGoToNotifications = () => {
    setCurrentScreen('notifications');
  };

  const handleGoToSettings = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen('settings');
  };

  const handleBackFromSettings = () => {
    if (previousScreen && (previousScreen === 'home' || previousScreen === 'profile')) {
      setCurrentScreen(previousScreen);
    } else {
      setCurrentScreen('home');
    }
    setPreviousScreen(null);
  };

  const handleOpenReview = (meetupId: string) => {
    // Find the meetup in the past meetups data
    const pastMeetups = [
      {
        id: '3',
        name: 'Game Night',
        date: 'Jan 15, 2026',
        time: '7:00 PM',
        location: "Jordan's Apartment",
        friends: [
          { name: 'Sam', avatar: 'https://images.unsplash.com/photo-1724435811349-32d27f4d5806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFkc2hvdCUyMHByb2ZpbGV8ZW58MXx8fHwxNzY4Nzc2MTk3fDA&ixlib=rb-4.1.0&q=80&w=1080' },
          { name: 'Riley', avatar: 'https://images.unsplash.com/photo-1484863137850-59afcfe05386?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nfGVufDF8fHx8MTc2ODc1Nzc4Nnww&ixlib=rb-4.1.0&q=80&w=1080' },
          { name: 'Alex', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGZhY2V8ZW58MXx8fHwxNzY4NjY0ODU5fDA&ixlib=rb-4.1.0&q=80&w=1080' },
          { name: 'Pat', avatar: 'https://images.unsplash.com/photo-1719997794654-a1e744ac83a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBvdXRkb29yfGVufDF8fHx8MTc2ODc3NjE5OXww&ixlib=rb-4.1.0&q=80&w=1080' },
          { name: 'Jordan', avatar: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlcnNvbnxlbnwxfHx8fDE3Njg3NzYxOTl8MA&ixlib=rb-4.1.0&q=80&w=1080' },
        ],
      }
    ];

    const meetup = pastMeetups.find(m => m.id === meetupId);
    if (meetup) {
      setCurrentReviewMeetup(meetup);
      setCurrentScreen('meetup-review');
    }
  };

  const handleSubmitReview = (review: MeetupReviewType) => {
    // Store the review
    setMeetupReviews(prev => ({
      ...prev,
      [review.meetupId]: review
    }));

    // Remove the review request from invites
    setInvites(prev => prev.filter(inv => inv.meetupId !== review.meetupId));

    // Go back to notifications
    setCurrentScreen('notifications');
    setCurrentReviewMeetup(null);
  };

  const handleBackFromReview = () => {
    setCurrentScreen('notifications');
    setCurrentReviewMeetup(null);
  };
  
  // Show the appropriate screen
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
      <SuccessPage
        onContinue={handleSuccessComplete}
      />
    );
  }

  if (currentScreen === 'onboarding-location') {
    return (
      <OnboardingLocation
        currentStep={onboardingStep}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        initialLocation={onboardingData.location}
        initialDistance={onboardingData.distance}
        onContinue={handleOnboardingLocationContinue}
        onSkip={handleOnboardingLocationSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-interests') {
    return (
      <OnboardingInterests
        currentStep={onboardingStep}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        initialInterests={onboardingData.interests}
        onContinue={handleOnboardingInterestsContinue}
        onSkip={handleOnboardingInterestsSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-friends') {
    return (
      <OnboardingAddFriends
        currentStep={onboardingStep}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onContinue={handleOnboardingAddFriendsContinue}
        onSkip={handleOnboardingAddFriendsSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-calendar') {
    return (
      <OnboardingCalendarSync
        currentStep={onboardingStep}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onContinue={handleOnboardingCalendarSyncContinue}
        onSkip={handleOnboardingCalendarSyncSkip}
      />
    );
  }

  if (currentScreen === 'onboarding-complete') {
    return (
      <OnboardingComplete
        currentStep={onboardingStep}
        totalSteps={5}
        onStepClick={handleOnboardingStepClick}
        onGetStarted={handleOnboardingComplete}
      />
    );
  }

  if (currentScreen === 'home') {
    return (
      <HomeScreen
        onStartHangout={handleStartHangout}
        onSearchClick={handleGoToSearch}
        hasSeentFirstInvite={hasSeentFirstInvite}
        onProfileClick={handleGoToProfile}
        onInboxClick={handleGoToNotifications}
        onSettingsClick={handleGoToSettings}
        notificationCount={receivedInvitesCount}
        upcomingEvents={upcomingEvents}
        onStartHangoutWithEvent={handleStartHangoutWithEvent}
        onStartHangoutWithFood={handleStartHangoutWithFood}
      />
    );
  }

  if (currentScreen === 'start-hangout') {
    return (
      <StartHangout
        onBack={handleBackToHome}
        onSendInvite={handleSendInvite}
        onHomeClick={handleBackToHome}
        onSearchClick={handleGoToSearch}
        onProfileClick={handleGoToProfile}
        onInboxClick={handleGoToNotifications}
        notificationCount={receivedInvitesCount}
        prefilledData={prefilledHangoutData}
      />
    );
  }

  if (currentScreen === 'search') {
    return (
      <SearchPage
        onBack={handleBackToHome}
        onHomeClick={handleBackToHome}
        onStartHangout={handleStartHangout}
        onProfileClick={handleGoToProfile}
        onInboxClick={handleGoToNotifications}
        notificationCount={receivedInvitesCount}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfilePage
        onHomeClick={handleBackToHome}
        onStartHangout={handleStartHangout}
        onSearchClick={handleGoToSearch}
        onInboxClick={handleGoToNotifications}
        onSettingsClick={handleGoToSettings}
        notificationCount={receivedInvitesCount}
        upcomingEvents={upcomingEvents}
        meetupReviews={meetupReviews}
      />
    );
  }

  if (currentScreen === 'notifications') {
    return (
      <NotificationCenter
        onHomeClick={handleBackToHome}
        onStartHangout={handleStartHangout}
        onSearchClick={handleGoToSearch}
        onProfileClick={handleGoToProfile}
        onAcceptInvite={handleAcceptInvite}
        onUpdateReceivedInvitesCount={handleUpdateReceivedInvitesCount}
        invites={invites}
        onUpdateInvites={setInvites}
        onOpenReview={handleOpenReview}
      />
    );
  }

  if (currentScreen === 'settings') {
    return (
      <SettingsPage
        onHomeClick={handleBackToHome}
        onStartHangout={handleStartHangout}
        onSearchClick={handleGoToSearch}
        onProfileClick={handleGoToProfile}
        onInboxClick={handleGoToNotifications}
        notificationCount={receivedInvitesCount}
        onBack={handleBackFromSettings}
        syncedCalendars={syncedCalendars}
        onUpdateSyncedCalendars={setSyncedCalendars}
        userLocation={userLocation}
        onUpdateLocation={setUserLocation}
        previousScreen={previousScreen as 'home' | 'profile'}
      />
    );
  }

  if (currentScreen === 'meetup-review') {
    if (!currentReviewMeetup) {
      setCurrentScreen('notifications');
      return null;
    }
    
    return (
      <MeetupReviewComponent
        meetup={currentReviewMeetup}
        onBack={handleBackFromReview}
        onSubmit={handleSubmitReview}
      />
    );
  }

  // Placeholder for the main app
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-[375px] h-[812px] bg-[#5A3D5C] shadow-2xl rounded-3xl overflow-hidden flex items-center justify-center">
        <div className="text-center text-white px-8">
          <h1 className="text-3xl font-semibold mb-4">Welcome to Kinono!</h1>
          <p className="text-white/70">Main app will go here.</p>
        </div>
      </div>
    </div>
  );
}