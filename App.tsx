/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/screens/onboarding/OnboardingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';
import SignInScreen from './src/screens/auth/SignInScreen';
import SignUpScreen from './src/screens/auth/SignUpScreen';
import HomeStackNavigator from './src/screens/home/HomeStackNavigator';
import {CreateTripContext} from './context/CreateTripContext';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New loading state
  const [tripData, setTripData] = useState<any>([]);

  const getAuthToken = async () => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token !== null) {
        setAuthToken(token); // Update state if token exists
      } else {
        setAuthToken(null);
        console.log('No auth token found');
      }
    } catch (error) {
      console.error('Error fetching auth token', error);
    } finally {
      setLoading(false); // Ensure loading is set to false after check
    }
  };

  useEffect(() => {
    getAuthToken();
  }, []);

  if (loading) {
    // Show a loader while checking the token
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            authToken === null ? 'OnboardingScreen' : 'HomeStackNavigator'
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
