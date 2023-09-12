import React, {useEffect, useState} from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {Button, IconButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../Constant';
import Preloader from '../components/loaders/Preloader';
import {login} from '../redux/actions/user';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {clearErrors, clearMessage} from '../redux/reducers/userReducers';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [active, setActive] = useState<boolean>(true);
  // const [disable, setDisable] = useState(true);

  const {message, error, loading, user} = useAppSelector(state => state.user);

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

  // const showToastUser = () => {
  //   Toast.show({
  //     type: "error",
  //     text1: "You are not allowed to access this",
  //   });
  // };
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
    // if (user.role === "user") {
    //   showToastUser();
    // }
  }, [dispatch, error, message]);

  const submitHandler = () => {
    dispatch(login(email, password));
  };

  return loading ? (
    <Preloader />
  ) : (
    <>
      <View style={styles.main}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.headerText}>Admin Login</Text>
              <Icon name="admin-panel-settings" size={180} color="#1abebe" />
            </View>
            <View style={styles.formContainer}>
              <View style={styles.textInputContainer}>
                <View style={styles.textInputAndIcon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Email"
                    textContentType="emailAddress"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                  />
                  <IconButton
                    icon="email"
                    iconColor={`${colors.baseColor}`}
                    size={20}
                  />
                </View>
                <View style={styles.textInputAndIcon}>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Password"
                    textContentType="password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={active}
                  />
                  <IconButton
                    icon={active ? 'eye' : 'eye-off'}
                    iconColor={`${colors.baseColor}`}
                    size={20}
                    onPress={() => setActive(!active)}
                  />
                </View>
              </View>
              <Button
                mode="elevated"
                textColor="#fff"
                icon="login"
                onPress={submitHandler}
                style={styles.btn}>
                Login
              </Button>
            </View>
          </View>
        </SafeAreaView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: `${colors.baseColor}`,
  },
  formContainer: {},
  textInputContainer: {},

  textInputAndIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 300,
    height: 50,
    backgroundColor: '#fff',
    borderWidth: 1,
    paddingLeft: 15,
    paddingRight: 5,
    borderRadius: 10,
    margin: 10,
  },

  textInput: {
    width: 225,
    fontSize: 14,
    fontWeight: '500',
  },

  textInputPassword: {},

  btn: {
    width: 120,
    alignSelf: 'center',
    backgroundColor: `${colors.baseColor}`,
    marginTop: 15,
  },
});
export default Login;
