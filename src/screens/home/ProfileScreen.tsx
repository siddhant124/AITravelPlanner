/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Colors} from '../../constants/Colors';
import {onAuthStateChanged, signOut} from 'firebase/auth';
import {auth} from '../../configs/FirebaseConfing';

export default function ProfileScreen({navigation}: {navigation: any}) {
  const [user, setUser] = useState(auth.currentUser);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

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
      <Text>{user?.email ?? 'sigin to get details'}</Text>

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
