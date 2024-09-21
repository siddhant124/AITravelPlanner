/* eslint-disable react-native/no-inline-styles */
import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';

export default function UsertripCard({
  trip,
  navigation,
}: {
  trip: any;
  navigation: any;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => {
        navigation.navigate('TripDetailsScreen', {
          latestTripDetails: trip,
        });
      }}
      className="flex-row rounded-3xl items-center">
      <Image
        source={
          trip?.tripRequestData?.placeImagUrl !== ''
            ? {uri: trip?.tripRequestData?.placeImagUrl}
            : require('./../../../../assets/images/placeholder_image.jpg')
        }
        className="w-24 h-24 mr-2 rounded-3xl"
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
          className="text-sm text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.tripDuration?.startDate}
        </Text>
        <Text
          className="text-sm text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.tripDuration?.totalNumOfDays + ' Days'}
        </Text>
        <Text
          className="text-sm text-black"
          style={{fontFamily: 'Outfit-Regular'}}>
          {trip?.tripRequestData?.travellerInfo?.icon +
            ' ' +
            trip?.tripRequestData?.travellerInfo?.title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
