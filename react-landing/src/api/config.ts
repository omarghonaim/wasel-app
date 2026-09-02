import { apiGet } from './client';
import type { MapCenter, SiteSettings } from '@/types/settings';

type ConfigApiResponse = {
  business_name?: string | null;
  logo_full_url?: string | null;
  logo?: string | null;
  app_url_android?: string | null;
  app_url_ios?: string | null;
  map_api_key?: string | null;
  default_location?: {
    lat?: string | number | null;
    lng?: string | number | null;
  } | null;
};

/**
 * Endpoint is configurable via VITE_CONFIG_ENDPOINT so swapping
 * backend routes later does not require component changes.
 */
const CONFIG_ENDPOINT =
  import.meta.env.VITE_CONFIG_ENDPOINT || '/api/v1/config';

/** 7GRR+9MJ, Al Corniche, Doha, Qatar */
const DOHA_CENTER: MapCenter = { lat: 25.2909625, lng: 51.541640625 };

function resolveLogoUrl(data: ConfigApiResponse): string | null {
  if (data.logo_full_url) return data.logo_full_url;
  return null;
}

function resolveMapCenter(data: ConfigApiResponse): MapCenter {
  const lat = Number(data.default_location?.lat);
  const lng = Number(data.default_location?.lng);
  const isQatar = lat >= 24 && lat <= 27 && lng >= 50 && lng <= 52;
  if (Number.isFinite(lat) && Number.isFinite(lng) && isQatar) {
    return { lat, lng };
  }
  return DOHA_CENTER;
}

export async function fetchSiteSettings(): Promise<SiteSettings> {
  const data = await apiGet<ConfigApiResponse>(CONFIG_ENDPOINT);

  return {
    logo: resolveLogoUrl(data),
    businessName: data.business_name ?? null,
    appUrlAndroid: data.app_url_android ?? null,
    appUrlIos: data.app_url_ios ?? null,
    mapApiKey: data.map_api_key?.trim() ? data.map_api_key : null,
    mapCenter: resolveMapCenter(data),
  };
}
