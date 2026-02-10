import { useState } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Animated, { FadeInDown, FadeIn, FadeInRight } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SignInPageProps {
  onBack: () => void;
  onSignIn: () => void;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function SignInPage({ onBack, onSignIn }: SignInPageProps) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateForm = () => {
    const newErrors = {
      email: '',
      password: '',
    };

    let isValid = true;

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      onSignIn();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (errors[field as keyof typeof errors]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const handleEmailClick = () => {
    setShowEmailForm(true);
  };

  const handleBackToOptions = () => {
    setShowEmailForm(false);
    setFormData({ email: '', password: '' });
    setErrors({ email: '', password: '' });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Back Button */}
        <Pressable
          onPress={showEmailForm ? handleBackToOptions : onBack}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
        </Pressable>

        {/* Header */}
        <Animated.View 
          entering={FadeInDown.delay(200)}
          style={styles.header}
        >
          <Text style={styles.title}>Sign in</Text>
          <Text style={styles.subtitle}>
            Welcome back! Sign in to your account
          </Text>
        </Animated.View>

        {!showEmailForm ? (
          <>
            {/* Social Sign-In Options */}
            <Animated.View 
              entering={FadeInDown.delay(300)}
              style={styles.socialContainer}
            >
              <Pressable
                onPress={onSignIn}
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.buttonPressed
                ]}
              >
                <Ionicons name="logo-google" size={20} color="#4285F4" />
                <Text style={styles.socialButtonText}>Continue with Google</Text>
              </Pressable>

              <Pressable
                onPress={onSignIn}
                style={({ pressed }) => [
                  styles.socialButton,
                  pressed && styles.buttonPressed
                ]}
              >
                <Ionicons name="logo-facebook" size={20} color="#1877F2" />
                <Text style={styles.socialButtonText}>Continue with Facebook</Text>
              </Pressable>

              <Pressable
                onPress={onSignIn}
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

            {/* Email Sign-In Button */}
            <AnimatedPressable
              entering={FadeInDown.delay(500)}
              onPress={handleEmailClick}
              style={({ pressed }) => [
                styles.emailButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Ionicons name="mail" size={20} color="#FFFFFF" />
              <Text style={styles.emailButtonText}>Sign in with Email</Text>
            </AnimatedPressable>
          </>
        ) : (
          /* Email Form */
          <Animated.View 
            entering={FadeInRight}
            style={styles.form}
          >
            {/* Email Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, errors.email && styles.inputError]}
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                placeholder="Enter your email"
                placeholderTextColor="rgba(255, 255, 255, 0.4)"
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
            </View>

            {/* Password Field */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <View style={styles.passwordContainer}>
                <TextInput
                  style={[styles.input, styles.passwordInput, errors.password && styles.inputError]}
                  value={formData.password}
                  onChangeText={(text) => handleInputChange('password', text)}
                  placeholder="Enter your password"
                  placeholderTextColor="rgba(255, 255, 255, 0.4)"
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.eyeButton}
                >
                  <Ionicons 
                    name={showPassword ? 'eye-off' : 'eye'} 
                    size={20} 
                    color="#9DE4CF" 
                  />
                </Pressable>
              </View>
              {errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
            </View>

            {/* Forgot Password Link */}
            <Pressable style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </Pressable>

            {/* Submit Button */}
            <Pressable
              onPress={handleSubmit}
              style={({ pressed }) => [
                styles.submitButton,
                pressed && styles.buttonPressed
              ]}
            >
              <Text style={styles.submitButtonText}>Sign in</Text>
            </Pressable>
          </Animated.View>
        )}

        {/* Sign Up Link */}
        <Animated.View 
          entering={FadeIn.delay(600)}
          style={styles.signUpContainer}
        >
          <Text style={styles.signUpText}>
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={onBack}>
            <Text style={styles.signUpLink}>Sign up</Text>
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
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
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
  form: {
    gap: 20,
  },
  fieldContainer: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(255, 255, 255, 0.8)',
  },
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#FFFFFF',
  },
  inputError: {
    borderColor: '#FCA5A5',
  },
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeButton: {
    position: 'absolute',
    right: 12,
    top: 12,
    padding: 4,
  },
  errorText: {
    fontSize: 14,
    color: '#FCA5A5',
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#9DE4CF',
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  signUpText: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  signUpLink: {
    fontSize: 14,
    color: '#9DE4CF',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});

