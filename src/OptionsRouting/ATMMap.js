import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const ATMMap = () => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedATM, setSelectedATM] = useState(null);
  const [distance, setDistance] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCurrentLocation({ lat: latitude, lng: longitude });

          fetch(`https://distinguished-happiness-production.up.railway.app/api/atm/find?latitude=${latitude}&longitude=${longitude}`)
            .then((response) => response.json())
            .then((data) => setAtmLocations(data.results))
            .catch((error) => console.error('Error fetching ATM locations:', error));
        },
        () => alert('Could not access your location.')
      );
    }
  }, []);

  // Calculate distance when an ATM is selected
  const calculateDistance = (lat, lng) => {
    if (!currentLocation) return;

    const origin = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${lat},${lng}`;

    fetch(`https://distinguished-happiness-production.up.railway.app/api/atm/distance?origin=${origin}&destination=${destination}`)
      .then((response) => response.json())
      .then((data) => setDistance(data.rows[0].elements[0].distance.text)) // Distance as text
      .catch((error) => console.error('Error calculating distance:', error));
  };

  return (
    <div style={{ height: '100vh' }}>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={currentLocation}
          zoom={14}
        >
          {currentLocation && (
            <Marker position={currentLocation} title="Your Location" />
          )}
          {atmLocations.map((atm, index) => (
            <Marker
              key={index}
              position={{
                lat: atm.geometry.location.lat,
                lng: atm.geometry.location.lng,
              }}
              title={atm.name}
              onClick={() => {
                setSelectedATM(atm);
                calculateDistance(atm.geometry.location.lat, atm.geometry.location.lng);
              }}
            />
          ))}
          {selectedATM && (
            <InfoWindow
              position={{
                lat: selectedATM.geometry.location.lat,
                lng: selectedATM.geometry.location.lng,
              }}
              onCloseClick={() => {
                setSelectedATM(null);
                setDistance(null);
              }}
            >
              <div>
                <h3>{selectedATM.name}</h3>
                <p>{distance ? `Distance: ${distance}` : 'Calculating distance...'}</p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ATMMap;
