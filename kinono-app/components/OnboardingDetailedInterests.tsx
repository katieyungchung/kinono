import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingDetailedInterestsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  selectedCategories: string[];
  initialDetailedInterests?: string[];
  onContinue: (detailedInterests: string[]) => void;
  onSkip: () => void;
  onBack: () => void;
}

// Sub-interests for each category with emojis
const categorySubInterests: { [key: string]: Array<{ emoji: string; name: string }> } = {
  outdoor: [
    { emoji: '🚶', name: 'Walks' },
    { emoji: '🥾', name: 'Hikes' },
    { emoji: '🏖️', name: 'Beach' },
    { emoji: '🌳', name: 'Parks' },
    { emoji: '⛺', name: 'Camping' },
    { emoji: '🧺', name: 'Picnics' },
    { emoji: '🛶', name: 'Kayaking' },
    { emoji: '🧗', name: 'Rock Climbing' },
  ],
  indoor: [
    { emoji: '☕', name: 'Coffee Shops' },
    { emoji: '🎬', name: 'Movies' },
    { emoji: '🎲', name: 'Board Games' },
    { emoji: '📚', name: 'Reading' },
    { emoji: '🎮', name: 'Video Games' },
    { emoji: '🍳', name: 'Cooking' },
    { emoji: '🧁', name: 'Baking' },
    { emoji: '🎨', name: 'Crafts' },
  ],
  food: [
    { emoji: '🍽️', name: 'Restaurants' },
    { emoji: '🍺', name: 'Bars' },
    { emoji: '☕', name: 'Cafes' },
    { emoji: '👨‍🍳', name: 'Cooking Classes' },
    { emoji: '🍕', name: 'Food Tours' },
    { emoji: '🍷', name: 'Wine Tasting' },
    { emoji: '🥐', name: 'Brunch' },
    { emoji: '🚚', name: 'Food Trucks' },
  ],
  wellness: [
    { emoji: '🧘', name: 'Yoga' },
    { emoji: '🧘‍♀️', name: 'Meditation' },
    { emoji: '💆', name: 'Spa' },
    { emoji: '💆‍♂️', name: 'Massage' },
    { emoji: '🌬️', name: 'Breathwork' },
    { emoji: '🔔', name: 'Sound Healing' },
    { emoji: '🧖', name: 'Sauna' },
    { emoji: '♨️', name: 'Hot Springs' },
  ],
  arts: [
    { emoji: '🏛️', name: 'Museums' },
    { emoji: '🖼️', name: 'Art Galleries' },
    { emoji: '🎵', name: 'Concerts' },
    { emoji: '🎭', name: 'Theater' },
    { emoji: '💃', name: 'Dance' },
    { emoji: '🎼', name: 'Opera' },
    { emoji: '😂', name: 'Comedy Shows' },
    { emoji: '🎥', name: 'Film Festivals' },
  ],
  nightlife: [
    { emoji: '🎸', name: 'Live Music' },
    { emoji: '🪩', name: 'Clubs' },
    { emoji: '🎧', name: 'DJ Sets' },
    { emoji: '🎤', name: 'Karaoke' },
    { emoji: '🎺', name: 'Jazz Bars' },
    { emoji: '🕺', name: 'Dance Parties' },
    { emoji: '🍻', name: 'Pub Crawls' },
    { emoji: '🌃', name: 'Rooftop Bars' },
  ],
  fitness: [
    { emoji: '🏋️', name: 'Gym' },
    { emoji: '🏃', name: 'Running' },
    { emoji: '🚴', name: 'Cycling' },
    { emoji: '⚽', name: 'Sports' },
    { emoji: '🎾', name: 'Tennis' },
    { emoji: '🏀', name: 'Basketball' },
    { emoji: '🏊', name: 'Swimming' },
    { emoji: '🏋️‍♀️', name: 'CrossFit' },
    { emoji: '🧘‍♀️', name: 'Pilates' },
  ],
  social: [
    { emoji: '🎉', name: 'Parties' },
    { emoji: '👥', name: 'Meetups' },
    { emoji: '🤝', name: 'Networking' },
    { emoji: '🎲', name: 'Game Nights' },
    { emoji: '📖', name: 'Book Clubs' },
    { emoji: '🍷', name: 'Wine & Paint' },
    { emoji: '💕', name: 'Speed Dating' },
    { emoji: '🧠', name: 'Trivia Nights' },
  ],
};

export function OnboardingDetailedInterests({
  currentStep,
  totalSteps,
  onStepClick,
  selectedCategories,
  initialDetailedInterests,
  onContinue,
  onSkip,
  onBack,
}: OnboardingDetailedInterestsProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialDetailedInterests || []);

  // Get all sub-interests based on selected categories
  const availableInterests = selectedCategories.flatMap(
    (category) => categorySubInterests[category] || []
  );

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleContinue = () => {
    onContinue(selectedInterests);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <KinonoLogo />
          </View>
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </View>

        {/* Back Button */}
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          <Text style={styles.backButtonText}>Back to categories</Text>
        </Pressable>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={styles.title}>Tell us more about your interests</Text>
          <Text style={styles.subtitle}>Select as many as you'd like</Text>
        </Animated.View>

        {/* Pills */}
        <View style={styles.pillsContainer}>
          {availableInterests.map((interest, index) => (
            <Animated.View
              key={interest.name}
              entering={FadeInDown.delay(300 + index * 30)}
            >
              <Pressable
                onPress={() => toggleInterest(interest.name)}
                style={({ pressed }) => [
                  styles.pill,
                  selectedInterests.includes(interest.name) && styles.pillSelected,
                  pressed && styles.pillPressed,
                ]}
              >
                <Text style={styles.pillEmoji}>{interest.emoji}</Text>
                <Text
                  style={[
                    styles.pillText,
                    selectedInterests.includes(interest.name) && styles.pillTextSelected,
                  ]}
                >
                  {interest.name}
                </Text>
              </Pressable>
            </Animated.View>
          ))}
        </View>

        {/* Buttons */}
        <Animated.View entering={FadeIn.delay(500)} style={styles.buttonContainer}>
          <Pressable
            onPress={handleContinue}
            disabled={selectedInterests.length === 0}
            style={({ pressed }) => [
              styles.continueButton,
              selectedInterests.length === 0 && styles.continueButtonDisabled,
              pressed && selectedInterests.length > 0 && styles.buttonPressed,
            ]}
          >
            <Text
              style={[
                styles.continueButtonText,
                selectedInterests.length === 0 && styles.continueButtonTextDisabled,
              ]}
            >
              Continue
            </Text>
          </Pressable>
          <Pressable onPress={onSkip} style={styles.skipButton}>
            <Text style={styles.skipButtonText}>Skip for now</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3D5C',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 24,
  },
  logoContainer: {
    marginBottom: 24,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '500',
  },
  titleContainer: {
    marginBottom: 32,
    paddingHorizontal: 8,
  },
  title: {
    fontSize: 26,
    fontFamily: 'ReemKufi_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 34,
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  pillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 32,
  },
  pill: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  pillSelected: {
    backgroundColor: 'rgba(157, 228, 207, 0.25)',
    borderColor: '#9DE4CF',
  },
  pillPressed: {
    opacity: 0.7,
  },
  pillEmoji: {
    fontSize: 16,
    marginRight: 2,
  },
  pillText: {
    fontSize: 15,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  pillTextSelected: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
  },
  continueButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  continueButtonDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  continueButtonTextDisabled: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
});
