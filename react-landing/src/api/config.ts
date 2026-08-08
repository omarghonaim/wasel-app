import { apiGet } from './client';
import type { SiteSettings } from '@/types/settings';

type ConfigApiResponse = {
  business_name?: string | null;
  logo_full_url?: string | null;
  logo?: string | null;
  app_url_android?: string | null;
  app_url_ios?: string | null;
};

/**
 * Endpoint is configurable via VITE_CONFIG_ENDPOINT so swapping
 * backend routes later does not require component changes.
 */
const CONFIG_ENDPOINT =
  import.meta.env.VITE_CONFIG_ENDPOINT || '/api/v1/config';

function resolveLogoUrl(data: ConfigApiResponse): string | null {
  if (data.logo_full_url) return data.logo_full_url;
  return null;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const data = await apiGet<ConfigApiResponse>(CONFIG_ENDPOINT);

  return {
    logo: resolveLogoUrl(data),
    businessName: data.business_name ?? null,
    appUrlAndroid: data.app_url_android ?? null,
    appUrlIos: data.app_url_ios ?? null,
  };
}
