/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../constants/Colors';
import {signOut} from 'firebase/auth';
import {auth} from '../../configs/FirebaseConfing';

export default function ProfileScreen({navigation}: {navigation: any}) {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Profile',
      headerTitleStyle: {
        color: Colors.PRIMARY, // Change this to your desired color
        fontFamily: 'Outfit-Medium', // Optional: change to your preferred font
        fontSize: 25, // Optional: adjust font size as needed
      },
    });
  }, [navigation]);

  const handloeUserSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        navigation.navigate('MyTripScreen');
        navigation.navigate('OnboardingScreen');
      })
      .catch(error => {
        // An error happened.
        console.log('error', error);
      });
  };

  return (
    <SafeAreaView className="pt-14 px-6 bg-white flex-1">
      <Text>ProfileScreen</Text>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          handloeUserSignOut();
        }}
        className="p-4 absolute bottom-6 w-full bg-black self-center rounded-2xl">
        <Text
          className="text-white text-base text-center"
          style={{
            fontFamily: 'Outfit-Regular',
          }}>
          Sign Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
