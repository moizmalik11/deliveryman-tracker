import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import DriverMap from './components/DriverMap';

const socket = io('http://localhost:5000');

function App() {
  const [driverLocation, setDriverLocation] = useState({
    lat: 24.8607,
    lng: 67.0011,
  });

  useEffect(() => {
    socket.emit('locationUpdate', {
      lat: driverLocation.lat,
      lng: driverLocation.lng,
      driverId: 'driver123',
    });

    socket.on('locationBroadcast', (data) => {
      console.log('📍 Location from backend:', data);
      setDriverLocation({ lat: data.lat, lng: data.lng });
    });

    return () => {
      socket.off('locationBroadcast');
    };
  }, []);

  return (
    <div>
      <h1>Delivery Tracker</h1>
      <DriverMap location={driverLocation} />
    </div>
  );
}

export default App;
