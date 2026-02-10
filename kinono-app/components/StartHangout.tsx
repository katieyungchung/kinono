import { View, Text, StyleSheet, Pressable, ScrollView, TextInput, Modal, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, FadeOut } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState, useEffect } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { BottomNav } from './BottomNav';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface StartHangoutProps {
  onBack: () => void;
  onSendInvite: (inviteData: {
    friends: Array<{ id: number; name: string; avatar: string }>;
    location: string;
    date: string;
    time: string;
    message: string;
  }) => void;
  onHomeClick?: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  notificationCount?: number;
  prefilledData?: {
    type: 'event' | 'food' | null;
    name: string;
    location: string;
    time?: string;
    date?: string;
  } | null;
}

interface Friend {
  id: number;
  name: string;
  lastChatted: string;
  imageUrl: string;
}

interface TimeSlot {
  id: number;
  day: string;
  time: string;
  availableFor: string[];
}

interface Location {
  id: number;
  name: string;
  address: string;
}

const allFriends: Friend[] = [
  {
    id: 1,
    name: 'Alex Rivera',
    lastChatted: 'Last chatted 3 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1655249493799-9cee4fe983bb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBwb3J0cmFpdCUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDUwNjg1OHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 2,
    name: 'Sarah Chen',
    lastChatted: 'Last chatted yesterday',
    imageUrl: 'https://images.unsplash.com/photo-1666980226747-bf29624ae485?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHNtaWxpbmclMjBwb3J0cmFpdCUyMGNhc3VhbHxlbnwxfHx8fDE3NzA0MjE3NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 3,
    name: 'Marcus Johnson',
    lastChatted: 'Last chatted 5 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1712599982295-1ecff6059a57?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBoYXBweXxlbnwxfHx8fDE3NzA1MDY4NTd8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 4,
    name: 'Jamie Lee',
    lastChatted: 'Last chatted 1 week ago',
    imageUrl: 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc3MDQxMDYyMHww&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 5,
    name: 'Taylor Kim',
    lastChatted: 'Last chatted 2 days ago',
    imageUrl: 'https://images.unsplash.com/photo-1552334949-51934e5f2d38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXJzb24lMjBzbWlsaW5nJTIwcG9ydHJhaXQlMjBmcmllbmRseXxlbnwxfHx8fDE3NzA1MDc5OTB8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

const availableLocations: Location[] = [
  { id: 1, name: 'Sightglass Coffee', address: '270 7th St, San Francisco' },
  { id: 2, name: 'Blue Bottle Coffee', address: '66 Mint St, San Francisco' },
  { id: 3, name: 'Philz Coffee', address: '201 Berry St, San Francisco' },
  { id: 4, name: 'Tartine Bakery', address: '600 Guerrero St, San Francisco' },
  { id: 5, name: 'The Mill', address: '736 Divisadero St, San Francisco' }
];

export function StartHangout({ 
  onBack, 
  onSendInvite, 
  onHomeClick, 
  onSearchClick, 
  onProfileClick, 
  onInboxClick, 
  notificationCount, 
  prefilledData 
}: StartHangoutProps) {
  // Initialize with prefilled data if provided
  const getInitialLocation = () => {
    if (prefilledData?.location) {
      const existing = availableLocations.find(loc => 
        loc.name.toLowerCase().includes(prefilledData.location.toLowerCase()) ||
        prefilledData.location.toLowerCase().includes(loc.name.toLowerCase())
      );
      if (existing) return existing;
      return {
        id: 999,
        name: prefilledData.name,
        address: prefilledData.location
      };
    }
    return availableLocations[0];
  };

  const getInitialTime = () => {
    if (prefilledData?.type === 'event' && prefilledData.time && prefilledData.date) {
      return { day: prefilledData.date, time: prefilledData.time };
    } else if (prefilledData?.type === 'food') {
      return { day: 'Friday', time: '7pm' };
    }
    return { day: 'Thursday', time: '6pm' };
  };

  const [selectedFriends, setSelectedFriends] = useState<Friend[]>([allFriends[0]]);
  const [selectedTime, setSelectedTime] = useState(getInitialTime());
  const [selectedLocation, setSelectedLocation] = useState(getInitialLocation());
  const [message, setMessage] = useState('');
  const [showInviteSent, setShowInviteSent] = useState(false);
  
  const [showFriendPicker, setShowFriendPicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');

  // Generate time slots based on selected friends
  const generateTimeSlots = (): TimeSlot[] => {
    const friendNames = selectedFriends.map(f => f.name);
    return [
      { id: 1, day: 'Thursday', time: '6pm', availableFor: friendNames },
      { id: 2, day: 'Friday', time: '5:30pm', availableFor: friendNames },
      { id: 3, day: 'Friday', time: '7pm', availableFor: friendNames },
      { id: 4, day: 'Saturday', time: '2pm', availableFor: friendNames },
      { id: 5, day: 'Sunday', time: '11am', availableFor: friendNames }
    ];
  };

  const timeSlots = generateTimeSlots();

  // Update message when selections change
  useEffect(() => {
    const friendNames = selectedFriends.length === 1 
      ? selectedFriends[0].name.split(' ')[0]
      : selectedFriends.length === 2
        ? `${selectedFriends[0].name.split(' ')[0]} and ${selectedFriends[1].name.split(' ')[0]}`
        : `${selectedFriends.slice(0, -1).map(f => f.name.split(' ')[0]).join(', ')}, and ${selectedFriends[selectedFriends.length - 1].name.split(' ')[0]}`;
    
    if (prefilledData?.type === 'event') {
      setMessage(
        `Hey! I'm going to ${selectedLocation.name} on ${selectedTime.day} at ${selectedTime.time}. Would love for you to join me!`
      );
    } else if (prefilledData?.type === 'food') {
      setMessage(
        `Hey! Want to check out ${selectedLocation.name}? I'm thinking ${selectedTime.day} at ${selectedTime.time}. Let me know if you're free!`
      );
    } else {
      setMessage(
        `Hey! Would love to meet up at ${selectedLocation.name} on ${selectedTime.day} at ${selectedTime.time}. Are you free?`
      );
    }
  }, [selectedFriends, selectedTime, selectedLocation, prefilledData]);

  const handleTryAnother = () => {
    const currentIndex = availableLocations.findIndex(loc => loc.id === selectedLocation.id);
    const nextIndex = (currentIndex + 1) % availableLocations.length;
    setSelectedLocation(availableLocations[nextIndex]);
  };

  const toggleFriend = (friend: Friend) => {
    setSelectedFriends(prev => {
      const isSelected = prev.find(f => f.id === friend.id);
      if (isSelected) {
        if (prev.length === 1) return prev;
        return prev.filter(f => f.id !== friend.id);
      } else {
        return [...prev, friend];
      }
    });
  };

  const filteredLocations = availableLocations.filter(loc =>
    loc.name.toLowerCase().includes(locationSearch.toLowerCase()) ||
    loc.address.toLowerCase().includes(locationSearch.toLowerCase())
  );

  const handleSendInvite = () => {
    setShowInviteSent(true);
  };

  const handleConfirmInvite = () => {
    onSendInvite({
      friends: selectedFriends.map(f => ({ id: f.id, name: f.name, avatar: f.imageUrl })),
      location: selectedLocation.name,
      date: selectedTime.day,
      time: selectedTime.time,
      message: message
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="rgba(255, 255, 255, 0.7)" />
        </Pressable>
        <View style={styles.logoContainer}>
          <KinonoLogo />
        </View>
        <View style={styles.backButton} />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        style={styles.scrollView} 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header Text */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.headerTextContainer}>
          <Ionicons name="sparkles" size={16} color="rgba(255, 255, 255, 0.8)" />
          <Text style={styles.headerText}>We picked a hangout for you</Text>
        </Animated.View>

        {/* WHO Section */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Pressable
            onPress={() => setShowFriendPicker(true)}
            style={styles.card}
          >
            <Text style={styles.cardLabel}>WITH</Text>
            <View style={styles.cardContent}>
              <View style={styles.friendAvatars}>
                {selectedFriends.slice(0, 3).map((friend) => (
                  <View key={friend.id} style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: friend.imageUrl }}
                      style={styles.avatar}
                      contentFit="cover"
                    />
                  </View>
                ))}
                {selectedFriends.length > 3 && (
                  <View style={[styles.avatarWrapper, styles.avatarOverflow]}>
                    <Text style={styles.avatarOverflowText}>+{selectedFriends.length - 3}</Text>
                  </View>
                )}
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>
                  {selectedFriends.length === 1 
                    ? selectedFriends[0].name
                    : `${selectedFriends.length} friends`}
                </Text>
                <Text style={styles.cardSubtitle}>Tap to change</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* WHEN Section */}
        <Animated.View entering={FadeInDown.delay(400)}>
          <Pressable
            onPress={() => prefilledData?.type !== 'event' && setShowTimePicker(true)}
            disabled={prefilledData?.type === 'event'}
            style={[styles.card, prefilledData?.type === 'event' && styles.cardDisabled]}
          >
            <View style={styles.cardLabelRow}>
              <Text style={styles.cardLabel}>WHEN</Text>
              {prefilledData?.type === 'event' && (
                <Text style={styles.lockedBadge}>(locked)</Text>
              )}
            </View>
            <View style={styles.cardContent}>
              <View style={styles.iconBox}>
                <Ionicons name="calendar" size={20} color="#5A3D5C" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>
                  {selectedTime.day} at {selectedTime.time}
                </Text>
                <Text style={styles.cardSubtitle}>
                  {prefilledData?.type === 'event' ? 'Event time' : prefilledData?.type === 'food' ? 'Tap to change' : "When everyone's free"}
                </Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* WHERE/WHAT Section */}
        <Animated.View entering={FadeInDown.delay(500)}>
          <Pressable
            onPress={() => !prefilledData && setShowLocationPicker(true)}
            disabled={!!prefilledData}
            style={[styles.card, prefilledData && styles.cardDisabled]}
          >
            <View style={styles.cardLabelRow}>
              <Text style={styles.cardLabel}>WHERE / WHAT</Text>
              {prefilledData && (
                <Text style={styles.lockedBadge}>(locked)</Text>
              )}
            </View>
            <View style={styles.cardContent}>
              <View style={styles.iconBox}>
                <Ionicons name="location" size={20} color="#5A3D5C" />
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>{selectedLocation.name}</Text>
                <Text style={styles.cardSubtitle}>{selectedLocation.address}</Text>
              </View>
            </View>
          </Pressable>
        </Animated.View>

        {/* Try another link */}
        <Animated.View entering={FadeInDown.delay(600)} style={styles.tryAnotherContainer}>
          <Pressable onPress={handleTryAnother}>
            <Text style={styles.tryAnotherText}>
              Not feeling this? <Text style={styles.tryAnotherLink}>Try another idea</Text>
            </Text>
          </Pressable>
        </Animated.View>

        {/* YOUR MESSAGE Section */}
        <Animated.View entering={FadeInDown.delay(700)} style={styles.messageCard}>
          <Text style={styles.cardLabel}>YOUR MESSAGE</Text>
          <TextInput
            value={message}
            onChangeText={setMessage}
            style={styles.messageInput}
            multiline
            numberOfLines={3}
            placeholder="Write your message..."
            placeholderTextColor="rgba(90, 61, 92, 0.5)"
          />
          <Text style={styles.messageHint}>You can edit this before sending</Text>
        </Animated.View>

        {/* Send Button */}
        <Animated.View entering={FadeInDown.delay(800)} style={styles.sendButtonContainer}>
          <Pressable onPress={handleSendInvite} style={styles.sendButton}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
            <Text style={styles.sendButtonText}>Send invite</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      {onHomeClick && onSearchClick && onProfileClick && (
        <BottomNav 
          onHomeClick={onHomeClick}
          onStartHangout={() => {}}
          onSearchClick={onSearchClick}
          onProfileClick={onProfileClick}
          onInboxClick={onInboxClick}
          activeTab="start"
          notificationCount={notificationCount}
        />
      )}

      {/* Friend Picker Modal */}
      <Modal
        visible={showFriendPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowFriendPicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowFriendPicker(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Friends</Text>
              <Pressable onPress={() => setShowFriendPicker(false)}>
                <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
              </Pressable>
            </View>

            <ScrollView style={styles.modalScroll}>
              {allFriends.map((friend) => {
                const isSelected = selectedFriends.find(f => f.id === friend.id);
                return (
                  <Pressable
                    key={friend.id}
                    onPress={() => toggleFriend(friend)}
                    style={[styles.modalItem, isSelected && styles.modalItemSelected]}
                  >
                    <Image
                      source={{ uri: friend.imageUrl }}
                      style={styles.modalAvatar}
                      contentFit="cover"
                    />
                    <View style={styles.modalItemText}>
                      <Text style={styles.modalItemName}>{friend.name}</Text>
                      <Text style={styles.modalItemSubtitle}>{friend.lastChatted}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark" size={24} color="#5A3D5C" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable 
              onPress={() => setShowFriendPicker(false)} 
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Done ({selectedFriends.length} selected)</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Time Picker Modal */}
      <Modal
        visible={showTimePicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowTimePicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowTimePicker(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Time</Text>
              <Pressable onPress={() => setShowTimePicker(false)}>
                <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
              </Pressable>
            </View>

            <Text style={styles.modalSubtitle}>When everyone is free:</Text>

            <ScrollView style={styles.modalScroll}>
              {timeSlots.map((slot) => {
                const isSelected = selectedTime.day === slot.day && selectedTime.time === slot.time;
                return (
                  <Pressable
                    key={slot.id}
                    onPress={() => {
                      setSelectedTime({ day: slot.day, time: slot.time });
                      setShowTimePicker(false);
                    }}
                    style={[styles.modalItem, isSelected && styles.modalItemSelected]}
                  >
                    <View style={styles.iconBox}>
                      <Ionicons name="calendar" size={20} color="#5A3D5C" />
                    </View>
                    <View style={styles.modalItemText}>
                      <Text style={styles.modalItemName}>{slot.day} at {slot.time}</Text>
                      <Text style={styles.modalItemSubtitle}>Available for all</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark" size={24} color="#5A3D5C" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Location Picker Modal */}
      <Modal
        visible={showLocationPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowLocationPicker(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowLocationPicker(false)}
        >
          <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Location</Text>
              <Pressable onPress={() => setShowLocationPicker(false)}>
                <Ionicons name="close" size={24} color="rgba(255, 255, 255, 0.7)" />
              </Pressable>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color="rgba(90, 61, 92, 0.6)" style={styles.searchIcon} />
              <TextInput
                value={locationSearch}
                onChangeText={setLocationSearch}
                placeholder="Search for a place..."
                placeholderTextColor="rgba(90, 61, 92, 0.5)"
                style={styles.searchInput}
              />
            </View>

            <ScrollView style={styles.modalScroll}>
              {filteredLocations.map((location) => {
                const isSelected = selectedLocation.id === location.id;
                return (
                  <Pressable
                    key={location.id}
                    onPress={() => {
                      setSelectedLocation(location);
                      setShowLocationPicker(false);
                      setLocationSearch('');
                    }}
                    style={[styles.modalItem, isSelected && styles.modalItemSelected]}
                  >
                    <View style={styles.iconBox}>
                      <Ionicons name="location" size={20} color="#5A3D5C" />
                    </View>
                    <View style={styles.modalItemText}>
                      <Text style={styles.modalItemName}>{location.name}</Text>
                      <Text style={styles.modalItemSubtitle}>{location.address}</Text>
                    </View>
                    {isSelected && (
                      <Ionicons name="checkmark" size={24} color="#5A3D5C" />
                    )}
                  </Pressable>
                );
              })}
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>

      {/* Invite Sent Confirmation Modal */}
      <Modal
        visible={showInviteSent}
        transparent
        animationType="fade"
        onRequestClose={handleConfirmInvite}
      >
        <View style={styles.confirmOverlay}>
          <Animated.View entering={FadeIn} style={styles.confirmModal}>
            <View style={styles.successIcon}>
              <Ionicons name="checkmark" size={48} color="#5A3D5C" />
            </View>
            <Text style={styles.confirmTitle}>Invite Sent!</Text>
            <Text style={styles.confirmText}>
              Your hangout invite has been sent to your friends
            </Text>
            <Pressable onPress={handleConfirmInvite} style={styles.confirmButton}>
              <Text style={styles.confirmButtonText}>Return to homepage</Text>
            </Pressable>
          </Animated.View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3D5C',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 8,
  },
  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    position: 'absolute',
    left: SCREEN_WIDTH / 2 - 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  headerTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 12,
  },
  headerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
  },
  card: {
    backgroundColor: 'rgba(212, 244, 231, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  cardDisabled: {
    backgroundColor: 'rgba(212, 244, 231, 0.6)',
    opacity: 0.7,
  },
  cardLabel: {
    color: 'rgba(90, 61, 92, 0.6)',
    fontSize: 11,
    fontWeight: '600',
    letterSpacing: 1,
    marginBottom: 10,
  },
  cardLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  lockedBadge: {
    color: 'rgba(90, 61, 92, 0.6)',
    fontSize: 11,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  friendAvatars: {
    flexDirection: 'row',
    marginLeft: -8,
  },
  avatarWrapper: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#5A3D5C',
    borderWidth: 2,
    borderColor: '#D4F4E7',
    overflow: 'hidden',
    marginLeft: -8,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarOverflow: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarOverflowText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    color: '#5A3D5C',
    fontWeight: '600',
    fontSize: 18,
    marginBottom: 2,
  },
  cardSubtitle: {
    color: 'rgba(90, 61, 92, 0.6)',
    fontSize: 14,
  },
  tryAnotherContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  tryAnotherText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 14,
  },
  tryAnotherLink: {
    textDecorationLine: 'underline',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  messageCard: {
    backgroundColor: 'rgba(212, 244, 231, 0.95)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  messageInput: {
    color: '#5A3D5C',
    fontSize: 16,
    lineHeight: 24,
    minHeight: 80,
    marginBottom: 8,
    textAlignVertical: 'top',
  },
  messageHint: {
    color: 'rgba(90, 61, 92, 0.5)',
    fontSize: 12,
  },
  sendButtonContainer: {
    marginBottom: 16,
  },
  sendButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  modalContent: {
    backgroundColor: '#5A3D5C',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: 375,
    maxHeight: 600,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 20,
  },
  modalSubtitle: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 14,
    marginBottom: 16,
  },
  modalScroll: {
    flexGrow: 0,
    marginBottom: 16,
  },
  modalItem: {
    backgroundColor: 'rgba(212, 244, 231, 0.4)',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  modalItemSelected: {
    backgroundColor: '#D4F4E7',
  },
  modalAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#5A3D5C',
  },
  modalItemText: {
    flex: 1,
  },
  modalItemName: {
    color: '#5A3D5C',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  modalItemSubtitle: {
    color: 'rgba(90, 61, 92, 0.6)',
    fontSize: 14,
  },
  modalButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 244, 231, 0.95)',
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#5A3D5C',
    fontSize: 16,
    paddingVertical: 12,
  },
  confirmOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  confirmModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 32,
    width: '90%',
    maxWidth: 340,
    alignItems: 'center',
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#D4F4E7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  confirmTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  confirmText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 24,
  },
  confirmButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});

