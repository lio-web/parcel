import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function OrderLocation() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/user/parcels/${id}`);
        setOrder(response.data);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  return (
    <div className="container mx-auto mt-10">
      {order ? (
        <div>
          <h2 className="text-2xl font-bold mb-5">Order Location</h2>
          <p><strong>Present Location:</strong> {order.present_location}</p>
          <p><strong>Destination:</strong> {order.destination}</p>
        </div>
      ) : (
        <p className="text-gray-500">Loading...</p>
      )}
    </div>
  );
}

export default OrderLocation;
