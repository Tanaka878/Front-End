import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ATMMap = ({ initialLocation }) => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(initialLocation);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentLocation) {
      // Fetch ATM locations from the backend
      fetch(
        `https://distinguished-happiness-production.up.railway.app/api/atm/find?latitude=${currentLocation.lat}&longitude=${currentLocation.lng}`
      )
        .then((response) => response.text()) // Get the response as text
        .then((data) => {
          try {
            const parsedData = JSON.parse(data);
            setAtmLocations(parsedData.results || []);
            setError(null); // Clear any previous errors
          } catch (error) {
            console.error('Error parsing JSON:', error);
            setError('Failed to parse ATM locations. Please try again later.');
          }
        })
        .catch((error) => {
          console.error('Error fetching ATM locations:', error);
          setError('Could not load ATM locations. Please try again later.');
        });
    }
  }, [currentLocation]);

  return (
    <div style={{ height: '100vh' }}>
      {error ? (
        <p>{error}</p>
      ) : currentLocation ? (
        <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
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
                title={atm.name} // Display name as tooltip
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
