/* eslint-disable react-native/no-inline-styles */
import {View, Text, StatusBar, BackHandler, ToastAndroid} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {Colors} from '../../../../constants/Colors';
import StartNewTripCard from '../component/StartNewTripCard';

export default function MyTrip({navigation}: {navigation: any}) {
  const [userTrips, _setUserTrips] = useState([]);
  const [backPressedOnce, setBackPressedOnce] = useState(false);

  useEffect(() => {
    const handleBackPress = () => {
      if (backPressedOnce) {
        // Exit the app if back is pressed again within 2 seconds
        BackHandler.exitApp();
        return true;
      } else {
        // Show toast and set backPressedOnce to true
        ToastAndroid.show('Press again to exit', ToastAndroid.SHORT);
        setBackPressedOnce(true);

        // Reset backPressedOnce after 2 seconds
        setTimeout(() => {
          setBackPressedOnce(false);
        }, 2000);

        return true; // Prevent the default back button behavior
      }
    };

    // Adding the back press event listener
    BackHandler.addEventListener('hardwareBackPress', handleBackPress);

    // Cleanup: Remove the event listener on component unmount
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
    };
  }, [backPressedOnce]);

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        padding: 24,
        flex: 1,
      }}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 30,
            color: Colors.PRIMARY,
          }}>
          My Trip
        </Text>
        <PlusCircleIcon color={Colors.PRIMARY} size={30} />
      </View>
      {userTrips?.length === 0 ? (
        <StartNewTripCard navigation={navigation} />
      ) : null}
    </View>
  );
}
