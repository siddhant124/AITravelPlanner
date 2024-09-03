/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  StatusBar,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {Colors} from '../constants/Colors';
import {ArrowLongLeftIcon} from 'react-native-heroicons/solid';

export default function SignInScreen({navigation}: {navigation: any}) {
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
          />
        </View>

        {/* User Password */}
        <View style={styles.inputContainer}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            placeholder="Enter Password"
          />
        </View>

        {/* Sign In Button */}
        <TouchableOpacity activeOpacity={0.6} style={styles.buttonStyle}>
          <Text style={styles.buttonTextStyle}>Sign In</Text>
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
    backgroundColor: Colors.PRIMARY,
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
