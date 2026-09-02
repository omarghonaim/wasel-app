import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from 'react';
import type { MapCenter } from '@/types/settings';
import styles from './ContactMap.module.css';

const TILE_SIZE = 256;
const MIN_ZOOM = 12;
const MAX_ZOOM = 16;
const PIN_SRC = `${import.meta.env.BASE_URL}wasel-map-pin.svg`;

const DOHA_BOUNDS = {
  north: 25.55,
  south: 25.08,
  east: 51.72,
  west: 51.32,
};

function lngToWorldX(lng: number, zoom: number): number {
  return ((lng + 180) / 360) * 2 ** zoom;
}

function latToWorldY(lat: number, zoom: number): number {
  const sine = Math.sin((lat * Math.PI) / 180);
  const clamped = Math.min(Math.max(sine, -0.9999), 0.9999);
  return (0.5 - Math.log((1 + clamped) / (1 - clamped)) / (4 * Math.PI)) * 2 ** zoom;
}

function worldXToLng(x: number, zoom: number): number {
  return (x / 2 ** zoom) * 360 - 180;
}

function worldYToLat(y: number, zoom: number): number {
  const n = Math.PI - (2 * Math.PI * y) / 2 ** zoom;
  return (180 / Math.PI) * Math.atan(Math.sinh(n));
}

function clampCenter(center: MapCenter, zoom: number): MapCenter {
  const pad = 0.04 * (16 - zoom + 1);
  return {
    lat: Math.min(DOHA_BOUNDS.north - pad, Math.max(DOHA_BOUNDS.south + pad, center.lat)),
    lng: Math.min(DOHA_BOUNDS.east - pad, Math.max(DOHA_BOUNDS.west + pad, center.lng)),
  };
}

type TileMapProps = {
  center: MapCenter;
  marker: MapCenter;
  zoom: number;
};

export function GeographicTileMap({ center, marker, zoom: initialZoom }: TileMapProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ x: number; y: number; center: MapCenter } | null>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });
  const [view, setView] = useState({ center, zoom: initialZoom });

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const update = () => {
      const rect = root.getBoundingClientRect();
      setSize({ width: rect.width, height: rect.height });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = { x: event.clientX, y: event.clientY, center: view.center };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;

    const dWorldX = (drag.x - event.clientX) / TILE_SIZE;
    const dWorldY = (drag.y - event.clientY) / TILE_SIZE;
    const next: MapCenter = {
      lng: worldXToLng(lngToWorldX(drag.center.lng, view.zoom) + dWorldX, view.zoom),
      lat: worldYToLat(latToWorldY(drag.center.lat, view.zoom) + dWorldY, view.zoom),
    };
    setView((current) => ({ ...current, center: clampCenter(next, current.zoom) }));
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (!event.ctrlKey && !event.metaKey) return;
    event.preventDefault();
    const direction = event.deltaY > 0 ? -1 : 1;
    setView((current) => {
      const zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, current.zoom + direction));
      return { center: clampCenter(current.center, zoom), zoom };
    });
  };

  const originX = lngToWorldX(view.center.lng, view.zoom) - size.width / 2 / TILE_SIZE;
  const originY = latToWorldY(view.center.lat, view.zoom) - size.height / 2 / TILE_SIZE;
  const minTileX = Math.floor(originX) - 1;
  const maxTileX = Math.ceil(originX + size.width / TILE_SIZE) + 1;
  const minTileY = Math.floor(originY) - 1;
  const maxTileY = Math.ceil(originY + size.height / TILE_SIZE) + 1;
  const tileLimit = 2 ** view.zoom;

  const tiles = [];
  if (size.width > 0 && size.height > 0) {
    for (let x = minTileX; x <= maxTileX; x += 1) {
      for (let y = minTileY; y <= maxTileY; y += 1) {
        if (y < 0 || y >= tileLimit) continue;
        const wrappedX = ((x % tileLimit) + tileLimit) % tileLimit;
        tiles.push({
          key: `${view.zoom}-${x}-${y}`,
          left: (x - originX) * TILE_SIZE,
          top: (y - originY) * TILE_SIZE,
          src: `https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${view.zoom}/${y}/${wrappedX}`,
        });
      }
    }
  }

  const markerLeft = (lngToWorldX(marker.lng, view.zoom) - originX) * TILE_SIZE;
  const markerTop = (latToWorldY(marker.lat, view.zoom) - originY) * TILE_SIZE;

  return (
    <div
      ref={rootRef}
      className={styles.tileMap}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onWheel={handleWheel}
    >
      {tiles.map((tile) => (
        <img
          key={tile.key}
          className={styles.tile}
          src={tile.src}
          alt=""
          draggable={false}
          style={{ left: tile.left, top: tile.top }}
        />
      ))}
      <img
        className={styles.marker}
        src={PIN_SRC}
        alt="Al Mina Towers"
        draggable={false}
        style={{ left: markerLeft, top: markerTop }}
      />
      <p className={styles.attribution}>© Esri</p>
    </div>
  );
}
