import { configureStore } from '@reduxjs/toolkit';
import { act, renderHook, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { calendarApi } from '../../src/api';
import { useAuthStore } from '../../src/hooks/useAuthStore';
import { authSlice } from '../../src/store';
import { initialState, notAuthenticatedState } from '../__fixtures__/authStates';
import { testUserCredentials } from '../__fixtures__/testUser';

const getMockStore = (initialState) => {
  return configureStore({
    reducer: {
      auth: authSlice.reducer,
    },
    preloadedState: {
      auth: { ...initialState },
    },
  });
};

describe('useAuthStore Tests', () => {
  beforeEach(() => localStorage.clear());

  test('should return default values', () => {
    const mockStore = getMockStore({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
    });

    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    expect(result.current).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: undefined,
      checkAuthToken: expect.any(Function),
      startLogin: expect.any(Function),
      startLogout: expect.any(Function),
      startRegister: expect.any(Function),
    });
  });

  test('should startLogin fire the Login correctly', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: expect.any(Object),
    });

    expect(localStorage.getItem('token')).toEqual(expect.any(String));
    expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
  });

  test('startLogin should fail the authentication ', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startLogin({
        ...testUserCredentials,
        password: 'wrongPassword',
      });
    });

    const { errorMessage, status, user } = result.current;
    expect(localStorage.getItem('token')).toBe(null);
    expect({ errorMessage, status, user }).toEqual({
      // errorMessage: expect.any(String),
      errorMessage: 'Wrong credentials',
      status: 'not-authenticated',
      user: {},
    });

    await waitFor(() => expect(result.current.errorMessage).toBe(undefined));
  });

  test('startRegister should create an user ', async () => {
    const newUser = {
      email: 'jest-user@gmail.com',
      password: '123456789',
      name: 'Jest User',
    };

    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
      data: {
        ok: true,
        msg: 'User was created succesfully!!!',
        uid: 'SOME-USER-ID-123456',
        name: 'Jest User',
        token: 'SOME-TOKEN-XYZABC',
      },
    });

    await act(async () => {
      await result.current.startRegister(newUser);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Jest User', uid: 'SOME-USER-ID-123456' },
    });

    spy.mockRestore();
  });

  test('startRegister should failed the user creation', async () => {
    const mockStore = getMockStore({ ...notAuthenticatedState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.startRegister(testUserCredentials);
    });

    const { errorMessage, status, user } = result.current;

    expect({ errorMessage, status, user }).toEqual({
      status: 'not-authenticated',
      user: {},
      errorMessage: 'User already exists.',
    });
  });

 test('checkAuthToken should failed if token doesnt exists.', async () => {
   const mockStore = getMockStore({ ...initialState });
   const { result } = renderHook(() => useAuthStore(), {
     wrapper: ({ children }) => (
       <Provider store={mockStore}>{children}</Provider>
     ),
   });

   await act(async () => {
     await result.current.checkAuthToken();
   });

   const { errorMessage, status, user } = result.current;
   expect({ errorMessage, status, user }).toEqual({
     errorMessage: undefined,
     status: 'not-authenticated',
     user: {},
   });
 });


  test('checkAuthToken should authenticate if token exists.', async () => {
    const { data } = await calendarApi.post('/auth', testUserCredentials);
    localStorage.setItem('token', data.token);

    const mockStore = getMockStore({ ...initialState });
    const { result } = renderHook(() => useAuthStore(), {
      wrapper: ({ children }) => (
        <Provider store={mockStore}>{children}</Provider>
      ),
    });

    await act(async () => {
      await result.current.checkAuthToken();
    });

    const { errorMessage, status, user } = result.current;
    expect({ errorMessage, status, user }).toEqual({
      errorMessage: undefined,
      status: 'authenticated',
      user: { name: 'Test User', uid: '63fbaeb9354c0224f93e3f2a' },
    });
  });


});
