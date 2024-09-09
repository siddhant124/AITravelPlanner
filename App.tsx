/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import OnboardingScreen from './src/components/OnboardingScreen';
import SignInScreen from './src/auth/SignInScreen';
import SignUpScreen from './src/auth/SignUpScreen';
import {HomeScreen} from './src/components/HomeScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, View} from 'react-native';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

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
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={
          authToken === null ? 'OnboardingScreen' : 'HomeScreen'
        }>
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
