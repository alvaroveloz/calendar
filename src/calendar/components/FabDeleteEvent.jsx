import { addHours } from 'date-fns';
import Swal from 'sweetalert2';
import { useCalendarStore, useUiStore } from '../../hooks';

export const FabDeleteEvent = () => {
  const { closeDateModal } = useUiStore();
  const { startDeleteEvent, hasActiveEvent } = useCalendarStore();

  const handleClickDelete = () => {
    
        startDeleteEvent();
        closeDateModal();    
   

    
  };

  return (
    <button 
        className='btn btn-danger fab-delete' 
        onClick={handleClickDelete}
        style={{ display: hasActiveEvent ? '' : 'none' }}
        >
      <i className='fas fa-trash'></i>
    </button>
  );
};
