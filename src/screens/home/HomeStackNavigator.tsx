/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTripScreen from './MyTripScreen';
import DiscoverScreen from './DiscoverScreen';
import ProfileScreen from './ProfileScreen';
import {
  MapIcon,
  GlobeAsiaAustraliaIcon,
  UserCircleIcon,
} from 'react-native-heroicons/solid';
import {Colors} from '../../constants/Colors';

const HomeScreenTab = createBottomTabNavigator();

export default function HomeStackNavigator() {
  return (
    <HomeScreenTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.PRIMARY,
      }}>
      <HomeScreenTab.Screen
        name="My Trip"
        component={MyTripScreen}
        options={{
          tabBarIcon: () => (
            <MapIcon
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
