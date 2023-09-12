import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {PaperProvider} from 'react-native-paper';
import Toast from 'react-native-toast-message';
import Icon1 from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import {Provider} from 'react-redux';
import colors from './Constant';
import Main from './Main';
import store from './redux/store';

const toastConfig = {
  error: ({text1}: {text1: string}): React.ReactNode => (
    <View style={styles.toast}>
      <Icon1 name="circle-with-cross" size={20} color="red" />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),

  success: ({text1}: {text1: string}): React.ReactNode => (
    <View style={styles.toast}>
      <Icon2 name="check-circle" size={20} color="green" />
      <Text style={styles.text}>{text1}</Text>
    </View>
  ),
};

const styles = StyleSheet.create({
  toast: {
    flexDirection: 'row',
    // height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop: 10,
    elevation: 10,
    shadowColor: `${colors.shadowColor}`,
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    paddingHorizontal: 5,
  },
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Main />
        <Toast config={toastConfig} />
      </PaperProvider>
    </Provider>
  );
};

export default App;
