/**
 * 
 * @param {*} errors from calendarApi 
 * @returns String
 */
export const joinErrors = (errors) => {
  return errors.map((error) => error.msg).toString();
};