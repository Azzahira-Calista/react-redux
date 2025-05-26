import { configureStore } from '@reduxjs/toolkit';
import authUserReducer from './authUser/reducer';
import isPreloadReducer from './isPreload/reducer';
import usersReducer from './users/reducer';
import loadingReducer from './loading/reducer';
import threadsReducer from './threads/reducer';

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    loading: loadingReducer,
    threads: threadsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // mematikan ImmutableStateInvariantMiddleware
      serializableCheck: false, // opsional matikan cek serializable action
    }),
});

export default store;
