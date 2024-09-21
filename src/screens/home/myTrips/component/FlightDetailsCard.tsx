/* eslint-disable react-native/no-inline-styles */
import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';

function flightDetailsValue(title: string, desc: string) {
  return (
    <View className="flex-row gap-1">
      <Text
        className="text-black text-lg"
        style={{fontFamily: 'Outfit-Medium'}}>
        {title}
      </Text>
      <Text
        className="text-black text-lg"
        style={{fontFamily: 'Outfit-Regular'}}>
        {desc}
      </Text>
    </View>
  );
}
export default function FlightDetailsCard({
  flightDetails,
}: {
  flightDetails: any;
}) {
  return (
    <View className="pt-5">
      <Text className="text-black text-xl" style={{fontFamily: 'Outfit-Bold'}}>
        {'✈️   Flight Details'}
      </Text>
      <View className="flex-row mt-2 border border-gray-400 p-3 rounded-xl  bg-gray-100 items-center justify-between align-middle">
        <View>
          {flightDetailsValue('Airline:', flightDetails?.airline)}
          {flightDetailsValue('Arrival City:', flightDetails?.arrivalCity)}
          {flightDetailsValue('Arrival Date:', flightDetails?.arrivalDate)}
          {flightDetailsValue(
            'Flight Price:',
            `${flightDetails?.flightPrice} (approx)`,
          )}
        </View>
        <TouchableOpacity className="bg-black rounded-lg">
          <Text className="text-white p-2">Book now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
