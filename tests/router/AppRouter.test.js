import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { AppRouter } from '../../src/router/AppRouter';


jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', ()=> ({
    CalendarPage: ()=> <h1>CalendarPage as mock</h1>
}));


describe('<AppRouter /> Tests', ()=> {

    const mockCheckAuthToken = jest.fn();

    beforeEach(()=> jest.clearAllMocks());

    test('should show loading status and checkAuthToken should be called.', () => { 
        useAuthStore.mockReturnValue({
          status: 'checking',
          checkAuthToken: mockCheckAuthToken,
        });

        render(<AppRouter />);
        expect(screen.getByText('Loading...')).toBeTruthy();
        expect( mockCheckAuthToken ).toHaveBeenCalled();

     })

     test('should show LoginPage if status is not-authenticated', () => { 
          useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken,
          });

          const { container } = render(
          <MemoryRouter initialEntries={['/other/route/to/test/login/page']} >
              <AppRouter />
          </MemoryRouter>
          );
          expect( screen.getByText('Ingreso')).toBeTruthy();
          expect(container).toMatchSnapshot();
      })

      test('should show calendar page if we are authenticated', () => { 
        
        //* Note: instead of simulate to call all the redux hooks, 
        //* its better create a mock for Calendar Page, see the mock created at the begin of this test

         useAuthStore.mockReturnValue({
           status: 'authenticated',
           checkAuthToken: mockCheckAuthToken,
         });

         render(
           <MemoryRouter>
             <AppRouter />
           </MemoryRouter>
         );

            expect(screen.getByText('CalendarPage as mock')).toBeTruthy();


       })
})