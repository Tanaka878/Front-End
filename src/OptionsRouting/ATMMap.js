import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';

const ATMMap = () => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Get user's current geolocation
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });

        // Call the backend to get ATM locations
        axios
          .get(`/api/atm/find?latitude=${latitude}&longitude=${longitude}`)
          .then((response) => {
            const locations = JSON.parse(response.data).results;
            setAtmLocations(locations);
          })
          .catch((error) => console.error(error));
      });
    }
  }, []);

  return (
    <div style={{ height: '100vh' }}>
      {currentLocation ? (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ width: '100%', height: '100%' }}
            center={currentLocation}
            zoom={14}
          >
            {atmLocations.map((atm, index) => (
              <Marker
                key={index}
                position={{
                  lat: atm.geometry.location.lat,
                  lng: atm.geometry.location.lng,
                }}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      ) : (
        <p>Loading map...</p>
      )}
    </div>
  );
};

export default ATMMap;
