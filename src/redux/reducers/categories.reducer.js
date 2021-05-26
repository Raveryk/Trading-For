const categories = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload
        default:
            return state;
    }
}

console.log(categories)

export default categories