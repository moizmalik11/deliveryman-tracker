import mapboxgl from 'mapbox-gl';
import { useEffect, useRef } from 'react';
const rider;
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
   <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl border border-purple-500/20">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Track {rider.name}</h2>
          <button
            // eslint-disable-next-line no-undef
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          // eslint-disable-next-line no-undef
          {rider.currentOrder && (
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-gray-300">
                <div>
                  <p className="text-sm text-gray-400">Order ID</p>
                  <p>{rider.currentOrder.orderId}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Destination</p>
                  <p>{rider.currentOrder.address}</p>
                </div>
              </div>
            </div>
          )}

          <div className="relative w-full" style={{ height: '400px' }}>
            <div ref={mapRef} className="absolute inset-0 rounded-lg overflow-hidden" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverMap;
