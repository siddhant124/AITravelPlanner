/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  SafeAreaView,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {SelectBudgetOptions} from '../../../../constants/TravelOptions';
import SelectTravellerOptionCard from '../component/SelectTravellerOptionCard';
import {TravelPlans} from '../model/SelectTravellerDataClass';
import {Colors} from '../../../../constants/Colors';
import {CreateTripContext} from '../../../../../context/CreateTripContext';

export default function SelectBudgetScreen({navigation}: {navigation: any}) {
  const [selectedBudget, setSelectedBudget] = useState<TravelPlans>(
    SelectBudgetOptions[0],
  );

  const tripContext = useContext(CreateTripContext);

  if (!tripContext) {
    throw new Error('useTripContext must be used within a CreateTripProvider');
  }

  const {tripData, setTripData} = tripContext;

  const [placeImagUrl, setPlaceImageUrl] = useState('');

  const GetPlaceImage = async () => {
    try {
      const response = await fetch(
        `https://unsplash.com/napi/search/photos?page=1&per_page=1&query=${tripData?.locationInfo?.name}`,
      );
      const json = await response.json();
      console.log('responseee', json.results[0].urls.raw);
      setPlaceImageUrl(json.results[0].urls.raw);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    GetPlaceImage();
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation]);

  const handleBudgetSlection = () => {
    setTripData({
      ...tripData,
      budgetInfo: selectedBudget,
      placeImagUrl: placeImagUrl,
    });
    navigation.navigate('ReviewTripScreen');
  };

  return (
    <SafeAreaView className="pt-14 bg-white flex-1 px-6">
      <Text
        className="text-4xl text-black mt-5"
        style={{
          fontFamily: 'Outfit-Bold',
        }}>
        Budget
      </Text>

      <View className="mt-4">
        <Text
          className="text-2xl text-gray-700"
          style={{
            fontFamily: 'Outfit-Bold',
          }}>
          Choose spending habits for your trip
        </Text>

        <FlatList
          data={SelectBudgetOptions}
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => {
                setSelectedBudget(item);
              }}>
              <SelectTravellerOptionCard
                options={item}
                selectedTravellerInfo={selectedBudget}
              />
            </TouchableOpacity>
          )}
          contentContainerStyle={{
            marginTop: 24,
          }}
        />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleBudgetSlection()}
        className="p-4 absolute bottom-6 w-full bg-black self-center rounded-2xl">
        <Text
          style={{
            color: Colors.WHITE,
            fontFamily: 'Outfit-Regular',
            fontSize: 17,
            textAlign: 'center',
          }}>
          Continue
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
