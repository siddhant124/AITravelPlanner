/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, ActivityIndicator} from 'react-native';
import React, {useEffect, useState} from 'react';
import {PlusCircleIcon} from 'react-native-heroicons/solid';
import {Colors} from '../../../../constants/Colors';
import StartNewTripCard from '../component/StartNewTripCard';
import {auth, db} from '../../../../configs/FirebaseConfing';
import {
  collection,
  query,
  where,
  getDocs,
  DocumentData,
} from 'firebase/firestore';
import UserTripsList from '../component/UserTripsList';

export default function MyTrip({navigation}: {navigation: any}) {
  const [userTrips, setUserTrips] = useState<DocumentData[]>([]);
  const user = auth.currentUser;
  const [isLoading, setIsLoading] = useState(false);

  const getMyTripsData = async () => {
    setIsLoading(true);
    setUserTrips([]);
    const q = query(
      collection(db, 'UserTrips'),
      where('userEmailId', '==', user?.email),
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      setUserTrips(prev => {
        return [...prev, doc.data()];
      });
    });
    setIsLoading(false);
  };

  useEffect(() => {
    user && getMyTripsData();
  }, [user]);

  if (isLoading) {
    return (
      <View className="flex-1 justify-center bg-white">
        <ActivityIndicator size={'large'} color={Colors.PRIMARY} />
      </View>
    );
  }

  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        paddingTop: 24,
        paddingHorizontal: 24,
        flex: 1,
      }}>
      {/* <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} /> */}
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 30,
            color: Colors.PRIMARY,
          }}>
          My Trip
        </Text>
        <PlusCircleIcon
          onPress={() => navigation.navigate('SearchPlacesScreen')}
          color={Colors.PRIMARY}
          size={30}
        />
      </View>
      {userTrips?.length === 0 ? (
        <StartNewTripCard navigation={navigation} />
      ) : (
        <UserTripsList userTrips={userTrips.reverse()} />
      )}
    </View>
  );
}
