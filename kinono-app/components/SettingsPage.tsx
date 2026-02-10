import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { KinonoLogo } from './KinonoLogo';

interface SettingsPageProps {
  onBack: () => void;
}

export function SettingsPage({ onBack }: SettingsPageProps) {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </Pressable>
        <KinonoLogo />
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Push Notifications</Text>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#767577', true: '#9DE4CF' }}
              thumbColor={pushNotifications ? '#F59E0B' : '#f4f3f4'}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Email Notifications</Text>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#767577', true: '#9DE4CF' }}
              thumbColor={emailNotifications ? '#F59E0B' : '#f4f3f4'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Privacy</Text>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
          </Pressable>
          <Pressable style={styles.menuItem}>
            <Text style={styles.menuText}>Connected Apps</Text>
            <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.5)" />
          </Pressable>
        </View>

        <View style={styles.section}>
          <Pressable style={[styles.menuItem, styles.dangerItem]}>
            <Text style={[styles.menuText, styles.dangerText]}>Log Out</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#5A3D5C' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 24, paddingTop: 16, paddingBottom: 16 },
  backButton: { padding: 4 },
  headerSpacer: { width: 32 },
  content: { flex: 1, paddingHorizontal: 24 },
  title: { fontSize: 28, fontWeight: '600', color: '#FFFFFF', marginBottom: 32 },
  section: { marginBottom: 32 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: 'rgba(255, 255, 255, 0.7)', marginBottom: 16, textTransform: 'uppercase' },
  settingRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  settingLabel: { fontSize: 16, color: '#FFFFFF' },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: 'rgba(255, 255, 255, 0.1)' },
  menuText: { fontSize: 16, color: '#FFFFFF' },
  dangerItem: { borderBottomWidth: 0 },
  dangerText: { color: '#EF4444' },
});

