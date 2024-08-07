import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import eventsReducer from './slices/eventSlice';
import refReducer from './slices/refSlice'

const store = configureStore({

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActionPaths: ['payload'],
        ignoredPaths: ['ref', 'ref.current'],
      },
    }),
    
  reducer: {
    user: userReducer,
    events: eventsReducer,
    ref: refReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;