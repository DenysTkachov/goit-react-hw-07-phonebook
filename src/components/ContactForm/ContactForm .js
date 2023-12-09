import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from 'nanoid';
import { addContact, fetchContacts } from '../../redux/contactsOperations';
import { selectContacts } from '../../redux/selectors';

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
      setErrorMessage('Цей контакт вже існує.');
      return;
    }

    dispatch(addContact({ id: nanoid(), name, number }))
      .then(() => {
        setContact({ name: '', number: '' });
        setErrorMessage('');
        dispatch(fetchContacts());
      })
      .catch(error => {
        setErrorMessage(error.message || 'Failed to add contact.');
      });
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleAddContact();
    }
  };

  return (
    <div>
      <h2>Ім'я</h2>
      <input
        type="text"
        name="name"
        value={contact.name}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        required
      />
      <h2>Номер</h2>
      <input
        type="tel"
        name="number"
        value={contact.number}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        required
      />
      <button onClick={handleAddContact}>Додати контакт</button>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </div>
  );
};

export default ContactForm;