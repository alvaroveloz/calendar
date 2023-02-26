import { onCloseDateModal, onOpenDateModal, uiSlice } from '../../../src/store/ui/uiSlice'

describe('uiSlice Tests', () => {

    test('should show initial state', () => { 
        expect(uiSlice.getInitialState().isDateModalOpen).toBeFalsy();
        //* Its not a good test because the initial state can be modified adding other states         
        // expect(uiSlice.getInitialState()).toEqual({ isDateModalOpen: false });
     })

     test('should change isDateModalOpen correctly', () => { 
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer(state, onOpenDateModal() )
        expect(state.isDateModalOpen).toBeTruthy();

        state = uiSlice.reducer(state, onCloseDateModal());
        expect(state.isDateModalOpen).toBeFalsy();
        
      })


})