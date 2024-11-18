import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, DirectionsRenderer } from '@react-google-maps/api';

const ATMMap = () => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedATM, setSelectedATM] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [route, setRoute] = useState(null);
  const [navigationSteps, setNavigationSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const userLocationIcon = 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png';
  const atmLocationIcon = 'https://maps.google.com/mapfiles/ms/icons/red-dot.png';

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

  const calculateDistance = (lat, lng) => {
    if (!currentLocation) return;

    const origin = `${currentLocation.lat},${currentLocation.lng}`;
    const destination = `${lat},${lng}`;

    fetch(`https://distinguished-happiness-production.up.railway.app/api/atm/distance?origin=${origin}&destination=${destination}`)
      .then((response) => response.json())
      .then((data) => {
        setDistance(data.rows[0].elements[0].distance.text);
        setTime(data.rows[0].elements[0].duration.text);
      })
      .catch((error) => console.error('Error calculating distance:', error));
  };

  const speak = (text) => {
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'en-US';
    window.speechSynthesis.speak(speech);
  };

  const startNavigation = () => {
    if (!currentLocation || !selectedATM) return;

    const origin = new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng);
    const destination = new window.google.maps.LatLng(selectedATM.geometry.location.lat, selectedATM.geometry.location.lng);

    const directionsService = new window.google.maps.DirectionsService();
    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        setRoute(result);
        const steps = result.routes[0].legs[0].steps;
        setNavigationSteps(steps);
        setCurrentStepIndex(0);
        speak(`Starting navigation to ${selectedATM.name}`);
      } else {
        alert('Could not get directions.');
      }
    });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!navigationSteps.length || currentStepIndex >= navigationSteps.length) return;

      navigator.geolocation.getCurrentPosition((position) => {
        const { lat, lng } = position.coords;
        const nextStep = navigationSteps[currentStepIndex];
        const nextStepLocation = nextStep.end_location;

        const distance = window.google.maps.geometry.spherical.computeDistanceBetween(
          new window.google.maps.LatLng(lat, lng),
          new window.google.maps.LatLng(nextStepLocation.lat, nextStepLocation.lng)
        );

        if (distance < 50) {
          // Announce instruction
          const instruction = nextStep.instructions.replace(/<[^>]+>/g, '');
          speak(instruction);

          // Move to next step
          setCurrentStepIndex((prevIndex) => prevIndex + 1);
        }
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [navigationSteps, currentStepIndex]);

  useEffect(() => {
    if (currentStepIndex === navigationSteps.length && navigationSteps.length > 0) {
      speak('You have arrived at your destination.');
      setNavigationSteps([]);
      setCurrentStepIndex(0);
    }
  }, [currentStepIndex, navigationSteps]);

  return (
    <div className="map-container">
      {/* Navigation Ribbon */}
      <div className="navigation-ribbon">
        {navigationSteps.length > 0 && currentStepIndex < navigationSteps.length && (
          <p>{navigationSteps[currentStepIndex].instructions.replace(/<[^>]+>/g, '')}</p>
        )}
      </div>

      <LoadScript googleMapsApiKey="AIzaSyCik3ghDcozLzhHMyCfMmOlOUSwTR79420">
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={currentLocation || { lat: 0, lng: 0 }}
          zoom={14}
        >
          {currentLocation && (
            <Marker
              position={currentLocation}
              title="Your Location"
              icon={{
                url: userLocationIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
            />
          )}

          {atmLocations.map((atm, index) => (
            <Marker
              key={index}
              position={{
                lat: atm.geometry.location.lat,
                lng: atm.geometry.location.lng,
              }}
              title={atm.name}
              icon={{
                url: atmLocationIcon,
                scaledSize: new window.google.maps.Size(30, 30),
              }}
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
                setTime(null);
                setRoute(null);
              }}
            >
              <div>
                <h3>{selectedATM.name}</h3>
                <p>{distance ? `Distance: ${distance}` : 'Calculating distance...'}</p>
                <p>{time ? `Estimated Time: ${time}` : 'Calculating time...'}</p>
                <button onClick={startNavigation}>Start Navigation</button>
              </div>
            </InfoWindow>
          )}

          {route && (
            <DirectionsRenderer
              directions={route}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#007bff',
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
              }}
            />
          )}
        </GoogleMap>
      </LoadScript>

      <style>
        {`
          .map-container {
            width: 100%;
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #f1f1f1;
          }

          .navigation-ribbon {
            position: fixed;
            top: 0;
            width: 100%;
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 10px;
            font-size: 16px;
            z-index: 1000;
          }
        `}
      </style>
    </div>
  );
};

export default ATMMap;
