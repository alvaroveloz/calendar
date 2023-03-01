import { calendarSlice, onAddNewEvent, onEditEvent, setActiveEvent } from '../../../src/store/calendar/calendarSlice';
import { calendarWithEventsState, events, initialState } from '../../__fixtures__/calendarStates';

describe('calendarSlice Test', ()=>{

    test('should return initial state', () => { 
         const state = calendarSlice.getInitialState();
         expect(state).toEqual(initialState);
     })

      test('setActiveEvent should activate the event', () => {
        const state = calendarSlice.reducer(
          calendarWithEventsState,
          setActiveEvent(events[0])
        );
        expect(state.activeEvent).toEqual(events[0]);
      });

       test('onAddNewEvent should add event', () => {
         const newEvent = {
           id: '3',
           start: new Date('2023-10-21 13:00:00'),
           end: new Date('2023-10-21 15:00:00'),
           title: 'Test title 3',
           notes: 'Test notes 3',
         };

         const state = calendarSlice.reducer(
           calendarWithEventsState,
           onAddNewEvent(newEvent)
         );
         expect(state.events).toEqual([...events, newEvent]);
       });


        test('onEditEvent should update the event', () => {
          const updatedEvent = {
            id: '1',
            start: new Date('2023-04-21 12:00:00'),
            end: new Date('2023-04-21 14:00:00'),
            title: 'Updated title',
            notes: 'Updated note',
          };

          const state = calendarSlice.reducer(
            calendarWithEventsState,
            onEditEvent(updatedEvent)
          );
          expect(state.events).toContain(updatedEvent);
        });
})