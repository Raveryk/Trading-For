import categories from './categories.reducer.js';

describe('Testing categories reducer', () => {
    test('should have correct initial state', () => {
        let action = [];
        let state = undefined;
        let returnedState = categories(state, action)
        expect(returnedState).toEqual([])
    })
})