import React from 'react';
import { View } from 'react-native';
import HabitCard from './HabitCard';

interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
  icon: string;
  frequency?: string;
}

interface HabitListProps {
  habits: Habit[];
  onToggleHabit: (id: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, onToggleHabit }) => {
  return (
    <View className="mb-6">
      {habits.map((habit) => (
        <HabitCard key={habit.id} habit={habit} onToggleHabit={onToggleHabit} />
      ))}
    </View>
  );
};

export default HabitList;