import { Feather } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  // Function to handle add button press with animation
  const handleAddPress = () => {
    // Provide haptic feedback
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Animate button press
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
    
    // Add your modal or navigation logic here
    console.log('Add button pressed');
  };

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#ff6b35',
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute',
            height: 70,
            borderTopWidth: 0, // Remove default border
          },
          default: {
            height: 70,
            borderTopWidth: 0, // Remove default border
            elevation: 0, // Remove default Android elevation
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginBottom: 5 }}>Today</Text>
          ),
          tabBarIcon: ({ color }) => (
            <View style={styles.tabIconContainer}>
              <View style={styles.gridIcon}>
                <View style={[styles.gridSquare, { backgroundColor: color }]} />
                <View style={[styles.gridSquare, { backgroundColor: color }]} />
                <View style={[styles.gridSquare, { backgroundColor: color }]} />
                <View style={[styles.gridSquare, { backgroundColor: color }]} />
              </View>
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: '',
          tabBarLabel: () => null,
          tabBarIcon: () => (
            <View style={styles.addButtonContainer}>
              <TouchableWithoutFeedback onPress={handleAddPress}>
                <Animated.View 
                  style={[
                    styles.addButton, 
                    { transform: [{ scale: scaleAnim }] }
                  ]}
                >
                  <Feather name="plus" color="white" size={30} />
                </Animated.View>
              </TouchableWithoutFeedback>
            </View>
          ),
        }}
        listeners={{
          tabPress: (e) => {
            // Prevent default navigation
            e.preventDefault();
            // Handle add button press using our custom handler
            handleAddPress();
          },
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: 'Calendar',
          tabBarLabel: ({ color }) => (
            <Text style={{ color, fontSize: 12, marginBottom: 5 }}>Calendar</Text>
          ),
          tabBarIcon: ({ color }) => (
            <Feather name="calendar" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 24,
    width: 24,
  },
  gridIcon: {
    width: 20,
    height: 20,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridSquare: {
    width: 8,
    height: 8,
    margin: 1,
    borderRadius: 1,
  },
  addButtonContainer: {
    position: 'absolute',

    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
  },
  addButton: {
    backgroundColor: '#ff6b35', // Purple color from your screenshot
    width: 70,
    height:70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    // Elevation for Android
    elevation: 6,
  },
});