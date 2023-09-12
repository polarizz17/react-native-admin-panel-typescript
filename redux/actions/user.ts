import axios from 'axios';
import {
  loadUserFail,
  loadUserRequest,
  loadUserSuccess,
  loginFail,
  loginRequest,
  loginSuccess,
  logoutFail,
  logoutRequest,
  logoutSuccess,
} from '../reducers/userReducers';
import {server} from '../store';

export const login =
  (email: string, password: string) => async (dispatch: Function) => {
    try {
      dispatch(loginRequest());

      const {data} = await axios.post(
        `${server}/login`,
        {email, password},
        {headers: {'Content-Type': 'application/json'}, withCredentials: true},
      );

      dispatch(loginSuccess(data));
    } catch (error: any) {
      dispatch(loginFail(error.response.data.message));
    }
  };

export const loadUser = () => async (dispatch: Function) => {
  try {
    dispatch(loadUserRequest());

    const {data} = await axios.get(`${server}/me`, {withCredentials: true});

    dispatch(loadUserSuccess(data.user));
  } catch (error: any) {
    dispatch(loadUserFail(error.response.data.message));
  }
};

export const logout = () => async (dispatch: Function) => {
  try {
    dispatch(logoutRequest());

    const {data} = await axios.get(`${server}/logout`, {
      withCredentials: true,
    });

    dispatch(logoutSuccess(data.message));
  } catch (error: any) {
    dispatch(logoutFail(error.response.data.message));
  }
};
