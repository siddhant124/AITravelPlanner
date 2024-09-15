import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SearchPlacesScreen from './screens/SearchPlaceScreen';
import MyTripScreen from './screens/MyTripScreen';
import SelectTraveller from './screens/SelectTraveller';
import SelectTravelDate from './screens/SelectTravelDate';
import SelectBudgetScreen from './screens/SelectBudgetScreen';
import ReviewTripScreen from './screens/ReviewTripScreen';
import GenerateTripScreen from './screens/GenerateTripScreen';

const MyTripStack = createNativeStackNavigator();

export default function MyTripStackNavigator() {
  return (
    <MyTripStack.Navigator screenOptions={{headerShown: false}}>
      <MyTripStack.Screen name="MyTripScreen" component={MyTripScreen} />
      <MyTripStack.Screen
        name="SearchPlacesScreen"
        component={SearchPlacesScreen}
      />

      <MyTripStack.Screen name="SelectTraveller" component={SelectTraveller} />

      <MyTripStack.Screen
        name="SelectTravelDate"
        component={SelectTravelDate}
      />

      <MyTripStack.Screen
        name="SelectBudgetScreen"
        component={SelectBudgetScreen}
      />

      <MyTripStack.Screen
        name="ReviewTripScreen"
        component={ReviewTripScreen}
      />

      <MyTripStack.Screen
        name="GenerateTripScreen"
        component={GenerateTripScreen}
      />
    </MyTripStack.Navigator>
  );
}
