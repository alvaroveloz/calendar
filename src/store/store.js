import { configureStore } from '@reduxjs/toolkit';
import { calendarSlice, uiSlice } from './';




export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    calendar: calendarSlice.reducer,
    ui: uiSlice.reducer,
  },
});
