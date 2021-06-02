import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* getFavorites(action) {
    try {
        const response = yield axios.get(`/api/favorites/${action.payload}`);
        console.log('Got from server for favorites:', response.data)
        yield put({ type: 'SET_FAVORITES', payload: response.data })
    } catch (error) {
        console.log('GET favorites request failed in saga:', error)
    }
}

function* favoritesSaga() {
    yield takeLatest('FETCH_FAVORITES', getFavorites)
}

export default favoritesSaga;