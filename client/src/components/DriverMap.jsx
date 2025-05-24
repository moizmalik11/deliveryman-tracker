import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9pem1hbGlrIiwiYSI6ImNtYXpkZTdqYjBiMzUyanM4djhtaDk2OHQifQ.9Y7Xh02Kc3WINqHwn-giow'; // Replace with your real one

function DriverMap({ location }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!location) return;

    // Map initialize only once
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom: 13,
      });

      // Add marker
      markerRef.current = new mapboxgl.Marker({ color: 'red' })
        .setLngLat([location.lng, location.lat])
        .addTo(mapRef.current);
    } else {
      // Update marker position
      markerRef.current.setLngLat([location.lng, location.lat]);
      mapRef.current.flyTo({
        center: [location.lng, location.lat],
        speed: 1.2,
      });
    }
  }, [location]);

  return (
    <div
      ref={mapContainerRef}
      style={{ height: '500px', width: '100%', borderRadius: '10px', marginTop: '1rem' }}
    />
  );
}

export default DriverMap;
