import { useColorScheme } from '@/hooks/useColorScheme';
import { BlurView } from 'expo-blur';
import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const TabBarBackground = () => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  // For iOS, use BlurView for the glass effect
  if (Platform.OS === 'ios') {
    return (
      <BlurView
        style={styles.container}
        intensity={70}
        tint={isDark ? 'dark' : 'light'}>
        {/* The curved notch for the add button */}
        <View style={styles.centerCurve} />
      </BlurView>
    );
  }

  // For Android and other platforms
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: isDark ? '#1c1c1e' : '#f2f2f7',
        },
      ]}>
      {/* The curved notch for the add button */}
      <View style={styles.centerCurve} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    overflow: 'hidden',
  },
  centerCurve: {
    position: 'absolute',
    top: 0,
    left: '50%',
    width: 80,
    height: 0,
    marginLeft: -40, // Half of width to center
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    borderLeftWidth: 40,
    borderRightWidth: 40,
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});

export default TabBarBackground;