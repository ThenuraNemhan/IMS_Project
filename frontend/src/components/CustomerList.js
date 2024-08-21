// src/components/CustomerList.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:5000/api/customers') // Ensure this matches the backend route
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Customer List</h1>
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>
            {customer.customer_name} - {customer.cus_address} - {customer.cus_mobileno} - {customer.cus_email}-{customer.customer_type}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CustomerList;
