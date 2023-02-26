import calendarApi from '../../src/api/calendarApi'

describe('CalendarApi Tests', ()=>{

    test('should have initial setup', () => { 
        
        const VITE_API_URL = process.env.VITE_API_URL;
        expect( calendarApi.defaults.baseURL).toBe(VITE_API_URL);
        
     });

     test('should have x-token in headers', async() => { 
        
        const token = 'XYZ-123456789-ABCDE';
        localStorage.setItem('token', token);
        const res = await calendarApi.post('/auth', { email: 'test@gmail.com', password: '123456789' });
        expect(res.config.headers['x-token']).toBe(token);

    })

})