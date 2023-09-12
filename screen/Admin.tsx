import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Appbar} from 'react-native-paper';
import {createMaterialBottomTabNavigator} from 'react-native-paper/react-navigation';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../Constant';
import Dashboard from '../components/Dashboard';
import Profile from '../components/Profile';
import Preloader from '../components/loaders/Preloader';
import {logout} from '../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {clearErrors, clearMessage} from '../redux/reducers/userReducers';

const Tab = createMaterialBottomTabNavigator();

const Admin: React.FC = () => {
  const {message, error, loading} = useAppSelector(state => state.user);

  const showToastSuccess = () => {
    Toast.show({
      type: 'success',
      text1: `${message}`,
    });
  };
  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: `${error}`,
    });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (error) {
      showToastError();
      dispatch(clearErrors());
    }

    if (message) {
      showToastSuccess();
      dispatch(clearMessage());
    }
  }, [dispatch, error, message]);

  const logoutHandler = () => {
    dispatch(logout());
  };

  return loading ? (
    <Preloader />
  ) : (
    <>
      <Appbar.Header mode="center-aligned">
        <Appbar.Content
          title="Admin Panel"
          titleStyle={{fontWeight: 'bold', color: '#1abebe'}}
        />
        <Appbar.Action icon="logout" onPress={logoutHandler} />
      </Appbar.Header>
      <Tab.Navigator
        initialRouteName="Dashboard"
        shifting={true}
        activeColor={`${colors.baseColor}`}
        inactiveColor="black"
        barStyle={styles.barStyle}>
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            tabBarLabel: 'Dashboard',
            tabBarIcon: ({color}) => {
              return <Icon name="view-dashboard" size={25} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name="Users"
          component={Profile}
          options={{
            tabBarLabel: 'Users',
            tabBarIcon: ({color}) => {
              return <Icon name="account" size={25} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </>
  );
};

const styles = StyleSheet.create({
  barStyle: {},
});

export default Admin;
