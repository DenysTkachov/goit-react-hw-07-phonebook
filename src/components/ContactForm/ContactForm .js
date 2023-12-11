import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addContact } from '../../redux/contactsOperations';
import { selectContacts } from '../../redux/selectors';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [contact, setContact] = useState({ name: '', phone: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = e => {
    setErrorMessage('');
    const { name, value } = e.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: value,
    }));
  };

    const handleAddContact = e => {
      e.preventDefault();
      const { name, phone } = contact;

      if (name.trim() === '' || phone.trim() === '') {
        setErrorMessage('Name and phone are required.');
        return;
      }

      const existingContact = contacts.find(
        c => c.name.toLowerCase() === name.toLowerCase() || c.phone === phone
      );
      if (existingContact) {
        setErrorMessage('Цей контакт та номер вже існує.');
        return;
      }

      dispatch(addContact({ name, phone }));

      setContact({ name: '', phone: '' });
    };




  return (
    <>
      <form onSubmit={handleAddContact}>
        <label>Ім'я</label>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleInputChange}
          required
        />
        <label>Номер</label>
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleInputChange}
          required
        />
        <button type="submit">Додати контакт</button>
      </form>
      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    </>
  );
};

export default ContactForm;
