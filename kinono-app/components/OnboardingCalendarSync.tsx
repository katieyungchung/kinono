import { View, Text, StyleSheet, Pressable, ScrollView, Modal, TextInput, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingCalendarSyncProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onContinue: (syncedCalendar?: string) => void;
  onSkip: () => void;
}

type SyncProvider = 'gmail' | 'outlook' | 'manual' | null;

export function OnboardingCalendarSync({ currentStep, totalSteps, onStepClick, onContinue, onSkip }: OnboardingCalendarSyncProps) {
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<SyncProvider>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSynced, setIsSynced] = useState(false);
  const [syncedProvider, setSyncedProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleProviderClick = (provider: SyncProvider) => {
    setSelectedProvider(provider);
    setShowSyncModal(true);
    setEmail('');
    setPassword('');
  };

  const handleSync = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    setIsSynced(true);
    setSyncedProvider(selectedProvider);
    setShowSyncModal(false);
  };

  const getProviderName = () => {
    if (selectedProvider === 'gmail') return 'Gmail';
    if (selectedProvider === 'outlook') return 'Outlook';
    return 'Email';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Sync Modal */}
      <Modal visible={showSyncModal} transparent animationType="fade" onRequestClose={() => setShowSyncModal(false)}>
        <View style={styles.modalOverlay}>
          <Animated.View entering={FadeIn} style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Pressable onPress={() => setShowSyncModal(false)} style={styles.closeButton}>
                <Ionicons name="close" size={24} color="#5A3D5C" />
              </Pressable>
              <Text style={styles.modalTitle}>Sign in with {getProviderName()}</Text>
            </View>

            <View style={styles.modalBody}>
              <TextInput
                style={styles.modalInput}
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              <TextInput
                style={styles.modalInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#999"
                secureTextEntry
              />
              <Pressable
                onPress={handleSync}
                disabled={!email || !password || isLoading}
                style={({ pressed }) => [
                  styles.modalButton,
                  (!email || !password || isLoading) && styles.modalButtonDisabled,
                  pressed && styles.buttonPressed,
                ]}
              >
                {isLoading ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.modalButtonText}>Sync Calendar</Text>
                )}
              </Pressable>
            </View>
          </Animated.View>
        </View>
      </Modal>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <KinonoLogo />
          </View>
          <OnboardingProgressBar currentStep={currentStep} totalSteps={totalSteps} onStepClick={onStepClick} />
        </View>

        {/* Title */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.titleContainer}>
          <Text style={styles.title}>Sync your calendar</Text>
          <Text style={styles.subtitle}>
            We'll use your calendar to find times when you're free to hang out
          </Text>
        </Animated.View>

        {/* Success Message */}
        {isSynced && (
          <Animated.View entering={FadeIn} style={styles.successContainer}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={20} color="#9DE4CF" />
            </View>
            <View style={styles.successContent}>
              <Text style={styles.successTitle}>Calendar synced! 🎉</Text>
              <Text style={styles.successText}>Your {syncedProvider} calendar is now connected</Text>
            </View>
          </Animated.View>
        )}

        {/* Calendar Options */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.optionsContainer}>
          <Pressable
            onPress={() => handleProviderClick('gmail')}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="logo-google" size={24} color="#5A3D5C" />
            </View>
            <Text style={styles.optionText}>Gmail</Text>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
          </Pressable>

          <Pressable
            onPress={() => handleProviderClick('outlook')}
            style={({ pressed }) => [styles.option, pressed && styles.optionPressed]}
          >
            <View style={styles.optionIconContainer}>
              <Ionicons name="mail" size={24} color="#5A3D5C" />
            </View>
            <Text style={styles.optionText}>Outlook</Text>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
          </Pressable>
        </Animated.View>

        {/* Buttons */}
        <Animated.View entering={FadeIn.delay(500)} style={styles.buttonContainer}>
          <Pressable
            onPress={() => onContinue(syncedProvider || undefined)}
            style={({ pressed }) => [styles.continueButton, pressed && styles.buttonPressed]}
          >
            <Text style={styles.continueButtonText}>Continue</Text>
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
  container: { flex: 1, backgroundColor: '#5A3D5C' },
  scrollView: { flex: 1 },
  scrollContent: { paddingHorizontal: 24, paddingTop: 32, paddingBottom: 24 },
  header: { marginBottom: 24 },
  logoContainer: { marginBottom: 24, alignItems: 'center' },
  titleContainer: { marginBottom: 32, alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '600', color: '#FFFFFF', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: 'rgba(255, 255, 255, 0.7)', textAlign: 'center', lineHeight: 24 },
  successContainer: { flexDirection: 'row', backgroundColor: '#D4F4E7', borderRadius: 16, padding: 16, marginBottom: 24, gap: 12 },
  successIcon: { width: 40, height: 40, backgroundColor: '#5A3D5C', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  successContent: { flex: 1 },
  successTitle: { fontSize: 16, fontWeight: '600', color: '#5A3D5C', marginBottom: 4 },
  successText: { fontSize: 14, color: '#5A3D5C' },
  optionsContainer: { marginBottom: 32, gap: 12 },
  option: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 16, padding: 16, gap: 12 },
  optionPressed: { opacity: 0.7 },
  optionIconContainer: { width: 40, height: 40, backgroundColor: '#9DE4CF', borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  optionText: { flex: 1, fontSize: 16, fontWeight: '500', color: '#FFFFFF' },
  buttonContainer: { gap: 12 },
  continueButton: { backgroundColor: '#F59E0B', borderRadius: 16, paddingVertical: 14, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 8 },
  continueButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
  buttonPressed: { opacity: 0.8, transform: [{ scale: 0.98 }] },
  skipButton: { paddingVertical: 12, alignItems: 'center' },
  skipButtonText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', justifyContent: 'center', padding: 24 },
  modalContent: { backgroundColor: '#FFFFFF', borderRadius: 24, overflow: 'hidden' },
  modalHeader: { flexDirection: 'row', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E5E7EB' },
  closeButton: { marginRight: 12 },
  modalTitle: { fontSize: 18, fontWeight: '600', color: '#111827' },
  modalBody: { padding: 24, gap: 16 },
  modalInput: { backgroundColor: '#F3F4F6', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 12, fontSize: 16, color: '#111827' },
  modalButton: { backgroundColor: '#F59E0B', borderRadius: 12, paddingVertical: 14, alignItems: 'center' },
  modalButtonDisabled: { backgroundColor: '#D1D5DB' },
  modalButtonText: { fontSize: 16, fontWeight: '600', color: '#FFFFFF' },
});

