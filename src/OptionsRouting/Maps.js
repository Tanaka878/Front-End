import React, { useState } from 'react';
import AddressSearch from './AddressSearch';
import ATMMap from './ATMMap';

const Maps = () => {
  const [atmLocation, setAtmLocation] = useState(null);

  const handleATMFound = (location) => {
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
