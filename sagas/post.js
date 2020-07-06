import { all, put, fork, takeLatest, delay } from 'redux-saga/effects';
import axios from 'axios';
import { ADD_POST_SUCCESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
  ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, ADD_COMMENT_REQUEST }
  from '../reducers/post';

function addPostAPI(data) {
  return axios.post(`/api/post/${data.postId}/comment`, data);
}
// action에서 data꺼내서 addPostAPI(data)로 보낸다.
function* addPost(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_POST_SUCCESS,
      // data: result.data
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: ADD_POST_FAILURE,
      data: err.response.data,
    });
  }
}
function* addComment(action) {
  // 실패할 경우를 대비해 tyr catch로 감싼다.
  try {
    // const result = yield call(addPostAPI, action.data);
    yield delay(1000);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      // data: result.data
    }); // 결과를 받아서 이런 식으로 처리
  } catch (err) {
    yield put({ // put은 dispatch 개념
      type: ADD_COMMENT_FAILURE,
      data: err.response.data,
    });
  }
}

function* watchAddPost() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(ADD_POST_REQUEST, addPost, 2000);
}
function* watchAddComment() {
  // takeLatest 마우스를 여러번 클릭했을때 모든 이벤트를 Request 하는 것을 방지하기 위해 제일 마지막 이젠트만 보낸다.
  yield takeLatest(ADD_COMMENT_REQUEST, addComment, 2000);
}
export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
  ]);
}
