import React from 'react';
import { SafeAreaView, View } from 'react-native';
import HabitTracker from '../../components/HabitTracker';

const Home: React.FC = () => {
  return (
    <SafeAreaView className="flex-1 bg-[#f5f5f5]">
      <View className="flex-1">
        <HabitTracker />
      </View>
    </SafeAreaView>
  );
};

export default Home;