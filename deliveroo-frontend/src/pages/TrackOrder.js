import React, { useState, useEffect } from 'react';
import axios from '../api/axios';  // Ensure you're using the correct Axios instance
import { useParams } from 'react-router-dom';

function TrackOrder() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`/user/parcels/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,  // Ensure the header is correctly formatted
          },
        });
        setOrder(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching order details. Please try again.');
        console.error('Error fetching order details:', err);
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="container mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Track Order</h2>
      {loading ? (
        <p className="text-gray-500">Loading order details...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : order ? (
        <div>
          <p><strong>ID:</strong> {order.id}</p>
          <p><strong>Pickup Location:</strong> {order.pickup_location}</p>
          <p><strong>Destination:</strong> {order.destination}</p>
          <p><strong>Present Location:</strong> {order.present_location}</p>
          <p><strong>Status:</strong> {order.status}</p>
        </div>
      ) : (
        <p className="text-gray-500">Order not found.</p>
      )}
    </div>
  );
}

export default TrackOrder;
