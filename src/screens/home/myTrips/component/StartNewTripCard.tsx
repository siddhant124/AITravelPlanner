/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {MapIcon} from 'react-native-heroicons/solid';
import {Colors} from '../../../../constants/Colors';

export default function StartNewTripCard({navigation}: {navigation: any}) {
  return (
    <View
      style={{
        flex: 1, // Take full screen height
        justifyContent: 'center', // Center vertically
        alignItems: 'center', // Center horizontally
        padding: 20,
        gap: 15,
      }}>
      <MapIcon color={Colors.PRIMARY} size={30} />
      <Text
        style={{
          fontFamily: 'Outfit-Medium',
          fontSize: 25,
          color: Colors.PRIMARY,
        }}>
        No Trips Planned Yet
      </Text>

      <Text
        style={{
          fontFamily: 'Outfit-Regular',
          fontSize: 20,
          textAlign: 'center',
          color: Colors.Gray,
        }}>
        Looks like its time to plan a new travel experience! Get Started below
      </Text>

      <TouchableOpacity
        activeOpacity={0.6}
        style={{
          padding: 15,
          alignItems: 'center',
          backgroundColor: Colors.PRIMARY,
          borderRadius: 15,
        }}
        onPress={() => navigation.navigate('SearchPlacesScreen')}>
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'Outfit-Regular',
            fontSize: 17,
          }}>
          Start a new TRIP
        </Text>
      </TouchableOpacity>
    </View>
  );
}
