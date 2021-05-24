import axios from 'axios';
import { put } from 'redux-saga/effects';



function* getPosts() {
    try {
        const response = yield axios.get('/api/posts');

         yield put({ type: SET_POSTS, payload: response.data })
    } catch (error) {
        console.log('GET request failed in saga:', error)
    }
}

export default getPosts;