import drawer from './drawer.reducer'

describe('Testing drawer reducer...', () => {
    test('Should have correct initial state', () => {
        let action = false;
        let state = undefined;
        let returnedState = drawer(state, action)
        expect(returnedState).toEqual(false)
    })
})