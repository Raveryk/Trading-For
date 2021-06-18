import { combineReducers } from 'redux';

// stores all browser items
const browser = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_BROWSER':
            return action.payload
        default:
            return state;
    }
}

// stores detailed info for browser items
const detail = ( state={}, action ) => {
    switch (action.type) {
        case 'SET_DETAILS':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    browser,
    detail,
})