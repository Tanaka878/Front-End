import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AddressSearch = () => {
  const [address, setAddress] = useState('');

  return (
    <div>
      <Link to="/optionPage">
        <button>Exit Navigation</button>
      </Link>
    </div>
  );
};

export default AddressSearch;
