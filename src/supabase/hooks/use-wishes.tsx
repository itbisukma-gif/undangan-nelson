'use client';

import { useEffect, useState } from 'react';
import { RealtimeChannel } from '@supabase/supabase-js';
import { createClient } from '../client';

export interface Wish {
  id: string;
  name: string;
  status: 'Hadir' | 'Absen';
  message: string;
  created_at: string;
}

interface UseWishesReturn {
  wishes: Wish[];
  loading: boolean;
  error: Error | null;
  addWish: (wish: Omit<Wish, 'id' | 'created_at'>) => Promise<Wish | null>;
  updateWish: (id: string, updates: Partial<Wish>) => Promise<Wish | null>;
  deleteWish: (id: string) => Promise<boolean>;
  refetch: () => Promise<void>;
}

export function useWishes(): UseWishesReturn {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClient();
  let subscription: RealtimeChannel | null = null;

  const fetchWishes = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data, error: err } = await supabase
        .from('wishes')
        .select('*')
        .order('created_at', { ascending: false });

      if (err) throw err;
      setWishes(data || []);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishes();

    // Subscribe to real-time changes
    subscription = supabase
      .channel('wishes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'wishes',
        },
        (payload) => {
          if (payload.eventType === 'INSERT') {
            setWishes((prev) => [payload.new as Wish, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setWishes((prev) =>
              prev.map((wish) =>
                wish.id === (payload.new as Wish).id ? (payload.new as Wish) : wish
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setWishes((prev) => prev.filter((wish) => wish.id !== (payload.old as Wish).id));
          }
        }
      )
      .subscribe();

    return () => {
      subscription?.unsubscribe();
    };
  }, [supabase]);

  const addWish = async (wish: Omit<Wish, 'id' | 'created_at'>): Promise<Wish | null> => {
    try {
      const { data, error: err } = await supabase
        .from('wishes')
        .insert([wish])
        .select()
        .single();

      if (err) throw err;
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      return null;
    }
  };

  const updateWish = async (id: string, updates: Partial<Wish>): Promise<Wish | null> => {
    try {
      const { data, error: err } = await supabase
        .from('wishes')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (err) throw err;
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      return null;
    }
  };

  const deleteWish = async (id: string): Promise<boolean> => {
    try {
      const { error: err } = await supabase
        .from('wishes')
        .delete()
        .eq('id', id);

      if (err) throw err;
      return true;
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      setError(error);
      return false;
    }
  };

  const refetch = async () => {
    await fetchWishes();
  };

  return {
    wishes,
    loading,
    error,
    addWish,
    updateWish,
    deleteWish,
    refetch,
  };
}
