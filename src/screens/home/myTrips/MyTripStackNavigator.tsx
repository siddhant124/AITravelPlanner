import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SearchPlacesScreen from './screens/SearchPlaceScreen';
import MyTripScreen from './screens/MyTripScreen';
import SelectTraveller from './screens/SelectTraveller';
import SelectTravelDate from './screens/SelectTravelDate';
import SelectBudgetScreen from './screens/SelectBudgetScreen';

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

        <MyTripStack.Screen
          name="SelectBudgetScreen"
          component={SelectBudgetScreen}
        />
      </MyTripStack.Navigator>
    </NavigationContainer>
  );
}
