import { View, Text, StyleSheet, TextInput, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';
import { BottomNav } from './BottomNav';

interface SearchPageProps {
  onBack: () => void;
  onHomeClick: () => void;
  onStartHangout: () => void;
  onProfileClick?: () => void;
  onInboxClick?: () => void;
}

export function SearchPage({ onBack, onHomeClick, onStartHangout, onProfileClick, onInboxClick }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

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
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="rgba(255, 255, 255, 0.4)" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search events, places, friends..."
            placeholderTextColor="rgba(255, 255, 255, 0.4)"
          />
        </View>

        <View style={styles.emptyState}>
          <Ionicons name="search-outline" size={64} color="rgba(255, 255, 255, 0.3)" />
          <Text style={styles.emptyText}>Start searching for events, places, or friends</Text>
        </View>
      </ScrollView>

      <BottomNav
        onHomeClick={onHomeClick}
        onStartHangout={onStartHangout}
        onSearchClick={() => {}}
        onProfileClick={onProfileClick}
        onInboxClick={onInboxClick}
        activeTab="search"
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
  searchContainer: { position: 'relative', marginBottom: 24 },
  searchIcon: { position: 'absolute', left: 16, top: 12, zIndex: 1 },
  searchInput: { backgroundColor: 'rgba(255, 255, 255, 0.1)', borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.2)', borderRadius: 16, paddingLeft: 48, paddingRight: 16, paddingVertical: 12, fontSize: 14, color: '#FFFFFF' },
  emptyState: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingVertical: 80 },
  emptyText: { fontSize: 16, color: 'rgba(255, 255, 255, 0.6)', textAlign: 'center', marginTop: 16 },
});

