import { View, Pressable, StyleSheet } from 'react-native';

interface OnboardingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  onStepClick: (step: number) => void;
}

export function OnboardingProgressBar({ currentStep, totalSteps, onStepClick }: OnboardingProgressBarProps) {
  return (
    <View style={styles.container}>
      {[...Array(totalSteps)].map((_, i) => {
        const stepNumber = i + 1;
        const isActive = stepNumber === currentStep;
        const isPrevious = stepNumber < currentStep;
        const isClickable = isPrevious;

        return (
          <Pressable
            key={i}
            onPress={() => isClickable && onStepClick(stepNumber)}
            disabled={!isClickable}
            style={[
              styles.dot,
              isActive && styles.activeDot,
              isPrevious && styles.previousDot,
              !isPrevious && !isActive && styles.futureDot,
            ]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
  },
  dot: {
    height: 6,
    borderRadius: 999,
    transition: 'all 0.3s',
  },
  activeDot: {
    width: 32,
    backgroundColor: '#F59E0B',
  },
  previousDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  futureDot: {
    width: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
});

