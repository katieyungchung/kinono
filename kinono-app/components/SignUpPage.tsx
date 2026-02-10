import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SignUpPageProps {
  onManualSignUp: () => void;
  onSocialSignUp: (provider: string) => void;
  onGoToSignIn: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SignUpPage({ onManualSignUp, onSocialSignUp, onGoToSignIn }: SignUpPageProps) {
  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.header}
        >
          <Text style={styles.title}>Sign up</Text>
          <Text style={styles.subtitle}>
            Create a free account to get started
          </Text>
        </Animated.View>

        {/* Social Sign-Up Options */}
        <Animated.View 
          entering={FadeInDown.delay(300)}
          style={styles.socialContainer}
        >
          {/* Google */}
          <Pressable
            onPress={() => onSocialSignUp('google')}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed
            ]}
          >
            <Ionicons name="logo-google" size={20} color="#4285F4" />
            <Text style={styles.socialButtonText}>Continue with Google</Text>
          </Pressable>

          {/* Facebook */}
          <Pressable
            onPress={() => onSocialSignUp('facebook')}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed
            ]}
          >
            <Ionicons name="logo-facebook" size={20} color="#1877F2" />
            <Text style={styles.socialButtonText}>Continue with Facebook</Text>
          </Pressable>

          {/* Instagram */}
          <Pressable
            onPress={() => onSocialSignUp('instagram')}
            style={({ pressed }) => [
              styles.socialButton,
              pressed && styles.buttonPressed
            ]}
          >
            <Ionicons name="logo-instagram" size={20} color="#E4405F" />
            <Text style={styles.socialButtonText}>Continue with Instagram</Text>
          </Pressable>
        </Animated.View>

        {/* Divider */}
        <Animated.View 
          entering={FadeIn.delay(400)}
          style={styles.divider}
        >
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </Animated.View>

        {/* Manual Sign-Up Button */}
        <AnimatedPressable
          entering={FadeInDown.delay(500)}
          onPress={onManualSignUp}
          style={({ pressed }) => [
            styles.emailButton,
            pressed && styles.buttonPressed
          ]}
        >
          <Ionicons name="mail" size={20} color="#FFFFFF" />
          <Text style={styles.emailButtonText}>Sign up with Email</Text>
        </AnimatedPressable>

        {/* Sign In Link */}
        <Animated.View 
          entering={FadeIn.delay(600)}
          style={styles.signInContainer}
        >
          <Text style={styles.signInText}>
            Already have an account?{' '}
          </Text>
          <Pressable onPress={onGoToSignIn}>
            <Text style={styles.signInLink}>Sign in</Text>
          </Pressable>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5A3D5C',
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 32,
    paddingVertical: 48,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 36,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  socialContainer: {
    gap: 12,
    marginBottom: 32,
  },
  socialButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 32,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  dividerText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  emailButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  emailButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  buttonPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signInText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signInLink: {
    fontSize: 14,
    color: '#9DE4CF',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

