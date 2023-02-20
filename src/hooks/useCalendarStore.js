import { useDispatch, useSelector } from 'react-redux'
import { setActiveEvent, onAddNewEvent, onEditEvent, onDeleteEvent } from '../store/calendar/calendarSlice';

export const useCalendarStore = () => {

    const { events, activeEvent } = useSelector(state => state.calendar);
    const dispatch = useDispatch();

    const onActiveEvent = (event) => {
      dispatch(setActiveEvent(event));
    }

    const startSavingEvent = async( calendarEvent ) => {
      //* Todo: pending save in backend

      if( calendarEvent._id ){
        // update        
        dispatch(onEditEvent(calendarEvent));
      } else{
        // create 
        // Todo: remove _id after connecting to backend, this _id is temporary to mock creation
        dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime() }) );
      }


    }

    const startDeleteEvent = async() => {
      dispatch(onDeleteEvent());
    }



  return {
    events,
    activeEvent,
    hasActiveEvent: !!activeEvent,

    //* Methods
    onActiveEvent,
    startSavingEvent,
    startDeleteEvent,
  };
}
