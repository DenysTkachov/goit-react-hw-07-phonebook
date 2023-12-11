import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import contactsReducer from './contactsSlice';
import filterReducer from './contactsSlice';





const rootReducer = combineReducers({
  contacts: contactsReducer,
  filter: filterReducer,
});


const store = configureStore({
  reducer: rootReducer,
 
});



export { store};
