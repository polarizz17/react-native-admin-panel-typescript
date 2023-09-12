import axios from 'axios';
import {
  deleteUserFail,
  deleteUserRequest,
  deleteUserSuccess,
  getAdminStatsFail,
  getAdminStatsRequest,
  getAdminStatsSuccess,
  getAllUsersFail,
  getAllUsersRequest,
  getAllUsersSuccess,
  updateUserEarningFail,
  updateUserEarningRequest,
  updateUserEarningSuccess,
  updateUserRoleFail,
  updateUserRoleRequest,
  updateUserRoleSuccess,
  updateUserStatusFail,
  updateUserStatusRequest,
  updateUserStatusSuccess,
} from '../reducers/adminReducers';
import {server} from '../store';

export const getDashboardStats = () => async (dispatch: Function) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(getAdminStatsRequest());

    const {data} = await axios.get(`${server}/admin/stats`, config);

    dispatch(getAdminStatsSuccess(data));
  } catch (error: any) {
    dispatch(getAdminStatsFail(error.response.data.message));
  }
};

export const getAllUsers = () => async (dispatch: Function) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(getAllUsersRequest());

    const {data} = await axios.get(`${server}/admin/users`, config);

    dispatch(getAllUsersSuccess(data.users));
  } catch (error: any) {
    dispatch(getAllUsersFail(error.response.data.message));
  }
};

export const updateUserRole =
  (id: string, role: string) => async (dispatch: Function) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(updateUserRoleRequest());

      const {data} = await axios.put(
        `${server}/admin/user/${id}`,
        {role},
        config,
      );

      dispatch(updateUserRoleSuccess(data.message));
    } catch (error: any) {
      dispatch(updateUserRoleFail(error.response.data.message));
    }
  };

export const updateUserStatus =
  (id: string, status: string) => async (dispatch: Function) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(updateUserStatusRequest());

      const {data} = await axios.put(
        `${server}/admin/user/subscription/${id}`,
        {status},
        config,
      );

      dispatch(updateUserStatusSuccess(data.message));
    } catch (error: any) {
      dispatch(updateUserStatusFail(error.response.data.message));
    }
  };

export const updateUserEarning =
  (id: string, earning: string) => async (dispatch: Function) => {
    try {
      const config = {
        withCredentials: true,
      };
      dispatch(updateUserEarningRequest());

      const {data} = await axios.put(
        `${server}/admin/user/earning/${id}`,
        {earning},
        config,
      );

      dispatch(updateUserEarningSuccess(data.message));
    } catch (error: any) {
      dispatch(updateUserEarningFail(error.response.data.message));
    }
  };

export const deleteUser = (id: string) => async (dispatch: Function) => {
  try {
    const config = {
      withCredentials: true,
    };
    dispatch(deleteUserRequest());

    const {data} = await axios.delete(`${server}/admin/user/${id}`, config);

    dispatch(deleteUserSuccess(data.message));
  } catch (error: any) {
    dispatch(deleteUserFail(error.response.data.message));
  }
};
