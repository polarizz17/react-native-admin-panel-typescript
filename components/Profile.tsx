import React, {useEffect, useState} from 'react';
import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Avatar} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import colors from '../Constant';
import {getAllUsers} from '../redux/actions/admin';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {clearErrors, clearMessage} from '../redux/reducers/adminReducers';
import Portal from './Portal';
import Preloader from './loaders/Preloader';

const Profile: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const {error, loading, users, message} = useAppSelector(state => state.admin);

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
    dispatch(getAllUsers());

    if (error) {
      showToastError();
      dispatch(clearErrors());
    }
    if (message) {
      showToastSuccess();
      dispatch(clearMessage());
    }
  }, [dispatch, error, message, refreshing]);

  return loading ? (
    <Preloader />
  ) : (
    <View style={styles.main}>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={users}
        renderItem={({item}) => (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.avatarNtext}>
                <Avatar.Image
                  size={50}
                  source={{uri: item.avatar.url}}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.headerText}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.email}>{item.email}</Text>
                </TouchableOpacity>
              </View>
              <Portal type="delete" role={item.role} id={item._id} />
            </View>
            <View style={styles.actions}>
              <View style={styles.subCard}>
                <Text style={styles.dynamicText}>{item.playlist.length}</Text>
                <Text style={styles.staticText}>Course No.</Text>
              </View>
              <View style={styles.subCard}>
                <Portal type="role" role={item.role} id={item._id} />
                <Text style={styles.staticText}>Role</Text>
              </View>

              <View style={styles.subCard}>
                <Portal
                  type="subscription"
                  subs={item.subscription.status}
                  id={item._id}
                />
                <Text style={styles.staticText}>Subscription</Text>
              </View>
            </View>
          </View>
        )}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  card: {
    alignItems: 'center',
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginVertical: 15,
    marginHorizontal: 20,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },

  header: {
    width: '90%',
    flexDirection: 'row',
    // borderWidth: 0.5,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  avatarNtext: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 0.5,
  },
  avatar: {
    marginRight: 10,
    // borderWidth: 0.5,
  },
  headerText: {
    justifyContent: 'center',
    // borderWidth: 0.5,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  email: {
    fontSize: 12,
    color: 'gray',
  },
  headerIcon: {
    // borderWidth: 0.5,
    padding: 0,
  },
  actions: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    // borderWidth: 0.5,
    marginVertical: 10,
    paddingVertical: 10,
  },
  subCard: {
    alignItems: 'center',
    padding: 10,
    // borderWidth: 1,
    justifyContent: 'space-around',
  },
  dynamicText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  staticText: {
    color: 'gray',
  },
});

export default Profile;
