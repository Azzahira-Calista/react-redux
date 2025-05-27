import api from '../../utils/api';

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: 'leaderboards/receive',
    payload: leaderboards,
  };
}

function asyncGetLeaderboards() {
  return async (dispatch) => {
    try {
      const leaderboards = await api.asyncGetLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      alert(error.message);
    }
  };
}

export {
  receiveLeaderboardsActionCreator,
  asyncGetLeaderboards,
};
