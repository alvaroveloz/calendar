import { useState } from 'react';
import ReactModal from 'react-modal';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addHours } from 'date-fns';

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
  const [isOpen, setIsOpen] = useState(true);
  const [formValues, setFormValues] = useState(formData);

  const onCloseModal = () => {
    console.log('Closing');
    setIsOpen(false);
  };

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setFormValues((current) => ({ ...current, [name]: value }));
  };

  const onDateChange = (event, datePickerSelected) => {
    setFormValues( ( current ) => ( {...current, [datePickerSelected]: event} ))
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onCloseModal}
      style={customStyles}
      className='modal'
      overlayClassName='modal-fondo'
      closeTimeoutMS={200}
    >
      <h1> Nuevo evento </h1>
      <hr />
      <form className='container'>
        <div className='form-group mb-2'>
          <label>Fecha y hora inicio</label>
          {/* <input className='form-control' placeholder='Fecha inicio' /> */}
          <DatePicker
            selected={formValues.start}
            className='form-control'
            onChange={(date) => onDateChange(date, 'start')}
            dateFormat='Pp'
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
          />
        </div>

        <hr />
        <div className='form-group mb-2'>
          <label>Titulo y notas</label>
          <input
            type='text'
            className='form-control'
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
