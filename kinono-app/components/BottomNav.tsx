import { View, Pressable, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface BottomNavProps {
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
  activeTab?: 'home' | 'search' | 'start' | 'inbox' | 'profile';
  notificationCount?: number;
}

export function BottomNav({ 
  onHomeClick, 
  onStartHangout, 
  onSearchClick, 
  onProfileClick, 
  onInboxClick, 
  activeTab = 'home', 
  notificationCount = 0 
}: BottomNavProps) {
  const insets = useSafeAreaInsets();
  
  return (
    <View style={[styles.container, { paddingBottom: insets.bottom || 12 }]}>
      {/* Search */}
      <Pressable 
        onPress={onSearchClick}
        style={styles.tab}
        android_ripple={null}
      >
        <Ionicons 
          name="search" 
          size={24} 
          color={activeTab === 'search' ? '#F59E0B' : 'rgba(255, 255, 255, 0.6)'} 
        />
      </Pressable>

      {/* Inbox */}
      <Pressable 
        onPress={onInboxClick}
        style={styles.tab}
        android_ripple={null}
      >
        <View>
          <Ionicons 
            name="mail" 
            size={24} 
            color={activeTab === 'inbox' ? '#F59E0B' : 'rgba(255, 255, 255, 0.6)'} 
          />
          {notificationCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{notificationCount}</Text>
            </View>
          )}
        </View>
      </Pressable>

      {/* Home (standout) */}
      <Pressable 
        onPress={onHomeClick}
        style={styles.homeTab}
        android_ripple={null}
      >
        <View style={styles.homeButton}>
          <Ionicons name="home" size={24} color="#FFFFFF" />
        </View>
      </Pressable>

      {/* Profile */}
      <Pressable 
        onPress={onProfileClick}
        style={styles.tab}
        android_ripple={null}
      >
        <Ionicons 
          name="person" 
          size={24} 
          color={activeTab === 'profile' ? '#F59E0B' : 'rgba(255, 255, 255, 0.6)'} 
        />
      </Pressable>

      {/* Start hangout */}
      <Pressable 
        onPress={onStartHangout}
        style={styles.tab}
        android_ripple={null}
      >
        <Ionicons 
          name="sparkles" 
          size={24} 
          color={activeTab === 'start' ? '#F59E0B' : 'rgba(255, 255, 255, 0.6)'} 
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#4A2D4C',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingTop: 12,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  tab: {
    alignItems: 'center',
    padding: 8,
  },
  homeTab: {
    alignItems: 'center',
    marginTop: -8,
  },
  homeButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#EF4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

