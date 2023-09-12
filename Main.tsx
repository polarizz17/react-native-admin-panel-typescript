import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect} from 'react';
import Preloader from './components/loaders/Preloader';
import {loadUser} from './redux/actions/user';
import {useAppDispatch, useAppSelector} from './redux/hook';
import Admin from './screen/Admin';
import Login from './screen/Login';

const Stack = createNativeStackNavigator();

const Main: React.FC = () => {
  const {user, loading} = useAppSelector(state => state.user);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return loading ? (
    <Preloader />
  ) : (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={user.role === 'admin' ? 'Admin' : 'Login'}>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Admin"
          component={Admin}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Main;
