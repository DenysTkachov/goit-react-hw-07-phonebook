import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm ';
import Filter from './Filter/Filter';
import ContactList from '../components/ContactList/ContactList ';

const App = () => {
  return (
    <div>
      <h1>Телефонная книга</h1>
      <ContactForm />
      <h2>Контакты</h2>
      <Filter />
      <ContactList />
    </div>
  );
};

export default App;
