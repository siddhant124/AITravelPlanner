/* eslint-disable react-native/no-inline-styles */
import {View, Text, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';

const PerDayPlacesImageUrl = ({item}: {item: any}) => {
  const [perDayPlacesImageUrl, setPerDayPlacesImageUrl] = useState('');

  const GetHotelImage = async (placesName: string) => {
    try {
      const response = await fetch(
        `https://unsplash.com/napi/search/photos?page=1&per_page=1&query=${placesName}`,
      );
      const json = await response.json();
      console.log('Image URL:', json.results[0]?.urls?.raw);
      setPerDayPlacesImageUrl(json.results[0]?.urls?.raw || ''); // Set default or placeholder URL if not found
    } catch (error) {
      console.error(error);
      setPerDayPlacesImageUrl(''); // Handle error by setting a default image
    }
  };

  useEffect(() => {
    if (item.places && item.places[0]?.placeName !== '') {
      GetHotelImage(item.places[0].placeName);
    }
  }, [item.places]);

  if (perDayPlacesImageUrl !== '') {
    return (
      <Image
        className="h-32 w-full rounded-2xl"
        source={
          perDayPlacesImageUrl !== '' // Correcting the image URL logic
            ? {uri: perDayPlacesImageUrl}
            : require('../../../../assets/images/placeholder_image.jpg') // Fallback image
        }
        resizeMode="cover" // Ensure the image fits the container
      />
    );
  } else {
    return (
      <Image
        className="h-32 w-full rounded-2xl"
        source={
          require('../../../../assets/images/placeholder_image.jpg') // Fallback image
        }
        resizeMode="cover" // Ensure the image fits the container
      />
    );
  }
};

export default function TripPerDayPlan({
  tripPerDayPlan,
}: {
  tripPerDayPlan: any;
}) {
  return (
    <View className="pt-5">
      <Text
        className="text-black text-xl px-4"
        style={{fontFamily: 'Outfit-Bold'}}>
        {'🏝️  Plan Details'}
      </Text>

      <FlatList
        data={tripPerDayPlan}
        showsVerticalScrollIndicator={false}
        scrollEnabled={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 18,
        }}
        renderItem={({item}) => (
          <View className="mt-4 border p-2 border-gray-500 bg-gray-50 rounded-xl">
            {/* Ensure that 'item.places[0]' exists before rendering */}
            {item.places && item.places[0] && (
              <>
                <PerDayPlacesImageUrl item={item} />
                <Text
                  className="text-black text-xl mt-2"
                  style={{fontFamily: 'Outfit-Medium'}}>
                  {item.places[0].placeName}
                </Text>
                <Text
                  className="text-black text-lg"
                  style={{fontFamily: 'Outfit-Regular'}}>
                  {item.places[0].placeDetails}
                </Text>
                <Text
                  className="text-black text-lg"
                  style={{fontFamily: 'Outfit-Regular'}}>
                  🎟️ Ticket Price: {item.places[0].ticketPricing}
                </Text>
                <Text
                  className="text-black text-lg"
                  style={{fontFamily: 'Outfit-Regular'}}>
                  🕑 Time to travel: {item.places[0].timeToTravel}
                </Text>
                <Text
                  className="text-black text-lg"
                  style={{fontFamily: 'Outfit-Regular'}}>
                  ☀️ Day: {item.day}
                </Text>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
}
