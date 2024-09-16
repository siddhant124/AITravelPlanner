/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {View, Image, Text, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {DocumentData} from 'firebase/firestore';
import {Colors} from '../../../../constants/Colors';
import UsertripCard from './UsertripCard';

export default function UserTripsList({
  userTrips,
}: {
  userTrips: DocumentData[];
}) {
  return (
    <View className="flex-1  mt-6">
      {/* Latest Trip Info */}
      <View className="mb-6">
        <Image
          source={require('./../../../../assets/images/placeholder_image.jpg')}
          className="w-full h-44 object-cover rounded-3xl"
        />
        <Text
          className=" mt-4 text-xl text-black"
          style={{fontFamily: 'Outfit-Medium'}}>
          {userTrips[0]?.tripRequestData?.locationInfo?.name}
        </Text>
        <View className="flex-row w-full justify-between">
          <Text
            className="text-lg text-black"
            style={{fontFamily: 'Outfit-Regular'}}>
            {userTrips[0]?.tripRequestData?.tripDuration?.startDate}
          </Text>
          <Text
            className="text-lg text-black"
            style={{fontFamily: 'Outfit-Regular'}}>
            {userTrips[0]?.tripRequestData?.travellerInfo?.icon +
              ' ' +
              userTrips[0]?.tripRequestData?.travellerInfo?.title}
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => console.log('first')}
          className="p-4 mt-5 w-full bg-black self-center rounded-2xl">
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: 'Outfit-Regular',
              fontSize: 17,
              textAlign: 'center',
            }}>
            See your plans
          </Text>
        </TouchableOpacity>
      </View>

      <Text
        className="text-lg pb-3 px-3"
        style={{
          color: Colors.PRIMARY,
          fontFamily: 'Outfit-Medium',
        }}>
        Past Trips:
      </Text>
      {userTrips.length > 1 && (
        <FlatList
          data={userTrips.slice(1)}
          contentContainerStyle={{
            paddingBottom: 10,
          }} // Added padding to ensure scrollability
          ItemSeparatorComponent={() => <View style={{height: 10}} />} // Vertical spacing
          renderItem={({item}) => <UsertripCard trip={item} />}
          scrollEnabled={true} // Vertical scrolling
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
