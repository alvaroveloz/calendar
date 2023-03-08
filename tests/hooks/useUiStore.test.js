const { configureStore } = require('@reduxjs/toolkit')
const { renderHook, act } = require('@testing-library/react');
const { Provider } = require('react-redux');
const { useUiStore } = require('../../src/hooks/useUiStore')
const { uiSlice } = require('../../src/store/ui/uiSlice')

const getMockStore = (initialState ) => {
  return configureStore({
    reducer: {
      ui: uiSlice.reducer,
    },
    preloadedState: {
      ui: { ...initialState },
    },
  });
};

describe('useUiStore Tests', ()=> {

    test('should return default values', () => { 

        const mockStore = getMockStore({ isDateModalOpen: false})

        const { result } = renderHook( () => useUiStore(), {
            wrapper: ({children}) => <Provider store={mockStore} >{ children }</Provider>
        }  );

        expect(result.current).toEqual({
          isDateModalOpen: false,
          openDateModal: expect.any(Function),
          closeDateModal: expect.any(Function),
        });
     })


     test('should return true when openDateModal is called', () => {
       const mockStore = getMockStore({ isDateModalOpen: false });

       const { result } = renderHook(() => useUiStore(), {
         wrapper: ({ children }) => (
           <Provider store={mockStore}>{children}</Provider>
         ),
       });

       //* Note: Dont get the isDateModalOpen from result.current because I need to compare after
       //* act fire the reducer, instead compared from result.current straight.
       //* If you destructured here, you are gonna set the const, to see more, check the next console.log
       const { isDateModalOpen: beforeActIsDateModalOpen, openDateModal } = result.current;

       act( () => {
        openDateModal();
       })

       //* Explanation here, uncomment the log
    //    console.log({
    //      result: result.current,         
    //      beforeActIsDateModalOpen,
    //    });

    expect(result.current.isDateModalOpen).toBeTruthy();

     })

 test('should return false when colseDateModal is called', () => {
   const mockStore = getMockStore({ isDateModalOpen: true });

   const { result } = renderHook(() => useUiStore(), {
     wrapper: ({ children }) => (
       <Provider store={mockStore}>{children}</Provider>
     ),
   });

   act(() => {
result.current.closeDateModal();
   });

   expect(result.current.isDateModalOpen).toBeFalsy();
 });




})