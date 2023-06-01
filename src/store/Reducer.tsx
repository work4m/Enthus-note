import { combineReducers } from '@reduxjs/toolkit';

import NotesReducer from './Note/NotesReducer';

const rootReducer = combineReducers({
    notes: NotesReducer,
  });
  
  export default rootReducer;
