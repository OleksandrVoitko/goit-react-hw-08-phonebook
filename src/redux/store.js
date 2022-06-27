import { configureStore } from '@reduxjs/toolkit';


import { editSlice } from './edit/slice';

import { contactsApi } from './contacts/contacts';

export const store = configureStore({
  reducer: {

    edit: editSlice.reducer,

    [contactsApi.reducerPath]: contactsApi.reducer,
  },
  middleware: getDefaultMiddleware => [
    ...getDefaultMiddleware(),
    contactsApi.middleware,
  ],
});
