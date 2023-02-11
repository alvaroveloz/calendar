import { useMemo, useState } from 'react';
import { addHours, differenceInSeconds } from 'date-fns';
import Swal from 'sweetalert2';

import ReactModal from 'react-modal';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUiStore } from '../../hooks';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

ReactModal.setAppElement('#root');

const formData = {
  start: new Date(),
  end: addHours(new Date(), 2),
  title: '',
  notes: '',
};

export const CalendarModal = () => {
  
  const { isDateModalOpen, closeDateModal } = useUiStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formValues, setFormValues] = useState(formData);

  const isInvalid = useMemo(() => { 
  if (!formSubmitted) return '';
  return formValues.title.length >0 
  ? ''
  : 'is-invalid';
}, [formValues.title, formSubmitted])

  const onCloseModal = () => {
     closeDateModal();
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const onDateChange = (event, datePickerSelected) => {
    setFormValues( ( current ) => ( {...current, [datePickerSelected]: event} ))
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    
    if( isNaN(difference) ) {
      Swal.fire('Incorrect dates', 'Start and end dates should be filled.', 'error');
      return ;
    }

    if (difference <= 0) {
      Swal.fire('Incorrect dates', 'End date should be greater that start date', 'error');
      return;
    }
    
    console.log(formValues);
    
  }

  return (
    <ReactModal
      isOpen={isDateModalOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> New Event </h1>
      <hr />
      <form className='container' onSubmit={onSubmit}>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          {/* <input className='form-control' placeholder='Fecha inicio' /> */}
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(date) => onDateChange(date, 'start')}
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <div className='form-group mb-2'>
          <label>Fecha y hora fin</label>
          <DatePicker
            minDate={formValues.start}
            selected={formValues.end}
            className='form-control'
            onChange={(date) => onDateChange(date, 'end')}
            dateFormat='Pp'
            showTimeSelect
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className={`form-control ${isInvalid}`}
            placeholder='Título del evento'
            name='title'
            autoComplete='off'
            value={formValues.title}
            onChange={onInputChange}
          />
          <small id='emailHelp' className='form-text text-muted'>
            Una descripción corta
          </small>
        </div>

        <div className='form-group mb-2'>
          <textarea
            type='text'
            className='form-control'
            placeholder='Notas'
            rows='5'
            name='notes'
            value={formValues.notes}
            onChange={onInputChange}
          ></textarea>
          <small id='emailHelp' className='form-text text-muted'>
            Información adicional
          </small>
        </div>

        <button type='submit' className='btn btn-outline-primary btn-block'>
          <i className='far fa-save'></i>
          <span> Guardar</span>
        </button>
      </form>
    </ReactModal>
  );
};
