import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export function useHabits(userId?: string) {
  const [habits, setHabits] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;
    fetchHabits();

    // Realtime subscription
    const channel = supabase
      .channel('habits')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'habits' }, fetchHabits)
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId]);

  const fetchHabits = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('habits')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });
    if (!error && data) setHabits(data);
    setLoading(false);
  };

  const addHabit = async (name: string, frequency = 'daily') => {
    await supabase.from('habits').insert([{ name, frequency, user_id: userId }]);
  };

  const updateStreak = async (id: string, streak: number, last_completed_date: string) => {
    await supabase.from('habits').update({ streak, last_completed_date }).eq('id', id);
  };

  return { habits, loading, addHabit, updateStreak };
}
