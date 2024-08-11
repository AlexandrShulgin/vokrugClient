import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice'
import eventsReducer from './slices/eventSlice';
import refReducer from './slices/refSlice'
import rerenderReducer from './slices/rerenderSlice'

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
    rerender: rerenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;