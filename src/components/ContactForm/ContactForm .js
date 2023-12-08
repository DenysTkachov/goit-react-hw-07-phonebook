import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, selectContacts } from '../../redux/contactsSlice';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [contact, setContact] = useState({ name: '', number: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = e => {
    setErrorMessage('');
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleAddContact = () => {
    const { name, number } = contact;

    if (name.trim() === '' || number.trim() === '') {
      setErrorMessage('Name and number are required.');
      return;
    }

    const existingContact = contacts.find(
      c => c.name.toLowerCase() === name.toLowerCase()
    );
    if (existingContact) {
      setErrorMessage('This contact already exists.');
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }));
    setContact({ name: '', number: '' });
    setErrorMessage('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddContact();
    }
  };

  return (
    <div>
      <h2>Name</h2>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        required
      />
      <h2>Number</h2>
      <input
        type="tel"
        name="number"
        value={contact.number}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        required
      />
      <button onClick={handleAddContact}>Add Contact</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ContactForm;
