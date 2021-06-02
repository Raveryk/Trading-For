import axios from 'axios';
import { put } from 'redux-saga/effects';



import { takeLatest } from 'redux-saga/effects';

function* getPosts() {
    try {
        const response = yield axios.get('/api/posts');
        console.log('Got from server:', response.data)
        yield put({ type: 'SET_POSTS', payload: response.data })
    } catch (error) {
        console.log('GET request failed in saga:', error)
    }
}

function* addPost(action) {
    try {
        console.log('New post:', action.payload)
        yield axios.post('/api/posts', action.payload);
        yield put({type: 'FETCH_POSTS'})
    } catch (error) {
        console.log('Error sending newPost from client:', error)
    }
}

function* postsSaga() {
    yield takeLatest('FETCH_POSTS', getPosts)
    yield takeLatest('ADD_POST', addPost)
}

export default postsSaga;