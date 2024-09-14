/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SelectTravelersList} from '../../../../constants/TravelOptions';
import SelectTravellerOptionCard from '../component/SelectTravellerOptionCard';
import {CreateTripContext} from '../../../../../context/CreateTripContext';
import {TravelPlans} from '../model/SelectTravellerDataClass';
import {Colors} from '../../../../constants/Colors';

export default function SelectTraveller({navigation}: {navigation: any}) {
  const [selectedTraveller, setSelectedTraveller] = useState<TravelPlans>(
    SelectTravelersList[0],
  );
  const tripContext = useContext(CreateTripContext);

  if (!tripContext) {
    throw new Error('useTripContext must be used within a CreateTripProvider');
  }

  const {tripData, setTripData} = tripContext;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  // Update Trip Data
  useEffect(() => {
    setTripData({
      ...tripData,
      travellerInfo: selectedTraveller,
    });
  }, [selectedTraveller]);

  useEffect(() => {
    console.log('trip data', tripData);
  }, [tripData]);

  return (
    <SafeAreaView className="pt-14 bg-white flex-1 px-6">
      <Text
        className="text-4xl text-black mt-5"
        style={{
          fontFamily: 'Outfit-Bold',
        }}>
        Who's Travelling
      </Text>

      <View className="mt-4">
        <Text
          className="text-2xl text-gray-700"
          style={{
            fontFamily: 'Outfit-Bold',
          }}>
          Choose your travels
        </Text>

        <FlatList
          data={SelectTravelersList}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSelectedTraveller(item);
              }}>
              <SelectTravellerOptionCard
                options={item}
                selectedTravellerInfo={selectedTraveller}
              />
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => {
          navigation.navigate('SelectTravelDate');
        }}
        className="p-4 absolute bottom-6 w-full bg-black self-center rounded-2xl">
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'Outfit-Regular',
            fontSize: 17,
            textAlign: 'center',
          }}>
          Continue with{'   '}
          <Text
            style={{
              textAlign: 'center',
              fontFamily: 'Outfit-Bold',
            }}>
            {selectedTraveller.title.toUpperCase()}
          </Text>
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
