import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createParcel } from '../api';

const ParcelForm = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createParcel({ pickupLocation, destination, weight }, token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating parcel:', error);
    }
  };

  return (
    <div>
      <h2>Create Parcel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={pickupLocation}
          onChange={(e) => setPickupLocation(e.target.value)}
          placeholder="Pickup Location"
        />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          placeholder="Destination"
        />
        <input
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          placeholder="Weight (kg)"
        />
        <button type="submit">Create Parcel</button>
      </form>
    </div>
  );
};

export default ParcelForm;
