import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddressSearch = () => {
  const [address, setAddress] = useState('');

  return (
    <div>
      <Link to="/optionPage">
        <button style={{borderRadius:'10px', }}>Exit Navigation</button>
      </Link>
      
    </div>
  );
};

export default AddressSearch;
