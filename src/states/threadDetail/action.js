import { showLoading, hideLoading } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'TOGGLE_UP_VOTE_THREAD_DETAIL',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'TOGGLE_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL: 'TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL',
  TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL:
    'TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL',
  TOGGLE_UP_VOTE_COMMENT: 'TOGGLE_UP_VOTE_COMMENT',
  TOGGLE_DOWN_VOTE_COMMENT: 'TOGGLE_DOWN_VOTE_COMMENT',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'TOGGLE_NEUTRAL_VOTE_COMMENT',

};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      comment,
    },
  };
}

function toggleUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralUpVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleNeutralDownVoteThreadDetailActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleUpVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_UP_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDownVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_DOWN_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleNeutralVoteCommentActionCreator({ commentId, userId }) {
  return {
    type: ActionType.TOGGLE_NEUTRAL_VOTE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}


function asyncAddComment({ content, commentTo }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const comment = await api.createComment({ content, commentTo });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
      );
    }
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }),
    );

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
  };
}

function asyncToggleNeutralUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralUpVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralUpVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
  };
}

function asyncToggleNeutralDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(
      toggleNeutralDownVoteThreadDetailActionCreator({
        threadId,
        userId: authUser.id,
      }),
    );

    try {
      await api.toggleNeutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(
        toggleNeutralDownVoteThreadDetailActionCreator({
          threadId,
          userId: authUser.id,
        }),
      );
    }
  };
}

function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();
    dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }
  };
}


export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleUpVoteThreadDetailActionCreator,
  toggleDownVoteThreadDetailActionCreator,
  toggleNeutralUpVoteThreadDetailActionCreator,
  toggleNeutralDownVoteThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpVoteThreadDetail,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralUpVoteThreadDetail,
  asyncToggleNeutralDownVoteThreadDetail,
  addCommentActionCreator,
  asyncAddComment,
  asyncToggleUpVoteComment,
  asyncToggleDownVoteComment,
  asyncToggleNeutralVoteComment,
  toggleUpVoteCommentActionCreator,
  toggleDownVoteCommentActionCreator,
  toggleNeutralVoteCommentActionCreator,
};