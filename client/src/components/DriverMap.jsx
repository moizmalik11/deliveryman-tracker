import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';

mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN'; // Replace this with your actual token

function DriverMap({ location }) {
  const mapContainer = useRef(null);
  const mapRef = useRef(null); // Hold map instance

  useEffect(() => {
    if (!mapRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [location.lng, location.lat],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(mapRef.current);
    } else {
      // Update map center and marker on location change
      mapRef.current.setCenter([location.lng, location.lat]);
      const markers = document.getElementsByClassName('mapboxgl-marker');
      if (markers[0]) markers[0].remove(); // remove old marker
      new mapboxgl.Marker().setLngLat([location.lng, location.lat]).addTo(mapRef.current);
    }
  }, [location]);

  return <div ref={mapContainer} style={{ width: '100%', height: '400px' }} />;
}

export default DriverMap;
