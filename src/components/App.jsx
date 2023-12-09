import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import ContactForm from '../components/ContactForm/ContactForm ';
import Filter from '../components/Filter/Filter';
import ContactList from '../components/ContactList/ContactList ';
import { fetchContacts } from '../redux/contactsOperations';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <div>
      <h1>Телефонна книга</h1>
      <ContactForm />
      <h2>Контакти</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
