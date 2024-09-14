import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchPlacesScreen from './createTrip/SearchPlaceScreen';
import MyTripScreen from './MyTripScreen';
import SelectTraveller from './createTrip/SelectTraveller';
import SelectTravelDate from './createTrip/SelectTravelDate';

const MyTripStack = createNativeStackNavigator();

export default function MyTripStackNavigator() {
  return (
    <NavigationContainer independent={true}>
      <MyTripStack.Navigator screenOptions={{headerShown: false}}>
        <MyTripStack.Screen name="MyTripScreen" component={MyTripScreen} />
        <MyTripStack.Screen
          name="SearchPlacesScreen"
          component={SearchPlacesScreen}
        />

        <MyTripStack.Screen
          name="SelectTraveller"
          component={SelectTraveller}
        />

        <MyTripStack.Screen
          name="SelectTravelDate"
          component={SelectTravelDate}
        />
      </MyTripStack.Navigator>
    </NavigationContainer>
  );
}
