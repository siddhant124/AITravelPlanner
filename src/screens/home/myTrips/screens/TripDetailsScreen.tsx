/* eslint-disable react-native/no-inline-styles */
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import FlightDetailsCard from '../component/FlightDetailsCard';
import HotelRecommendationCard from '../component/HotelRecommendationCard';
import TripPerDayPlan from '../component/TripPerDayPlan';

export default function TripDetailsScreen({
  navigation,
  route,
}: {
  navigation: any;
  route: any;
}) {
  const {latestTripDetails} = route.params;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  return (
    <SafeAreaView className=" bg-white flex-1">
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0)'}
        barStyle={'dark-content'}
      />
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <Image
          source={
            latestTripDetails?.tripRequestData?.placeImagUrl !== ''
              ? {
                  uri: latestTripDetails?.tripRequestData?.placeImagUrl,
                }
              : require('./../../../../assets/images/placeholder_image.jpg')
          }
          className="w-full h-64 object-cover"
        />
        <View className="rounded-2xl gap-1 bg-white flex-1 mt-[-10]">
          <View className="p-4">
            <Text
              className="text-3xl text-black"
              style={{fontFamily: 'Outfit-Bold'}}>
              {latestTripDetails?.tripRequestData?.locationInfo?.name}
            </Text>

            <Text
              className="text-xl text-black"
              style={{fontFamily: 'Outfit-Regular'}}>
              {latestTripDetails?.tripRequestData?.tripDuration?.startDate}{' '}
              {' - '}
              {latestTripDetails?.tripRequestData?.tripDuration?.endDate}
            </Text>

            <Text
              className="text-xl text-black"
              style={{fontFamily: 'Outfit-Regular'}}>
              {latestTripDetails?.tripRequestData?.tripDuration?.totalNumOfDays}{' '}
              days
            </Text>

            <Text
              className="text-xl text-black"
              style={{fontFamily: 'Outfit-Regular'}}>
              {latestTripDetails?.tripRequestData?.budgetInfo?.title}
            </Text>

            <Text
              className="text-xl text-black"
              style={{fontFamily: 'Outfit-Regular'}}>
              {latestTripDetails?.tripRequestData?.travellerInfo?.icon}
              {'  '}
              {latestTripDetails?.tripRequestData?.travellerInfo?.title}
            </Text>

            <FlightDetailsCard
              flightDetails={
                latestTripDetails?.tripResponseDetails?.flightDetails
              }
            />
          </View>

          <HotelRecommendationCard
            hotelDetails={latestTripDetails?.tripResponseDetails?.hotelOptions}
          />

          {/* Trip Day Planner Info */}
          <TripPerDayPlan
            tripPerDayPlan={latestTripDetails?.tripResponseDetails?.dailyPlan}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
