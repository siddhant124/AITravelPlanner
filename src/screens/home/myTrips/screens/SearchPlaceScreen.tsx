/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Colors} from '../../../../constants/Colors';
import {FeatureCollection} from '../model/SearchPlaceDataClass';
import {getGeoapifyAutocompleteUrl} from '../../../../networkUrl/ApiUrls';
import {CreateTripContext} from '../../../../../context/CreateTripContext';
import {debounce} from 'lodash';
import {theme} from '../../../../theme';
import {MapPinIcon} from 'react-native-heroicons/solid';
import {MagnifyingGlassCircleIcon} from 'react-native-heroicons/solid';

export default function SearchPlacesScreen({navigation}: {navigation: any}) {
  const [showSearch, setShowSearch] = useState(false);
  const [searchedLocation, setSearchedLocation] = useState('');
  const [locations, setLocations] = useState<FeatureCollection['features']>([]);
  const [isLoading, setIsLoading] = useState(false);

  const tripContext = useContext(CreateTripContext);

  if (!tripContext) {
    throw new Error('useTripContext must be used within a CreateTripProvider');
  }

  const {tripData, setTripData} = tripContext;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search Place',
      headerTitleStyle: {
        color: Colors.PRIMARY, // Change this to your desired color
        fontFamily: 'Outfit-Medium', // Optional: change to your preferred font
        fontSize: 25, // Optional: adjust font size as needed
      },
    });
  }, [navigation]);

  useEffect(() => {
    setLocations([]);
    setIsLoading(true);
  }, [searchedLocation]);

  const debouncedSearch = useMemo(
    () =>
      debounce(async (text: string) => {
        if (text.trim() === '') {
          setLocations([]);
          return;
        }
        try {
          const response = await fetch(getGeoapifyAutocompleteUrl(text));
          const data = await response.json();
          setLocations(data.features || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setIsLoading(false); // Stop loading after data is fetched
        }
      }, 1200),
    [],
  );

  const handleInputChange = useCallback(
    (text: string) => {
      setSearchedLocation(text);
      debouncedSearch(text);
    },
    [debouncedSearch],
  );

  return (
    <SafeAreaView
      style={{
        paddingTop: 55,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}>
      {/* Search Places */}
      <View className="mx-4 my-4 rounded-full items-center h-auto justify-center relative z-50">
        <View
          className="flex-row flex justify-end pl-1 items-center"
          style={{
            backgroundColor: showSearch ? theme.bgWhite(0.2) : 'transparent',
          }}>
          {showSearch ? (
            <TextInput
              onChangeText={handleInputChange} // Handle input changes
              className="flex-row flex w-full text-base pl-6 flex-1 text-black bg-gray-200 rounded-full"
              placeholder="Search City"
              autoFocus
              placeholderTextColor={Colors.Gray}
              selectionColor={Colors.Gray}
            />
          ) : (
            <Text
              className="text-black pl-12 w-full text-2xl"
              style={{
                fontFamily: 'Outfit-Bold',
              }}>
              {tripData?.locationInfo?.name}
            </Text>
          )}

          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              setShowSearch(!showSearch);
              setLocations([]);
              setSearchedLocation('');
            }} // Toggle search visibility
          >
            <MagnifyingGlassCircleIcon size={40} color={Colors.PRIMARY} />
          </TouchableOpacity>
        </View>

        {showSearch && (
          <View className="absolute w-full bg-gray-100 top-16 rounded-3xl">
            {locations.length === 0 && searchedLocation !== '' ? (
              <View className="flex-1 justify-center items-center bg-gray-100 p-3 rounded-3xl">
                {isLoading ? (
                  <ActivityIndicator size="small" color="#003380" />
                ) : (
                  <Text
                    className="text-black text-lg text-center"
                    style={{
                      fontFamily: 'Outfit-Medium',
                    }}>
                    No locations found
                  </Text>
                )}
              </View>
            ) : (
              searchedLocation && (
                <View className="flex-row items-center bg-gray-100 rounded-3xl border-0 p-2 px-4">
                  <FlatList
                    keyboardShouldPersistTaps="handled"
                    data={locations}
                    keyExtractor={item => item.properties.formatted} // Use unique key for better rendering
                    renderItem={({item}) => (
                      <TouchableOpacity
                        onPress={() => {
                          setShowSearch(!showSearch);
                          setTripData({
                            locationInfo: {
                              name: item.properties.formatted,
                              coordinates: item.geometry.coordinates,
                            },
                          });
                          console.log(
                            'Location selected:',
                            item.properties.formatted,
                          );
                        }}
                        className="flex flex-row items-center gap-2">
                        <MapPinIcon size={20} color={Colors.PRIMARY} />
                        <Text
                          style={{
                            paddingTop: 15,
                            paddingBottom: 15,
                            paddingRight: 10,
                            fontSize: 15,
                            fontFamily: 'Outfit-Medium',
                            color: Colors.PRIMARY,
                          }}>
                          {item.properties.formatted}
                        </Text>
                      </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                      <View
                        style={{
                          width: '100%',
                          alignSelf: 'flex-start',
                          borderColor: Colors.Gray,
                          borderWidth: 0.2,
                        }}
                      />
                    )}
                  />
                </View>
              )
            )}
          </View>
        )}
      </View>
      {!showSearch && !tripData?.locationInfo?.name ? (
        <View className="flex-1 justify-center top-[-55] items-center gap-3">
          <MapPinIcon size={60} color={Colors.PRIMARY} />
          <Text
            className="text-lg"
            style={{
              fontFamily: 'Outfit-Medium',
              color: Colors.Gray,
            }}>
            {'No Places Selected'}
          </Text>
        </View>
      ) : (
        tripData?.locationInfo?.name &&
        !showSearch && (
          <View className="flex-1 justify-center top-[-55] items-center gap-3">
            <Text
              style={{
                color: Colors.PRIMARY,
                fontFamily: 'Outfit-Medium',
                fontSize: 17,
              }}>
              Select Traveller Now
            </Text>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                padding: 15,
                alignItems: 'center',
                backgroundColor: Colors.PRIMARY,
                borderRadius: 15,
              }}
              onPress={() => navigation.navigate('SelectTraveller')}>
              <Text
                style={{
                  color: Colors.WHITE,
                  fontFamily: 'Outfit-Regular',
                  fontSize: 17,
                }}>
                Continue with {'  '}
                <Text
                  style={{
                    textAlign: 'center',
                    fontFamily: 'Outfit-Bold',
                  }}>
                  {tripData?.locationInfo?.name}
                </Text>
              </Text>
            </TouchableOpacity>
          </View>
        )
      )}
    </SafeAreaView>
  );
}
