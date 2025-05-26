import api from '../../utils/api';

function receiveThreadsActionCreator(threads) {
  return {
    type: 'threads/receive',
    payload: threads,
  };
}

function addThreadActionCreator(thread) {
  return {
    type: 'threads/add',
    payload: thread,
  };
}

function setThreadActionCreator(thread) {
  return {
    type: 'threads/set',
    payload: thread,
  };
}

function asyncGetThreads() {
  return async (dispatch) => {
    try {
      const threads = await api.getThreads();
      dispatch(receiveThreadsActionCreator(threads));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    try {
      const newThread = await api.createThread(title, body, category);
      dispatch(addThreadActionCreator(newThread));
    } catch (error) {
      alert(error.message);
    }
  };
}

function asyncGetThreadById(threadId) {
  return async (dispatch) => {
    try {
      console.log('Fetching thread with ID:', threadId);
      const thread = await api.getThreadById(threadId);
      console.log('Thread fetched:', thread);
      dispatch(setThreadActionCreator(thread));
    } catch (error) {
      console.error('Error fetching thread:', error);
      alert(error.message);
    }
  };
}

export {
  receiveThreadsActionCreator,
  addThreadActionCreator,
  setThreadActionCreator,
  asyncGetThreads,
  asyncAddThread,
  asyncGetThreadById
};
