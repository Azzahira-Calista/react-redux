const ActionType = {
  SHOW_LOADING: 'loading/show',
  HIDE_LOADING: 'loading/hide',
};

function showLoading() {
  return { type: ActionType.SHOW_LOADING };
}

function hideLoading() {
  return { type: ActionType.HIDE_LOADING };
}

export { ActionType, showLoading, hideLoading };
