import { combineReducers } from 'redux';


const browser = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_BROWSER':
            return action.payload
        default:
            return state;
    }
}

const detail = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_DETAIL':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    browser,
    detail,
})