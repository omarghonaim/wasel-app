import { useEffect, useState } from 'react';
import { fetchSiteSettings } from '@/api/config';
import type { SiteSettings } from '@/types/settings';

type SettingsState = {
  settings: SiteSettings | null;
  loading: boolean;
  error: string | null;
};

const initialState: SettingsState = {
  settings: null,
  loading: true,
  error: null,
};

export function useSettings(): SettingsState {
  const [state, setState] = useState<SettingsState>(initialState);

  useEffect(() => {
    let active = true;

    fetchSiteSettings()
      .then((settings) => {
        if (!active) return;
        setState({ settings, loading: false, error: null });
      })
      .catch((err: unknown) => {
        if (!active) return;
        setState({
          settings: null,
          loading: false,
          error: err instanceof Error ? err.message : 'Failed to load settings',
        });
      });

    return () => {
      active = false;
    };
  }, []);

  return state;
}
