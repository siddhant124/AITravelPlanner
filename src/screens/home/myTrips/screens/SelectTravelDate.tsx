/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';
import {Colors} from '../../../../constants/Colors';
import {CreateTripContext} from '../../../../../context/CreateTripContext';

export default function SelectTravelDate({navigation}: {navigation: any}) {
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
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

  const onDateChanged = (date: Date, type: string) => {
    console.log('date, type', date, type);
    type === 'START_DATE' ? setStartDate(date) : setEndDate(date);
  };

  const handleDurationSelection = () => {
    if (startDate && endDate) {
      const numOfDays = endDate.getTime() - startDate.getTime();
      const daysDifference = numOfDays / (1000 * 60 * 60 * 24) + 1;
      console.log('numofdays', daysDifference + 1);
      setTripData({
        ...tripData,
        tripDuration: {
          startDate: startDate,
          endDate: endDate,
          totalNumOfDays: daysDifference,
        },
      });
      navigation.navigate('SelectBudgetScreen');
    } else {
      ToastAndroid.show('Please Select duration!', ToastAndroid.LONG);
    }
  };

  return (
    <SafeAreaView className="pt-14 bg-white flex-1 px-6">
      <Text
        className="text-4xl text-black mt-5"
        style={{
          fontFamily: 'Outfit-Bold',
        }}>
        Treavel Date
      </Text>
      <View className="flex-1 mt-10">
        <CalendarPicker
          onDateChange={onDateChanged}
          allowRangeSelection={true}
          allowBackwardRangeSelect={true}
          minDate={new Date()}
          selectedRangeStyle={{
            backgroundColor: Colors.PRIMARY,
          }}
          selectedDayTextColor={Colors.WHITE}
        />
      </View>

      <TouchableOpacity
        activeOpacity={0.6}
        onPress={() => handleDurationSelection()}
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
