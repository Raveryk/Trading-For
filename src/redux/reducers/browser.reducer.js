const browser = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_BROWSER':
            return action.payload
        default:
            return state;
    }
}

export default browser