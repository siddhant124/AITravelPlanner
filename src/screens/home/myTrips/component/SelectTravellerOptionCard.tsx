/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
import {TravelPlans} from '../model/SelectTravellerDataClass';
import {Colors} from '../../../../constants/Colors';

export default function SelectTravellerOptionCard({
  options,
  selectedTravellerInfo,
}: {
  options: TravelPlans;
  selectedTravellerInfo: TravelPlans;
}) {
  return (
    <View
      className={`p-5 mt-4 flex-row rounded-lg justify-between border ${
        selectedTravellerInfo?.id === options?.id
          ? 'bg-blue-100 border-blue-300'
          : 'bg-gray-100  border-gray-300'
      }`}>
      <View>
        {/* title */}
        <Text
          className="text-xl text-black"
          style={{
            fontFamily: 'Outfit-Bold',
          }}>
          {options?.title}
        </Text>

        {/* Description */}
        <Text
          className="text-lg"
          style={{
            fontFamily: 'Outfit-Regular',
            color: Colors.Gray,
          }}>
          {options?.desc}
        </Text>
      </View>

      <Text
        className="text-4xl pt-2"
        style={{
          fontFamily: 'Outfit-Regular',
          color: Colors.Gray,
        }}>
        {options?.icon}
      </Text>
    </View>
  );
}
