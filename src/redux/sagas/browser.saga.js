import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';


function* getBrowser() {
    try {
        const response = yield axios.get('/api/browse');
        console.log('Got from server for browser:', response.data)
        yield put({ type: 'SET_BROWSER', payload: response.data })
    } catch (error) {
        console.log('GET Browser request failed in saga:', error)
    }
}

function* getDetails(action) {
    try{
        const response = yield axios.get(`/api/browse/detail/${action.payload}`);
        console.log('Get all details:', response.data);
        yield put({ type: 'SET_DETAILS', payload: response.data })
    } catch (error) {
        console.log('GET details request failed in saga:', error)
    }
}

function* addFavorite(action) {
    try{
        console.log('Favorite item: ', action.payload)
        yield axios.post('/api/browse', action.payload.body)
        yield put({type: 'FETCH_FAVORITES', payload: action.payload.user_id })
    } catch (error) {
        console.log('Error adding favorite: ', error)
    }
}

function* deleteFav(action) {
    try{
        console.log('deleteFav saga: ', action.payload)
        yield axios.delete(`/api/browse/${action.payload.posts_id}`)
        yield put({type: 'FETCH_FAVORITES', payload: action.payload.user_id  })
    } catch (error) {
        console.log('Error deleting favorite: ', error)
    }
}

function* browserSaga() {
    yield takeLatest('FETCH_BROWSER', getBrowser);
    yield takeLatest('FETCH_DETAILS', getDetails);
    yield takeLatest('ADD_FAVORITE', addFavorite);
    yield takeLatest('DELETE_FAV', deleteFav)
}

export default browserSaga;