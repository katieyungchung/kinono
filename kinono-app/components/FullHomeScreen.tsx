import { View, Text, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { KinonoLogo } from './KinonoLogo';
import { BottomNav } from './BottomNav';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH * 0.7;

export interface TrendingEvent {
  id: number;
  title: string;
  venue: string;
  date: string;
  time: string;
  imageUrl: string;
  appLogo: string;
  appName: string;
}

export interface TrendingFood {
  id: number;
  name: string;
  cuisine: string;
  location: string;
  imageUrl: string;
  appLogo: string;
  appName: string;
}

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

interface FullHomeScreenProps {
  onStartHangout: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  onSettingsClick?: () => void;
  notificationCount?: number;
  upcomingEvents?: UpcomingEvent[];
  onStartHangoutWithEvent?: (event: TrendingEvent) => void;
  onStartHangoutWithFood?: (food: TrendingFood) => void;
}

const trendingEvents: TrendingEvent[] = [
  {
    id: 1,
    title: 'Warriors vs Lakers',
    venue: 'Chase Center',
    date: 'Fri, Feb 14',
    time: '7:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1741940513798-4ce04b95ffda?w=800',
    appLogo: '🎟️',
    appName: 'GameTime'
  },
  {
    id: 2,
    title: 'Indie Rock Night',
    venue: 'The Fillmore',
    date: 'Sat, Feb 15',
    time: '8:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=800',
    appLogo: '🎫',
    appName: 'Partiful'
  },
  {
    id: 3,
    title: 'Comedy Night',
    venue: 'Punch Line SF',
    date: 'Sun, Feb 16',
    time: '9:00 PM',
    imageUrl: 'https://images.unsplash.com/photo-1636581563749-6190766872e0?w=800',
    appLogo: '📍',
    appName: 'Foursquare'
  },
];

const trendingFood: TrendingFood[] = [
  {
    id: 1,
    name: 'Omakase by the Bay',
    cuisine: 'Japanese',
    location: 'Embarcadero',
    imageUrl: 'https://images.unsplash.com/photo-1767627942878-4b566b84fdac?w=800',
    appLogo: '🍽️',
    appName: 'OpenTable'
  },
  {
    id: 2,
    name: 'Trattoria Bella',
    cuisine: 'Italian',
    location: 'North Beach',
    imageUrl: 'https://images.unsplash.com/photo-1659698361660-0af7de6376ea?w=800',
    appLogo: '⭐',
    appName: 'Yelp'
  },
  {
    id: 3,
    name: 'The French Laundry',
    cuisine: 'Fine Dining',
    location: 'Yountville',
    imageUrl: 'https://images.unsplash.com/photo-1766832255363-c9f060ade8b0?w=800',
    appLogo: '🍽️',
    appName: 'OpenTable'
  },
];

const upcomingEventsDefault: UpcomingEvent[] = [
  {
    id: '1',
    name: 'Coffee Break',
    friendName: 'Alice',
    date: 'Today',
    time: '10:00 AM',
    imageUrl: 'https://images.unsplash.com/photo-1514933651471-334841a1098d?w=400',
    location: 'Blue Bottle Coffee'
  },
  {
    id: '2',
    name: 'Lunch Meeting',
    friendName: 'Bob',
    date: 'Tomorrow',
    time: '12:30 PM',
    imageUrl: 'https://images.unsplash.com/photo-1514933651471-334841a1098d?w=400',
    location: 'Tartine Bakery'
  }
];

export function FullHomeScreen({
  onStartHangout,
  onSearchClick,
  onProfileClick,
  onInboxClick,
  onSettingsClick,
  notificationCount = 0,
  upcomingEvents,
  onStartHangoutWithEvent,
  onStartHangoutWithFood,
}: FullHomeScreenProps) {
  const eventsToDisplay = upcomingEvents || upcomingEventsDefault;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerSpacer} />
        <KinonoLogo />
        <Pressable onPress={onSettingsClick} style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="rgba(255, 255, 255, 0.8)" />
        </Pressable>
      </View>

      {/* Scrollable content */}
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Tagline */}
        <Animated.View entering={FadeInDown.delay(200)} style={styles.taglineContainer}>
          <Text style={styles.tagline}>
            Turn "we should hang out" into real plans
          </Text>
        </Animated.View>

        {/* Start Hangout Button */}
        <Animated.View entering={FadeInDown.delay(300)}>
          <Pressable
            onPress={onStartHangout}
            style={({ pressed }) => [styles.startButton, pressed && styles.buttonPressed]}
          >
            <Ionicons name="add-circle" size={24} color="#FFFFFF" />
            <Text style={styles.startButtonText}>Start a Hangout</Text>
          </Pressable>
        </Animated.View>

        {/* Upcoming Events */}
        {eventsToDisplay.length > 0 && (
          <Animated.View entering={FadeInDown.delay(400)} style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="calendar" size={20} color="#9DE4CF" />
              <Text style={styles.sectionTitle}>Upcoming</Text>
            </View>
            {eventsToDisplay.map((event) => (
              <View key={event.id} style={styles.upcomingCard}>
                <Image source={{ uri: event.imageUrl }} style={styles.upcomingImage} contentFit="cover" />
                <View style={styles.upcomingInfo}>
                  <Text style={styles.upcomingName}>{event.name}</Text>
                  <Text style={styles.upcomingDetail}>with {event.friendName}</Text>
                  <Text style={styles.upcomingTime}>{event.date} • {event.time}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
              </View>
            ))}
          </Animated.View>
        )}

        {/* Trending Events */}
        <Animated.View entering={FadeInDown.delay(500)} style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="trending-up" size={20} color="#F59E0B" />
            <Text style={styles.sectionTitle}>Trending Events</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {trendingEvents.map((event) => (
              <Pressable
                key={event.id}
                onPress={() => onStartHangoutWithEvent?.(event)}
                style={styles.trendingCard}
              >
                <Image source={{ uri: event.imageUrl }} style={styles.trendingImage} contentFit="cover" />
                <View style={styles.trendingGradient}>
                  <Text style={styles.trendingAppBadge}>{event.appLogo} {event.appName}</Text>
                  <Text style={styles.trendingTitle}>{event.title}</Text>
                  <Text style={styles.trendingVenue}>{event.venue}</Text>
                  <Text style={styles.trendingDateTime}>{event.date} • {event.time}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>

        {/* Trending Food */}
        <Animated.View entering={FadeInDown.delay(600)} style={[styles.section, styles.lastSection]}>
          <View style={styles.sectionHeader}>
            <Ionicons name="restaurant" size={20} color="#9DE4CF" />
            <Text style={styles.sectionTitle}>Trending Food Spots</Text>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScroll}
          >
            {trendingFood.map((food) => (
              <Pressable
                key={food.id}
                onPress={() => onStartHangoutWithFood?.(food)}
                style={styles.trendingCard}
              >
                <Image source={{ uri: food.imageUrl }} style={styles.trendingImage} contentFit="cover" />
                <View style={styles.trendingGradient}>
                  <Text style={styles.trendingAppBadge}>{food.appLogo} {food.appName}</Text>
                  <Text style={styles.trendingTitle}>{food.name}</Text>
                  <Text style={styles.trendingVenue}>{food.cuisine}</Text>
                  <Text style={styles.trendingDateTime}>{food.location}</Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </Animated.View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNav
        onHomeClick={() => {}}
        onStartHangout={onStartHangout}
        onSearchClick={onSearchClick}
        onProfileClick={onProfileClick}
        onInboxClick={onInboxClick}
        activeTab="home"
        notificationCount={notificationCount}
      />
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
    paddingTop: 32,
    paddingBottom: 16,
  },
  headerSpacer: {
    width: 32,
  },
  settingsButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  taglineContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  tagline: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 12,
    marginBottom: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  section: {
    marginBottom: 32,
  },
  lastSection: {
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  upcomingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    padding: 12,
    gap: 12,
    marginBottom: 12,
  },
  upcomingImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
  },
  upcomingInfo: {
    flex: 1,
  },
  upcomingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  upcomingDetail: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 2,
  },
  upcomingTime: {
    fontSize: 12,
    color: '#9DE4CF',
  },
  horizontalScroll: {
    paddingRight: 24,
    gap: 16,
  },
  trendingCard: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
  },
  trendingImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  trendingGradient: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  trendingAppBadge: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 8,
  },
  trendingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  trendingVenue: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 4,
  },
  trendingDateTime: {
    fontSize: 12,
    color: '#9DE4CF',
  },
});

