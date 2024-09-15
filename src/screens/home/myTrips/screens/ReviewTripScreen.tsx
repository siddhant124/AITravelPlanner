/* eslint-disable react-native/no-inline-styles */
import {Text, SafeAreaView, View, TouchableOpacity} from 'react-native';
import React, {useContext, useEffect} from 'react';
import ReviewTripCard from '../component/ReviewTripCard';
import {
  MapPinIcon,
  UserIcon,
  CalendarDaysIcon,
  CurrencyRupeeIcon,
} from 'react-native-heroicons/outline';
import {CreateTripContext} from '../../../../../context/CreateTripContext';
import {formatTripDates} from '../../../../utils/Util';
import {Colors} from '../../../../constants/Colors';

export default function ReviewTripScreen({navigation}: {navigation: any}) {
  const tripContext = useContext(CreateTripContext);

  if (!tripContext) {
    throw new Error('useTripContext must be used within a CreateTripProvider');
  }

  const {tripData} = tripContext;

  const tripDates = formatTripDates(
    tripData?.tripDuration?.startDate,
    tripData?.tripDuration?.endDate,
  );


  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const handleGenerateTrip = () => {
    console.log('first');
    navigation.navigate('GenerateTripScreen');
  };

  return (
    <SafeAreaView className="pt-14 bg-white flex-1 px-6">
      <Text
        className="text-4xl text-black mt-5"
        style={{
          fontFamily: 'Outfit-Bold',
        }}>
        Review your trip
      </Text>

      <View className="flex-col mt-12 ">
        <ReviewTripCard
          Icon={MapPinIcon}
          title={'Destination'}
          description={tripData?.locationInfo?.name}
        />
        <ReviewTripCard
          Icon={UserIcon}
          title={'Travellers'}
          description={
            tripData?.travellerInfo?.title +
            ' (' +
            tripData?.travellerInfo?.people +
            ')'
          }
        />
        <ReviewTripCard
          Icon={CalendarDaysIcon}
          title={'Trip Duration'}
          description={
            tripDates.startDate +
            ' to ' +
            tripDates.endDate +
            ' (' +
            tripData?.tripDuration?.totalNumOfDays +
            ' Days)'
          }
        />
        <ReviewTripCard
          Icon={CurrencyRupeeIcon}
          title={'Budget'}
          description={tripData?.budgetInfo?.title}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleGenerateTrip()}
        className="p-4 absolute bottom-6 w-full bg-black self-center rounded-2xl">
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'Outfit-Regular',
            fontSize: 17,
            textAlign: 'center',
          }}>
          Generate My Trip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
