import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddressSearch = ({ onATMFound }) => {
  const [address, setAddress] = useState('');

  const navigation = useNavigate()

  const handleSearch = () => {
    axios
      .get(`/api/atm/geocode?address=${address}`)
      .then((response) => {
        const location = JSON.parse(response.data).results[0].geometry.location;
        console.log('Geocode Location:', location);  // Log the location for debugging
        onATMFound(location);
      })
      .catch((error) => console.error(error));
      
     navigation('optionPage');


  };

  return (
    <div>
      
      <button onClick={handleSearch}>Exit Navigation</button>
    </div>
  );
};

export default AddressSearch;
