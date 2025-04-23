// src/components/LoadingIndicator.tsx
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface LoadingIndicatorProps {
  size?: 'small' | 'large';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ size = 'large' }) => {
  const theme = useTheme();
  
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LoadingIndicator;