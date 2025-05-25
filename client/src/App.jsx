import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import DriverMap from './components/DriverMap';

const socket = io('http://localhost:5000', {
  transports: ['websocket'], // ✅ Ye add karo taake disconnect na ho
});
function App() {
  const [driverLocation, setDriverLocation] = useState(null);

  useEffect(() => {
    // Emit once (or from a button later)
    socket.emit('locationUpdate', {
      lat: 24.8607,
      lng: 67.0011,
      driverId: 'driver', // Example driver ID
    });

    // Listen for real-time updates from backend
    socket.on('locationBroadcast', (data) => {
      console.log('📍 Location received:', data); // ✅ Check this
      setDriverLocation(data);
    });

    return () => socket.disconnect();
  }, []);

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>🚚 Delivery Tracker</h2>
      {driverLocation ? (
        <DriverMap location={driverLocation} />
      ) : (
        <p style={{ textAlign: 'center' }}>Waiting for driver location...</p>
      )}
    </div>
  );
}

export default App;
