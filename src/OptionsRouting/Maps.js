import React, { useState } from 'react';
import AddressSearch from '../OptionsRouting/AdressSearch';
import ATMMap from './ATMMap';

const Maps = () => {
  const [atmLocation, setAtmLocation] = useState(null);

  const handleATMFound = (location) => {
    console.log('Found location:', location);  // Log the location for debugging
    setAtmLocation(location);
  };

  return (
    <div>
      <h1>ATM Location Finder</h1>
      <AddressSearch onATMFound={handleATMFound} />
      <ATMMap initialLocation={atmLocation} />
    </div>
  );
};

export default Maps;
