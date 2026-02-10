import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  withSpring,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const PUZZLE_SIZE = 120;

interface WelcomePageProps {
  onComplete: () => void;
}

export function WelcomePage({ onComplete }: WelcomePageProps) {
  // Puzzle piece animations
  const leftPieceX = useSharedValue(-SCREEN_WIDTH);
  const leftPieceY = useSharedValue(50);
  const leftPieceRotate = useSharedValue(-80);
  
  const rightPieceX = useSharedValue(SCREEN_WIDTH);
  const rightPieceY = useSharedValue(0);
  const rightPieceRotate = useSharedValue(80);

  // Text animations
  const titleOpacity = useSharedValue(0);
  const subtitleOpacity = useSharedValue(0);
  const subtitle2Opacity = useSharedValue(0);
  const buttonOpacity = useSharedValue(0);

  useEffect(() => {
    // Slide in from left and right to center
    leftPieceX.value = withTiming(-PUZZLE_SIZE / 2, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    rightPieceX.value = withTiming(PUZZLE_SIZE / 2 - 25, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    // Rotate to upright (around their own centers)
    leftPieceRotate.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    rightPieceRotate.value = withTiming(0, {
      duration: 1000,
      easing: Easing.out(Easing.cubic),
    });

    // Move left piece up slightly (after initial animation)
    leftPieceY.value = withDelay(1050, withTiming(0, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }));

    // Move right piece down slightly (after initial animation)
    rightPieceY.value = withDelay(1050, withTiming(20, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    }));

    // Text fade-in
    titleOpacity.value = withDelay(2000, withTiming(1, { duration: 500 }));
    subtitleOpacity.value = withDelay(2600, withTiming(1, { duration: 500 }));
    subtitle2Opacity.value = withDelay(3600, withTiming(1, { duration: 500 }));
    buttonOpacity.value = withDelay(4000, withTiming(1, { duration: 400 }));
  }, []);

  const leftPieceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: leftPieceX.value },
      { translateY: leftPieceY.value },
      { rotate: `${leftPieceRotate.value}deg` },
    ],
  }));

  const rightPieceStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: rightPieceX.value },
      { translateY: rightPieceY.value },
      { rotate: `${rightPieceRotate.value}deg` },
      { scale: 1.05 },
    ],
  }));

  const titleStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: (1 - titleOpacity.value) * 20 }],
  }));

  const subtitleStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: (1 - subtitleOpacity.value) * 20 }],
  }));

  const subtitle2Style = useAnimatedStyle(() => ({
    opacity: subtitle2Opacity.value,
    transform: [{ translateY: (1 - subtitle2Opacity.value) * 20 }],
  }));

  const buttonStyle = useAnimatedStyle(() => ({
    opacity: buttonOpacity.value,
    transform: [{ scale: buttonOpacity.value }],
  }));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.content}>

        {/* Puzzle Logo */}
        <View style={styles.logoContainer}>
          {/* Left piece */}
          <Animated.View style={[styles.puzzlePiece, leftPieceStyle]}>
            <Image
              source={require('@/assets/images/puzzlepiece-left.png')}
              style={styles.puzzleImage}
              contentFit="contain"
            />
          </Animated.View>

          {/* Right piece */}
          <Animated.View style={[styles.puzzlePiece, rightPieceStyle]}>
            <Image
              source={require('@/assets/images/puzzlepiece-right.png')}
              style={styles.puzzleImage}
              contentFit="contain"
            />
          </Animated.View>
        </View>

        {/* Text */}
        <Animated.Text style={[styles.appName, titleStyle]}>
          kinono
        </Animated.Text>

        <Animated.Text style={[styles.welcomeText, subtitleStyle]}>
          Welcome! Turn 'let's hangout' into
        </Animated.Text>

        <Animated.Text style={[styles.realConnectionText, subtitle2Style]}>
          real connection
        </Animated.Text>

        {/* Button */}
        <Animated.View style={buttonStyle}>
          <Pressable onPress={onComplete} style={styles.getStartedButton}>
            <Text style={styles.getStartedButtonText}>Get Started</Text>
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
    width: PUZZLE_SIZE * 2,
    height: PUZZLE_SIZE * 1.5,
    marginBottom: 40,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  puzzlePiece: {
    position: 'absolute',
    width: PUZZLE_SIZE,
    height: PUZZLE_SIZE,
  },
  puzzleImage: {
    width: '100%',
    height: '100%',
  },
  appName: {
    fontSize: 72,
    fontFamily: 'ReemKufi_400Regular',
    color: 'white',
    letterSpacing: 2,
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    textAlign: 'center',
  },
  realConnectionText: {
    fontSize: 20,
    fontFamily: 'ReemKufi_600SemiBold',
    color: 'white',
    marginBottom: 60,
    textAlign: 'center',
  },
  getStartedButton: {
    paddingHorizontal: 48,
    paddingVertical: 16,
    backgroundColor: '#F59E0B',
    borderRadius: 9999,
    elevation: 8,
  },
  getStartedButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});
