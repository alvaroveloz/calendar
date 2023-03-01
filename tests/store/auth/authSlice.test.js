import { authSlice, clearErrorMessage, onLogin, onLogout } from '../../../src/store/auth/authSlice'
import { authenticatedState, initialState } from '../../__fixtures__/authStates'
import { testUserCredentials } from '../../__fixtures__/testUser';

describe('authSlice Test', () => { 
    test('should return initial state', () => { 
        expect( authSlice.getInitialState()).toEqual(initialState );
     });


    test('should perform login', () => {
      const state = authSlice.reducer(initialState, onLogin(testUserCredentials));      
        expect(state).toEqual({
        status: 'authenticated',
        user: testUserCredentials,
        errorMessage: undefined,
      });
    });

    test('should perform logout', () => {
      const state = authSlice.reducer(authenticatedState, onLogout());
      expect(state).toEqual({
        status: 'not-authenticated',
        user: {},
        errorMessage: undefined,
      });
    });

    test('should perform logout with errorMessage', () => {
      const errorMessage = 'Credenciales no válidas';
      const state = authSlice.reducer(
        authenticatedState,
        onLogout(errorMessage)
      );
      expect(state).toEqual({
        status: 'not-authenticated',
        user: {},
        errorMessage: errorMessage,
      });
    });

    test('should clean error', () => {
      const errorMessage = 'Credenciales no válidas';
      const state = authSlice.reducer(
        authenticatedState,
        onLogout(errorMessage)
      );
      const newState = authSlice.reducer(state, clearErrorMessage());

      expect(newState.errorMessage).toBe(undefined);
    });

 })