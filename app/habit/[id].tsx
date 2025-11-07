import React from 'react';
import { View, Text, Button } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useHabits } from '../../hooks/useHabits';

export default function HabitDetail() {
  const { id } = useLocalSearchParams();
  const { user } = useAuth();
  const { habits, updateStreak } = useHabits(user?.id);
  const habit = habits.find((h) => h.id === id);

  if (!habit) return <Text>Habit not found</Text>;

  const handleComplete = async () => {
    const today = new Date().toISOString().split('T')[0];
    const newStreak = habit.last_completed_date === today
      ? habit.streak
      : habit.last_completed_date === yesterday(today)
        ? habit.streak + 1
        : 1;
    await updateStreak(habit.id, newStreak, today);
  };

  const yesterday = (today: string) => {
    const d = new Date(today);
    d.setDate(d.getDate() - 1);
    return d.toISOString().split('T')[0];
  };

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>{habit.name}</Text>
      <Text>Streak: 🔥 {habit.streak}</Text>
      <Button title="Mark as Done" onPress={handleComplete} />
    </View>
  );
}
