import posts from './posts.reducer'

describe('Testing favorites reducer...', () => {
    test('Should have correct initial state', () => {
        let action = [];
        let state = undefined;
        let returnedState = posts(state, action)
        expect(returnedState).toEqual([])
    })
})