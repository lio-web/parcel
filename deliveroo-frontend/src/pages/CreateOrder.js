import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateOrder() {
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [weight, setWeight] = useState('');
  const [deliveryCost, setDeliveryCost] = useState('');
  const [distance, setDistance] = useState('');
  const [journeyDuration, setJourneyDuration] = useState('');
  const [userEmail, setUserEmail] = useState(''); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const sendEmail = async (toEmail, subject, content) => {
    const url = "https://api.brevo.com/v3/smtp/email";
    const payload = {
      sender: { name: "Deliveroo parcel delivery", email: "lionardmuhati58@gmail.com" },
      to: [{ email: toEmail }],
      subject: subject,
      htmlContent: content
    };
    const headers = {
      accept: "application/json",
      "api-key": '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',
      "content-type": "application/json"
    };

    try {
      const response = await axios.post(url, payload, { headers });
      console.log("Email sent:", response.status);
    } catch (error) {
      console.error("Error sending email:", error.response ? error.response.data : error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pickupLocation || !destination || !weight || !deliveryCost || !distance || !journeyDuration || !userEmail) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      console.log("Creating order with the following data:", {
        pickup_location: pickupLocation,
        destination,
        weight: parseFloat(weight),
        delivery_cost: parseFloat(deliveryCost),
        distance: parseFloat(distance),
        journey_duration: parseFloat(journeyDuration),
        user_email: userEmail // Add user's email to the payload
      });

      const response = await axios.post('/user/parcels', {
        pickup_location: pickupLocation,
        destination,
        weight: parseFloat(weight),
        delivery_cost: parseFloat(deliveryCost),
        distance: parseFloat(distance),
        journey_duration: parseFloat(journeyDuration),
        user_email: userEmail // Include user's email
      });

      console.log("Order creation response:", response.data);

      setMessage('Order created successfully!');
      // Send email notification
      await sendEmail(
        userEmail, // Send to the user's email
        "Parcel Order Created",
        `Your parcel order has been created successfully. Here are the details:
         - Pickup Location: ${pickupLocation}
         - Destination: ${destination}
         - Weight: ${weight} kg
         - Delivery Cost: ${deliveryCost} Ksh
         - Distance: ${distance} km
         - Journey Duration: ${journeyDuration} hours`
      );
      setTimeout(() => {
        navigate('/view-orders');
      }, 2000);
    } catch (error) {
      console.error('Error creating order:', error.response ? error.response.data : error.message);
      alert('Error creating order. Please check the console for details.');
    }
  };

  return (
    <div className="container mx-auto">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-5">Create Parcel Order</h2>
        {message && <p className="mb-4 text-green-500">{message}</p>}
        <div className="mb-4">
          <label className="block text-sm font-medium">Pickup Location</label>
          <input
            type="text"
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Destination</label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Weight</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Delivery Cost</label>
          <input
            type="number"
            value={deliveryCost}
            onChange={(e) => setDeliveryCost(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Distance</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Journey Duration</label>
          <input
            type="number"
            value={journeyDuration}
            onChange={(e) => setJourneyDuration(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
          Create Order
        </button>
      </form>
    </div>
  );
}

export default CreateOrder;
