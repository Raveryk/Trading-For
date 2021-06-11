import favorites from './favorites.reducer'

describe('Testing favorites reducer...', () => {
    test('Should have correct initial state', () => {
        let action = [];
        let state = undefined;
        let returnedState = favorites(state, action)
        expect(returnedState).toEqual([])
    })
})