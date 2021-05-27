import axios from 'axios';
import { put } from 'redux-saga/effects';



import { takeLatest } from 'redux-saga/effects';

function* getAccountBrowser() {
    try {
        const response = yield axios.get('/api/account');
        console.log('Got from server for account browser:', response.data)
        yield put({ type: 'SET_ACCOUNT_BROWSER', payload: response.data })
    } catch (error) {
        console.log('GET account browser request failed in saga:', error)
    }
}

function* getAccountDetails(action) {
    try{
        const response = yield axios.get(`/api/account/detail/${action.payload}`);
        console.log('Get all details:', response.data);
        yield put({ type: 'SET_ACCOUNT_DETAILS', payload: response.data })
    } catch (error) {
        console.log('GET details request failed in saga:', error)
    }
}

function* updateTrade(action) {
    try{
        yield axios.put(`/api/account/${action.payload}`)
    } catch (error) {
        console.log('Error updating post to traded:', error)
    }
}

function* accountSaga() {
    yield takeLatest('FETCH_ACCOUNT_BROWSER', getAccountBrowser);
    yield takeLatest('FETCH_ACCOUNT_DETAILS', getAccountDetails);
    yield takeLatest('UPDATE_TRADE', updateTrade)
}

export default accountSaga;