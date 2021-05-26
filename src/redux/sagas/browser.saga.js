import axios from 'axios';
import { put } from 'redux-saga/effects';



import { takeLatest } from 'redux-saga/effects';

function* getBrowser() {
    try {
        const response = yield axios.get('/api/browser');
        console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_BROWSER', payload: response.data })
    } catch (error) {
        console.log('GET Browser request failed in saga:', error)
    }
}

function* browserSaga() {
    yield takeLatest('FETCH_BROWSER', getBrowser)
}

export default browserSaga;