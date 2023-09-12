import {PayloadAction, createAction, createReducer} from '@reduxjs/toolkit';
import {RootState} from '../store';

export const getAdminStatsRequest = createAction('getAdminStats/request');
export const getAdminStatsSuccess = createAction('getAdminStats/success');
export const getAdminStatsFail = createAction('getAdminStats/fail');

export const getAllUsersRequest = createAction('getAllUsers/request');
export const getAllUsersSuccess = createAction('getAllUsers/success');
export const getAllUsersFail = createAction('getAllUsers/fail');

export const updateUserRoleRequest = createAction('updateUserRole/request');
export const updateUserRoleSuccess = createAction('updateUserRole/success');
export const updateUserRoleFail = createAction('updateUserRole/fail');

export const updateUserStatusRequest = createAction('updateUserStatus/request');
export const updateUserStatusSuccess = createAction('updateUserStatus/success');
export const updateUserStatusFail = createAction('updateUserStatus/fail');

export const updateUserEarningRequest = createAction(
  'updateUserEarning/request',
);
export const updateUserEarningSuccess = createAction(
  'updateUserEarning/success',
);
export const updateUserEarningFail = createAction('updateUserEarning/fail');

export const deleteUserRequest = createAction('deleteUser/request');
export const deleteUserSuccess = createAction('deleteUser/success');
export const deleteUserFail = createAction('deleteUser/fail');

export const clearErrors = createAction('clearerror');
export const clearMessage = createAction('clearmessage');

export interface StateType {
  loading: boolean;
  message: null | string;
  error: null | string;
  users: null | Array<User>;
  userCount: null | number;
  subscribedUsers: null | number;
  noOfCourse: null | number;
  noOfMessage: null | number;
}

type User = {
  _id: string;
  name: string;
  email: string;
  avatar: {
    url: string;
  };
  role: string;
  playlist: Array<object>;
  subscription: {
    status: string;
  };
};

const initialState: StateType = {
  loading: false,
  message: null,
  error: null,
  users: null,
  userCount: null,
  subscribedUsers: null,
  noOfCourse: null,
  noOfMessage: null,
};

export const adminReducer = createReducer(initialState, builder => {
  builder
    .addCase(getAdminStatsRequest, state => {
      state.loading = true;
    })
    .addCase(getAdminStatsSuccess, (state, action: any) => {
      state.loading = false;
      state.userCount = action.payload.userCount;
      state.subscribedUsers = action.payload.subscribedUsers;
      state.noOfCourse = action.payload.noOfCourse;
      state.noOfMessage = action.payload.noOfMessage;
    })
    .addCase(getAdminStatsFail, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(getAllUsersRequest, state => {
      state.loading = true;
    })
    .addCase(getAllUsersSuccess, (state, action: any) => {
      state.users = action.payload;
      state.loading = false;
    })
    .addCase(getAllUsersFail, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserRoleRequest, state => {
      state.loading = true;
    })
    .addCase(updateUserRoleSuccess, (state, action: any) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserRoleFail, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(updateUserStatusRequest, state => {
      state.loading = true;
    })
    .addCase(updateUserStatusSuccess, (state, action: any) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(updateUserStatusFail, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(deleteUserRequest, state => {
      state.loading = true;
    })
    .addCase(deleteUserSuccess, (state, action: any) => {
      state.loading = false;
      state.message = action.payload;
    })
    .addCase(deleteUserFail, (state, action: any) => {
      state.loading = false;
      state.error = action.payload;
    })
    .addCase(clearErrors, state => {
      state.error = null;
    })
    .addCase(clearMessage, state => {
      state.message = null;
    });
});

// export const selectUser = (state: RootState) => state.admin;
