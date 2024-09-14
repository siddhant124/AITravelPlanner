/* eslint-disable react-native/no-inline-styles */
import {View, Text} from 'react-native';
import React from 'react';
// import {MapPinIcon} from 'react-native-heroicons/outline';
import {Colors} from '../../../../constants/Colors';

export default function ReviewTripCard({
  Icon,
  title,
  description,
}: {
  Icon: any;
  title: string;
  description: string;
}) {
  return (
    <View className="flex-row items-center gap-4 mb-12 pr-6">
      <Icon size={40} color={Colors.PRIMARY} />
      <View>
        <Text
          className="text-xl text-gray-600"
          style={{
            fontFamily: 'Outfit-Regular',
          }}>
          {title}
        </Text>
        <Text
          className="text-xl text-black"
          style={{
            fontFamily: 'Outfit-Medium',
          }}>
          {description}
        </Text>
      </View>
    </View>
  );
}
