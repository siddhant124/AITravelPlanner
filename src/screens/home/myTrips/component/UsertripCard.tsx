/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image} from 'react-native';
import React from 'react';

export default function UsertripCard({trip}: {trip: any}) {
  return (
    <View className="flex-row bg-blue-100 rounded-3xl items-center">
      <Image
        source={require('./../../../../assets/images/placeholder_image.jpg')}
        className="w-28 h-28 m-2 rounded-3xl"
      />
      <View className="flex-1 p-2">
        {/* Ensure the container can expand */}
        <Text
          numberOfLines={1}
          ellipsizeMode="tail"
          className="text-lg text-black"
          style={{fontFamily: 'Outfit-Medium'}}>
          {trip?.tripRequestData?.locationInfo?.name}
        </Text>
        <Text
          className="text-base text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.tripDuration?.startDate}
        </Text>
        <Text
          className="text-base text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.tripDuration?.totalNumOfDays + ' Days'}
        </Text>
        <Text
          className="text-base text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.travellerInfo?.icon +
            ' ' +
            trip?.tripRequestData?.travellerInfo?.title}
        </Text>
      </View>
    </View>
  );
}
