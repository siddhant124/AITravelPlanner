/* eslint-disable react-native/no-inline-styles */
import {View, Text, StatusBar} from 'react-native';
import React, {useState} from 'react';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {Colors} from '../../../../constants/Colors';
import StartNewTripCard from '../component/StartNewTripCard';

export default function MyTrip({navigation}: {navigation: any}) {
  const [userTrips, _setUserTrips] = useState([]);

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
