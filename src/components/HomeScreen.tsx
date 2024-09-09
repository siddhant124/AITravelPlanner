/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  BackHandler,
  ToastAndroid,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  const handloeUserSignOut = () => {
    console.log('first', AsyncStorage.getItem('authToken'));
    AsyncStorage.setItem('authToken', '');
    console.log('secoind', AsyncStorage.getItem('authToken'));
    navigation.navigate('OnboardingScreen');
  };

  useEffect(() => {
    const handleBackPress = () => {
      if (backPressedOnce) {
        // Exit the app if back is pressed again within 2 seconds
        BackHandler.exitApp();
        return true;
      } else {
        // Show toast and set backPressedOnce to true
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
        setBackPressedOnce(true);

        // Reset backPressedOnce after 2 seconds
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true; // Prevent the default back button behavior
      }
    };

    // Adding the back press event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup: Remove the event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [backPressedOnce]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <View>
        <Text style={style.textStyle}>Hello World</Text>
        <Button
          onPress={() => handloeUserSignOut()}
          title="Sign out"
          color={Colors.PRIMARY}></Button>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  textStyle: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    backgroundColor: '#FFF',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
});
