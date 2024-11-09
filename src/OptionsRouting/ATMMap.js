import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const ATMMap = () => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [error, setError] = useState(null);

  console.log("Google Maps API Key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          // Fetch ATM locations from the backend
          fetch(`https://distinguished-happiness-production.up.railway.app/api/atm/find?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => response.text())
            .then((data) => {
              try {
                const parsedData = JSON.parse(data);
                setAtmLocations(parsedData.results);
              } catch (error) {
                console.error('Error parsing JSON:', error);
                setError('Failed to parse ATM locations. Please try again later.');
              }
            })
            .catch((error) => {
              console.error('Error fetching ATM locations:', error);
              setError('Could not load ATM locations. Please try again later.');
            });
        },
        () => setError('Could not access your location. Please enable location services.')
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

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
                title={atm.name}
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
