import { View, Text, StyleSheet, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeInDown, ZoomIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SuccessPageProps {
  onContinue: () => void;
}

export function SuccessPage({ onContinue }: SuccessPageProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Success Icon */}
        <Animated.View 
          entering={ZoomIn.delay(200)}
          style={styles.iconContainer}
        >
          <Ionicons name="checkmark-circle" size={120} color="#9DE4CF" />
        </Animated.View>

        {/* Success Message */}
        <Animated.View 
          entering={FadeInDown.delay(400)}
          style={styles.textContainer}
        >
          <Text style={styles.title}>Success!</Text>
          <Text style={styles.subtitle}>
            Your account has been created successfully.{'\n'}
            Let's set up your profile.
          </Text>
        </Animated.View>

        {/* Continue Button */}
        <Animated.View 
          entering={FadeIn.delay(600)}
          style={styles.buttonContainer}
        >
          <Pressable
            onPress={onContinue}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </Pressable>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3D5C',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    marginBottom: 32,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
  },
});

