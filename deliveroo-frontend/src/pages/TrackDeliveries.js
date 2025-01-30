import React, { useState, useEffect } from 'react';
import axios from '../api/axios';  // Ensure you're using the correct Axios instance

function TrackDeliveries() {
  const [deliveries, setDeliveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeliveries = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('/admin/deliveries', {
          headers: {
            Authorization: `Bearer ${token}`,  // Ensure the header is correctly formatted
          },
        });
        setDeliveries(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching deliveries. Please try again.');
        console.error('Error fetching deliveries:', err);
        setLoading(false);
      }
    };

    fetchDeliveries();
  }, []);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Track Deliveries</h2>
      {loading ? (
        <p className="text-gray-500">Loading deliveries...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : deliveries.length > 0 ? (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Pickup Location</th>
              <th className="py-2 px-4 border-b">Destination</th>
              <th className="py-2 px-4 border-b">Current Location</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.map((delivery) => (
              <tr key={delivery.id}>
                <td className="py-2 px-4 border-b">{delivery.id}</td>
                <td className="py-2 px-4 border-b">{delivery.pickup_location}</td>
                <td className="py-2 px-4 border-b">{delivery.destination}</td>
                <td className="py-2 px-4 border-b">{delivery.present_location}</td>
                <td className="py-2 px-4 border-b">{delivery.status}</td>
                <td className="py-2 px-4 border-b">
                  {/* Add actions to manage deliveries */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">No deliveries found.</p>
      )}
    </div>
  );
}

export default TrackDeliveries;
