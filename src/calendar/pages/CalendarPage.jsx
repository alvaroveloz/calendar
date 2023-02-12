import { CalendarEvent, CalendarModal, FabAddNewEvent, NavBar } from '../components';
import { localizer } from '../../helpers';
import { useUiStore, useCalendarStore } from '../../hooks';

import { Calendar } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();
  const { events: myEvents, onActiveEvent } = useCalendarStore();

  const eventStyleGetter = ( event, start, end, isSelected ) => {
    // console.log(event, start, end, isSelected);

    const style = {
      backgroundColor: '#9F33FF',
      borderRadius: '0px',
      opacity: 0.7,
      color: 'white'
    };

    return  { style }
  }

  const onDoubleClick = (event ) => {
    openDateModal();
  }

  const onSelect = (event) => {
    console.log({ select:  event });
    onActiveEvent(event);
  };

  const onView = (event) => {
    console.log({ view: event });
  };


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
    </>
  );
};
