import { createSlice } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    list: [],
    filter: '',
  },
  reducers: {
    addContact: (state, action) => {
      const { id, name, number } = action.payload;
      state.list.push({ id, name, number });
    },
    deleteContact: (state, action) => {
      const { id } = action.payload;
      state.list = state.list.filter(contact => contact.id !== id);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const { addContact, deleteContact, setFilter } = contactsSlice.actions;
export const selectContacts = state => state.contacts.list;
export const selectFilter = state => state.contacts.filter;

export default contactsSlice.reducer;
