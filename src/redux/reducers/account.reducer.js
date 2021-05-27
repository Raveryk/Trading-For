import { combineReducers } from 'redux';


const accountBrowser = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_ACCOUNT_BROWSER':
            return action.payload
        default:
            return state;
    }
}

const accountDetail = ( state=[], action ) => {
    switch (action.type) {
        case 'SET_ACCOUNT_DETAILS':
            return action.payload
        default:
            return state;
    }
}

export default combineReducers({
    accountBrowser,
    accountDetail,
})