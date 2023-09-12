import {configureStore} from '@reduxjs/toolkit';
import {adminReducer} from './reducers/adminReducers';
import {userReducer} from './reducers/userReducers';

const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
export const server = 'https://winners-club-backend.vercel.app/api/v1';
