import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2';
import calendarApi from '../api/calendarApi';
import { convertEventsToDateEvents } from '../helpers/convertEventsToDateEvents';
import {
  onAddNewEvent,
  onDeleteEvent,
  onEditEvent,
  onLoadingEvents,
  onLogoutCalendar,
  setActiveEvent,
} from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const { user } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const onActiveEvent = (event) => {
      dispatch(setActiveEvent(event));
    }

    const startLoadingEvents = async() => {
      try {
        const { data } = await calendarApi.get('/events');
        
        const events = convertEventsToDateEvents(data.events);
        dispatch( onLoadingEvents(events) );

      } catch (error) {
        console.log('Error loading events');
        console.log(error);
      }
    }

    const startSavingEvent = async( calendarEvent ) => {
      //* Todo: pending save in backend

      try {
        
              if( calendarEvent.id ){
                // update        
                await calendarApi.put(`/events/${calendarEvent.id}`, calendarEvent)
                dispatch( onEditEvent( { ...calendarEvent, user }));
                return ;
              } 
                // create 
                // Todo: remove _id after connecting to backend, this _id is temporary to mock creation
                const { data } = await calendarApi.post('/events', calendarEvent);
                dispatch( onAddNewEvent({...calendarEvent, id: data.event.id , user} ));
              
        
      } catch (error) {
        console.log(error);
        Swal.fire('Error saving data', error.response.data?.msg, 'error');
      }


    }

    const startDeleteEvent = async() => {
       try {
         await calendarApi.delete(`/events/${activeEvent.id}`);
         dispatch(onDeleteEvent());
       } catch (error) {
         console.log(error);
         Swal.fire('Error deleting event', error.response.data.msg, 'error');
       }

    }

    


  return {
    events,
    activeEvent,
    hasActiveEvent: !!activeEvent,

    //* Methods
    onActiveEvent,
    startDeleteEvent,
    startLoadingEvents,
    startSavingEvent,
  };
}
