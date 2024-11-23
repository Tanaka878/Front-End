import React, { useState } from 'react';
import AddressSearch from '../OptionsRouting/AdressSearch';
import ATMMap from './ATMMap';

const Maps = () => {
  const [atmLocation, setAtmLocation] = useState(null);

  const handleATMFound = (location) => {
    console.log('Found location:', location);  
    setAtmLocation(location);
  };

  return (
    <div className="maps-container">
      <h1 className="maps-title">ATM Location Finder</h1>
      <div className="maps-search-container">
        <AddressSearch onATMFound={handleATMFound} />
      </div>
      <div className="maps-map-container">
        <ATMMap initialLocation={atmLocation} />
      </div>

      <style>
        {`
          /* Container styling */
          .maps-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;
            font-family: 'Roboto', sans-serif;
            background-color: #f7f7f7;
            min-height: 100vh;
            margin-left: auto;
            margin-right: auto;
          }

          /* Title styling */
          .maps-title {
            font-size: 2rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 20px;
          }

          /* Search component container styling */
          .maps-search-container {
            width: 100%;
            max-width: 600px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 10px;
            background-color: white;
          }

          /* Map container styling */
          .maps-map-container {
            width: 100%;
            max-width: 800px;
            height: 70vh;
            margin-top: 20px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          /* Responsive design */
          @media (max-width: 768px) {
            .maps-title {
              font-size: 1.5rem;
            }

            .maps-search-container {
              width: 90%;
            }

            .maps-map-container {
              width: 100%;
              height: 60vh;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Maps;
