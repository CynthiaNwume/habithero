import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../hooks/useHabits';
import HabitCard from '../components/HabitCard';
import ThemedButton from '../components/ThemedButton';
import { Link, router } from "expo-router";

export default function HomeScreen() {
  const { user } = useAuth();
  const { habits, loading } = useHabits(user?.id);

  return (
    <ScrollView style={{ padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: '700' }}>Habit Hero 💪</Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : habits.length ? (
        habits.map((h) => <HabitCard key={h.id} habit={h} />)
      ) : (
        <Text>No habits yet. Tap “+ New Habit” to start!</Text>
      )}
      <ThemedButton title="+ New Habit" route="/new-habit" />
    </ScrollView>
  );
}
