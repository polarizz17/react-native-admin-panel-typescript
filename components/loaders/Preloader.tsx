import LottieView from 'lottie-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';

const Preloader: React.FC = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        autoPlay
        style={{
          width: 200,
          height: 200,
          backgroundColor: '#fff',
        }}
        source={require('../../assets/loader.json')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

export default Preloader;
