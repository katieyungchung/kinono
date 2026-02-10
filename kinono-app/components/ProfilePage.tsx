import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { KinonoLogo } from './KinonoLogo';
import { BottomNav } from './BottomNav';

interface ProfilePageProps {
  onBack: () => void;
  onHomeClick: () => void;
  onStartHangout: () => void;
  onSearchClick?: () => void;
  onInboxClick?: () => void;
}

export function ProfilePage({ onBack, onHomeClick, onStartHangout, onSearchClick, onInboxClick }: ProfilePageProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <KinonoLogo />
        <Pressable style={styles.editButton}>
          <Ionicons name="create-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.profileHeader}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={48} color="#5A3D5C" />
          </View>
          <Text style={styles.name}>Jordan Smith</Text>
          <Text style={styles.username}>@jordansmith</Text>
        </View>

        <View style={styles.stats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>42</Text>
            <Text style={styles.statLabel}>Hangouts</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>Friends</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Interests</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <Text style={styles.bio}>Love exploring SF and trying new restaurants! Always up for coffee or a hike.</Text>
        </View>
      </ScrollView>

      <BottomNav
        onHomeClick={onHomeClick}
        onStartHangout={onStartHangout}
        onSearchClick={onSearchClick}
        onProfileClick={() => {}}
        onInboxClick={onInboxClick}
        activeTab="profile"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5A3D5C' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  backButton: { padding: 4 },
  editButton: { padding: 4 },
  content: { flex: 1, paddingHorizontal: 24 },
  profileHeader: { alignItems: 'center', marginBottom: 32 },
  avatar: { width: 100, height: 100, borderRadius: 50, backgroundColor: '#9DE4CF', justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  name: { fontSize: 24, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  username: { fontSize: 16, color: 'rgba(255, 255, 255, 0.7)' },
  stats: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 32, paddingVertical: 20, backgroundColor: 'rgba(255, 255, 255, 0.1)', borderRadius: 16 },
  statItem: { alignItems: 'center' },
  statValue: { fontSize: 24, fontWeight: '600', color: '#FFFFFF', marginBottom: 4 },
  statLabel: { fontSize: 14, color: 'rgba(255, 255, 255, 0.7)' },
  section: { marginBottom: 24 },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#FFFFFF', marginBottom: 12 },
  bio: { fontSize: 16, color: 'rgba(255, 255, 255, 0.8)', lineHeight: 24 },
});

