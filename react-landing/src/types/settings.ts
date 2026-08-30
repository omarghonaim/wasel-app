export type MapCenter = {
  lat: number;
  lng: number;
};

export type SiteSettings = {
  logo: string | null;
  businessName: string | null;
  appUrlAndroid: string | null;
  appUrlIos: string | null;
  mapApiKey: string | null;
  mapCenter: MapCenter | null;
};

export type HeroSliderItem = {
  id: string;
  label: string;
};
