import { fireEvent, render, screen } from '@testing-library/react'
import { FabDeleteEvent } from '../../../src/calendar/components/FabDeleteEvent'
import { useCalendarStore } from '../../../src/hooks/useCalendarStore'
import { Provider } from 'react-redux'
import { store } from '../../../src/store'

jest.mock('../../../src/hooks/useCalendarStore');

describe('<FabDelete /> Tests', ()=>{

     const mockStartDeletingEvent = jest.fn();

     beforeEach(() => jest.clearAllMocks());


    test('should render components correctly', () => { 

        
        useCalendarStore.mockReturnValue({
          hasActiveEvent: false
        });

        render(
            <Provider store={store}>
                <FabDeleteEvent />
            </Provider>
        )

        const btn = screen.getByLabelText('btn-delete');
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger');
        expect(btn.style.display).toBe('none');
     })


      test('Should show delete button is active event is true', () => {
        useCalendarStore.mockReturnValue({
          hasActiveEvent: true,
        });

        render(
          <Provider store={store}>
            <FabDeleteEvent />
          </Provider>
        );

        const btn = screen.getByLabelText('btn-delete');        
        expect(btn.style.display).toBe('');
      });
      
       test('should call startDeletingEvent if hasActiveEvent is true ', () => {
         useCalendarStore.mockReturnValue({
           hasActiveEvent: true,
           startDeleteEvent: mockStartDeletingEvent,
         });

          render(
            <Provider store={store}>
              <FabDeleteEvent />
            </Provider>
          );

         const btn = screen.getByLabelText('btn-delete');
         fireEvent.click(btn);

         expect(mockStartDeletingEvent).toHaveBeenCalledWith();
       });
})