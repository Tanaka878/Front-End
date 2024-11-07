import React, { useState } from 'react';
import axios from 'axios';

const AddressSearch = ({ onATMFound }) => {
  const [address, setAddress] = useState('');

  const handleSearch = () => {
    axios
      .get(`/api/atm/geocode?address=${address}`)
      .then((response) => {
        const location = JSON.parse(response.data).results[0].geometry.location;
        onATMFound(location);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default AddressSearch;
