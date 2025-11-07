import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function ThemedButton({ title, route }: { title: string; route: string }) {
  const router = useRouter();
  return (
    <TouchableOpacity
      onPress={() => router.push(route)}
      style={{
        backgroundColor: '#FFC93C',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 24,
      }}
    >
      <Text style={{ fontWeight: '600' }}>{title}</Text>
    </TouchableOpacity>
  );
}
