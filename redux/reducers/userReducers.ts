import {createAction, createReducer} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const loginRequest = createAction('login/request');
export const loginSuccess = createAction('login/success');
export const loginFail = createAction('login/fail');
export const logoutRequest = createAction('logout/request');
export const logoutSuccess = createAction('logout/success');
export const logoutFail = createAction('logout/fail');
export const loadUserRequest = createAction('loaduser/request');
export const loadUserSuccess = createAction('loaduser/success');
export const loadUserFail = createAction('loaduser/fail');
export const clearErrors = createAction('clearerror');
export const clearMessage = createAction('clearmessage');

export interface StateType {
  loading: boolean;
  isAuthenticated: boolean;
  user: {
    role: string;
  };
  message: string | null;
  error: string | null;
}

const initialState: StateType = {
  loading: false,
  isAuthenticated: false,
  user: {role: 'user'},
  message: null,
  error: null,
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(loginRequest, state => {
      state.loading = true;
    })
    .addCase(loginSuccess, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.message = action.payload.message;
    })
    .addCase(loginFail, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(loadUserRequest, state => {
      state.loading = true;
    })
    .addCase(loadUserSuccess, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    })
    .addCase(loadUserFail, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    })
    .addCase(logoutRequest, state => {
      state.loading = true;
    })
    .addCase(logoutSuccess, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = {role: 'user'};
      state.message = action.payload;
    })
    .addCase(logoutFail, (state, action: any) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.error = action.payload;
    });
});

// export const selectUser = (state: RootState) => state.user;
