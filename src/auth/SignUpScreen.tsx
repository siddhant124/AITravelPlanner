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
import {Colors} from '../constants/Colors';
import {ArrowLongLeftIcon} from 'react-native-heroicons/solid';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../configs/FirebaseConfing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SignUpScreen({navigation}: {navigation: any}) {
  const [userName, setUserName] = useState('');
  const [userEmail, setuserEmail] = useState('');
  const [userPassword, setUserpassword] = useState('');
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const handleCreateAcount = () => {
    if (!userEmail && !userPassword && !userName) {
      ToastAndroid.show('Please Enter all Details', ToastAndroid.LONG);
      return;
    }

    setIsCreatingAccount(true);
    createUserWithEmailAndPassword(auth, userEmail, userPassword)
      .then(async userCredential => {
        // Signed up
        const user = userCredential.user;
        ToastAndroid.show('Account created successsfully', ToastAndroid.LONG);
        console.log('user details', user);
        AsyncStorage.setItem('authToken', await user.getIdToken(false));
        navigation.navigate('HomeScreen');
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

          case 'auth/email-already-in-use':
            return ToastAndroid.show(
              'User already exist, please SignIn',
              ToastAndroid.LONG,
            );

          default:
            return ToastAndroid.show(errorMessage, ToastAndroid.LONG);
        }
      })
      .finally(() => setIsCreatingAccount(false));
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

        <Text style={styles.headerText}>Create New Account</Text>

        {/* User Full Name */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Full Name</Text>
          <TextInput
            inputMode="text"
            style={styles.input}
            placeholder="Enter Full Name"
            onChangeText={event => {
              setUserName(event);
            }}
          />
        </View>

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

        {/* Create Account Button */}
        <TouchableOpacity
          activeOpacity={isCreatingAccount ? 1 : 0.6}
          style={[
            styles.buttonStyle,
            {backgroundColor: isCreatingAccount ? Colors.Gray : Colors.PRIMARY},
          ]}
          onPress={() => {
            !isCreatingAccount && handleCreateAcount();
          }}>
          <Text style={styles.buttonTextStyle}>Create Account</Text>
        </TouchableOpacity>

        {/* Sign In */}
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            navigation.goBack();
            navigation.navigate('SignInScreen');
          }}
          style={[styles.buttonStyle, styles.signInButton]}>
          <Text style={[styles.buttonTextStyle, styles.signInText]}>
            {isCreatingAccount ? 'Creating account...' : 'Sign In'}
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
    backgroundColor: Colors.PRIMARY,
    borderRadius: 15,
    marginTop: '25%',
  },
  buttonTextStyle: {
    color: Colors.WHITE,
    fontFamily: 'Outfit-Regular',
    fontSize: 17,
  },
  signInButton: {
    backgroundColor: Colors.WHITE,
    borderWidth: 1,
    marginTop: 20,
  },
  signInText: {
    color: Colors.PRIMARY,
  },
});
