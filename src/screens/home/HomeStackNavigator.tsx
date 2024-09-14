/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import DiscoverScreen from './DiscoverScreen';
import ProfileScreen from './ProfileScreen';
import {
  MapIcon,
  GlobeAsiaAustraliaIcon,
  UserCircleIcon,
} from 'react-native-heroicons/solid';
import {Colors} from '../../constants/Colors';
import MyTripStackNavigator from './myTrips/MyTripStackNavigator';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const HomeScreenTab = createBottomTabNavigator();

// Helper function to determine tab bar style
function getTabBarStyle(route: any): any {
  // Get the focused route name
  const routeName = getFocusedRouteNameFromRoute(route) ?? '';

  // List of Screens where tab bars should be hidden
  if (
    routeName === 'SearchPlacesScreen' ||
    routeName === 'SelectTraveller' ||
    routeName === 'SelectTravelDate' ||
    routeName === 'SelectBudgetScreen' ||
    routeName === 'ReviewTripScreen'
  ) {
    return {display: 'none'}; // Hide tab bar
  }

  return {}; // Show tab bar (default)
}

export default function HomeStackNavigator() {
  return (
    <HomeScreenTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
        tabBarHideOnKeyboard: true,
      }}>
      <HomeScreenTab.Screen
        name="My Trip"
        component={MyTripStackNavigator}
        options={({route}) => ({
          tabBarIcon: () => (
            <MapIcon color={'#000'} style={{width: 24, height: 24}} />
          ),
          tabBarStyle: getTabBarStyle(route),
        })}
      />
      <HomeScreenTab.Screen
        name="Discover"
        component={DiscoverScreen}
        options={{
          tabBarIcon: () => (
            <GlobeAsiaAustraliaIcon
              color={'#000'}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
      <HomeScreenTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: () => (
            <UserCircleIcon
              color={'#000'}
              style={{
                width: 24,
                height: 24,
              }}
            />
          ),
        }}
      />
    </HomeScreenTab.Navigator>
  );
}
