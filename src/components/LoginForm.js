// FormComponent.js
import React, { useState } from 'react';

const FormComponent = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    phoneNumber: '',
    passward: '',
    confirmPassward: '',
  });

  const [message, setMessage] = useState('');
  const [list1, setList1] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/process_form/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setMessage(data.message);
      setList1(data.list1);

      // Handle the response from the server
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label>
          Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Email:
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Phonenumber:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Passward:
          <input
            type="password"
            name="passward"
            value={formData.passward}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <label>
          Confirm Passward:
          <input
            type="password"
            name="confirmPassward"
            value={formData.confirmPassward}
            onChange={handleInputChange}
          />
        </label>
        <br />

        <button type="submit">Submit</button>
      </form>

      {/* Display the message from the server */}
      {message && <p>{message}</p>}

      {/* Display the list from the server */}
      {/* {list1.length > 0 && (
        <ul>
          {list1.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default FormComponent;
