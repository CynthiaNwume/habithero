import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function HabitCard({ habit }: { habit: any }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(`/habit/${habit.id}`)}
      style={{
        backgroundColor: '#fff',
        padding: 16,
        marginVertical: 8,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600' }}>{habit.name}</Text>
      <Text>🔥 {habit.streak}</Text>
    </TouchableOpacity>
  );
}
