import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { useAuth } from '../context/AuthContext';
import { useHabits } from '../hooks/useHabits';
import { router } from 'expo-router';

export default function NewHabit() {
  const [name, setName] = useState('');
  const { user } = useAuth();
  const { addHabit } = useHabits(user?.id);

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text style={{ fontSize: 20, marginBottom: 16 }}>Create a new habit</Text>
      <TextInput
        placeholder="Habit name"
        value={name}
        onChangeText={setName}
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 12,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <Button
        title="Save Habit"
        onPress={async () => {
          if (name.trim().length > 0) {
            await addHabit(name);
            router.back();
          }
        }}
      />
    </View>
  );
}
