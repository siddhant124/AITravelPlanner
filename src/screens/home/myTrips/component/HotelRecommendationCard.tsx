/* eslint-disable react-native/no-inline-styles */
import {View, Image, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {} from 'react-native-svg';

const HotelCard = ({item}: {item: any}) => {
  const [hotelImageUrl, setHotelImageUrl] = useState('');

  const GetHotelImage = async (hotelName: string) => {
    try {
      const response = await fetch(
        `https://unsplash.com/napi/search/photos?page=1&per_page=1&query=${hotelName}`,
      );
      const json = await response.json();
      setHotelImageUrl(json.results[0]?.urls?.raw || ''); // Set default or placeholder URL if not found
    } catch (error) {
      console.error(error);
      setHotelImageUrl(''); // Handle error by setting a default image
    }
  };

  useEffect(() => {
    if (item.hotelName) {
      GetHotelImage(item.hotelName);
    }
  }, [item.hotelName]);

  return (
    <View className="mt-4 w-44 ">
      <Image className="h-32 w-44 rounded-2xl" source={{uri: hotelImageUrl}} />
      <Text
        className="text-black text-lg"
        style={{
          fontFamily: 'Outfit-Medium',
        }}>
        {item.hotelName}
      </Text>
      <Text
        className="text-black text-lg"
        style={{
          fontFamily: 'Outfit-Regular',
        }}>
        ⭐️ {item.rating}
      </Text>
      <Text
        className="text-black text-lg"
        style={{
          fontFamily: 'Outfit-Regular',
        }}>
        💰 {item.price.replaceAll(' per ', '/')}
      </Text>
    </View>
  );
};

export default function HotelRecommendationCard({
  hotelDetails,
}: {
  hotelDetails: any;
}) {
  return (
    <View className="pt-5">
      <Text
        className="text-black text-xl px-4"
        style={{fontFamily: 'Outfit-Bold'}}>
        {'🏨  Hotel Recommendation'}
      </Text>

      <FlatList
        horizontal
        data={hotelDetails}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          gap: 12,
          paddingHorizontal: 18,
        }}
        renderItem={({item}) => <HotelCard item={item} />}
      />
    </View>
  );
}
