import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const myEvent = {
  _id: new Date().getTime(),
  title: 'React course',
  start: new Date(),
  end: addHours(new Date(), 2),
  notes: '',
  user: {
    id: 'ABCDEFG',
    name: 'Alvaro Veloz',
  }
};

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [myEvent],
    activeEvent: null,
  },
  reducers: {
    setActiveEvent: (state, { payload }) => {
      state.activeEvent = payload;
    },
    onAddNewEvent: (state, { payload }) => {
      state.events.push(payload);
      state.activeEvent = null;
    },
    onEditEvent: (state, { payload }) => {
      state.events = state.events.map((evt) => {
        if (evt._id === payload._id) {
          return payload;
        }
        return evt;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      state.events = state.events.filter(evt => evt._id !== state.activeEvent._id);
      state.activeEvent = null;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setActiveEvent, onAddNewEvent, onEditEvent, onDeleteEvent } =
  calendarSlice.actions;