import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';
import Feather from 'react-native-vector-icons/Feather';
import HabitList from './HabitList';

interface Habit {
  id: number;
  title: string;
  completed: boolean;
  streak: number;
  icon: string;
  frequency?: string;
}

const HabitTracker = () => {
  const initialHabits: Habit[] = [
    { id: 1, title: "Drink water", completed: false, streak: 7, icon: "Water", frequency: "Daily" },
    { id: 2, title: "Read 30 minutes", completed: true, streak: 12, icon: "book", frequency: "Daily" },
    { id: 3, title: "Morning workout", completed: false, streak: 3, icon: "Exercise", frequency: "Weekdays" },
    { id: 4, title: "Meditate", completed: false, streak: 0, icon: "Meditation", frequency: "Daily" },
  ];

  const [habits, setHabits] = useState(initialHabits);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedDay, setSelectedDay] = useState(4);

  const handleToggleHabit = (id: number) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  };

  const completedHabits = habits.filter(habit => habit.completed);
  const completionPercentage = Math.round((completedHabits.length / habits.length) * 100);
  
  const today = new Date();
  const dayNames = ["Fri", "Sat", "Sun", "Mon", "Tue", "Wed", "Thu"];
  const days = dayNames.map((name, index) => {
    return {
      name,
      date: index + 2,
      isSelected: index === 3
    };
  });

  let filteredHabits = habits;
  if (activeTab === "todo") {
    filteredHabits = habits.filter(habit => !habit.completed);
  } else if (activeTab === "done") {
    filteredHabits = habits.filter(habit => habit.completed);
  }

  return (
    <View className="flex-1 bg-[#f5f5f5] mt-12">
      <View className="max-w-[500px] w-full p-4">
        <View className="flex-row justify-between mb-6">
          <View>
          <Text className="text-2xl font-bold text-[#ff6b35]">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}</Text>
            <Text className="text-4xl font-bold text-[#333]">Today's Habits</Text>
          </View>
          <View className="flex-row items-center justify-center">
            <View>
              <Svg height="120" width="120" viewBox="0 0 36 36">
                <Circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#e6e6e6"
                  strokeWidth="2"
                />
                <Circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke={completionPercentage === 100 ? '#00cc00' : '#ff6b35'}
                  strokeWidth="2"
                  strokeDasharray={`${completionPercentage}, 100`}
                  strokeLinecap="round"
                  rotation="-90"
                  origin="18, 18"
                />
                {completionPercentage === 100 ? (
                  // Render Feather check icon when complete
                  <Feather
                    name="check"
                    size={42}
                    color="#00cc00"
                    style={{
                      position: 'absolute',
                      left: 40,
                      top: 40,
                    }}
                  />
                ) : (
                  <SvgText
                    x="18"
                    y="19"
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    fontSize="8"
                    fill="#4a4a4a"
                    fontWeight="bold"
                  >
                    {`${completionPercentage}%`}
                  </SvgText>
                )}
              </Svg>
            </View>
          </View>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          className="mb-6"
        >
          {days.map((day, index) => (
            <TouchableOpacity
              key={index}
              className={`items-center justify-center h-16 w-16 rounded-full ${day.isSelected ? 'bg-[#555]' : 'bg-[#f0f0f0]'} mr-2`}
              onPress={() => setSelectedDay(index)}
            >
              <Text className={`text-sm ${day.isSelected ? 'text-white' : 'text-[#666]'}`}>
                {day.name}
              </Text>
              <Text className={`text-lg font-bold ${day.isSelected ? 'text-white' : 'text-[#555]'}`}>
                {day.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View className="flex-row border-b border-[#e0e0e0] mb-6">
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "all" ? 'border-b-2 border-[#555]' : ''}`}
            onPress={() => setActiveTab("all")}
          >
            <Text className={`${activeTab === "all" ? 'text-[#333] font-medium' : 'text-[#888]'}`}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "todo" ? 'border-b-2 border-[#555]' : ''}`}
            onPress={() => setActiveTab("todo")}
          >
            <Text className={`${activeTab === "todo" ? 'text-[#333] font-medium' : 'text-[#888]'}`}>
              To Do
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`flex-1 py-3 items-center ${activeTab === "done" ? 'border-b-2 border-[#555]' : ''}`}
            onPress={() => setActiveTab("done")}
          >
            <Text className={`${activeTab === "done" ? 'text-[#333] font-medium' : 'text-[#888]'}`}>
              Done
            </Text>
          </TouchableOpacity>
        </View>

        <HabitList
          habits={filteredHabits}
          onToggleHabit={handleToggleHabit}
        />
      </View>
    </View>
  );
};

export default HabitTracker;