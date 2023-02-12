import { addHours } from 'date-fns';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabAddNewEvent = () => {
  const { openDateModal } = useUiStore();
  const { onActiveEvent } = useCalendarStore();

  const handleClickNew = () => {

    onActiveEvent({
      title: '',
      start: new Date(),
      end: addHours(new Date(), 2),
      notes: '',
      user: {
        id: 'ABCDEFG',
        name: 'Alvaro Veloz',
      },
    });

    openDateModal();
  };

  return (
    <button className='btn btn-primary fab' onClick={handleClickNew}>
      <i className='fas fa-plus'></i>
    </button>
  );
};
