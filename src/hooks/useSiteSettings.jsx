import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

export function useSiteSettings(key) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSettings() {
      try {
        const { data: settings, error } = await supabase
          .from('site_settings')
          .select('*')
          .eq('key', key)
          .single();

        if (error && error.code !== 'PGRST116') throw error;
        setData(settings?.value || null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSettings();
  }, [key]);

  return { data, loading, error };
}

export async function updateSiteSettings(key, value) {
  const { data, error } = await supabase
    .from('site_settings')
    .upsert(
      { key, value, updated_at: new Date().toISOString() },
      { onConflict: 'key' }
    )
    .select()
    .single();

  if (error) throw error;
  return data;
}
