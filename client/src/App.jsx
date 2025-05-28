// import { useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import DriverMap from './components/DriverMap';

// const socket = io('http://localhost:5000', {
//   transports: ['websocket'], // ✅ Ye add karo taake disconnect na ho
// });
// function App() {
//   const [driverLocation, setDriverLocation] = useState(null);

//   useEffect(() => {
//     // Emit once (or from a button later)
//     socket.emit('locationUpdate', {
//       lat: 24.8607,
//       lng: 67.0011,
//       driverId: 'driver1', // Example driver ID
//     });

//     // Listen for real-time updates from backend
//     socket.on('locationBroadcast', (data) => {
//       console.log('📍 Location received:', data); // ✅ Check this
//       setDriverLocation(data);
//     });

//     return () => socket.disconnect();
//   }, []);

//   return (
//     <div>
//       <h2 style={{ textAlign: 'center' }}>🚚 Delivery Tracker</h2>
//       {driverLocation ? (
//         <DriverMap location={driverLocation} />
//       ) : (
//         <p style={{ textAlign: 'center' }}>Waiting for driver location...</p>
//       )}
//     </div>
//   );
// }

// export default App;
import { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/drivers').then(res => setDrivers(res.data));
    axios.get('http://localhost:5000/api/orders').then(res => setOrders(res.data));
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">DeliveryMan Dashboard</h1>

      <h2 className="text-xl font-semibold">Drivers</h2>
      <ul className="mb-4">
        {drivers.map(driver => (
          <li key={driver._id} className="border p-2 rounded my-2">
            {driver.name} - Location: {driver.currentLocation}
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold">Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order._id} className="border p-2 rounded my-2">
            {order.item} - Status: {order.status} - Driver: {order.driver?.name || 'Unassigned'}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
