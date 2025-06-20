import { showLoading, hideLoading } from '../loading/action';
import api from '../../utils/api';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'threadDetail/receive',
  CLEAR_THREAD_DETAIL: 'threadDetail/clear',
  ADD_COMMENT: 'threadDetail/addComment',
  TOGGLE_UP_VOTE_THREAD_DETAIL: 'threadDetail/toggleUpVote',
  TOGGLE_DOWN_VOTE_THREAD_DETAIL: 'threadDetail/toggleDownVote',
  TOGGLE_NEUTRAL_UP_VOTE_THREAD_DETAIL: 'threadDetail/toggleNeutralUpVote',
  TOGGLE_NEUTRAL_DOWN_VOTE_THREAD_DETAIL: 'threadDetail/toggleNeutralDownVote',
  TOGGLE_UP_VOTE_COMMENT: 'threadDetail/toggleUpVoteComment',
  TOGGLE_DOWN_VOTE_COMMENT: 'threadDetail/toggleDownVoteComment',
  TOGGLE_NEUTRAL_VOTE_COMMENT: 'threadDetail/toggleNeutralVoteComment',
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
      const threadDetail = await api.getThreadById(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

// OPTIMISTIC UI - Thread Voting Functions
function asyncToggleUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // Optimistically update UI first
    dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    // Check if user already downvoted, if yes, remove downvote optimistically
    if (threadDetail && threadDetail.downVotesBy.includes(authUser.id)) {
      dispatch(toggleNeutralDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      // Revert downvote removal if it was done
      if (threadDetail && threadDetail.downVotesBy.includes(authUser.id)) {
        dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

function asyncToggleDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // Optimistically update UI first
    dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    // Check if user already upvoted, if yes, remove upvote optimistically
    if (threadDetail && threadDetail.upVotesBy.includes(authUser.id)) {
      dispatch(toggleNeutralUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
    }

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      // Revert upvote removal if it was done
      if (threadDetail && threadDetail.upVotesBy.includes(authUser.id)) {
        dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
      }
    }
  };
}

function asyncToggleNeutralUpVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    // Optimistically update UI first
    dispatch(toggleNeutralUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleUpVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

function asyncToggleNeutralDownVoteThreadDetail(threadId) {
  return async (dispatch, getState) => {
    const { authUser } = getState();

    // Optimistically update UI first
    dispatch(toggleNeutralDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));

    try {
      await api.neutralVoteThread(threadId); // Fixed: was toggleNeutralVoteThread
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleDownVoteThreadDetailActionCreator({ threadId, userId: authUser.id }));
    }
  };
}

// OPTIMISTIC UI - Comment Voting Functions
function asyncToggleUpVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // Find the comment to check current vote status
    const comment = threadDetail?.comments?.find((c) => c.id === commentId);

    // Optimistically update UI first
    dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));

    // Check if user already downvoted this comment, if yes, remove downvote optimistically
    if (comment && comment.downVotesBy && comment.downVotesBy.includes(authUser.id)) {
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      await api.upVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      // Revert downvote removal if it was done
      if (comment && comment.downVotesBy && comment.downVotesBy.includes(authUser.id)) {
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}

function asyncToggleDownVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // Find the comment to check current vote status
    const comment = threadDetail?.comments?.find((c) => c.id === commentId);

    // Optimistically update UI first
    dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));

    // Check if user already upvoted this comment, if yes, remove upvote optimistically
    if (comment && comment.upVotesBy && comment.upVotesBy.includes(authUser.id)) {
      dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));
    }

    try {
      await api.downVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      // Revert upvote removal if it was done
      if (comment && comment.upVotesBy && comment.upVotesBy.includes(authUser.id)) {
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
    }
  };
}

function asyncToggleNeutralVoteComment(threadId, commentId) {
  return async (dispatch, getState) => {
    const { authUser, threadDetail } = getState();

    // Find the comment to check which vote to neutralize
    const comment = threadDetail?.comments?.find((c) => c.id === commentId);
    const wasUpvoted = comment?.upVotesBy?.includes(authUser.id);
    const wasDownvoted = comment?.downVotesBy?.includes(authUser.id);

    // Optimistically update UI first
    dispatch(toggleNeutralVoteCommentActionCreator({ commentId, userId: authUser.id }));

    try {
      await api.neutralVoteComment(threadId, commentId);
    } catch (error) {
      alert(error.message);
      // Revert the optimistic update on error
      if (wasUpvoted) {
        dispatch(toggleUpVoteCommentActionCreator({ commentId, userId: authUser.id }));
      } else if (wasDownvoted) {
        dispatch(toggleDownVoteCommentActionCreator({ commentId, userId: authUser.id }));
      }
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