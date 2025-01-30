import React, { useEffect } from 'react';

const MapView = ({ pickupLocation, destination }) => {
  useEffect(() => {
    // Initialize Google Maps
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: { lat: -1.286389, lng: 36.817223 }, // Center the map on Nairobi
      zoom: 12,
    });

    // Add markers for pickup and destination
    const pickupMarker = new window.google.maps.Marker({
      position: { lat: pickupLocation.lat, lng: pickupLocation.lng },
      map: map,
      title: 'Pickup Location',
    });

    const destinationMarker = new window.google.maps.Marker({
      position: { lat: destination.lat, lng: destination.lng },
      map: map,
      title: 'Destination',
    });

    // Draw a line between pickup and destination
    const routeLine = new window.google.maps.Polyline({
      path: [
        { lat: pickupLocation.lat, lng: pickupLocation.lng },
        { lat: destination.lat, lng: destination.lng },
      ],
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 1.0,
      strokeWeight: 2,
    });

    routeLine.setMap(map);
  }, [pickupLocation, destination]);

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
};

export default MapView;
