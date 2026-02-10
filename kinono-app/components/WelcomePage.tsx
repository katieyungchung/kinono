import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  useSharedValue,
  withSequence
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface WelcomePageProps {
  onComplete: () => void;
}

export function WelcomePage({ onComplete }: WelcomePageProps) {
  const leftPieceX = useSharedValue(-200);
  const leftPieceOpacity = useSharedValue(0);
  const rightPieceX = useSharedValue(200);
  const rightPieceOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const subtitle2Opacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate puzzle pieces
    leftPieceX.value = withDelay(300, withTiming(0, { duration: 1200 }));
    leftPieceOpacity.value = withDelay(300, withTiming(1, { duration: 1200 }));
    rightPieceX.value = withDelay(300, withTiming(0, { duration: 1200 }));
    rightPieceOpacity.value = withDelay(300, withTiming(1, { duration: 1200 }));

    // Animate text
    titleOpacity.value = withDelay(1800, withTiming(1, { duration: 800 }));
    subtitleOpacity.value = withDelay(2400, withTiming(1, { duration: 800 }));
    subtitle2Opacity.value = withDelay(3000, withTiming(1, { duration: 800 }));
    buttonOpacity.value = withDelay(3600, withTiming(1, { duration: 500 }));
  }, []);

  const leftPieceStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: leftPieceX.value }],
    opacity: leftPieceOpacity.value,
  }));

  const rightPieceStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: rightPieceX.value }],
    opacity: rightPieceOpacity.value,
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: withTiming(titleOpacity.value === 1 ? 0 : 20) }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: withTiming(subtitleOpacity.value === 1 ? 0 : 20) }],
  }));

  const subtitle2Style = useAnimatedStyle(() => ({
    opacity: subtitle2Opacity.value,
    transform: [{ translateY: withTiming(subtitle2Opacity.value === 1 ? 0 : 20) }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>
        {/* Puzzle Logo Animation */}
        <View style={styles.logoContainer}>
          {/* Left puzzle piece (mint/teal) */}
          <Animated.View style={[styles.leftPiece, leftPieceStyle]}>
            <Image 
              source={require('@/assets/images/puzzle-logo.png')} 
              style={styles.puzzleImage}
              contentFit="contain"
            />
          </Animated.View>

          {/* Right puzzle piece (orange) */}
          <Animated.View style={[styles.rightPiece, rightPieceStyle]}>
            <Image 
              source={require('@/assets/images/puzzle-logo.png')} 
              style={styles.puzzleImage}
              contentFit="contain"
            />
          </Animated.View>
        </View>

        {/* App Name */}
        <Animated.View style={[styles.titleContainer, titleStyle]}>
          <Text style={styles.title}>kinono</Text>
        </Animated.View>

        {/* Welcome text */}
        <Animated.View style={[styles.subtitleContainer, subtitleStyle]}>
          <Text style={styles.subtitle}>
            Welcome! Turn 'let's hangout' into
          </Text>
        </Animated.View>

        {/* "real connection" */}
        <Animated.View style={[styles.subtitle2Container, subtitle2Style]}>
          <Text style={styles.subtitle2}>
            real connection
          </Text>
        </Animated.View>

        {/* Get Started button */}
        <Animated.View style={buttonStyle}>
          <Pressable
            onPress={onComplete}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.buttonPressed
            ]}
          >
            <Text style={styles.buttonText}>Get Started</Text>
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
  logoContainer: {
    width: 320,
    height: 240,
    marginBottom: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  leftPiece: {
    position: 'absolute',
    width: 320,
    height: 240,
    overflow: 'hidden',
  },
  rightPiece: {
    position: 'absolute',
    width: 320,
    height: 240,
    overflow: 'hidden',
  },
  puzzleImage: {
    width: 320,
    height: 240,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 72,
    fontWeight: '300',
    color: '#FFFFFF',
    letterSpacing: 2,
  },
  subtitleContainer: {
    alignItems: 'center',
    maxWidth: 320,
  },
  subtitle: {
    fontSize: 18,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  subtitle2Container: {
    alignItems: 'center',
    marginBottom: 48,
  },
  subtitle2: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  button: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    backgroundColor: '#F59E0B',
    borderRadius: 999,
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

