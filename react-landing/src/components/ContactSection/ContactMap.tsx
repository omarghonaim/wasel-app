import { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps } from '@/lib/loadGoogleMaps';
import type { MapCenter } from '@/types/settings';
import styles from './ContactMap.module.css';

const DOHA_CENTER: MapCenter = { lat: 25.2854, lng: 51.531 };
const PIN_SRC = `${import.meta.env.BASE_URL}wasel-map-pin.svg`;

const LIGHT_MAP_STYLES: Record<string, unknown>[] = [
  { elementType: 'geometry', stylers: [{ color: '#f3f1ea' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#6b6b6b' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#f8f6f1' }] },
  { featureType: 'administrative', elementType: 'geometry.stroke', stylers: [{ color: '#d6d0c4' }] },
  { featureType: 'administrative.land_parcel', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ color: '#ebe6db' }] },
  { featureType: 'poi.park', elementType: 'geometry', stylers: [{ color: '#dce8d4' }] },
  { featureType: 'road', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.arterial', elementType: 'geometry', stylers: [{ color: '#ffffff' }] },
  { featureType: 'road.highway', elementType: 'geometry', stylers: [{ color: '#f0e6c8' }] },
  { featureType: 'road.highway', elementType: 'geometry.stroke', stylers: [{ color: '#e4d4a8' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#c5dde3' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#7aa0ab' }] },
];

type ContactMapProps = {
  apiKey: string | null;
  center: MapCenter | null;
};

export function ContactMap({ apiKey, center }: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<'google' | 'osm'>(apiKey ? 'google' : 'osm');
  const lat = center?.lat ?? DOHA_CENTER.lat;
  const lng = center?.lng ?? DOHA_CENTER.lng;
  const osmSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${lng - 0.22}%2C${lat - 0.16}%2C${lng + 0.28}%2C${lat + 0.16}&layer=mapnik`;

  useEffect(() => {
    if (!apiKey) {
      setEngine('osm');
      return;
    }

    if (!mapRef.current) return;

    let cancelled = false;
    const pin = { lat, lng };

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const maps = window.google?.maps;
        if (!maps?.Map || !maps.Marker || !maps.Size || !maps.Point) {
          throw new Error('Google Maps API is incomplete');
        }

        const map = new maps.Map(mapRef.current, {
          center: pin,
          zoom: 11,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          clickableIcons: false,
          gestureHandling: 'cooperative',
          styles: LIGHT_MAP_STYLES,
          backgroundColor: '#f3f1ea',
        });

        new maps.Marker({
          map,
          position: pin,
          title: 'Wasel',
          icon: {
            url: PIN_SRC,
            scaledSize: new maps.Size(48, 62),
            anchor: new maps.Point(24, 62),
          },
        });

        setEngine('google');
      })
      .catch(() => {
        if (!cancelled) setEngine('osm');
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey, lat, lng]);

  return (
    <div className={styles.layer} aria-hidden="true">
      <div
        ref={mapRef}
        className={styles.google}
        data-visible={engine === 'google' ? 'true' : 'false'}
      />
      {engine === 'osm' ? (
        <>
          <iframe
            className={styles.osm}
            title="Map of Doha"
            src={osmSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          <img className={styles.fallbackPin} src={PIN_SRC} alt="" />
        </>
      ) : null}
    </div>
  );
}
