function leaderboardsReducer(state = [], action) {
  switch (action.type) {
  case 'leaderboards/receive':
    return action.payload;
  default:
    return state;
  }
}

export default leaderboardsReducer;
