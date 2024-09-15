/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import React, {} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const HomeScreen = ({navigation}: {navigation: any}) => {

  const handloeUserSignOut = () => {
    console.log('first', AsyncStorage.getItem('authToken'));
    AsyncStorage.setItem('authToken', '');
    console.log('secoind', AsyncStorage.getItem('authToken'));
    navigation.navigate('OnboardingScreen');
  };

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
