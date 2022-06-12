import { createSlice } from '@reduxjs/toolkit';

// import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const itemsSlice = createSlice({
  name: 'items',
  initialState:{
    items:[],
  },
  reducers: {
    addContact({items}, action) {
      items.push(action.payload);
    },
    delContact({items}, action) {
      return {items: items.filter(item => item.id !== action.payload)};
    },
    editContact({items}, action) {
      items.map(item => {
        if (item.id === action.payload.id) {
          item.name = action.payload.name;
          item.number = action.payload.number;
        }
        return item;
      });
    },
  },
});

// const persistConfig = {
//   key: 'items',
//   storage,
// };

// export const itemsReducer = persistReducer(persistConfig, itemsSlice.reducer);

export const { addContact, delContact, editContact } = itemsSlice.actions;
