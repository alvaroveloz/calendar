import { CalendarEvent, CalendarModal, NavBar } from '../components';

import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';

import 'react-big-calendar/lib/css/react-big-calendar.css';
import { localizer } from '../../helpers';
import { useUiStore } from '../../hooks';


const myEvents = [{
  title: 'React course',
  start: new Date(),
  end: addHours(new Date(), 2),
  user: {
    id: 'ABCDEFG',
    name: 'Alvaro Veloz',
  }
}];

export const CalendarPage = () => {

  const { openDateModal } = useUiStore();

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
    </>
  );
};
