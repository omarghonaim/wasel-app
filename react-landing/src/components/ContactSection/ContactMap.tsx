import { useEffect, useRef, useState } from 'react';
import { loadGoogleMaps } from '@/lib/loadGoogleMaps';
import type { MapCenter } from '@/types/settings';
import styles from './ContactMap.module.css';

/** 7GRR+9MJ, Al Corniche, Doha, Qatar */
const OFFICE_LOCATION: MapCenter = { lat: 25.2909625, lng: 51.541640625 };
const MAP_ZOOM = 18;
const PIN_SRC = `${import.meta.env.BASE_URL}wasel-map-pin.svg`;
const PIN_WIDTH = 64;
const PIN_HEIGHT = 73;
const GOOGLE_EMBED_SRC =
  'https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d650!2d51.541640625!3d25.2909625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sqa';

type ContactMapProps = {
  apiKey: string | null;
};

export function ContactMap({ apiKey }: ContactMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [engine, setEngine] = useState<'js' | 'embed'>('embed');

  useEffect(() => {
    if (!apiKey || !mapRef.current) {
      setEngine('embed');
      return;
    }

    let cancelled = false;

    loadGoogleMaps(apiKey)
      .then(() => {
        if (cancelled || !mapRef.current) return;
        const maps = window.google?.maps;
        if (!maps?.Map || !maps.Marker || !maps.Size || !maps.Point) {
          throw new Error('Google Maps API is incomplete');
        }

        const map = new maps.Map(mapRef.current, {
          center: OFFICE_LOCATION,
          zoom: MAP_ZOOM,
          disableDefaultUI: true,
          keyboardShortcuts: false,
          clickableIcons: false,
          gestureHandling: 'none',
          backgroundColor: '#e8eaed',
        });

        new maps.Marker({
          map,
          position: OFFICE_LOCATION,
          title: '7GRR+9MJ, Al Corniche, Doha',
          icon: {
            url: PIN_SRC,
            scaledSize: new maps.Size(PIN_WIDTH, PIN_HEIGHT),
            anchor: new maps.Point(PIN_WIDTH / 2, PIN_HEIGHT - 8),
          },
        });

        setEngine('js');
      })
      .catch(() => {
        if (!cancelled) setEngine('embed');
      });

    return () => {
      cancelled = true;
    };
  }, [apiKey]);

  return (
    <div className={styles.layer} aria-hidden="true">
      <div
        ref={mapRef}
        className={styles.google}
        data-visible={engine === 'js' ? 'true' : 'false'}
      />
      {engine === 'embed' ? (
        <>
          <iframe
            className={styles.embed}
            title="Google Map of 7GRR+9MJ, Al Corniche, Doha"
            src={GOOGLE_EMBED_SRC}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          />
          <img className={styles.pin} src={PIN_SRC} alt="" />
        </>
      ) : null}
    </div>
  );
}
