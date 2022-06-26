import { configureStore } from '@reduxjs/toolkit';

import { itemsSlice } from './items/slice';
import { filterSlice } from './filter/slice';
import { editSlice } from './edit/slice';

import { contactsApi } from './contacts/contacts';

export const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    filter: filterSlice.reducer,
    edit: editSlice.reducer,

    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});

