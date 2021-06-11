import user from './user.reducer'

describe('Testing favorites reducer...', () => {
    test('Should have correct initial state', () => {
        let action = {};
        let state = undefined;
        let returnedState = user(state, action)
        expect(returnedState).toEqual({})
    })
})