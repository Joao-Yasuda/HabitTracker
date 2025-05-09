import { Book, Dumbbell } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
  icon?: string;
  frequency?: string;
}

interface HabitCardProps {
  habit: Habit;
  onToggleHabit: (id: number) => void;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onToggleHabit }) => {
  const renderIcon = () => {
    if (habit.title.toLowerCase().includes('read')) {
      return (
        <View className="bg-gray-400 h-12 w-12 rounded-xl items-center justify-center">
          <Book size={24} color="white" />
        </View>
      );
    } else if (habit.title.toLowerCase().includes('workout')) {
      return (
        <View className="bg-gray-100 h-12 w-12 rounded-xl items-center justify-center">
          <Dumbbell size={24} color="gray" />
        </View>
      );
    } else {
      return null; 
    }
  };

  return (
<TouchableOpacity 
      key={habit.id} 
      className={`rounded-xl mb-3 p-4 shadow-sm shadow-black/10 elevation-2 ${habit.completed ? 'bg-gray-200' : 'bg-white'}`}
      onPress={() => onToggleHabit(habit.id)}
    >
      <View className="flex-row bg   justify-between items-center">
        {habit.title.toLowerCase().includes('read') || habit.title.toLowerCase().includes('workout') ? (
          <View className="flex-row items-center b flex-1">
            {renderIcon()}
            <View className="ml-3 flex-1">
              <Text className="text-lg font-medium text-gray-700">{habit.title}</Text>
              <View className="flex-row items-center">
                <Text className="text-sm text-gray-500">{habit.streak} day streak</Text>
                <Text className="text-sm text-gray-500 mx-2">•</Text>
                <Text className="text-sm text-gray-500">{habit.frequency || 'Daily'}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-1">
            <Text className="text-lg font-medium text-gray-700">{habit.title}</Text>
            <Text className="text-sm text-gray-500">{habit.frequency || 'Daily'}</Text>
          </View>
        )}
        <View className="flex-row items-center">
          {!habit.title.toLowerCase().includes('read') && !habit.title.toLowerCase().includes('workout') && (
            <Text className="mr-3 text-sm text-gray-500">{habit.streak} day streak</Text>
          )}
          {habit.completed ? (
            <View className="h-6 w-6 rounded-full bg-gray-400 items-center justify-center">
              <Text className="text-white font-bold text-center">✓</Text>
            </View>
          ) : (
            <View className="h-6 w-6 rounded-full border-2 border-gray-200"></View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default HabitCard;