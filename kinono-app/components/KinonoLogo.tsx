import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';

export function KinonoLogo() {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Puzzle logo */}
        <Image 
          source={require('@/assets/images/puzzle-logo.png')}
          style={styles.logo}
          contentFit="contain"
        />
      </View>
      <Text style={styles.text}>kinono</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  logoContainer: {
    width: 48,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 36,
  },
  text: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '300',
  },
});

