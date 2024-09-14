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

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, [navigation]);

  const handleBudgetSlection = () => {
    setTripData({...tripData, budgetInfo: selectedBudget});
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
