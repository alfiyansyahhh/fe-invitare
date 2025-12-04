'use client';

import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import L from 'leaflet';

const markerIcon = new L.Icon({
  iconUrl: '/img/placeholder.png',
  iconSize: [45, 41],
  iconAnchor: [12, 41],
});

function LocationPicker({ setPosition }: any) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

export default function MapPicker({
  position,
  setPosition,
}: {
  position: LatLngExpression;
  setPosition: (pos: LatLngExpression) => void;
}) {
  return (
    <MapContainer
      center={position}
      zoom={14}
      scrollWheelZoom
      style={{ height: '300px', width: '100%' }}
    >
      <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png' />
      <LocationPicker setPosition={setPosition} />
      <Marker
        position={position}
        icon={markerIcon}
      />
    </MapContainer>
  );
}
