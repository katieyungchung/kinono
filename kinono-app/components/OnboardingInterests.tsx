import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
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
  { id: 'outdoor', title: 'Outdoor Activities', emoji: '🏕️' },
  { id: 'indoor', title: 'Indoor Activities', emoji: '☕' },
  { id: 'food', title: 'Food & Drink', emoji: '🍽️' },
  { id: 'wellness', title: 'Wellness', emoji: '🧘' },
  { id: 'arts', title: 'Arts & Culture', emoji: '🎨' },
  { id: 'nightlife', title: 'Music & Nightlife', emoji: '🎵' },
  { id: 'fitness', title: 'Fitness', emoji: '💪' },
  { id: 'social', title: 'Social & Events', emoji: '🎉' },
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

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={styles.title}>What are your interests?</Text>
          <Text style={styles.subtitle}>Choose up to 5.</Text>
        </Animated.View>

        {/* Interest grid */}
        <View style={styles.grid}>
          {interestCategories.map((category, index) => (
            <Animated.View
              key={category.id}
              entering={FadeInDown.delay(300 + index * 50)}
              style={styles.gridItem}
            >
              <Pressable
                onPress={() => toggleInterest(category.id)}
                style={({ pressed }) => [
                  styles.interestCard,
                  selectedInterests.includes(category.id) && styles.interestCardSelected,
                  pressed && styles.interestCardPressed,
                ]}
              >
                <Text style={styles.emoji}>{category.emoji}</Text>
                <Text style={styles.interestTitle}>{category.title}</Text>
                {selectedInterests.includes(category.id) && (
                  <View style={styles.checkmark}>
                    <Ionicons name="checkmark" size={12} color="#5A3D5C" />
                  </View>
                )}
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
            <Text style={[
              styles.continueButtonText,
              selectedInterests.length === 0 && styles.continueButtonTextDisabled
            ]}>
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
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: 'ReemKufi_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  gridItem: {
    width: '48%',
  },
  interestCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    padding: 16,
    height: 100,
    position: 'relative',
    justifyContent: 'center',
  },
  interestCardSelected: {
    backgroundColor: 'rgba(157, 228, 207, 0.2)',
    borderColor: '#9DE4CF',
  },
  interestCardPressed: {
    opacity: 0.8,
  },
  emoji: {
    fontSize: 32,
    marginBottom: 6,
  },
  interestTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  checkmark: {
    position: 'absolute',
    bottom: 12,
    right: 12,
    width: 20,
    height: 20,
    backgroundColor: '#9DE4CF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    gap: 12,
  },
  continueButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 14,
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

