/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_CONFIG_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface WaselGoogleMaps {
  maps?: {
    Map: new (element: HTMLElement, options?: Record<string, unknown>) => {
      setCenter: (center: { lat: number; lng: number }) => void;
    };
    Marker: new (options?: Record<string, unknown>) => unknown;
    Size: new (width: number, height: number) => unknown;
    Point: new (x: number, y: number) => unknown;
  };
}

interface Window {
  google?: WaselGoogleMaps;
}

