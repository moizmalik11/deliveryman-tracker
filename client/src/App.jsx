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
import { useEffect, useState } from "react";

function App() {
  const [drivers, setDrivers] = useState([]);
  const [orders, setOrders] = useState([]);
  

  useEffect(() => {
    fetch("http://localhost:5000/api/drivers")
      .then((res) => res.json())
      .then(setDrivers)
      .catch(console.error);

    fetch("http://localhost:5000/api/orders")
      .then((res) => res.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">DeliveryMan Dashboard</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Drivers Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Drivers</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-1 text-left">Name</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Status</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-1">{d.name}</td>
                  <td className="border border-gray-300 px-3 py-1">{d.status}</td>
                  <td className="border border-gray-300 px-3 py-1">{d.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Orders Section */}
        <section className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <table className="w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-3 py-1 text-left">Product</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Driver ID</th>
                <th className="border border-gray-300 px-3 py-1 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-3 py-1">{o.product}</td>
                  <td className="border border-gray-300 px-3 py-1">{o.driverId}</td>
                  <td className="border border-gray-300 px-3 py-1">{o.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default App;
