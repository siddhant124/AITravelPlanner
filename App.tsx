/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeStackNavigator from './src/screens/home/HomeStackNavigator';
import {CreateTripContext} from './context/CreateTripContext';
import {auth} from './src/configs/FirebaseConfing';
import {View, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [tripData, setTripData] = useState<any>([]);
  const [initializing, setInitializing] = useState(true);
  const [userDetails, setSserDetails] = useState(null);

  // Handle user state changes
  async function onAuthStateChanged(user: any) {
    setSserDetails(user);
    if (userDetails) {
      // Save the auth token if user is authenticated
      const authToken = await user.getIdToken();
      await AsyncStorage.setItem('authToken', authToken);
    } else {
      // Clear auth token if user is not authenticated
      await AsyncStorage.setItem('authToken', '');
    }

    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View className="flex-1 justify-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <CreateTripContext.Provider value={{tripData, setTripData}}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName={
            userDetails ? 'HomeStackNavigator' : 'OnboardingScreen'
          }>
          <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
          <Stack.Screen
            name="HomeStackNavigator"
            component={HomeStackNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CreateTripContext.Provider>
  );
}
