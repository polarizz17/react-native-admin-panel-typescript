import React, {useEffect, useState} from 'react';
import {RefreshControl, ScrollView, StyleSheet, Text, View} from 'react-native';
import {IconButton} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import colors from '../Constant';
import {getDashboardStats} from '../redux/actions/admin';
import {useAppDispatch, useAppSelector} from '../redux/hook';
import {clearErrors} from '../redux/reducers/adminReducers';
import Preloader from './loaders/Preloader';

const Dashboard: React.FC = () => {
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const {error, loading, userCount, subscribedUsers, noOfCourse, noOfMessage} =
    useAppSelector(state => state.admin);

  const showToastError = () => {
    Toast.show({
      type: 'error',
      text1: `${error}`,
    });
  };

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDashboardStats());

    if (error) {
      showToastError();
      dispatch(clearErrors());
    }
  }, [dispatch, error, refreshing]);

  return loading ? (
    <Preloader />
  ) : (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.main}>
        <View style={styles.card}>
          <IconButton
            style={styles.icon}
            icon={'account-group'}
            iconColor={`${colors.baseColor}`}
            size={70}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text2}>{userCount}</Text>
            <Text style={styles.text1}>Total Users</Text>
          </View>
        </View>
        <View style={styles.card}>
          <IconButton
            style={styles.icon}
            icon={'shield-crown'}
            iconColor={`${colors.baseColor}`}
            size={70}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text2}>{subscribedUsers}</Text>
            <Text style={styles.text1}>Subscribed</Text>
          </View>
        </View>
        <View style={styles.card}>
          <IconButton
            style={styles.icon}
            icon={'book-cog'}
            iconColor={`${colors.baseColor}`}
            size={70}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text2}>{noOfCourse}</Text>
            <Text style={styles.text1}>Courses</Text>
          </View>
        </View>
        <View style={styles.card}>
          <IconButton
            style={styles.icon}
            icon={'message-star'}
            iconColor={`${colors.baseColor}`}
            size={70}
          />
          <View style={styles.textContainer}>
            <Text style={styles.text2}>{noOfMessage}</Text>
            <Text style={styles.text1}>Messages</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
  },

  header: {
    fontSize: 50,
    fontWeight: 'bold',
    textAlign: 'center',
    color: `${colors.baseColor}`,
    marginVertical: 20,
  },

  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 40,
    paddingHorizontal: 25,
    width: '75%',
    marginVertical: 15,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  icon: {
    width: '50%',
    alignItems: 'center',
  },
  textContainer: {
    width: '50%',
    alignItems: 'center',
  },
  text1: {
    fontSize: 15,
    fontWeight: '500',
  },
  text2: {
    fontSize: 35,
    fontWeight: '900',
  },

  pieChartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  pieChart: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clorContainers: {
    width: '50%',
    alignItems: 'center',
    // justifyContent: "flex-start",
  },
  clorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: "flex-start",
  },
  color1: {width: 15, height: 15, backgroundColor: '#fbd203'},
  color2: {width: 15, height: 15, backgroundColor: '#ff3c00'},

  colorText: {
    marginVertical: 5,
    marginHorizontal: 5,
  },
});

export default Dashboard;
