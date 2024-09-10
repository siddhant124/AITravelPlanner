/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {ArrowLongLeftIcon} from 'react-native-heroicons/solid';
import {signInWithEmailAndPassword} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from '../../constants/Colors';
import { auth } from '../../configs/FirebaseConfing';

export default function SignInScreen({navigation}: {navigation: any}) {
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setUserpassword] = useState('');
  const [isSigningIn, seIsSigningIn] = useState(false);

  const handleSignInUser = () => {
    if (!userEmail && !userPassword) {
      ToastAndroid.show('Please Enter all Details', ToastAndroid.LONG);
      return;
    }
    seIsSigningIn(true);
    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async userCredential => {
        // Signed in
        const user = userCredential.user;
        ToastAndroid.show('LogIn successful', ToastAndroid.LONG);
        console.log('User', user);
        AsyncStorage.setItem('authToken', await user.getIdToken(false));
        navigation.navigate('HomeStackNavigator');
      })
      .catch(error => {
        const errorCode = error.code;
        const errorMessage = error.message;

        console.log('Error Code', errorCode);
        console.log('Error Message', errorMessage);

        switch (errorCode) {
          case 'auth/invalid-email':
            return ToastAndroid.show(
              'Please enter valid email address',
              ToastAndroid.LONG,
            );

          case 'auth/invalid-credential':
            return ToastAndroid.show('Invalid credential', ToastAndroid.LONG);

          default:
            return ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
      })
      .finally(() => seIsSigningIn(false));
  };

  return (
    <>
      <StatusBar
        translucent
        backgroundColor="rgba(255,255,255,1)"
        barStyle={'dark-content'}
      />

      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ArrowLongLeftIcon
            color={'#000'}
            style={{
              padding: 16,
            }}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>Let's Sign you in</Text>

        <Text style={styles.subHeaderText}>Welcome back</Text>

        {/* User Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            keyboardType="email-address"
            style={styles.input}
            placeholder="Enter Email"
            onChangeText={event => {
              setuserEmail(event);
            }}
          />
        </View>

        {/* User Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter Password"
            onChangeText={event => {
              setUserpassword(event);
            }}
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity
          activeOpacity={isSigningIn ? 1 : 0.6}
          style={[
            styles.buttonStyle,
            {
              backgroundColor: isSigningIn ? Colors.Gray : Colors.PRIMARY,
            },
          ]}
          onPress={() => !isSigningIn && handleSignInUser()}>
          <Text style={styles.buttonTextStyle}>
            {isSigningIn ? 'Signing In...' : 'Sign In'}
          </Text>
        </TouchableOpacity>

        {/* Sign Up */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('SignUpScreen');
          }}
          style={[styles.buttonStyle, styles.signUpButton]}>
          <Text style={[styles.buttonTextStyle, styles.signUpText]}>
            Create Account
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  headerText: {
    fontFamily: 'Outfit-Bold',
    fontSize: 30,
    paddingTop: 30,
    color: '#000000',
  },
  subHeaderText: {
    fontFamily: 'Outfit-Regular',
    fontSize: 30,
    color: Colors.Gray,
    marginTop: 10,
  },
  inputContainer: {
    marginTop: 30,
    gap: 10,
  },
  labelText: {
    marginLeft: 5,
    fontFamily: 'Outfit-Bold',
    color: '#000',
  },
  input: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    borderColor: Colors.Gray,
    fontFamily: 'Outfit-Medium',
    color: Colors.PRIMARY,
  },
  buttonStyle: {
    padding: 15,
    alignItems: 'center',
    borderRadius: 15,
    marginTop: '25%',
  },
  buttonTextStyle: {
    color: Colors.WHITE,
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
  },
  signUpButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    marginTop: 20,
  },
  signUpText: {
    color: Colors.PRIMARY,
  },
});
