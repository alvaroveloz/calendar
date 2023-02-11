import { createSlice } from '@reduxjs/toolkit'
import { addHours } from 'date-fns';

const myEvents = [{
  title: 'React course',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: 'ABCDEFG',
    name: 'Alvaro Veloz',
  }
}];

export const calendarSlice = createSlice({
   name: 'calendar',
   initialState: {
       events: myEvents,
       activeEvent: null
   },
   reducers: {
      increment: (state) => {
      state.value += 1
      },
},
})

// Action creators are generated for each case reducer function
export const { increment } = calendarSlice.actions