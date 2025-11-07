import React from "react";
import { Stack } from "expo-router";
import { AuthProvider } from "../context/AuthContext";
import { ThemeProvider } from "../context/ThemeContext";
import { HabitProvider } from "../context/HabitContext";

export default function Layout() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <HabitProvider>
          <Stack screenOptions={{ headerShown: false }} />
        </HabitProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
