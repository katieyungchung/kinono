import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
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
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <KinonoLogo />
          </View>
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </View>

        {/* Center content */}
        <View style={styles.centerContent}>
          <Animated.View entering={FadeInDown.delay(200)} style={styles.card}>
            {/* Success checkmark */}
            <Animated.View entering={ZoomIn.delay(400)} style={styles.checkmarkContainer}>
              <View style={styles.checkmark}>
                <Ionicons name="checkmark" size={64} color="#5A3D5C" />
              </View>
            </Animated.View>

            {/* Text */}
            <Animated.View entering={FadeIn.delay(800)}>
              <Text style={styles.title}>You're all set!</Text>
              <Text style={styles.subtitle}>
                Start exploring and connecting with people who share your interests.
              </Text>
            </Animated.View>
          </Animated.View>
        </View>

        {/* Bottom button */}
        <Animated.View entering={FadeInDown.delay(1000)} style={styles.buttonContainer}>
          <Pressable
            onPress={onGetStarted}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed,
            ]}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3D5C',
  },
  content: {
    flex: 1,
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
  centerContent: {
    flex: 1,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: 48,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
  },
  checkmarkContainer: {
    marginBottom: 32,
  },
  checkmark: {
    width: 128,
    height: 128,
    backgroundColor: '#9DE4CF',
    borderRadius: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontFamily: 'ReemKufi_600SemiBold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    marginTop: 24,
  },
  button: {
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
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

