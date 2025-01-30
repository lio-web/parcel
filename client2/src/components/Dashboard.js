import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchParcels } from '../slices/parcelSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const parcels = useSelector((state) => state.parcel.parcels);
  const status = useSelector((state) => state.parcel.status);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchParcels());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h2>Dashboard</h2>
      <ul>
        {parcels.map((parcel) => (
          <li key={parcel.id}>
            {parcel.pickup_location} to {parcel.destination} - {parcel.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
