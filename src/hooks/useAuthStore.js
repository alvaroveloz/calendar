import { useDispatch, useSelector } from 'react-redux';
import { calendarApi } from '../api';
import { clearErrorMessage, onChecking, onLogin, onLogout } from '../store';

import { joinErrors } from '../helpers';

export const useAuthStore = () => {

    const { status, user, errorMessage } = useSelector( state => state.auth);
    const dispatch = useDispatch();

    const startLogin = async( { email, password }) => {

        dispatch(onChecking());

        try {

            const { data } = await calendarApi.post('/auth', { email, password });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime() );
            dispatch( onLogin({ name: data.name, uid: data.uid }));

        } catch (error) {
            dispatch( onLogout('Wrong credentials'));
            setTimeout(() => {
                dispatch(clearErrorMessage());
            }, 10);
        }

    }

    const startRegister = async ({ name, email, password }) => {
        try {
            const { data } = await calendarApi.post('/auth/new', {
              name,
              email,
              password,
            });
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime());
        } catch (error) {
            console.log(error.response.data);
            dispatch(onLogout(error.response.data?.msg || joinErrors(error.response.data.errors)));
            setTimeout(() => {
              dispatch(clearErrorMessage());
            }, 10);
        }
    };

    const checkAuthToken = async() => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch( onLogout() );
        }

        try {
            const { data } = await calendarApi.get('auth/refresh');
            localStorage.setItem('token', data.token);
            localStorage.setItem('token-init-date', new Date().getTime()); 
            dispatch( onLogin({ name: data.name , uid: data.uid}));
        } catch (error) {
            dispatch( onLogout() );
        }

    }

    const startLogout = () => {
        localStorage.clear();
        dispatch( onLogout());
    }


    return {
      //* Properties
      status,
      user,
      errorMessage,

      //* Methods
      checkAuthToken,
      startLogin,
      startLogout,
      startRegister,
    };
}


