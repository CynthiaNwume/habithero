import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';
import { useHabits } from '../hooks/useHabits';

const HabitContext = createContext<any>(null);

export const HabitProvider = ({ children }: { children: React.ReactNode }) => {
  const { user } = useAuth();
  const { habits, loading, addHabit, updateStreak } = useHabits(user?.id);

  return (
    <HabitContext.Provider value={{ habits, loading, addHabit, updateStreak }}>
      {children}
    </HabitContext.Provider>
  );
};

export const useHabitContext = () => useContext(HabitContext);
