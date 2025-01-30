import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function UpdateOrder() {
  const { id } = useParams();
  const [destination, setDestination] = useState('');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`/user/parcels/${id}`);
        setOrder(response.data);
        setDestination(response.data.destination);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };

    fetchOrder();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/user/parcels/${id}`, { destination });
      console.log(response.data);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  return (
    <div className="container mx-auto">
      {order && (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-5">Update Parcel Order</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
            Update Order
          </button>
        </form>
      )}
    </div>
  );
}

export default UpdateOrder;
