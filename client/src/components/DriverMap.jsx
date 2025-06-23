import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = 'pk.eyJ1IjoibW9pem1hbGlrIiwiYSI6ImNtYXpkZTdqYjBiMzUyanM4djhtaDk2OHQifQ.9Y7Xh02Kc3WINqHwn-giow';

function DriverMap({ location }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  useEffect(() => {
    if (!location || !location.lat || !location.lng) return;

    // Initialize map once
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
      // Update marker position if marker already exists
      if (markerRef.current) {
        markerRef.current.setLngLat([location.lng, location.lat]);
      }

      // Animate map to new location
      mapRef.current.flyTo({
        center: [location.lng, location.lat],
        speed: 1.2,
        essential: true,
      });
    }
  }, [location]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: '500px',
        width: '100%',
        borderRadius: '10px',
        marginTop: '1rem',
      }}
    />
  );
}

export default DriverMap;
