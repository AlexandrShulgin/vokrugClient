import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MyEvent } from '../../types/types';

interface EventsState {
  events: MyEvent[];
}

const initialState: EventsState = {
  events: [],
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<MyEvent[]>) => {
      state.events = action.payload;
    },
    updateEvent: (state, action: PayloadAction<MyEvent>) => {
      const index = state.events.findIndex(event => event._id === action.payload._id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
  },
});

export const { setEvents, updateEvent } = eventsSlice.actions;

export default eventsSlice.reducer;