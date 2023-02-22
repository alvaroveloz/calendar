import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

// const myEvent = {
//   // _id: new Date().getTime(),
//   // title: 'React course',
//   // start: new Date(),
//   // end: addHours(new Date(), 2),
//   // notes: '',
//   // user: {
//   //   id: 'ABCDEFG',
//   //   name: 'Alvaro Veloz',
//   // }
// };

export const calendarSlice = createSlice({
  name: 'calendar',
  initialState: {
    events: [],
    isLoadingEvents: true,
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
        if (evt.id === payload.id) {
          return payload;
        }
        return evt;
      });
      state.activeEvent = null;
    },
    onDeleteEvent: (state) => {
      if (state.activeEvent) {
        state.events = state.events.filter(evt => evt.id !== state.activeEvent.id);
        state.activeEvent = null;        
      }
    },
    onLoadingEvents: (state, { payload = []}) => {
      state.isLoadingEvents= false;
      payload.forEach( evt => {
        const exists =  state.events.some(dbEvt => dbEvt.id === evt.id );
        if (!exists) {
          state.events.push(evt);
        }
      });
    },
    onLogoutCalendar: (state) => {
      state.isLoadingEvents=true;
      state.events= [];
      state.activeEvent=null;
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  onAddNewEvent,
  onDeleteEvent,
  onEditEvent,
  onLoadingEvents,
  onLogoutCalendar,
  setActiveEvent,
} = calendarSlice.actions;