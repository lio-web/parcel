import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ParcelDetails = () => {
  const { id } = useParams();
  const [parcel, setParcel] = useState(null);

  useEffect(() => {
    const fetchParcel = async () => {
      try {
        const response = await axios.get(`/api/parcels/${id}`);
        setParcel(response.data);
      } catch (error) {
        console.error('Error fetching parcel details:', error);
      }
    };

    fetchParcel();
  }, [id]);

  if (!parcel) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Parcel Details</h2>
      <p>Pickup Location: {parcel.pickup_location}</p>
      <p>Destination: {parcel.destination}</p>
      <p>Weight: {parcel.weight} kg</p>
      <p>Delivery Cost: ${parcel.delivery_cost}</p>
      <p>Status: {parcel.status}</p>
      <p>Present Location: {parcel.present_location}</p>
      <p>Distance: {parcel.distance} km</p>
      <p>Journey Duration: {parcel.journey_duration}</p>
    </div>
  );
};

export default ParcelDetails;
