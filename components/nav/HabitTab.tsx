import * as Haptics from 'expo-haptics';
import React from 'react';
import { Pressable } from 'react-native';

export function HapticTab(props: { onPress: (e: any) => void, route: { name: string } }) {
  const { onPress, ...restProps } = props;

  const handlePress = (e: any) => {
    if (props.route?.name !== 'add') {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    if (onPress) {
      onPress(e);
    }
  };

  return <Pressable {...restProps} onPress={handlePress} />;
}