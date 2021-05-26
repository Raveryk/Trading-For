import axios from 'axios';
import { put } from 'redux-saga/effects';



import { takeLatest } from 'redux-saga/effects';

function* getCategories() {
    try {
        const response = yield axios.get('/api/categories');
        console.log('Got from server:', response.data)
        yield put({ type: 'SET_CATEGORIES', payload: response.data })
    } catch (error) {
        console.log('GET request for categories failed in saga:', error)
    }
}

function* categoriesSaga() {
    yield takeLatest('FETCH_CATEGORIES', getCategories)
}

export default categoriesSaga;