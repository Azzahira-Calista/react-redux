function threadsReducer(state = [], action = {}) {
  switch (action.type) {
  case 'threads/receive':
    return action.payload;
  case 'threads/add':
    return [action.payload, ...state];
  case 'threads/set':
    return state.map((thread) =>
      thread.id === action.payload.id ? action.payload : thread
    );
  default:
    return state;
  }
}

export default threadsReducer;
