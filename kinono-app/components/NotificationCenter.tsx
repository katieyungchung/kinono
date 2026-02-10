import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KinonoLogo } from './KinonoLogo';
import { BottomNav } from './BottomNav';

interface NotificationCenterProps {
  onBack: () => void;
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick?: () => void;
  onProfileClick?: () => void;
}

export function NotificationCenter({ onBack, onHomeClick, onStartHangout, onSearchClick, onProfileClick }: NotificationCenterProps) {
  const notifications = [
    { id: 1, type: 'invite', message: 'Alice invited you to Coffee Break', time: '10 min ago' },
    { id: 2, type: 'reminder', message: 'Lunch with Bob tomorrow at 12:30 PM', time: '1 hour ago' },
    { id: 3, type: 'friend', message: 'Sarah started following you', time: '2 hours ago' },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <KinonoLogo />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        {notifications.map((notif) => (
          <Pressable key={notif.id} style={styles.notificationCard}>
            <View style={styles.iconContainer}>
              <Ionicons 
                name={notif.type === 'invite' ? 'calendar' : notif.type === 'reminder' ? 'alarm' : 'person-add'} 
                size={24} 
                color="#9DE4CF" 
              />
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationText}>{notif.message}</Text>
              <Text style={styles.notificationTime}>{notif.time}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>

      <BottomNav
        onHomeClick={onHomeClick}
        onStartHangout={onStartHangout}
        onSearchClick={onSearchClick}
        onProfileClick={onProfileClick}
        onInboxClick={() => {}}
        activeTab="inbox"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5A3D5C' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  backButton: { padding: 4 },
  headerSpacer: { width: 32 },
  content: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: '600', color: '#FFFFFF', marginBottom: 24 },
  notificationCard: { flexDirection: 'row', backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 16, padding: 16, marginBottom: 12, gap: 12 },
  iconContainer: { width: 48, height: 48, borderRadius: 24, backgroundColor: 'rgba(157, 228, 207, 0.2)', justifyContent: 'center', alignItems: 'center' },
  notificationContent: { flex: 1 },
  notificationText: { fontSize: 16, color: '#FFFFFF', marginBottom: 4 },
  notificationTime: { fontSize: 12, color: 'rgba(255, 255, 255, 0.6)' },
});

