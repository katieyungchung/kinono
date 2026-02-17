import { View, Text, StyleSheet, Pressable, TextInput, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { OnboardingProgressBar } from './OnboardingProgressBar';

interface OnboardingAddFriendsProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
  onContinue: () => void;
  onSkip: () => void;
}

const mockUsers = [
  { id: 6, name: 'Jessica Park', username: '@jessicap' },
  { id: 7, name: 'Ryan Smith', username: '@ryansmith' },
  { id: 8, name: 'Lisa Brown', username: '@lisab' },
];

export function OnboardingAddFriends({ currentStep, totalSteps, onStepClick, onContinue, onSkip }: OnboardingAddFriendsProps) {
  const [username, setUsername] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<typeof mockUsers>([]);

  const filteredUsers = username
    ? mockUsers.filter(user =>
        user.name.toLowerCase().includes(username.toLowerCase()) ||
        user.username.toLowerCase().includes(username.toLowerCase())
      )
    : [];

  const handleSelectUser = (user: typeof mockUsers[0]) => {
    if (!selectedUsers.find(f => f.id === user.id)) {
      setSelectedUsers([...selectedUsers, user]);
    }
    setUsername('');
  };

  const handleRemoveUser = (id: number) => {
    setSelectedUsers(selectedUsers.filter(f => f.id !== id));
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
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
          <Text style={styles.title}>Find friends on Kinono</Text>
          <Text style={styles.subtitle}>Search for friends by username</Text>
        </Animated.View>

        {/* Search */}
        <Animated.View entering={FadeInDown.delay(300)} style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.4)" style={styles.searchIcon} />
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Search by username"
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
            autoCapitalize="none"
          />
        </Animated.View>

        {/* Search Results */}
        {filteredUsers.length > 0 && (
          <View style={styles.resultsContainer}>
            {filteredUsers.map(user => (
              <Pressable
                key={user.id}
                onPress={() => handleSelectUser(user)}
                style={styles.userItem}
              >
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name[0]}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userUsername}>{user.username}</Text>
                </View>
                <Ionicons name="add-circle" size={24} color="#9DE4CF" />
              </Pressable>
            ))}
          </View>
        )}

        {/* Selected Friends */}
        {selectedUsers.length > 0 && (
          <Animated.View entering={FadeIn} style={styles.selectedContainer}>
            <Text style={styles.selectedTitle}>Selected Friends ({selectedUsers.length})</Text>
            {selectedUsers.map(user => (
              <View key={user.id} style={styles.selectedUser}>
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{user.name[0]}</Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.userName}>{user.name}</Text>
                  <Text style={styles.userUsername}>{user.username}</Text>
                </View>
                <Pressable onPress={() => handleRemoveUser(user.id)}>
                  <Ionicons name="close-circle" size={24} color="rgba(255, 255, 255, 0.5)" />
                </Pressable>
              </View>
            ))}
          </Animated.View>
        )}

        {/* Buttons */}
        <Animated.View entering={FadeIn.delay(500)} style={styles.buttonContainer}>
          <Pressable
            onPress={onContinue}
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
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  searchContainer: {
    position: 'relative',
    marginBottom: 16,
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
  resultsContainer: {
    marginBottom: 16,
  },
  userItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#9DE4CF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#5A3D5C',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userUsername: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  selectedContainer: {
    marginBottom: 24,
  },
  selectedTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  selectedUser: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  buttonContainer: {
    gap: 12,
    marginTop: 24,
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
  continueButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
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

