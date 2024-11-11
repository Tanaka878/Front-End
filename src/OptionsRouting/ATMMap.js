import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const ATMMap = () => {
  const [atmLocations, setAtmLocations] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [selectedATM, setSelectedATM] = useState(null);
  const [distance, setDistance] = useState(null);
  const [time, setTime] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);

  const [directionsService, setDirectionsService] = useState(null);
  const [directionsRenderer, setDirectionsRenderer] = useState(null);
  const [mapInstance, setMapInstance] = useState(null);

  
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

  const handleMapLoad = (map) => {
    if (!directionsService && !directionsRenderer) {
      setDirectionsService(new window.google.maps.DirectionsService());
      const renderer = new window.google.maps.DirectionsRenderer();
      renderer.setMap(map);
      setDirectionsRenderer(renderer);
    }
    setMapInstance(map);
  };

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

  const startNavigation = (lat, lng) => {
    if (!directionsService || !directionsRenderer || !mapInstance) {
      console.error('Directions service, renderer, or map is not initialized yet');
      return;
    }

    const destination = new window.google.maps.LatLng(lat, lng);
    const origin = new window.google.maps.LatLng(currentLocation.lat, currentLocation.lng);

    const request = {
      origin: origin,
      destination: destination,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        setIsNavigating(true);
        voiceNavigation(result);
      } else {
        alert('Could not get directions.');
      }
    });
  };

  const voiceNavigation = (result) => {
    const steps = result.routes[0].legs[0].steps;
    let stepIndex = 0;
  
    const speakStep = () => {
      if (stepIndex < steps.length) {
        const step = steps[stepIndex];
        const speech = new SpeechSynthesisUtterance(step.instructions);
  
        
        speech.rate = 0.8; 
        speech.pitch = 1.1; 
        speech.volume = 1; 
  
 
        const voices = window.speechSynthesis.getVoices();
        speech.voice = voices.find((voice) => voice.name.includes('Google')) || voices[0];
  
     
        window.speechSynthesis.speak(speech);
        stepIndex += 1;
  
        
        speech.onend = () => {
          if (stepIndex < steps.length) {
            setTimeout(speakStep, 5000); 
          }
        };
      }
    };
  
   
    speakStep();
  };
  
  return (
    <div style={{ height: '100vh' }}>
      <LoadScript googleMapsApiKey='AIzaSyCik3ghDcozLzhHMyCfMmOlOUSwTR79420'>
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }}
          center={currentLocation || { lat: 0, lng: 0 }}
          zoom={14}
          onLoad={handleMapLoad}
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
                setTime(null);
                setIsNavigating(false);
              }}
            >
              <div>
                <h3>{selectedATM.name}</h3>
                <p>{distance ? `Distance: ${distance}` : 'Calculating distance...'}</p>
                <p>{time ? `Estimated Time: ${time}` : 'Calculating time...'}</p>
                <button
                  onClick={() => startNavigation(selectedATM.geometry.location.lat, selectedATM.geometry.location.lng)}
                >
                  Start Navigation
                </button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ATMMap;
