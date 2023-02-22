import {
  CalendarEvent,
  CalendarModal,
  FabAddNewEvent,
  NavBar,
} from '../components';
import { localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FabDeleteEvent } from '../components/FabDeleteEvent';
import { useEffect } from 'react';
import { useAuthStore } from '../../hooks/useAuthStore';

export const CalendarPage = () => {
  
  const { user } = useAuthStore();
  const { openDateModal } = useUiStore();
  
  const {
    events: myEvents,
    onActiveEvent,
    startLoadingEvents,
  } = useCalendarStore();

  const eventStyleGetter = (event, start, end, isSelected) => {
    
    const isMyEvent = (user.uid === event.user.uid);

    const style = {
      backgroundColor: isMyEvent ? '#9F33FF': '#465660',
      borderRadius: '0px',
      opacity: 0.7,
      color: 'white',
    };

    return { style };
  };

  const onDoubleClick = (event) => {
    openDateModal();
  };

  const onSelect = (event) => {
    onActiveEvent(event);
  };

  const onView = (event) => {
    console.log({ view: event });
  };

  useEffect(() => {
    startLoadingEvents();
  }, []);

  return (
    <>
      <NavBar />

      <Calendar
        localizer={localizer}
        events={myEvents}
        startAccessor='start'
        endAccessor='end'
        style={{
          height: 'calc(100vh - 110px)',
          padding: '2rem',
        }}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent,
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onView}
      />

      <CalendarModal />

      <FabAddNewEvent />
      <FabDeleteEvent />
    </>
  );
};
