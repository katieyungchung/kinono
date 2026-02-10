import { View, Text, StyleSheet, Pressable, TextInput, ScrollView, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';
import Slider from '@react-native-community/slider';

interface OnboardingLocationProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  initialLocation?: string;
  initialDistance?: number;
  onContinue: (location: string) => void;
  onSkip: () => void;
}

export function OnboardingLocation({ 
  currentStep, 
  totalSteps, 
  onStepClick, 
  initialLocation = '', 
  initialDistance = 10, 
  onContinue, 
  onSkip 
}: OnboardingLocationProps) {
  const [location, setLocation] = useState(initialLocation);
  const [distance, setDistance] = useState(initialDistance);
  const [showLocationDialog, setShowLocationDialog] = useState(false);

  const handleUseCurrentLocation = () => {
    setShowLocationDialog(true);
  };

  const handleAllowLocation = () => {
    // Simulate getting actual location
    setLocation('Los Angeles, CA');
    setShowLocationDialog(false);
  };

  const handleDenyLocation = () => {
    setShowLocationDialog(false);
  };

  const handleContinue = () => {
    if (location) {
      onContinue(location);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Location Permission Dialog */}
      <Modal
        visible={showLocationDialog}
        transparent={true}
        animationType="fade"
        onRequestClose={handleDenyLocation}
      >
        <View style={styles.modalOverlay}>
          <Animated.View 
            entering={FadeIn}
            style={styles.modalContent}
          >
            <View style={styles.modalHeader}>
              <Ionicons name="location" size={64} color="#5A3D5C" />
            </View>
            <Text style={styles.modalTitle}>
              Allow "Kinono" to access your location?
            </Text>
            <Text style={styles.modalSubtitle}>
              This helps us find hangouts and activities near you.
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                onPress={handleDenyLocation}
                style={[styles.modalButton, styles.modalButtonBorder]}
              >
                <Text style={styles.modalButtonText}>Don't Allow</Text>
              </Pressable>
              <Pressable
                onPress={handleAllowLocation}
                style={styles.modalButton}
              >
                <Text style={[styles.modalButtonText, styles.modalButtonBold]}>Allow</Text>
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header with logo and progress */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <KinonoLogo />
          </View>
          <OnboardingProgressBar 
            currentStep={currentStep} 
            totalSteps={totalSteps} 
            onStepClick={onStepClick} 
          />
        </View>

        {/* Content */}
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.titleContainer}
        >
          <Text style={styles.title}>
            Where should Kinono look for you?
          </Text>
          <Text style={styles.subtitle}>
            Sharing your location helps Kinono find hangouts near you. Don't worry, your data is private and never shared.
          </Text>
        </Animated.View>

        <Animated.View 
          entering={FadeInDown.delay(300)}
          style={styles.formContainer}
        >
          {/* Search input */}
          <View style={styles.searchContainer}>
            <Ionicons 
              name="search" 
              size={20} 
              color="rgba(255, 255, 255, 0.4)" 
              style={styles.searchIcon}
            />
            <TextInput
              style={styles.input}
              value={location}
              onChangeText={setLocation}
              placeholder="City, area, or post code"
              placeholderTextColor="rgba(255, 255, 255, 0.4)"
            />
          </View>

          {/* Use current location */}
          <Pressable 
            onPress={handleUseCurrentLocation}
            style={styles.locationButton}
          >
            <Ionicons name="navigate" size={20} color="rgba(255, 255, 255, 0.8)" />
            <Text style={styles.locationButtonText}>Use my current location</Text>
          </Pressable>

          {/* Distance slider */}
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderLabel}>
              How far are you willing to go for a hangout?
            </Text>
            <View style={styles.sliderRow}>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={50}
                value={distance}
                onValueChange={setDistance}
                minimumTrackTintColor="#9DE4CF"
                maximumTrackTintColor="rgba(255, 255, 255, 0.2)"
                thumbTintColor="#9DE4CF"
              />
              <Text style={styles.sliderValue}>{Math.round(distance)} miles</Text>
            </View>
          </View>
        </Animated.View>

        {/* Map placeholder */}
        <Animated.View 
          entering={FadeInDown.delay(400)}
          style={styles.mapPlaceholder}
        >
          <Ionicons name="map" size={48} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.mapText}>
            Map will appear here
          </Text>
          <Text style={styles.mapSubtext}>
            {location || 'Enter a location above'}
          </Text>
        </Animated.View>

        {/* Buttons */}
        <Animated.View 
          entering={FadeIn.delay(500)}
          style={styles.buttonContainer}
        >
          <Pressable
            onPress={handleContinue}
            disabled={!location}
            style={({ pressed }) => [
              styles.continueButton,
              !location && styles.continueButtonDisabled,
              pressed && location && styles.buttonPressed,
            ]}
          >
            <Text style={[
              styles.continueButtonText,
              !location && styles.continueButtonTextDisabled
            ]}>
              Continue
            </Text>
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
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  logoContainer: {
    marginBottom: 16,
  },
  titleContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 18,
    paddingHorizontal: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 12,
  },
  searchIcon: {
    position: 'absolute',
    left: 16,
    top: 12,
    zIndex: 1,
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 16,
    paddingLeft: 48,
    paddingRight: 16,
    paddingVertical: 12,
    fontSize: 14,
    color: '#FFFFFF',
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  locationButtonText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  sliderContainer: {
    marginBottom: 12,
  },
  sliderLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  sliderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  slider: {
    flex: 1,
    height: 40,
  },
  sliderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 60,
    textAlign: 'right',
  },
  mapPlaceholder: {
    flex: 1,
    minHeight: 180,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    padding: 20,
  },
  mapText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 12,
  },
  mapSubtext: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.4)',
    marginTop: 4,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    maxWidth: 280,
    width: '100%',
    overflow: 'hidden',
  },
  modalHeader: {
    padding: 24,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  modalSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  modalButtons: {
    borderTopWidth: 1,
    borderTopColor: '#D1D5DB',
  },
  modalButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#D1D5DB',
  },
  modalButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    fontWeight: '500',
  },
  modalButtonBold: {
    fontWeight: '600',
  },
});

